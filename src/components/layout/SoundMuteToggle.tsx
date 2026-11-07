"use client";

import { Volume2, VolumeX } from "lucide-react";
import { useSyncExternalStore } from "react";
import { playUIClick } from "@/lib/motion/clickSound";
import { isSoundMuted, setSoundMuted, subscribeSound } from "@/lib/motion/preferences";
import { cn } from "@/lib/utils";

function useSoundMuted() {
  return useSyncExternalStore(
    subscribeSound,
    () => isSoundMuted(),
    () => false,
  );
}

export function SoundMuteToggle({ className }: { className?: string }) {
  const muted = useSoundMuted();

  function toggle() {
    const next = !isSoundMuted();
    setSoundMuted(next);
    if (!next) playUIClick();
  }

  return (
    <button
      type="button"
      data-sound-skip
      className={cn("inline-flex size-11 items-center justify-center border border-ink/15", className)}
      onClick={toggle}
      aria-pressed={muted}
      aria-label={muted ? "Unmute interface sounds" : "Mute interface sounds"}
      title={muted ? "Sound off" : "Sound on"}
    >
      {muted ? <VolumeX aria-hidden="true" size={18} /> : <Volume2 aria-hidden="true" size={18} />}
    </button>
  );
}
