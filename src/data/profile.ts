/**
 * Profile narrative for the home page and about previews.
 * Facts only — aligned with the CV and existing data files.
 */

import { certifications } from "@/data/certifications";
import { education } from "@/data/education";
import { experience } from "@/data/experience";
import { projects } from "@/data/projects";
import { skillGroups } from "@/data/skills";
import { site } from "@/data/site";

export const aboutMe = {
  who: `${site.fullName} is a ${site.role.toLowerCase()} at ${site.company} in ${site.location}.`,
  csBackground:
    "I study computer science at the University of Karachi. Before the degree I completed a diploma in computer information technology with a bronze medal.",
  professionalExperience:
    "About a year of professional work so far: front-end and web development at Ajd Marketing, then web games at Techversol from intern to junior developer in 2026.",
  lovesBuilding:
    "Web games in the browser, full-stack systems that keep a record, and AI agents from public hackathons.",
  careerGoals:
    "Grow as a game developer while keeping the engineering side honest — playable interfaces, clear data, and systems people can trust.",
  personalTouch:
    "I care about the moment someone understands the software without being told. In a game that is play; in a form or banking screen it is trust.",
} as const;

const uniqueTechnologies = new Set(skillGroups.flatMap((group) => group.items));

const professionalEmployers = new Set(experience.map((job) => job.company));

export const quickStats = [
  {
    id: "experience",
    label: "Years of professional experience",
    value: "1+",
    detail: "From my first industry internship through my current junior role.",
  },
  {
    id: "projects",
    label: "Projects completed",
    value: String(projects.length),
    detail: "Academic systems across web, mobile, desktop, and hardware.",
  },
  {
    id: "technologies",
    label: "Technologies worked with",
    value: String(uniqueTechnologies.size),
    detail: "Languages, frameworks, databases, and tools I can discuss in an interview.",
  },
  {
    id: "collaborations",
    label: "Professional collaborations",
    value: String(professionalEmployers.size),
    detail: "Employers I have worked with in industry roles.",
  },
] as const;

export const educationHighlights = {
  degree: education.find((item) => item.id === "bscs"),
  certifications: certifications.slice(0, 3),
};
