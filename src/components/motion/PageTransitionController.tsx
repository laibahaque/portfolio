"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef } from "react";
import { getLenis } from "@/lib/motion/lenisStore";
import { prefersReducedMotion } from "@/lib/motion/preferences";

const CURTAIN_LEFT_ID = "curtain-left";
const CURTAIN_RIGHT_ID = "curtain-right";

const CLOSE_DURATION = 0.34;
const OPEN_DURATION = 0.4;

let gsapModule: Promise<typeof import("gsap")> | null = null;

function loadGsap() {
  if (!gsapModule) gsapModule = import("gsap");
  return gsapModule;
}

function curtainPanels() {
  const left = document.getElementById(CURTAIN_LEFT_ID);
  const right = document.getElementById(CURTAIN_RIGHT_ID);
  return { left, right };
}

function resetCurtainsClosed(gsap: typeof import("gsap").default) {
  const { left, right } = curtainPanels();
  if (left) gsap.set(left, { xPercent: 0 });
  if (right) gsap.set(right, { xPercent: 0 });
}

function resetCurtainsOpen(gsap: typeof import("gsap").default) {
  const { left, right } = curtainPanels();
  if (left) gsap.set(left, { xPercent: -100 });
  if (right) gsap.set(right, { xPercent: 100 });
}

export function PageTransitionController() {
  const pathname = usePathname();
  const router = useRouter();
  const navigating = useRef(false);
  const first = useRef(true);
  const pendingOpen = useRef(false);

  useEffect(() => {
    void loadGsap();
  }, []);

  useEffect(() => {
    if (prefersReducedMotion()) return;

    const onClick = (event: MouseEvent) => {
      if (event.defaultPrevented) return;
      if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;

      const target = event.target;
      if (!(target instanceof Element)) return;

      const anchor = target.closest("a[href]");
      if (!anchor || !(anchor instanceof HTMLAnchorElement)) return;
      if (anchor.target === "_blank" || anchor.hasAttribute("download") || anchor.dataset.noTransition !== undefined) return;
      if (anchor.origin !== window.location.origin) return;

      const href = anchor.getAttribute("href");
      if (!href || href.startsWith("#") || href.startsWith("mailto:") || href.startsWith("tel:")) return;
      if (/\.(pdf|zip|png|jpe?g|webp)$/i.test(href)) return;
      if (href === pathname || href === `${pathname}/`) return;
      if (navigating.current) {
        event.preventDefault();
        return;
      }

      event.preventDefault();
      navigating.current = true;
      pendingOpen.current = true;

      void (async () => {
        const { default: gsap } = await loadGsap();
        const { left, right } = curtainPanels();

        if (!left || !right) {
          router.push(href);
          navigating.current = false;
          pendingOpen.current = false;
          return;
        }

        resetCurtainsOpen(gsap);

        await new Promise<void>((resolve) => {
          gsap.timeline({ onComplete: resolve }).to(
            [left, right],
            {
              xPercent: 0,
              duration: CLOSE_DURATION,
              ease: "power2.inOut",
            },
            0,
          );
        });

        router.push(href);
      })();
    };

    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, [pathname, router]);

  useEffect(() => {
    if (prefersReducedMotion()) {
      getLenis()?.scrollTo(0, { immediate: true });
      navigating.current = false;
      pendingOpen.current = false;
      return;
    }

    if (first.current) {
      first.current = false;
      void loadGsap().then(({ default: gsap }) => resetCurtainsOpen(gsap));
      return;
    }

    if (!pendingOpen.current) return;

    let cancelled = false;

    void (async () => {
      const [{ default: gsap }, { ScrollTrigger }] = await Promise.all([loadGsap(), import("gsap/ScrollTrigger")]);
      if (cancelled) return;

      const { left, right } = curtainPanels();
      if (!left || !right) {
        navigating.current = false;
        pendingOpen.current = false;
        return;
      }

      resetCurtainsClosed(gsap);
      getLenis()?.scrollTo(0, { immediate: true });

      gsap.timeline({
        onComplete: () => {
          resetCurtainsOpen(gsap);
          navigating.current = false;
          pendingOpen.current = false;
          ScrollTrigger.refresh();
        },
      }).to(
        [left, right],
        {
          xPercent: (index) => (index === 0 ? -100 : 100),
          duration: OPEN_DURATION,
          ease: "power2.inOut",
        },
        0,
      );
    })();

    return () => {
      cancelled = true;
    };
  }, [pathname]);

  return (
    <div className="page-curtain" aria-hidden="true">
      <div id={CURTAIN_LEFT_ID} className="page-curtain-panel page-curtain-panel--left" />
      <div id={CURTAIN_RIGHT_ID} className="page-curtain-panel page-curtain-panel--right" />
    </div>
  );
}
