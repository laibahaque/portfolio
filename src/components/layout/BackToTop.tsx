"use client";

import { ArrowUp } from "lucide-react";
import { useEffect, useState } from "react";

export function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 640);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!visible) return null;

  return (
    <a
      href="#hero"
      className="no-print fixed bottom-6 right-6 z-40 inline-flex size-12 items-center justify-center border border-ink/15 bg-bone text-ink shadow-sm transition hover:border-oxide"
      aria-label="Back to top"
    >
      <ArrowUp aria-hidden="true" size={18} />
    </a>
  );
}
