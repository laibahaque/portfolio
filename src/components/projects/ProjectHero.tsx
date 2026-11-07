import { Container } from "@/components/ui/Container";
import type { Project } from "@/data/projects";

export function ProjectHero({ project }: { project: Project }) {
  return (
    <header className="chapter-dark pb-16 pt-28 md:pb-20 md:pt-36">
      <Container>
        <p className="text-[0.72rem] font-medium uppercase tracking-[0.18em] text-oxide-soft">
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
  );
}
