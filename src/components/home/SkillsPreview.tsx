import Link from "next/link";
import { skillGroups } from "@/data/skills";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SkillMarks } from "@/components/skills/SkillMarks";

const groupOrder = ["languages", "web", "data", "ai", "foundations", "tools"] as const;

export function SkillsPreview() {
  const ordered = groupOrder
    .map((id) => skillGroups.find((group) => group.id === id))
    .filter((group): group is (typeof skillGroups)[number] => Boolean(group));

  return (
    <section id="skills" className="scroll-target py-20 md:py-28" aria-labelledby="skills-heading">
      <Container>
        <div data-reveal className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <SectionHeading index="05" eyebrow="Tech stack" title="Frontend, backend, data, and the tools around them." />
          <Link href="/about#expertise" className="link-underline text-sm">
            Full skill list
          </Link>
        </div>
        <div data-reveal-group className="mt-12 grid gap-px bg-ink/10 sm:grid-cols-2 lg:grid-cols-3">
          {ordered.map((group) => (
            <article key={group.id} data-reveal-item className="bg-bone p-6 sm:p-8">
              <h3 id={group.id === "languages" ? "skills-heading" : undefined} className="text-2xl tracking-[-0.03em]">
                {group.title}
              </h3>
              <p className="mt-3 text-sm text-muted">{group.summary}</p>
              <p className="mt-6 text-ink-soft">{group.items.join(" · ")}</p>
            </article>
          ))}
        </div>
        <SkillMarks />
      </Container>
    </section>
  );
}
