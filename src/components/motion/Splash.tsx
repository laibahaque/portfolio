"use client";

import { useEffect, useRef, useState } from "react";

type Phase = "in" | "leave" | "done";

export function Splash() {
  const [phase, setPhase] = useState<Phase>("in");
  const timers = useRef<number[]>([]);
  const closed = useRef(false);
  const enterRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    function clearTimers() {
      timers.current.forEach((id) => window.clearTimeout(id));
      timers.current = [];
    }

    function finish() {
      document.body.style.overflow = "";
      document.documentElement.dataset.splash = "done";
      window.dispatchEvent(new Event("splash:done"));
      setPhase("done");
    }

    function close(animated: boolean) {
      if (closed.current) return;
      closed.current = true;
      clearTimers();
      if (!animated) {
        finish();
        return;
      }
      setPhase("leave");
      timers.current.push(window.setTimeout(finish, 760));
    }

    if (reduce) {
      timers.current.push(window.setTimeout(() => close(false), 0));
      return () => clearTimers();
    }

    document.body.style.overflow = "hidden";
    enterRef.current?.focus();
    timers.current.push(window.setTimeout(() => close(true), 1800));

    return () => {
      clearTimers();
      document.body.style.overflow = "";
    };
  }, []);

  if (phase === "done") return null;

  return (
    <div className={phase === "leave" ? "splash splash-leave" : "splash"} role="dialog" aria-modal="true" aria-labelledby="splash-title">
      <div className="text-center">
        <p className="splash-mark">
          Lh<span className="text-oxide">.</span>
        </p>
        <span className="splash-rule" aria-hidden="true" />
        <p id="splash-title" className="splash-line">
          Serious about play.
        </p>
      </div>
      <button
        ref={enterRef}
        type="button"
        className="splash-skip"
        onClick={() => {
          if (closed.current) return;
          closed.current = true;
          timers.current.forEach((id) => window.clearTimeout(id));
          timers.current = [];
          setPhase("leave");
          timers.current.push(
            window.setTimeout(() => {
              document.body.style.overflow = "";
              document.documentElement.dataset.splash = "done";
              window.dispatchEvent(new Event("splash:done"));
              setPhase("done");
            }, 760),
          );
        }}
      >
        Enter
      </button>
    </div>
  );
}
