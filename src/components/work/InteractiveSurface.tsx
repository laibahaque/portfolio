"use client";

export function InteractiveSurface({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  function move(event: React.MouseEvent<HTMLDivElement>) {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const rect = event.currentTarget.getBoundingClientRect();
    event.currentTarget.style.setProperty("--x", `${event.clientX - rect.left}px`);
    event.currentTarget.style.setProperty("--y", `${event.clientY - rect.top}px`);
  }

  return (
    <div className={className ? `spotlight ${className}` : "spotlight"} onMouseMove={move}>
      {children}
    </div>
  );
}
