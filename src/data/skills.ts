/**
 * Technical expertise, grouped for scanning.
 * Keep this aligned with the CV. Add a skill when you can discuss it in an interview.
 */

export type SkillGroup = {
  id: string;
  title: string;
  summary: string;
  items: readonly string[];
};

export const skillGroups: SkillGroup[] = [
  {
    id: "languages",
    title: "Languages",
    summary: "What I write in, from the browser to coursework.",
    items: ["JavaScript", "HTML5", "CSS3", "Java", "Python", "C++"],
  },
  {
    id: "web",
    title: "Web and games",
    summary: "Browser interfaces, Three.js, and the MERN stack.",
    items: ["Three.js", "React", "Node.js", "Express", "Tailwind CSS", "Bootstrap"],
  },
  {
    id: "data",
    title: "Data",
    summary: "Stores I have used in projects and in database coursework.",
    items: ["PostgreSQL", "MySQL", "SQL", "MongoDB", "Firebase"],
  },
  {
    id: "ai",
    title: "AI",
    summary: "Agent-style tools from hackathons, separate from the game work at Techversol.",
    items: ["AI agents"],
  },
  {
    id: "foundations",
    title: "Foundations",
    summary: "The coursework I still use when a problem is really about structure.",
    items: ["Object-oriented programming", "Database systems", "Computer networking"],
  },
  {
    id: "tools",
    title: "Tools",
    summary: "Editors and design software from the daily set.",
    items: [
      "Visual Studio Code",
      "Cursor",
      "Photoshop",
      "Illustrator",
      "Eclipse",
      "NetBeans",
      "Adobe Dreamweaver",
      "Dev-C++",
    ],
  },
];
