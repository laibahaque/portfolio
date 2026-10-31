"use client";

import Link from "next/link";
import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <section id="main" className="flex min-h-svh flex-1 items-center px-5 py-28">
      <div className="mx-auto w-full max-w-[1180px]">
        <p className="text-[0.72rem] font-medium uppercase tracking-[0.22em] text-oxide">Error</p>
        <h1 className="mt-5 max-w-3xl text-5xl leading-[0.95] tracking-[-0.04em] md:text-7xl">
          Something interrupted the page.
        </h1>
        <p className="mt-6 max-w-xl text-ink-soft">You can try again, or return home. Nothing was saved from this view.</p>
        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <button type="button" onClick={reset} className="btn btn-primary">
            Try again
          </button>
          <Link href="/" className="btn btn-secondary">
            Back home
          </Link>
        </div>
      </div>
    </section>
  );
}
