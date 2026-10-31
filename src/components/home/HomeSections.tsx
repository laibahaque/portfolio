import Link from "next/link";
import { ViewTransition } from "react";
import { ArrowUpRight } from "lucide-react";
import { practices } from "@/data/positioning";
import { skillGroups } from "@/data/skills";
import { experience } from "@/data/experience";
import { achievements } from "@/data/achievements";
import { events } from "@/data/events";
import { getFeaturedProjects } from "@/data/projects";
import { EventPhoto } from "@/components/events/EventPhoto";
import { Container } from "@/components/ui/Container";
import { SectionLabel } from "@/components/ui/Container";
import { SkillMarks } from "@/components/skills/SkillMarks";
import { ProjectCover } from "@/components/work/ProjectCover";
import { InteractiveSurface } from "@/components/work/InteractiveSurface";

export function Practices() {
  return (
    <section className="pb-8 md:pb-12" aria-labelledby="practices-heading">
      <Container>
        <div data-reveal>
          <SectionLabel index="02">What I do</SectionLabel>
          <h2 id="practices-heading" className="mt-5 max-w-2xl text-4xl leading-[1.05] tracking-[-0.03em] md:text-5xl">
            Games in the browser. Systems that keep a record.
          </h2>
        </div>
        <ol data-reveal-group className="mt-12 divide-y divide-ink/10 border-y border-ink/10">
          {practices.map((item) => (
            <li key={item.index} data-reveal-item className="grid gap-4 py-8 md:grid-cols-12 md:gap-8 md:py-10">
              <p className="font-display text-2xl italic text-oxide md:col-span-2">{item.index}</p>
              <h3 className="text-3xl tracking-[-0.03em] md:col-span-3">{item.title}</h3>
              <p className="text-ink-soft md:col-span-7">{item.text}</p>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}

export function Expertise() {
  const groups = skillGroups.filter((group) => group.id !== "tools");

  return (
    <section className="py-20 md:py-28" aria-labelledby="expertise-heading">
      <Container>
        <div data-reveal className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <SectionLabel index="03">Expertise</SectionLabel>
            <h2 id="expertise-heading" className="mt-5 max-w-xl text-4xl leading-[1.05] tracking-[-0.03em] md:text-5xl">
              The tools, with their marks.
            </h2>
          </div>
          <Link href="/about#expertise" className="link-underline text-sm">
            Full list on About
          </Link>
        </div>
        <div data-reveal-group className="mt-12 grid gap-px bg-ink/10 sm:grid-cols-2">
          {groups.map((group, index) => (
            <article
              key={group.id}
              data-reveal-item
              className={`bg-bone p-6 sm:p-8${index === groups.length - 1 && groups.length % 2 === 1 ? " sm:col-span-2" : ""}`}
            >
              <h3 className="text-2xl tracking-[-0.03em]">{group.title}</h3>
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

export function FeaturedWork() {
  const featured = getFeaturedProjects();

  return (
    <section className="chapter-dark py-20 md:py-28" aria-labelledby="work-heading">
      <Container>
        <div data-reveal className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p className="text-[0.72rem] font-medium uppercase tracking-[0.22em] text-oxide-soft">04 · Selected projects</p>
            <h2 id="work-heading" className="mt-5 max-w-2xl text-4xl leading-[1.05] tracking-[-0.03em] text-bone md:text-6xl">
              Academic systems, described as they were built.
            </h2>
          </div>
          <Link href="/work" className="btn btn-on-dark shrink-0">
            All projects
            <ArrowUpRight aria-hidden="true" size={15} />
          </Link>
        </div>

        <ol className="mt-14">
          {featured.map((project, index) => (
            <li key={project.slug} data-reveal className="border-t border-bone/15 py-10 md:py-14">
              <InteractiveSurface>
                <Link href={`/work/${project.slug}`} className="group grid items-center gap-8 md:grid-cols-12 md:gap-12">
                  <div className="md:col-span-5" data-parallax>
                    <ViewTransition name={`cover-${project.slug}`}>
                      <ProjectCover variant={project.cover} tone="dark" />
                    </ViewTransition>
                  </div>
                  <div className="md:col-span-7">
                    <p className="text-[0.72rem] font-medium uppercase tracking-[0.18em] text-mist">
                      <span className="text-oxide-soft">{String(index + 1).padStart(2, "0")}</span>
                      <span aria-hidden="true"> · </span>
                      {project.category}
                    </p>
                    <h3 className="mt-4 text-4xl leading-[0.95] tracking-[-0.03em] text-bone transition-colors duration-300 group-hover:text-oxide-soft md:text-5xl">
                      {project.title}
                    </h3>
                    <p className="mt-5 max-w-xl text-mist">{project.summary}</p>
                    <p className="mt-6 text-sm text-bone/85">{project.stack.join(" · ")}</p>
                    <p className="link-underline mt-6 inline-flex items-center gap-2 text-[0.75rem] font-semibold uppercase tracking-[0.16em] text-bone">
                      Read the project
                      <ArrowUpRight aria-hidden="true" size={15} />
                    </p>
                  </div>
                </Link>
              </InteractiveSurface>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}

export function ExperienceSnapshot() {
  return (
    <section className="py-20 md:py-28" aria-labelledby="experience-heading">
      <Container>
        <div data-reveal className="grid gap-8 md:grid-cols-12">
          <div className="md:col-span-4">
            <SectionLabel index="05">Experience</SectionLabel>
            <h2 id="experience-heading" className="mt-5 text-4xl leading-[1.05] tracking-[-0.03em] md:text-5xl">
              Four chapters so far.
            </h2>
            <Link href="/about#career" className="link-underline mt-6 inline-block text-sm">
              Read the career in full
            </Link>
          </div>
          <ol data-reveal-group className="md:col-span-8">
            {experience.map((job) => (
              <li key={job.id} data-reveal-item className="grid gap-2 border-t border-ink/10 py-6 sm:grid-cols-12 sm:gap-6">
                <p className="text-sm text-muted sm:col-span-4">
                  {job.start} — {job.end}
                </p>
                <div className="sm:col-span-8">
                  <h3 className="text-2xl tracking-[-0.03em]">{job.role}</h3>
                  <p className="mt-1 text-sm text-ink-soft">
                    {job.company}
                    <span aria-hidden="true"> · </span>
                    {job.location}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </Container>
    </section>
  );
}

export function Milestones() {
  return (
    <section className="pb-20 md:pb-28" aria-labelledby="milestones-heading">
      <Container>
        <div data-reveal>
          <SectionLabel index="06">Milestones</SectionLabel>
          <h2 id="milestones-heading" className="mt-5 max-w-xl text-4xl leading-[1.05] tracking-[-0.03em] md:text-5xl">
            Steps that are already true.
          </h2>
        </div>
        <ol data-reveal-group className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {achievements.map((item) => (
            <li key={item.id} data-reveal-item className="border-t border-ink/15 pt-5">
              <p className="font-display text-3xl italic text-oxide">{item.year}</p>
              <h3 className="mt-3 text-xl tracking-[-0.03em]">{item.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-ink-soft">{item.detail}</p>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}

export function EventsBand() {
  return (
    <section className="pb-20 md:pb-28" aria-labelledby="events-heading">
      <Container>
        <div data-reveal className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <SectionLabel index="07">Events</SectionLabel>
            <h2 id="events-heading" className="mt-5 max-w-xl text-4xl leading-[1.05] tracking-[-0.03em] md:text-5xl">
              Hackathons, in the year they happened.
            </h2>
          </div>
          <Link href="/events" className="link-underline text-sm">
            Event notes
          </Link>
        </div>
        <ol data-reveal-group className="mt-12 grid gap-8 lg:grid-cols-2">
          {events.map((event, index) => (
            <li key={event.id} data-reveal-item data-animate={index % 2 === 0 ? "slide-left" : "slide-right"}>
              <Link href={`/events#${event.id}`} className="group block">
                <EventPhoto src={event.image} alt={event.imageAlt} />
                <p className="mt-5 text-[0.72rem] font-medium uppercase tracking-[0.18em] text-muted">
                  <span className="text-oxide">{event.year}</span>
                  <span aria-hidden="true"> · </span>
                  {event.program}
                </p>
                <h3 className="mt-3 text-3xl tracking-[-0.03em] transition-colors duration-300 group-hover:text-oxide">
                  {event.name}
                </h3>
                <p className="mt-3 text-ink-soft">{event.projectName}</p>
              </Link>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
