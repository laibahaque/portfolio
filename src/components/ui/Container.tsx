import { cn } from "@/lib/utils";

export function Container({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <div className={cn("mx-auto w-full max-w-[1180px] px-5 sm:px-8", className)}>{children}</div>;
}

export function SectionLabel({ index, children }: { index: string; children: React.ReactNode }) {
  return (
    <p className="flex items-center gap-3 text-[0.72rem] font-medium uppercase tracking-[0.22em] text-muted">
      <span className="text-oxide">{index}</span>
      <span aria-hidden="true" className="h-px w-8 bg-ink/25" />
      {children}
    </p>
  );
}
