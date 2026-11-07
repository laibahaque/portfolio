"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import type Lenis from "lenis";
import { setLenis } from "@/lib/motion/lenisStore";

let smoothScroll: Lenis | null = null;

export function MotionRoot() {
  const pathname = usePathname();

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let cancelled = false;
    let removeTicker: (() => void) | undefined;

    (async () => {
      const [{ default: gsap }, { ScrollTrigger }, { default: LenisCtor }] = await Promise.all([
        import("gsap"),
        import("gsap/ScrollTrigger"),
        import("lenis"),
      ]);
      if (cancelled) return;

      gsap.registerPlugin(ScrollTrigger);
      gsap.defaults({ force3D: true });

      const lenis = new LenisCtor({
        duration: 1.2,
        smoothWheel: true,
        lerp: 0.085,
        anchors: { offset: -88, duration: 1.2 },
        autoRaf: false,
        stopInertiaOnNavigate: true,
      });
      smoothScroll = lenis;
      setLenis(lenis);

      lenis.on("scroll", ScrollTrigger.update);
      const onTick = (time: number) => {
        lenis.raf(time * 1000);
      };
      gsap.ticker.add(onTick);
      gsap.ticker.lagSmoothing(0);

      let primed = false;
      const syncLock = () => {
        const locked = document.body.style.overflow === "hidden";
        if (locked) {
          lenis.stop();
          return;
        }
        lenis.start();
        if (!primed) {
          primed = true;
          lenis.scrollTo(0, { immediate: true });
          ScrollTrigger.refresh();
        }
      };

      const observer = new MutationObserver(syncLock);
      observer.observe(document.body, { attributes: true, attributeFilter: ["style"] });
      syncLock();

      const onResize = () => {
        lenis.resize();
        ScrollTrigger.refresh();
      };
      window.addEventListener("resize", onResize);

      removeTicker = () => {
        observer.disconnect();
        window.removeEventListener("resize", onResize);
        gsap.ticker.remove(onTick);
        lenis.destroy();
        if (smoothScroll === lenis) {
          smoothScroll = null;
          setLenis(null);
        }
      };
      if (cancelled) removeTicker();
    })();

    return () => {
      cancelled = true;
      removeTicker?.();
    };
  }, []);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let cancelled = false;
    let revert: (() => void) | undefined;

    (async () => {
      const [{ default: gsap }, { ScrollTrigger }] = await Promise.all([
        import("gsap"),
        import("gsap/ScrollTrigger"),
      ]);
      if (cancelled) return;

      gsap.registerPlugin(ScrollTrigger);
      gsap.defaults({ force3D: true });
      await new Promise<void>((resolve) => {
        window.requestAnimationFrame(() => resolve());
      });
      if (cancelled) return;

      const { applyPageMotion } = await import("@/components/motion/pageMotion");
      if (cancelled) return;

      let stop = () => {};
      const context = gsap.context(() => {
        stop = applyPageMotion(gsap, ScrollTrigger);
      });

      smoothScroll?.resize();
      ScrollTrigger.refresh();
      revert = () => {
        stop();
        context.revert();
      };
      if (cancelled) revert();
    })();

    return () => {
      cancelled = true;
      revert?.();
    };
  }, [pathname]);

  return null;
}
