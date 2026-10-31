import Link from "next/link";
import { ViewTransition } from "react";
import { ArrowUpRight } from "lucide-react";
import type { Project } from "@/data/projects";
import { ProjectCover } from "@/components/work/ProjectCover";
import { InteractiveSurface } from "@/components/work/InteractiveSurface";
import { Tilt } from "@/components/motion/Tilt";

export function ProjectCard({ project, index }: { project: Project; index: number }) {
  const number = String(index + 1).padStart(2, "0");

  return (
    <article className="h-full" data-animate="scale">
      <Tilt className="h-full" max={9}>
        <InteractiveSurface className="h-full border border-ink/10 bg-paper transition-colors duration-300 hover:border-oxide">
          <Link href={`/work/${project.slug}`} className="group flex h-full flex-col">
            <ViewTransition name={`cover-${project.slug}`}>
              <ProjectCover variant={project.cover} />
            </ViewTransition>
            <div className="flex flex-1 flex-col p-6 sm:p-7">
              <p className="text-[0.72rem] font-medium uppercase tracking-[0.18em] text-muted">
                <span className="text-oxide">{number}</span>
                <span aria-hidden="true"> · </span>
                {project.category}
                <span aria-hidden="true"> · </span>
                {project.context}
              </p>
              <h3 className="mt-4 text-3xl leading-none tracking-[-0.03em] transition-colors duration-300 group-hover:text-oxide">
                {project.title}
              </h3>
              <p className="mt-4 flex-1 text-sm leading-relaxed text-ink-soft">{project.summary}</p>
              <p className="mt-6 text-sm text-ink">{project.stack.join(" · ")}</p>
              <p className="link-underline mt-5 inline-flex items-center gap-2 text-[0.75rem] font-semibold uppercase tracking-[0.16em]">
                Read the project
                <ArrowUpRight aria-hidden="true" size={15} />
              </p>
            </div>
          </Link>
        </InteractiveSurface>
      </Tilt>
    </article>
  );
}
