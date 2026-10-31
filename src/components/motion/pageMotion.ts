type Gsap = typeof import("gsap").default;
type ScrollTriggerStatic = typeof import("gsap/ScrollTrigger").ScrollTrigger;

const handled = "[data-reveal], [data-reveal-item], [data-motion='block'], [data-motion='on'], .hero-in, footer";

function readableLabel(heading: HTMLElement) {
  const parts: string[] = [];
  const visit = (node: Node) => {
    if (node.nodeType === Node.TEXT_NODE) {
      const text = node.textContent?.replace(/\s+/g, " ").trim();
      if (text) parts.push(text);
      return;
    }
    if (node instanceof HTMLElement) [...node.childNodes].forEach(visit);
  };
  [...heading.childNodes].forEach(visit);
  return parts.join(" ");
}

function seen(element: HTMLElement) {
  return element.dataset.motion === "on" || element.dataset.motion === "block" || element.dataset.motion === "words";
}

function inView(element: HTMLElement) {
  return element.getBoundingClientRect().top < window.innerHeight * 0.9;
}

function splitWords(heading: HTMLElement) {
  const label = readableLabel(heading);
  if (label && !heading.getAttribute("aria-label")) heading.setAttribute("aria-label", label);

  const words: HTMLElement[] = [];
  const visit = (node: Node) => {
    if (node.nodeType === Node.TEXT_NODE) {
      const text = node.textContent ?? "";
      if (!text.trim()) return;
      const fragment = document.createDocumentFragment();
      text.split(/(\s+)/).forEach((part) => {
        if (!part) return;
        if (/^\s+$/.test(part)) {
          fragment.append(part);
          return;
        }
        const mask = document.createElement("span");
        mask.className = "word-mask";
        mask.setAttribute("aria-hidden", "true");
        const inner = document.createElement("span");
        inner.textContent = part;
        mask.append(inner);
        fragment.append(mask);
        words.push(inner);
      });
      node.parentNode?.replaceChild(fragment, node);
      return;
    }
    if (node instanceof HTMLElement) [...node.childNodes].forEach(visit);
  };

  [...heading.childNodes].forEach(visit);
  return words;
}

