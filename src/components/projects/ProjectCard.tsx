import Link from "next/link";
import { ViewTransition } from "react";
import { ArrowUpRight } from "lucide-react";
import type { Project } from "@/data/projects";
import { BadgeList } from "@/components/ui/Badge";
import { ProjectCover } from "@/components/work/ProjectCover";
import { InteractiveSurface } from "@/components/work/InteractiveSurface";
import { Tilt } from "@/components/motion/Tilt";

export function ProjectCard({ project, index }: { project: Project; index: number }) {
  const number = String(index + 1).padStart(2, "0");

  return (
    <article className="h-full" data-animate="scale">
      <Tilt className="h-full" max={9}>
        <InteractiveSurface className="h-full border border-ink/10 bg-paper transition-colors duration-300 hover:border-oxide">
          <div className="group flex h-full flex-col">
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
                <Link href={`/projects/${project.slug}`}>{project.title}</Link>
              </h3>
              <p className="mt-4 flex-1 text-sm leading-relaxed text-ink-soft">{project.summary}</p>
              <BadgeList items={project.stack} className="mt-5" />
              <div className="mt-5 flex flex-wrap gap-2 text-sm text-muted">
                {project.liveUrl ? (
                  <a href={project.liveUrl} className="link-underline" target="_blank" rel="noreferrer noopener">
                    Live demo
                  </a>
                ) : (
                  <span>Live demo pending</span>
                )}
                <span aria-hidden="true">·</span>
                {project.repoUrl ? (
                  <a href={project.repoUrl} className="link-underline" target="_blank" rel="noreferrer noopener">
                    GitHub
                  </a>
                ) : (
                  <span>GitHub pending</span>
                )}
              </div>
              <Link
                href={`/projects/${project.slug}`}
                className="link-underline mt-5 inline-flex items-center gap-2 text-[0.75rem] font-semibold uppercase tracking-[0.16em]"
              >
                View case study
                <ArrowUpRight aria-hidden="true" size={15} />
              </Link>
            </div>
          </div>
        </InteractiveSurface>
      </Tilt>
    </article>
  );
}
