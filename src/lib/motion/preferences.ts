const SOUND_KEY = "portfolio-sound-muted";

export function prefersReducedMotion(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function isCoarsePointer(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(pointer: coarse)").matches;
}

/** Heavy WebGL is disabled on small viewports and touch-primary devices. */
export function shouldUseFluidCanvas(): boolean {
  if (typeof window === "undefined") return false;
  if (prefersReducedMotion()) return false;
  if (isCoarsePointer()) return false;
  return window.matchMedia("(min-width: 768px)").matches;
}

export function isSoundMuted(): boolean {
  if (typeof window === "undefined") return false;
  return window.localStorage.getItem(SOUND_KEY) === "true";
}

export function setSoundMuted(muted: boolean) {
  window.localStorage.setItem(SOUND_KEY, muted ? "true" : "false");
  window.dispatchEvent(new CustomEvent("portfolio:sound", { detail: { muted } }));
}

export function subscribeSound(listener: (muted: boolean) => void) {
  const handler = (event: Event) => {
    const detail = (event as CustomEvent<{ muted: boolean }>).detail;
    listener(detail?.muted ?? isSoundMuted());
  };
  window.addEventListener("portfolio:sound", handler);
  return () => window.removeEventListener("portfolio:sound", handler);
}
