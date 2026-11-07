"use client";

import { useEffect, useRef } from "react";
import { skillGroups } from "@/data/skills";
import { Container } from "@/components/ui/Container";

const highlights = skillGroups
  .filter((group) => group.id !== "tools")
  .flatMap((group) => group.items)
  .slice(0, 14);

export function TechStrip() {
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let frame = 0;
    let offset = 0;
    const node = trackRef.current;
    if (!node) return;

    const step = () => {
      offset += 0.35;
      node.style.transform = `translate3d(${-offset}px, 0, 0)`;
      if (offset >= node.scrollWidth / 2) offset = 0;
      frame = requestAnimationFrame(step);
    };

    frame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frame);
  }, []);

  const loop = [...highlights, ...highlights];

  return (
    <section className="border-y border-ink/10 bg-paper py-5" aria-label="Technologies">
      <Container>
        <div className="overflow-hidden">
          <div ref={trackRef} className="flex w-max gap-3 will-change-transform">
            {loop.map((item, index) => (
              <span
                key={`${item}-${index}`}
                className="shrink-0 border border-ink/12 px-4 py-2 text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-ink-soft"
              >
                {item}
              </span>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
