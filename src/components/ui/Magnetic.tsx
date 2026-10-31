"use client";

import { useRef } from "react";
import { cn } from "@/lib/utils";

export function Magnetic({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);

  function move(event: React.MouseEvent<HTMLSpanElement>) {
    const node = ref.current;
    if (!node) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (window.matchMedia("(pointer: coarse)").matches) return;
    const rect = node.getBoundingClientRect();
    const x = event.clientX - (rect.left + rect.width / 2);
    const y = event.clientY - (rect.top + rect.height / 2);
    node.style.transform = `translate(${x * 0.12}px, ${y * 0.18}px)`;
  }

  function reset() {
    const node = ref.current;
    if (!node) return;
    node.style.transform = "translate(0px, 0px)";
  }

  return (
    <span
      ref={ref}
      onMouseMove={move}
      onMouseLeave={reset}
      className={cn(
        "inline-flex transition-transform duration-300 ease-out motion-reduce:transition-none",
        className,
      )}
    >
      {children}
    </span>
  );
}
