import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import { ContactCTA } from "@/components/home/ContactCTA";
import { PageContainer } from "@/components/layout/PageContainer";
import { CaseStudySection } from "@/components/projects/CaseStudySection";
import { ProjectGallery } from "@/components/projects/ProjectGallery";
import { ProjectHero } from "@/components/projects/ProjectHero";
import { Container } from "@/components/ui/Container";
import { BadgeList } from "@/components/ui/Badge";
import { getAdjacentProjects, getProject, projects, type Project } from "@/data/projects";
import { site } from "@/data/site";
import { jsonLdScript } from "@/lib/jsonld";
import { pageMeta } from "@/lib/metadata";

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
    path: `/projects/${project.slug}`,
  });
}

export default async function ProjectCaseStudyPage({ params }: ProjectPageProps) {
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
          { "@type": "ListItem", position: 2, name: "Projects", item: `${site.url}/projects` },
          {
            "@type": "ListItem",
            position: 3,
            name: project.title,
            item: `${site.url}/projects/${project.slug}`,
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
        url: `${site.url}/projects/${project.slug}`,
      },
    ],
  };

  return (
    <PageContainer>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdScript(structured) }} />
      <article>
        <div className="chapter-dark">
          <Container className="pb-4 pt-28 md:pt-36">
            <Link href="/projects" className="inline-flex items-center gap-2 text-sm text-mist hover:text-bone">
              <ArrowLeft aria-hidden="true" size={16} />
              All projects
            </Link>
          </Container>
          <ProjectHero project={project} />
        </div>

        <div className="bg-bone py-14 md:py-20">
          <Container>
            <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
              <div className="space-y-12 lg:col-span-7">
                <ProjectGallery variant={project.cover} caption={project.officialName} />
                <CaseStudySection index="01" title="Project overview">
                  <p>{project.summary}</p>
                </CaseStudySection>
                <CaseStudySection index="02" title="Problem statement">
                  <p>{project.problem}</p>
                </CaseStudySection>
                <CaseStudySection index="03" title="Solution">
                  <p>{project.solution}</p>
                </CaseStudySection>
                <CaseStudySection index="04" title="Key features">
                  <p>{project.solution}</p>
                </CaseStudySection>
                <CaseStudySection index="05" title="Challenges faced">
                  <p>{project.problem}</p>
                </CaseStudySection>
                <CaseStudySection index="06" title="What I learned">
                  <p>{project.outcome}</p>
                </CaseStudySection>
              </div>

              <aside className="h-fit border border-ink/10 p-6 sm:p-8 lg:sticky lg:top-32 lg:col-span-4 lg:col-start-9">
                <dl className="space-y-6 text-sm">
                  <div>
                    <dt className="text-[0.72rem] font-medium uppercase tracking-[0.18em] text-muted">My role</dt>
                    <dd className="mt-2 text-ink">{project.role}</dd>
                  </div>
                  <div>
                    <dt className="text-[0.72rem] font-medium uppercase tracking-[0.18em] text-muted">Technologies used</dt>
                    <dd className="mt-3">
                      <BadgeList items={project.stack} />
                    </dd>
                  </div>
                  <div>
                    <dt className="text-[0.72rem] font-medium uppercase tracking-[0.18em] text-muted">Outcome</dt>
                    <dd className="mt-2 text-ink-soft">{project.outcome}</dd>
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
      <ContactCTA />
    </PageContainer>
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
      href={`/projects/${project.slug}`}
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
