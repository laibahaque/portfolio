import type { Metadata } from "next";
import { ContactBand } from "@/components/contact/ContactBand";
import { Hero } from "@/components/home/Hero";
import { ExperienceSnapshot, Expertise, EventsBand, FeaturedWork, Milestones, Practices } from "@/components/home/HomeSections";
import { PageFrame } from "@/components/layout/PageFrame";
import { site } from "@/data/site";

export const metadata: Metadata = {
  description: site.description,
  alternates: { canonical: "/" },
  openGraph: { url: "/" },
};

export default function HomePage() {
  return (
    <PageFrame>
      <Hero />
      <Practices />
      <Expertise />
      <FeaturedWork />
      <ExperienceSnapshot />
      <Milestones />
      <EventsBand />
      <ContactBand />
    </PageFrame>
  );
}
