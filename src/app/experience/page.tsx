import type { Metadata } from "next";
import { ContactCTA } from "@/components/home/ContactCTA";
import { ExperienceTimeline } from "@/components/experience/ExperienceTimeline";
import { PageContainer } from "@/components/layout/PageContainer";
import { Container } from "@/components/ui/Container";
import { pageMeta } from "@/lib/metadata";

export const metadata: Metadata = pageMeta({
  title: "Experience",
  description:
    "Career timeline for Laiba Haque: junior game developer at Techversol, web game intern, and earlier web development roles at Ajd Marketing.",
  path: "/experience",
});

export default function ExperiencePage() {
  return (
    <PageContainer>
      <section className="pb-12 pt-28 md:pt-36">
        <Container>
          <p className="text-[0.72rem] font-medium uppercase tracking-[0.22em] text-muted">Experience</p>
          <h1 className="mt-6 max-w-4xl text-[clamp(2.6rem,5vw,4.8rem)] leading-[0.95] tracking-[-0.04em]">
            Four chapters so far.
          </h1>
          <p className="mt-6 max-w-2xl text-ink-soft">
            Responsibilities and dates come from my CV. I do not add metrics I cannot stand behind.
          </p>
        </Container>
      </section>
      <section className="pb-20 md:pb-28">
        <Container>
          <ExperienceTimeline />
        </Container>
      </section>
      <ContactCTA />
    </PageContainer>
  );
}
