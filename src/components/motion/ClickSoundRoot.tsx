"use client";

import { useEffect } from "react";
import { playUIClick } from "@/lib/motion/clickSound";
import { isSoundMuted, prefersReducedMotion } from "@/lib/motion/preferences";

/** Global click listener — toggle lives in the header (`SoundMuteToggle`). */
export function ClickSoundRoot() {
  useEffect(() => {
    if (prefersReducedMotion()) return;

    const onClick = (event: MouseEvent) => {
      if (isSoundMuted()) return;
      const target = event.target;
      if (target instanceof Element && target.closest("[data-sound-skip]")) return;
      playUIClick();
    };

    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, []);

  return null;
}
