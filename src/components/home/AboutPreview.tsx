import Link from "next/link";
import { aboutMe } from "@/data/profile";
import { site } from "@/data/site";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function AboutPreview() {
  return (
    <section id="about" className="scroll-target py-20 md:py-28" aria-labelledby="about-heading">
      <Container>
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5" data-reveal>
            <SectionHeading index="02" eyebrow="About me" title="Who I am, and what I am building toward." titleClassName="" />
            <h2 id="about-heading" className="sr-only">
              About me
            </h2>
            <figure className="mt-10 border border-ink/15 bg-bone p-3">
              <div
                className="flex aspect-[4/5] items-center justify-center border border-dashed border-ink/20 bg-paper text-center text-sm text-muted"
                role="img"
                aria-label="Profile photograph placeholder"
              >
                Profile image
                <span className="sr-only">Add your photograph under public/images/profile when ready.</span>
              </div>
              <figcaption className="mt-3 text-sm text-muted">{site.fullName}</figcaption>
            </figure>
          </div>

          <div className="space-y-6 text-lg leading-relaxed text-ink-soft lg:col-span-7" data-reveal>
            <p className="text-ink">{aboutMe.who}</p>
            <p>{aboutMe.csBackground}</p>
            <p>{aboutMe.professionalExperience}</p>
            <p>{aboutMe.lovesBuilding}</p>
            <p>{aboutMe.careerGoals}</p>
            <p>{aboutMe.personalTouch}</p>
            <Link href="/about" className="link-underline inline-block text-sm font-semibold uppercase tracking-[0.16em]">
              Full about page
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}
