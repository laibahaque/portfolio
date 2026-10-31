import type { Metadata } from "next";
import Link from "next/link";
import { ContactBand } from "@/components/contact/ContactBand";
import { PageFrame } from "@/components/layout/PageFrame";
import { Container, SectionLabel } from "@/components/ui/Container";
import { achievements } from "@/data/achievements";
import { certifications } from "@/data/certifications";
import { education } from "@/data/education";
import { experience } from "@/data/experience";
import { philosophy } from "@/data/philosophy";
import { site } from "@/data/site";
import { skillGroups } from "@/data/skills";
import { SkillMarks } from "@/components/skills/SkillMarks";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "About",
  description:
    "About Laiba Haque, a junior game developer at Techversol in Karachi. Career, education, certifications, and the way she approaches games and full-stack systems.",
  path: "/about",
});

const sections = [
  { href: "#introduction", label: "Introduction" },
  { href: "#philosophy", label: "Philosophy" },
  { href: "#career", label: "Career" },
  { href: "#expertise", label: "Expertise" },
  { href: "#education", label: "Education" },
  { href: "#certifications", label: "Certifications" },
  { href: "#milestones", label: "Milestones" },
];

export default function AboutPage() {
  return (
    <PageFrame>
      <section className="pb-12 pt-28 md:pt-36">
        <Container>
          <p className="text-[0.72rem] font-medium uppercase tracking-[0.22em] text-muted">
            <span className="text-oxide">About</span>
            <span aria-hidden="true"> · </span>
            {site.location}
          </p>
          <h1 className="mt-6 max-w-4xl text-[clamp(2.8rem,6vw,5.6rem)] leading-[0.95] tracking-[-0.04em] text-balance">
            I build playable things, and the records behind them.
          </h1>
          <div className="mt-8 flex gap-3 overflow-x-auto pb-2 lg:hidden">
            {sections.map((section) => (
              <a
                key={section.href}
                href={section.href}
                className="shrink-0 border border-ink/15 px-3 py-2 text-[0.72rem] font-medium uppercase tracking-[0.16em]"
              >
                {section.label}
              </a>
            ))}
          </div>
        </Container>
      </section>

      <section className="pb-20 md:pb-28">
        <Container>
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <nav aria-label="On this page" className="hidden lg:col-span-3 lg:block">
              <ol className="sticky top-32 space-y-3 text-sm">
                {sections.map((section, index) => (
                  <li key={section.href}>
                    <a href={section.href} className="link-underline text-ink-soft hover:text-ink">
                      <span className="mr-3 text-oxide">{String(index + 1).padStart(2, "0")}</span>
                      {section.label}
                    </a>
                  </li>
                ))}
              </ol>
            </nav>

            <div className="space-y-20 lg:col-span-8 lg:col-start-5">
              <div id="introduction" className="scroll-target space-y-6 text-lg leading-relaxed text-ink-soft">
                <p className="text-ink">
                  I am {site.fullName}. I live in Karachi, I study computer science at the University of Karachi, and I
                  spend my working days on web games at {site.company}.
                </p>
                <p>
                  The path here was practical. I interned as a front-end developer at Ajd Marketing, then returned for a
                  short remote traineeship in web development. In parallel I finished a diploma in computer information
                  technology and started a bachelor&apos;s degree. In 2026 I moved into games: first as an intern on web
                  games, then as a junior developer on the same team.
                </p>
                <p>
                  I am interested in the moment a person understands the software without being told. In a game, that
                  moment is play. In a request form or a banking screen, it is trust. I try to build both with the same
                  care.
                </p>
                <p>
                  The projects on this site are academic. Game work at Techversol will be added here when it can be
                  shared.{" "}
                  <Link href="/work" className="link-underline text-ink">
                    The projects page
                  </Link>{" "}
                  is the set I can walk through today. In 2026 I also attended Women Tech Quest, hosted by 10Pearls, and
                  the Alibaba Cloud AI Hackathon at NASTP Silicon. I have certificates for both. Those notes, including
                  the AI agents I worked on, are on the{" "}
                  <Link href="/events" className="link-underline text-ink">
                    events page
                  </Link>
                  .
                </p>
              </div>

              <div id="philosophy" className="scroll-target">
                <SectionLabel index="02">Philosophy</SectionLabel>
                <h2 className="mt-5 text-4xl tracking-[-0.03em] md:text-5xl">How I like to work.</h2>
                <ol className="mt-10 space-y-10">
                  {philosophy.map((item) => (
                    <li key={item.index} className="border-t border-ink/10 pt-6">
                      <p className="font-display text-2xl italic text-oxide">{item.index}</p>
                      <h3 className="mt-3 text-2xl tracking-[-0.03em]">{item.title}</h3>
                      <p className="mt-3 max-w-2xl text-ink-soft">{item.text}</p>
                    </li>
                  ))}
                </ol>
              </div>

              <div id="career" className="scroll-target">
                <SectionLabel index="03">Career</SectionLabel>
                <h2 className="mt-5 text-4xl tracking-[-0.03em] md:text-5xl">Where I have worked.</h2>
                <ol className="mt-10 border-l border-ink/15">
                  {experience.map((job) => (
                    <li key={job.id} className="relative pb-12 pl-8 last:pb-0">
                      <span aria-hidden="true" className="absolute top-2 -left-[5px] size-[9px] rounded-full bg-oxide" />
                      <p className="text-sm text-muted">
                        {job.start} – {job.end}
                        <span aria-hidden="true"> · </span>
                        {job.location}
                      </p>
                      <h3 className="mt-2 text-3xl tracking-[-0.03em]">{job.role}</h3>
                      <p className="mt-1 text-ink-soft">{job.company}</p>
                      <p className="mt-4 max-w-2xl">{job.summary}</p>
                    </li>
                  ))}
                </ol>
              </div>

              <div id="expertise" className="scroll-target">
                <SectionLabel index="04">Expertise</SectionLabel>
                <h2 className="mt-5 text-4xl tracking-[-0.03em] md:text-5xl">What I can pick up and use.</h2>
                <SkillMarks />
                <div className="mt-10 space-y-8">
                  {skillGroups.map((group) => (
                    <article key={group.id} className="border-t border-ink/10 pt-6">
                      <h3 className="text-2xl tracking-[-0.03em]">{group.title}</h3>
                      <p className="mt-2 text-sm text-muted">{group.summary}</p>
                      <ul className="mt-4 flex flex-wrap gap-2">
                        {group.items.map((item) => (
                          <li key={item} className="border border-ink/15 px-3 py-1.5 text-sm">
                            {item}
                          </li>
                        ))}
                      </ul>
                    </article>
                  ))}
                </div>
              </div>

              <div id="education" className="scroll-target">
                <SectionLabel index="05">Education</SectionLabel>
                <h2 className="mt-5 text-4xl tracking-[-0.03em] md:text-5xl">Qualifications.</h2>
                <ol className="mt-10">
                  {education.map((item) => (
                    <li key={item.id} className="grid gap-3 border-t border-ink/10 py-6 sm:grid-cols-12">
                      <p className="text-sm text-muted sm:col-span-3">{item.period}</p>
                      <div className="sm:col-span-9">
                        <h3 className="text-2xl tracking-[-0.03em]">
                          {item.credential} in {item.field}
                        </h3>
                        <p className="mt-2 text-ink-soft">{item.school}</p>
                        <p className="mt-1 text-sm text-muted">{item.detail}</p>
                      </div>
                    </li>
                  ))}
                </ol>
              </div>

              <div id="certifications" className="scroll-target">
                <SectionLabel index="06">Certifications</SectionLabel>
                <h2 className="mt-5 text-4xl tracking-[-0.03em] md:text-5xl">Certificates on file.</h2>
                <ul className="mt-10">
                  {certifications.map((item) => (
                    <li key={item.id} className="border-t border-ink/10 py-6">
                      <h3 className="text-2xl tracking-[-0.03em]">{item.title}</h3>
                      <p className="mt-2 text-ink-soft">
                        {item.issuer}
                        <span aria-hidden="true"> · </span>
                        {item.issued}
                      </p>
                      {item.credentialUrl ? (
                        <a
                          href={item.credentialUrl}
                          className="link-underline mt-3 inline-block text-sm"
                          target="_blank"
                          rel="noreferrer noopener"
                        >
                          View credential
                        </a>
                      ) : (
                        <p className="mt-3 text-sm text-muted" data-placeholder="credential-url">
                          Credential link: not linked yet.
                        </p>
                      )}
                    </li>
                  ))}
                </ul>
              </div>

              <div id="milestones" className="scroll-target">
                <SectionLabel index="07">Milestones</SectionLabel>
                <h2 className="mt-5 text-4xl tracking-[-0.03em] md:text-5xl">Additional notes on the record.</h2>
                <p className="mt-4 max-w-2xl text-ink-soft">
                  A short record of the path so far, from the diploma to the junior role.
                </p>
                <ol className="mt-10 grid gap-6 sm:grid-cols-2">
                  {achievements.map((item) => (
                    <li key={item.id} className="border border-ink/10 p-6">
                      <p className="font-display text-3xl italic text-oxide">{item.year}</p>
                      <h3 className="mt-3 text-xl tracking-[-0.03em]">{item.title}</h3>
                      <p className="mt-3 text-sm leading-relaxed text-ink-soft">{item.detail}</p>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </div>
        </Container>
      </section>
      <ContactBand />
    </PageFrame>
  );
}
