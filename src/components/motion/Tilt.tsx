"use client";

import { useRef } from "react";
import { cn } from "@/lib/utils";

export function Tilt({
  children,
  className,
  max = 8,
}: {
  children: React.ReactNode;
  className?: string;
  max?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  function allow() {
    return (
      !window.matchMedia("(prefers-reduced-motion: reduce)").matches &&
      !window.matchMedia("(pointer: coarse)").matches
    );
  }

  function move(event: React.MouseEvent<HTMLDivElement>) {
    const node = ref.current;
    if (!node || !allow()) return;
    const rect = node.getBoundingClientRect();
    const px = (event.clientX - rect.left) / rect.width - 0.5;
    const py = (event.clientY - rect.top) / rect.height - 0.5;
    node.style.transform = `rotateX(${(-py * max).toFixed(2)}deg) rotateY(${(px * max).toFixed(2)}deg) translate3d(${(px * 6).toFixed(1)}px, ${(py * 6).toFixed(1)}px, 0)`;
  }

  function reset() {
    const node = ref.current;
    if (!node) return;
    node.style.transform = "rotateX(0deg) rotateY(0deg) translate3d(0, 0, 0)";
  }

  return (
    <div className={cn("[perspective:1100px]", className)}>
      <div
        ref={ref}
        onMouseMove={move}
        onMouseLeave={reset}
        className="h-full transition-transform duration-300 ease-out [transform-style:preserve-3d] motion-reduce:transition-none"
      >
        {children}
      </div>
    </div>
  );
}
