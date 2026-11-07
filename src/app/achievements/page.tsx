import type { Metadata } from "next";
import { AchievementGrid } from "@/components/achievements/AchievementGrid";
import { ContactCTA } from "@/components/home/ContactCTA";
import { PageContainer } from "@/components/layout/PageContainer";
import { Container } from "@/components/ui/Container";
import { pageMeta } from "@/lib/metadata";

export const metadata: Metadata = pageMeta({
  title: "Achievements",
  description:
    "Milestones for Laiba Haque, from a bronze medal on her diploma to her junior game developer role and computer science degree.",
  path: "/achievements",
});

export default function AchievementsPage() {
  return (
    <PageContainer>
      <section className="pb-12 pt-28 md:pt-36">
        <Container>
          <p className="text-[0.72rem] font-medium uppercase tracking-[0.22em] text-muted">Achievements</p>
          <h1 className="mt-6 max-w-4xl text-[clamp(2.6rem,5vw,4.8rem)] leading-[0.95] tracking-[-0.04em]">
            Steps that are already true.
          </h1>
        </Container>
      </section>
      <section className="pb-20 md:pb-28">
        <Container>
          <AchievementGrid />
        </Container>
      </section>
      <ContactCTA />
    </PageContainer>
  );
}
