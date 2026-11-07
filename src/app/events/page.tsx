import type { Metadata } from "next";
import Link from "next/link";
import { ContactCTA } from "@/components/home/ContactCTA";
import { EventPhoto } from "@/components/events/EventPhoto";
import { PageFrame } from "@/components/layout/PageFrame";
import { Container } from "@/components/ui/Container";
import { events } from "@/data/events";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "Events",
  description:
    "Hackathons Laiba Haque attended in 2026: Women Tech Quest with 10Pearls, and the Alibaba Cloud AI Hackathon at NASTP Silicon, where the team presented MINERVA.",
  path: "/events",
});

export default function EventsPage() {
  return (
    <PageFrame>
      <section className="pb-8 pt-28 md:pt-36">
        <Container>
          <p className="text-[0.72rem] font-medium uppercase tracking-[0.22em] text-muted">
            <span className="text-oxide">Events</span>
            <span aria-hidden="true"> · </span>
            2026
          </p>
          <h1 className="mt-6 max-w-4xl text-[clamp(2.8rem,6vw,5.6rem)] leading-[0.95] tracking-[-0.04em] text-balance">
            Two rooms, both about AI.
          </h1>
          <p className="mt-8 max-w-2xl text-lg text-ink-soft">
            These are hackathons I attended, not a job title. I have certificates for both. The credential links are not
            on this site yet. Photographs will be added in the frames below.
          </p>
        </Container>
      </section>

      <section className="pb-20 md:pb-28">
        <Container>
          <ol data-reveal-group className="space-y-20">
            {events.map((event, index) => (
              <li
                key={event.id}
                id={event.id}
                data-reveal-item
                data-animate={index % 2 === 0 ? "slide-left" : "slide-right"}
                className="scroll-target grid items-center gap-10 border-t border-ink/10 pt-10 lg:grid-cols-12 lg:gap-14"
              >
                <div className="lg:col-span-5">
                  <EventPhoto src={event.image} alt={event.imageAlt} />
                </div>
                <div className="lg:col-span-7">
                  <p className="text-[0.72rem] font-medium uppercase tracking-[0.18em] text-muted">
                    <span className="text-oxide">{event.year}</span>
                    <span aria-hidden="true"> · </span>
                    {event.program}
                  </p>
                  <h2 className="mt-4 text-4xl leading-[1.02] tracking-[-0.03em] md:text-5xl">{event.name}</h2>
                  <p className="mt-3 text-sm text-ink-soft">
                    {event.host}
                    {event.place ? (
                      <>
                        <span aria-hidden="true"> · </span>
                        {event.place}
                      </>
                    ) : null}
                  </p>
                  <p className="mt-6 max-w-xl text-ink-soft">{event.summary}</p>
                  <h3 className="mt-8 text-2xl tracking-[-0.03em]">{event.projectName}</h3>
                  <p className="mt-3 max-w-xl text-ink-soft">{event.projectSummary}</p>
                  <p className="mt-6 text-sm text-ink">
                    {event.together} {event.alongside.join(", ")}.
                  </p>
                  {event.thanks.length ? (
                    <p className="mt-2 text-sm text-muted">Thanks to {event.thanks.join(", ")}.</p>
                  ) : null}
                </div>
              </li>
            ))}
          </ol>
          <p className="mt-16 text-sm text-muted">
            Academic software is on the{" "}
            <Link href="/projects" className="link-underline text-ink">
              projects page
            </Link>
            .
          </p>
        </Container>
      </section>
      <ContactCTA />
    </PageFrame>
  );
}
