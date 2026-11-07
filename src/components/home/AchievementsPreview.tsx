import Link from "next/link";
import { achievements } from "@/data/achievements";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function AchievementsPreview() {
  const preview = achievements.slice(0, 3);

  return (
    <section className="pb-20 md:pb-28" aria-labelledby="achievements-preview-heading">
      <Container>
        <div data-reveal className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <SectionHeading eyebrow="Achievements" title="Steps that are already true." />
          <Link href="/achievements" className="link-underline text-sm">
            All achievements
          </Link>
        </div>
        <ol data-reveal-group className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {preview.map((item, index) => (
            <li key={item.id} data-reveal-item className="border-t border-ink/15 pt-5">
              <p className="font-display text-3xl italic text-oxide">{item.year}</p>
              <h3
                id={index === 0 ? "achievements-preview-heading" : undefined}
                className="mt-3 text-xl tracking-[-0.03em]"
              >
                {item.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-ink-soft">{item.detail}</p>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
