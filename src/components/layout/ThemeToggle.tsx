"use client";

import { Moon, Sun } from "lucide-react";
import { startTransition, useEffect, useState } from "react";
import { cn } from "@/lib/utils";

const STORAGE_KEY = "portfolio-theme";

export function ThemeToggle({ className }: { className?: string }) {
  const [dark, setDark] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const next = stored === "dark" || (!stored && prefersDark);
    document.documentElement.dataset.theme = next ? "dark" : "light";
    startTransition(() => {
      setDark(next);
      setReady(true);
    });
  }, []);

  function toggle() {
    setDark((current) => {
      const next = !current;
      document.documentElement.dataset.theme = next ? "dark" : "light";
      window.localStorage.setItem(STORAGE_KEY, next ? "dark" : "light");
      return next;
    });
  }

  if (!ready) {
    return (
      <button
        type="button"
        className={cn("inline-flex size-11 items-center justify-center border border-ink/15", className)}
        aria-label="Toggle color theme"
        disabled
      >
        <Sun aria-hidden="true" size={18} />
      </button>
    );
  }

  return (
    <button
      type="button"
      className={cn("inline-flex size-11 items-center justify-center border border-ink/15", className)}
      onClick={toggle}
      aria-pressed={dark}
      aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
    >
      {dark ? <Sun aria-hidden="true" size={18} /> : <Moon aria-hidden="true" size={18} />}
    </button>
  );
}
