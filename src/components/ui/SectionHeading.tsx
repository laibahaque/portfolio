import { SectionLabel } from "@/components/ui/Container";
import { cn } from "@/lib/utils";

type SectionHeadingProps = {
  index?: string;
  eyebrow?: string;
  title: string;
  description?: string;
  className?: string;
  titleClassName?: string;
  dark?: boolean;
};

export function SectionHeading({
  index,
  eyebrow,
  title,
  description,
  className,
  titleClassName,
  dark,
}: SectionHeadingProps) {
  return (
    <div className={className}>
      {index ? <SectionLabel index={index}>{eyebrow ?? "Section"}</SectionLabel> : null}
      {!index && eyebrow ? (
        <p
          className={cn(
            "text-[0.72rem] font-medium uppercase tracking-[0.22em]",
            dark ? "text-oxide-soft" : "text-muted",
          )}
        >
          {eyebrow}
        </p>
      ) : null}
      <h2
        className={cn(
          "mt-5 max-w-2xl text-4xl leading-[1.05] tracking-[-0.03em] md:text-5xl",
          dark && "text-bone",
          titleClassName,
        )}
      >
        {title}
      </h2>
      {description ? <p className={cn("mt-5 max-w-xl text-ink-soft", dark && "text-mist")}>{description}</p> : null}
    </div>
  );
}
