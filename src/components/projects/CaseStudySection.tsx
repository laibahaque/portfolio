type CaseStudySectionProps = {
  index: string;
  title: string;
  children: React.ReactNode;
};

export function CaseStudySection({ index, title, children }: CaseStudySectionProps) {
  return (
    <section>
      <p className="font-display text-2xl italic text-oxide">{index}</p>
      <h2 className="mt-2 text-3xl tracking-[-0.03em]">{title}</h2>
      <div className="mt-4 max-w-2xl text-ink-soft">{children}</div>
    </section>
  );
}
