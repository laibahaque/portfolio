import { cn } from "@/lib/utils";

export function AnimatedSection({
  id,
  className,
  children,
  ariaLabelledby,
}: {
  id?: string;
  className?: string;
  children: React.ReactNode;
  ariaLabelledby?: string;
}) {
  return (
    <section
      id={id}
      className={cn("scroll-target", className)}
      aria-labelledby={ariaLabelledby}
      data-reveal
    >
      {children}
    </section>
  );
}
