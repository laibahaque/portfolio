/**
 * Career history, newest first.
 * Descriptions stay inside what the role title and dates support.
 * Do not add metrics that are not yours to claim.
 */

export type Experience = {
  id: string;
  role: string;
  company: string;
  start: string;
  end: string;
  location: string;
  summary: string;
};

export const experience: Experience[] = [
  {
    id: "techversol-junior",
    role: "Junior Game Developer",
    company: "Techversol",
    start: "June 2026",
    end: "Present",
    location: "Karachi",
    summary:
      "I develop web games as a junior member of the team, after interning in the same discipline. The work sits where gameplay and the browser meet.",
  },
  {
    id: "techversol-intern",
    role: "Web Game Developer Intern",
    company: "Techversol",
    start: "January 2026",
    end: "June 2026",
    location: "Karachi",
    summary:
      "I interned on web-based game development at Techversol. Those six months led to a junior role on the team.",
  },
  {
    id: "ajd-trainee",
    role: "Web Developer Trainee",
    company: "Ajd Marketing",
    start: "January 2024",
    end: "March 2024",
    location: "Remote",
    summary:
      "A remote traineeship in web development, following my front-end internship at the same company.",
  },
  {
    id: "ajd-intern",
    role: "Front-end Developer Intern",
    company: "Ajd Marketing",
    start: "August 2023",
    end: "November 2023",
    location: "Remote",
    summary:
      "A remote internship in front-end development, working with HTML, CSS, and JavaScript on web interfaces.",
  },
];