export function applyPageMotion(gsap: Gsap, ScrollTrigger: ScrollTriggerStatic) {
  const main = document.querySelector("main");
  if (!main) return () => {};

  const waiting: Array<{ play: () => void }> = [];
  let scanning = false;
  let frame = 0;

  const curtain = () => document.documentElement.dataset.splash === "done";

  const enter = (targets: HTMLElement[], trigger: HTMLElement, stagger = 0, distance = 28) => {
    if (!targets.length) return;
    const mixed = targets.some((item) => (item.dataset.animate || "") !== (targets[0].dataset.animate || ""));
    if (mixed) {
      targets.forEach((item) => enter([item], item, 0, distance));
      return;
    }

    const mode = targets[0].dataset.animate;
    const from =
      mode === "slide-left"
        ? { x: -64, autoAlpha: 0 }
        : mode === "slide-right"
          ? { x: 64, autoAlpha: 0 }
          : mode === "scale"
            ? { scale: 0.92, autoAlpha: 0 }
            : { y: distance, autoAlpha: 0 };
    const to =
      mode === "slide-left" || mode === "slide-right"
        ? { x: 0, autoAlpha: 1 }
        : mode === "scale"
          ? { scale: 1, autoAlpha: 1 }
          : { y: 0, autoAlpha: 1 };
    const visible = inView(trigger);
    const hold = !curtain() && visible;
    const tween = gsap.fromTo(targets, from, {
      ...to,
      duration: mode === "scale" ? 0.9 : 1.05,
      stagger,
      ease: "expo.out",
      paused: hold,
      scrollTrigger: visible ? undefined : { trigger, start: "top 86%", once: true },
    });
    if (hold) waiting.push(tween);
  };

  const release = () => {
    waiting.splice(0).forEach((tween) => tween.play());
  };

  const repair = () => {
    if (!curtain()) return;
    release();
    main.querySelectorAll<HTMLElement>("[data-motion='on'], [data-motion='block']").forEach((element) => {
      if (element.dataset.repaired === "yes" || !inView(element)) return;
      const style = getComputedStyle(element);
      if (style.opacity !== "0" && style.visibility !== "hidden") return;
      element.dataset.repaired = "yes";
      gsap.to(element, { autoAlpha: 1, x: 0, y: 0, scale: 1, duration: 0.85, ease: "expo.out", overwrite: "auto" });
    });
    main.querySelectorAll<HTMLElement>("[data-motion='words']").forEach((heading) => {
      if (heading.dataset.repaired === "yes" || !inView(heading)) return;
      const words = [...heading.querySelectorAll<HTMLElement>(".word-mask > span")];
      const stuck = words.some((word) => {
        const transform = getComputedStyle(word).transform;
        return transform !== "none" && transform !== "matrix(1, 0, 0, 1, 0, 0)";
      });
      if (!stuck) return;
      heading.dataset.repaired = "yes";
      gsap.to(words, { yPercent: 0, duration: 0.8, stagger: 0.03, ease: "expo.out", overwrite: "auto" });
    });
  };

  const scan = () => {
    if (scanning) return;
    scanning = true;
    repair();

    ScrollTrigger.getAll().forEach((trigger) => {
      if (trigger.trigger instanceof Element && !trigger.trigger.isConnected) trigger.kill();
    });

    main.querySelectorAll<HTMLElement>("[data-reveal-group]").forEach((group) => {
      if (seen(group)) return;
      const items = [...group.querySelectorAll<HTMLElement>("[data-reveal-item]")].filter((item) => !seen(item));
      if (!items.length) return;
      group.dataset.motion = "on";
      items.forEach((item) => {
        item.dataset.motion = "on";
      });
      enter(items, group, 0.07, 32);
    });

    main.querySelectorAll<HTMLElement>("[data-reveal]").forEach((element) => {
      if (seen(element) || element.closest("[data-reveal-group]")) return;
      element.dataset.motion = "on";
      enter([element], element, 0, 32);
    });

    main.querySelectorAll<HTMLElement>("li > article").forEach((article) => {
      if (seen(article) || article.closest("[data-reveal], [data-reveal-item]")) return;
      article.dataset.motion = "block";
      enter([article], article, 0, 36);
    });

    main.querySelectorAll<HTMLElement>("aside").forEach((aside) => {
      if (seen(aside) || aside.querySelector("canvas, .hero-in") || aside.closest(handled)) return;
      aside.dataset.motion = "block";
      enter([aside], aside, 0, 24);
    });

    main.querySelectorAll<HTMLElement>("[data-cover]").forEach((cover) => {
      if (cover.dataset.motion === "cover") return;
      cover.dataset.motion = "cover";
      const visible = inView(cover);
      const hold = !curtain() && visible;
      const art = cover.querySelector("svg");
      const clip = gsap.fromTo(
        cover,
        { clipPath: "inset(10% 10% 10% 10%)" },
        {
          clipPath: "inset(0% 0% 0% 0%)",
          duration: 1.2,
          ease: "expo.out",
          paused: hold,
          scrollTrigger: visible ? undefined : { trigger: cover, start: "top 86%", once: true },
        },
      );
      if (hold) waiting.push(clip);
      if (art) {
        const zoom = gsap.fromTo(
          art,
          { scale: 1.08 },
          {
            scale: 1,
            duration: 1.35,
            ease: "expo.out",
            paused: hold,
            scrollTrigger: visible ? undefined : { trigger: cover, start: "top 86%", once: true },
          },
        );
        if (hold) waiting.push(zoom);
      }
    });

    main.querySelectorAll<HTMLElement>("[data-parallax]").forEach((element) => {
      if (element.dataset.motion === "parallax") return;
      element.dataset.motion = "parallax";
      gsap.fromTo(
        element,
        { y: 22 },
        {
          y: -22,
          ease: "none",
          scrollTrigger: {
            trigger: element,
            start: "top bottom",
            end: "bottom top",
            scrub: 0.65,
          },
        },
      );
    });

    main.querySelectorAll<HTMLElement>("ol, ul").forEach((list) => {
      if (seen(list) || list.closest("[data-reveal-group], footer")) return;
      const items = [...list.children].filter(
        (item): item is HTMLElement =>
          item instanceof HTMLElement && !item.querySelector("h1, h2, h3") && !seen(item),
      );
      if (!items.length) return;
      list.dataset.motion = "on";
      items.forEach((item) => {
        item.dataset.motion = "on";
      });
      enter(items, list, 0.06, 22);
    });

    const chips = [...main.querySelectorAll<HTMLElement>("a.shrink-0")].filter((chip) => !seen(chip));
    if (chips.length) {
      chips.forEach((chip) => {
        chip.dataset.motion = "on";
      });
      enter(chips, chips[0].parentElement ?? chips[0], 0.04, 16);
    }

    main.querySelectorAll<HTMLElement>("p, blockquote, dd").forEach((copy) => {
      if (seen(copy) || copy.closest(handled) || copy.closest("a, button, h1, h2, h3")) return;
      copy.dataset.motion = "on";
      enter([copy], copy, 0, 22);
    });

    main.querySelectorAll<HTMLElement>("span.h-px").forEach((rule) => {
      if (rule.dataset.motion === "draw") return;
      rule.dataset.motion = "draw";
      const visible = inView(rule);
      const hold = !curtain() && visible;
      const tween = gsap.fromTo(
        rule,
        { scaleX: 0 },
        {
          scaleX: 1,
          transformOrigin: "left center",
          duration: 0.9,
          ease: "expo.out",
          paused: hold,
          scrollTrigger: visible ? undefined : { trigger: rule, start: "top 90%", once: true },
        },
      );
      if (hold) waiting.push(tween);
    });

    const firstHeading = main.querySelector("h1");
    main.querySelectorAll<HTMLElement>("h1, h2, h3").forEach((heading) => {
      if (heading.dataset.motion === "words" || heading.closest("a, button")) return;
      const words = splitWords(heading);
      if (!words.length) return;
      heading.dataset.motion = "words";
      const playNow = heading === firstHeading || inView(heading);
      const hold = !curtain() && playNow;
      const tween = gsap.fromTo(
        words,
        { yPercent: 120 },
        {
          yPercent: 0,
          duration: heading.tagName === "H1" ? 1.15 : 1,
          stagger: heading.tagName === "H1" ? 0.055 : heading.tagName === "H2" ? 0.04 : 0.03,
          ease: "expo.out",
          delay: heading === firstHeading ? 0.06 : 0,
          paused: hold,
          scrollTrigger: playNow ? undefined : { trigger: heading, start: "top 88%", once: true },
        },
      );
      if (hold) waiting.push(tween);
    });

    const filters = main.querySelector<HTMLElement>("[aria-label='Filter projects']");
    if (filters && !seen(filters)) {
      const buttons = [...filters.querySelectorAll<HTMLElement>("button")].filter((button) => !seen(button));
      if (buttons.length) {
        filters.dataset.motion = "on";
        buttons.forEach((button) => {
          button.dataset.motion = "on";
        });
        enter(buttons, filters, 0.05, 16);
      }
    }

    const more = main.querySelector<HTMLElement>("[aria-label='More projects']");
    if (more && !seen(more)) {
      const links = [...more.querySelectorAll<HTMLElement>("a")].filter((link) => !seen(link));
      if (links.length) {
        more.dataset.motion = "on";
        links.forEach((link) => {
          link.dataset.motion = "on";
        });
        enter(links, more, 0.08, 20);
      }
    }

    main.querySelectorAll<HTMLElement>("form").forEach((form) => {
      if (form.dataset.motion === "on") return;
      const rows = [...form.children].filter(
        (row): row is HTMLElement => row instanceof HTMLElement && row.getAttribute("aria-hidden") !== "true",
      );
      if (!rows.length) return;
      form.dataset.motion = "on";
      const visible = inView(form);
      const hold = !curtain() && visible;
      const tween = gsap.fromTo(
        rows,
        { y: 18 },
        {
          y: 0,
          duration: 0.9,
          stagger: 0.08,
          ease: "expo.out",
          paused: hold,
          scrollTrigger: visible ? undefined : { trigger: form, start: "top 88%", once: true },
        },
      );
      if (hold) waiting.push(tween);
    });

    const footer = document.querySelector<HTMLElement>("footer");
    if (footer && footer.dataset.motion !== "on") {
      const columns = [...footer.querySelectorAll<HTMLElement>(":scope > div > div")];
      if (columns.length) {
        footer.dataset.motion = "on";
        enter(columns, footer, 0.08, 24);
      }
    }

    scanning = false;
  };

  const schedule = () => {
    window.cancelAnimationFrame(frame);
    frame = window.requestAnimationFrame(scan);
  };

  scan();
  const observer = new MutationObserver(schedule);
  observer.observe(main, { childList: true, subtree: true });

  let watch = 0;
  const onSplash = () => repair();
  if (curtain()) onSplash();
  else {
    window.addEventListener("splash:done", onSplash, { once: true });
    watch = window.setInterval(() => {
      if (!curtain()) return;
      window.clearInterval(watch);
      repair();
    }, 100);
  }

  return () => {
    window.cancelAnimationFrame(frame);
    window.clearInterval(watch);
    observer.disconnect();
    window.removeEventListener("splash:done", onSplash);
    main.querySelectorAll<HTMLElement>("[data-motion], [data-repaired]").forEach((element) => {
      delete element.dataset.motion;
      delete element.dataset.repaired;
    });
  };
}
