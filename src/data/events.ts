/**
 * Public events, written from Laiba's own accounts.
 * Do not add a win, a ranking, or a date that was not stated.
 *
 * PLACEHOLDER: photographs are not in the repo yet.
 * Save a file under public/events/ and set `image` to that path.
 * Example: image: "/events/women-tech-quest.jpg"
 * Leave image null until the real photograph is there. Do not use a stock photo.
 */

export type AttendedEvent = {
  id: string;
  year: string;
  name: string;
  program: string;
  host: string;
  place: string;
  summary: string;
  projectName: string;
  projectSummary: string;
  alongside: readonly string[];
  together: string;
  thanks: readonly string[];
  /** PLACEHOLDER: public image path, or null. */
  image: string | null;
  imageAlt: string;
};

export const events: AttendedEvent[] = [
  {
    id: "women-tech-quest",
    year: "2026",
    name: "Women Tech Quest",
    program: "Build with AI Hackathon",
    host: "10Pearls",
    place: "",
    summary:
      "I took part in the Build with AI Hackathon at Women Tech Quest 2026, hosted by 10Pearls. I have a certificate from the event. The public link is not on this site yet.",
    projectName: "Utility Bill Decoder",
    projectSummary:
      "The challenge was an AI-powered decoder that makes a complex electricity bill easier to read, by separating charges, taxes, and other parts of the bill into clearer information. This is one public example of my work with AI agents.",
    alongside: ["Afsah Faheem", "Yumna Nasir", "Shaila Wazeer"],
    together: "Shared the day with",
    thanks: [],
    image: null,
    imageAlt: "Photograph from Women Tech Quest 2026",
  },
  {
    id: "alibaba-ai-hackathon",
    year: "2026",
    name: "Alibaba Cloud AI Hackathon Pakistan",
    program: "Karachi Regional Technical Evaluation",
    host: "Alibaba Cloud",
    place: "NASTP Silicon, Karachi",
    summary:
      "I represented our team at the Karachi regional technical evaluation at NASTP Silicon. MINERVA was among the projects selected to reach that stage. I have a certificate from the hackathon. The public link is not on this site yet. The post I wrote did not say whether MINERVA reached the final.",
    projectName: "MINERVA",
    projectSummary:
      "MINERVA is an AI-powered employability and career-guidance platform for computer science students. It is meant to help a student read their skills, look at career paths, and prepare for professional work. I represented the project. It is the other public example of my work with AI agents.",
    alongside: ["Abdur Rafay Ali Khan", "Hanzala", "Huzaifa"],
    together: "Team",
    thanks: ["Alibaba Cloud", "Alkhidmat Foundation Pakistan", "Bano Qabil Karachi"],
    image: null,
    imageAlt: "Photograph from the Alibaba Cloud AI Hackathon at NASTP Silicon",
  },
];
