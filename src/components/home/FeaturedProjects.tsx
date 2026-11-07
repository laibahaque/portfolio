import Link from "next/link";
import { ViewTransition } from "react";
import { ArrowUpRight } from "lucide-react";
import { getFeaturedProjects } from "@/data/projects";
import { Container } from "@/components/ui/Container";
import { BadgeList } from "@/components/ui/Badge";
import { InteractiveSurface } from "@/components/work/InteractiveSurface";
import { ProjectCover } from "@/components/work/ProjectCover";

export function FeaturedProjects() {
  const featured = getFeaturedProjects();

  return (
    <section id="projects" className="chapter-dark scroll-target py-20 md:py-28" aria-labelledby="featured-projects-heading">
      <Container>
        <div data-reveal className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p className="text-[0.72rem] font-medium uppercase tracking-[0.22em] text-oxide-soft">04 · Featured projects</p>
            <h2 id="featured-projects-heading" className="mt-5 max-w-2xl text-4xl leading-[1.05] tracking-[-0.03em] text-bone md:text-6xl">
              Academic systems, described as they were built.
            </h2>
          </div>
          <Link href="/projects" className="btn btn-on-dark shrink-0">
            View projects
            <ArrowUpRight aria-hidden="true" size={15} />
          </Link>
        </div>

        <ol className="mt-14">
          {featured.map((project, index) => (
            <li key={project.slug} data-reveal className="border-t border-bone/15 py-10 md:py-14">
              <InteractiveSurface>
                <article className="group grid items-center gap-8 md:grid-cols-12 md:gap-12">
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
                      <Link href={`/projects/${project.slug}`}>{project.title}</Link>
                    </h3>
                    <p className="mt-5 max-w-xl text-mist">{project.summary}</p>
                    <BadgeList items={project.stack} className="mt-6 [&_span]:border-bone/25 [&_span]:text-bone/90" />
                    <div className="mt-6 flex flex-wrap gap-3">
                      {project.liveUrl ? (
                        <a href={project.liveUrl} className="btn btn-on-dark" target="_blank" rel="noreferrer noopener">
                          Live demo
                        </a>
                      ) : (
                        <span className="text-sm text-mist">Live demo not linked yet.</span>
                      )}
                      {project.repoUrl ? (
                        <a href={project.repoUrl} className="btn btn-on-dark" target="_blank" rel="noreferrer noopener">
                          GitHub
                        </a>
                      ) : (
                        <span className="text-sm text-mist">Repository not linked yet.</span>
                      )}
                      <Link
                        href={`/projects/${project.slug}`}
                        className="link-underline inline-flex items-center gap-2 text-[0.75rem] font-semibold uppercase tracking-[0.16em] text-bone"
                      >
                        View case study
                        <ArrowUpRight aria-hidden="true" size={15} />
                      </Link>
                    </div>
                  </div>
                </article>
              </InteractiveSurface>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
