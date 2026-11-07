import { quickStats } from "@/data/profile";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function Stats() {
  return (
    <section id="stats" className="scroll-target border-y border-ink/10 bg-paper py-16 md:py-20" aria-labelledby="stats-heading">
      <Container>
        <div data-reveal>
          <SectionHeading index="03" eyebrow="Quick stats" title="Counts that are already true." titleClassName="" />
          <h2 id="stats-heading" className="sr-only">
            Quick stats
          </h2>
        </div>
        <ol data-reveal-group className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {quickStats.map((stat) => (
            <li key={stat.id} data-reveal-item className="border border-ink/10 bg-bone p-6">
              <p className="font-display text-4xl italic text-oxide">{stat.value}</p>
              <h3 className="mt-3 text-lg tracking-[-0.02em]">
                {stat.label}
              </h3>
              <p className="mt-3 text-sm text-ink-soft">{stat.detail}</p>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
