/**
 * Milestones and additional achievements.
 * Only list things that actually happened. Do not invent awards or numbers.
 *
 * PLACEHOLDER: copy this object to add an achievement.
 * {
 *   id: "example",
 *   year: "2027",
 *   title: "Short title",
 *   detail: "What happened, in one or two factual sentences.",
 * }
 */

export type Achievement = {
  id: string;
  year: string;
  title: string;
  detail: string;
};

export const achievements: Achievement[] = [
  {
    id: "junior-role",
    year: "2026",
    title: "Junior game developer",
    detail:
      "Moved from web game developer intern to junior game developer at Techversol in June 2026.",
  },
  {
    id: "bscs",
    year: "2024",
    title: "Computer science degree",
    detail: "Began a BS in Computer Science at the University of Karachi.",
  },
  {
    id: "bronze-diploma",
    year: "2023",
    title: "Bronze medal",
    detail:
      "Received a bronze medal for the Diploma of Associate Engineering in Computer Information Technology at Aligarh Institute of Technology.",
  },
  {
    id: "dae",
    year: "2023",
    title: "Diploma in CIT",
    detail:
      "Completed a Diploma of Associate Engineering in Computer Information Technology at Aligarh Institute of Technology.",
  },
  {
    id: "smit",
    year: "2023",
    title: "JavaScript coursework",
    detail: "Finished the JavaScript Crash Course at Saylani Mass IT Training.",
  },
];
