import { experience } from "@/data/experience";

export function ExperienceTimeline() {
  return (
    <ol className="border-l border-ink/15">
      {experience.map((job) => (
        <li key={job.id} className="relative pb-12 pl-8 last:pb-0">
          <span aria-hidden="true" className="absolute top-2 -left-[5px] size-[9px] rounded-full bg-oxide" />
          <p className="text-sm text-muted">
            {job.start} – {job.end}
            <span aria-hidden="true"> · </span>
            {job.location}
          </p>
          <h2 className="mt-2 text-3xl tracking-[-0.03em]">{job.role}</h2>
          <p className="mt-1 text-ink-soft">{job.company}</p>
          <p className="mt-4 max-w-2xl text-ink-soft">{job.summary}</p>
        </li>
      ))}
    </ol>
  );
}
