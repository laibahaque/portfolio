import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ViewTransition } from "react";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import { ContactBand } from "@/components/contact/ContactBand";
import { PageFrame } from "@/components/layout/PageFrame";
import { Container } from "@/components/ui/Container";
import { ProjectCover } from "@/components/work/ProjectCover";
import { getAdjacentProjects, getProject, projects, type Project } from "@/data/projects";
import { site } from "@/data/site";
import { jsonLdScript } from "@/lib/jsonld";
import { pageMeta } from "@/lib/seo";

type ProjectPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return { title: "Project" };
  return pageMeta({
    title: project.title,
    description: project.summary,
    path: `/work/${project.slug}`,
  });
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const { previous, next } = getAdjacentProjects(project.slug);
  const structured = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: site.url },
          { "@type": "ListItem", position: 2, name: "Work", item: `${site.url}/work` },
          {
            "@type": "ListItem",
            position: 3,
            name: project.title,
            item: `${site.url}/work/${project.slug}`,
          },
        ],
      },
      {
        "@type": "CreativeWork",
        name: project.officialName,
        headline: project.title,
        description: project.summary,
        author: { "@id": `${site.url}/#person` },
        keywords: project.stack.join(", "),
        genre: project.category,
        url: `${site.url}/work/${project.slug}`,
      },
    ],
  };

  return (
    <PageFrame>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdScript(structured) }} />
      <article>
        <header className="chapter-dark pb-16 pt-28 md:pb-20 md:pt-36">
          <Container>
            <Link href="/work" className="inline-flex items-center gap-2 text-sm text-mist hover:text-bone">
              <ArrowLeft aria-hidden="true" size={16} />
              All projects
            </Link>
            <p className="mt-8 text-[0.72rem] font-medium uppercase tracking-[0.18em] text-oxide-soft">
              {project.category}
              <span aria-hidden="true"> · </span>
              {project.context}
            </p>
            <h1 className="mt-4 max-w-4xl text-[clamp(2.7rem,6vw,5.4rem)] leading-[0.95] tracking-[-0.04em] text-balance text-bone">
              {project.title}
            </h1>
            <p className="mt-6 max-w-2xl text-lg text-mist">{project.summary}</p>
          </Container>
        </header>

        <div className="bg-bone py-14 md:py-20">
          <Container>
            <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
              <div className="lg:col-span-7">
                <ViewTransition name={`cover-${project.slug}`}>
                  <ProjectCover variant={project.cover} tone="light" />
                </ViewTransition>
                <p className="mt-8 text-sm text-muted">{project.officialName}</p>
                <div className="mt-12 space-y-12">
                  <Narrative index="01" title="Problem" text={project.problem} />
                  <Narrative index="02" title="Solution" text={project.solution} />
                  <Narrative index="03" title="Outcome" text={project.outcome} />
                </div>
              </div>

              <aside className="h-fit border border-ink/10 p-6 sm:p-8 lg:sticky lg:top-32 lg:col-span-4 lg:col-start-9">
                <dl className="space-y-6 text-sm">
                  <div>
                    <dt className="text-[0.72rem] font-medium uppercase tracking-[0.18em] text-muted">Role</dt>
                    <dd className="mt-2 text-ink">{project.role}</dd>
                  </div>
                  <div>
                    <dt className="text-[0.72rem] font-medium uppercase tracking-[0.18em] text-muted">Stack</dt>
                    <dd className="mt-2 text-ink">{project.stack.join(" · ")}</dd>
                  </div>
                  <ProjectLink label="Live demo" href={project.liveUrl} placeholder="live-url" />
                  <ProjectLink label="GitHub" href={project.repoUrl} placeholder="repo-url" />
                </dl>
              </aside>
            </div>

            <nav aria-label="More projects" className="mt-16 grid gap-4 border-t border-ink/10 pt-8 sm:grid-cols-2">
              {previous ? <Neighbor project={previous} direction="previous" /> : <span />}
              {next ? <Neighbor project={next} direction="next" /> : <span />}
            </nav>
          </Container>
        </div>
      </article>
      <ContactBand />
    </PageFrame>
  );
}

function Narrative({ index, title, text }: { index: string; title: string; text: string }) {
  return (
    <section>
      <p className="font-display text-2xl italic text-oxide">{index}</p>
      <h2 className="mt-2 text-3xl tracking-[-0.03em]">{title}</h2>
      <p className="mt-4 max-w-2xl text-ink-soft">{text}</p>
    </section>
  );
}

function ProjectLink({
  label,
  href,
  placeholder,
}: {
  label: string;
  href: string | null;
  placeholder: string;
}) {
  return (
    <div>
      <dt className="text-[0.72rem] font-medium uppercase tracking-[0.18em] text-muted">{label}</dt>
      <dd className="mt-2">
        {href ? (
          <a href={href} className="btn btn-primary" target="_blank" rel="noreferrer noopener">
            Open
            <ArrowUpRight aria-hidden="true" size={15} />
          </a>
        ) : (
          <span className="text-ink-soft" data-placeholder={placeholder}>
            Not linked yet.
          </span>
        )}
      </dd>
    </div>
  );
}

function Neighbor({ project, direction }: { project: Project; direction: "previous" | "next" }) {
  const forward = direction === "next";
  return (
    <Link
      href={`/work/${project.slug}`}
      className={`group border border-ink/10 p-5 transition-colors hover:border-oxide ${forward ? "sm:text-right" : ""}`}
    >
      <p className="inline-flex items-center gap-2 text-[0.72rem] font-medium uppercase tracking-[0.16em] text-muted">
        {!forward ? <ArrowLeft aria-hidden="true" size={14} /> : null}
        {forward ? "Next" : "Previous"}
        {forward ? <ArrowRight aria-hidden="true" size={14} /> : null}
      </p>
      <p className="mt-2 text-2xl tracking-[-0.03em] transition-colors duration-300 group-hover:text-oxide">{project.title}</p>
    </Link>
  );
}
