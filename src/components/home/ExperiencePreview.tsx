import Link from "next/link";
import { experience } from "@/data/experience";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function ExperiencePreview() {
  return (
    <section id="experience" className="scroll-target py-20 md:py-28" aria-labelledby="experience-preview-heading">
      <Container>
        <div data-reveal className="grid gap-8 md:grid-cols-12">
          <div className="md:col-span-4">
            <SectionHeading index="06" eyebrow="Experience" title="Where I have worked." />
            <Link href="/experience" className="link-underline mt-6 inline-block text-sm">
              Full timeline
            </Link>
          </div>
          <ol data-reveal-group className="md:col-span-8">
            {experience.map((job) => (
              <li key={job.id} data-reveal-item className="grid gap-2 border-t border-ink/10 py-6 sm:grid-cols-12 sm:gap-6">
                <p className="text-sm text-muted sm:col-span-4">
                  {job.start} — {job.end}
                </p>
                <div className="sm:col-span-8">
                  <h3
                    id={job.id === experience[0]?.id ? "experience-preview-heading" : undefined}
                    className="text-2xl tracking-[-0.03em]"
                  >
                    {job.role}
                  </h3>
                  <p className="mt-1 text-sm text-ink-soft">
                    {job.company}
                    <span aria-hidden="true"> · </span>
                    {job.location}
                  </p>
                  <p className="mt-3 text-ink-soft">{job.summary}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </Container>
    </section>
  );
}
