import Link from "next/link";
import type { AttendedEvent } from "@/data/events";
import { EventPhoto } from "@/components/events/EventPhoto";

export function EventCard({ event }: { event: AttendedEvent }) {
  return (
    <article>
      <Link href={`/events#${event.id}`} className="group block">
        <EventPhoto src={event.image} alt={event.imageAlt} />
        <p className="mt-5 text-[0.72rem] font-medium uppercase tracking-[0.18em] text-muted">
          <span className="text-oxide">{event.year}</span>
          <span aria-hidden="true"> · </span>
          {event.program}
        </p>
        <h3 className="mt-3 text-3xl tracking-[-0.03em] transition-colors duration-300 group-hover:text-oxide">{event.name}</h3>
        <p className="mt-3 text-ink-soft">{event.projectName}</p>
      </Link>
    </article>
  );
}
