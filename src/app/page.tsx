import type { Metadata } from "next";
import { AboutPreview } from "@/components/home/AboutPreview";
import { AchievementsPreview } from "@/components/home/AchievementsPreview";
import { ContactBand } from "@/components/contact/ContactBand";
import { EducationPreview } from "@/components/home/EducationPreview";
import { ExperiencePreview } from "@/components/home/ExperiencePreview";
import { FeaturedProjects } from "@/components/home/FeaturedProjects";
import { Hero } from "@/components/home/Hero";
import { SkillsPreview } from "@/components/home/SkillsPreview";
import { Stats } from "@/components/home/Stats";
import { TechStrip } from "@/components/home/TechStrip";
import { PageContainer } from "@/components/layout/PageContainer";
import { site } from "@/data/site";

export const metadata: Metadata = {
  description: site.description,
  alternates: { canonical: "/" },
  openGraph: { url: "/" },
};

export default function HomePage() {
  return (
    <PageContainer>
      <Hero />
      <TechStrip />
      <AboutPreview />
      <Stats />
      <FeaturedProjects />
      <SkillsPreview />
      <ExperiencePreview />
      <EducationPreview />
      <AchievementsPreview />
      <ContactBand />
    </PageContainer>
  );
}
