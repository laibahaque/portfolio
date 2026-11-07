import Link from "next/link";
import { certifications } from "@/data/certifications";
import { education } from "@/data/education";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function EducationPreview() {
  const degree = education.find((item) => item.id === "bscs");

  return (
    <section id="education" className="scroll-target border-t border-ink/10 bg-paper py-20 md:py-28" aria-labelledby="education-heading">
      <Container>
        <div data-reveal className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <SectionHeading index="07" eyebrow="Education and certifications" title="Qualifications on the record." />
            <Link href="/about#education" className="link-underline mt-6 inline-block text-sm">
              Full education
            </Link>
          </div>
          <div className="space-y-10 lg:col-span-8">
            {degree ? (
              <article data-reveal className="border-t border-ink/10 pt-6">
                <h3 id="education-heading" className="text-3xl tracking-[-0.03em]">
                  {degree.credential} in {degree.field}
                </h3>
                <p className="mt-2 text-ink-soft">{degree.school}</p>
                <p className="mt-2 text-sm text-muted">
                  {degree.period}
                  <span aria-hidden="true"> · </span>
                  {degree.detail}
                </p>
              </article>
            ) : null}
            <div data-reveal>
              <h3 className="text-2xl tracking-[-0.03em]">Relevant certifications</h3>
              <ul className="mt-6">
                {certifications.map((item) => (
                  <li key={item.id} className="border-t border-ink/10 py-5">
                    <p className="text-lg">{item.title}</p>
                    <p className="mt-1 text-sm text-ink-soft">
                      {item.issuer}
                      <span aria-hidden="true"> · </span>
                      {item.issued}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
