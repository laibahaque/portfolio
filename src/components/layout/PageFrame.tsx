import { ViewTransition } from "react";

export function PageFrame({ children }: { children: React.ReactNode }) {
  return (
    <ViewTransition
      enter={{ default: "page-enter" }}
      exit={{ default: "page-exit" }}
    >
      <main id="main" className="flex-1">
        {children}
      </main>
    </ViewTransition>
  );
}
