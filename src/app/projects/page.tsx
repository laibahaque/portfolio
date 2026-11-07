import type { Metadata } from "next";
import { ContactCTA } from "@/components/home/ContactCTA";
import { PageContainer } from "@/components/layout/PageContainer";
import { ProjectGrid } from "@/components/projects/ProjectGrid";
import { Container } from "@/components/ui/Container";
import { projects } from "@/data/projects";
import { pageMeta } from "@/lib/metadata";

export const metadata: Metadata = pageMeta({
  title: "Projects",
  description:
    "Selected academic projects by Laiba Haque: a student request system, banking applications, smart transport reservation, and Arduino home automation.",
  path: "/projects",
});

export default function ProjectsPage() {
  return (
    <PageContainer>
      <section className="chapter-dark pb-20 pt-28 md:pb-28 md:pt-36">
        <Container>
          <p className="text-[0.72rem] font-medium uppercase tracking-[0.22em] text-oxide-soft">Projects</p>
          <h1 className="mt-6 max-w-4xl text-[clamp(2.8rem,6vw,5.8rem)] leading-[0.95] tracking-[-0.04em] text-balance text-bone">
            Five systems. No invented results.
          </h1>
          <p className="mt-8 max-w-2xl text-pretty text-lg text-mist">
            The games I am making at Techversol are not public yet. What follows is academic work across the web, a
            phone, a desktop, and a small piece of hardware. Live demos and repositories show up here once a real link
            is added.
          </p>
        </Container>
      </section>
      <section className="bg-bone py-16 md:py-24">
        <Container>
          <ProjectGrid projects={projects} />
        </Container>
      </section>
      <ContactCTA />
    </PageContainer>
  );
}
