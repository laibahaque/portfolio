/**
 * Projects.
 * PLACEHOLDER fields: `liveUrl` and `repoUrl`.
 * Leave either one null until the link is real. The site shows text instead of a dead button.
 *
 * To add a project, copy an object, give it a unique `slug`, and choose a `cover`.
 * Covers: "queue" | "route" | "ledger" | "window" | "dial"
 */

export const projectCategories = ["All", "Web", "Mobile", "Desktop", "Hardware"] as const;

export type ProjectCategory = (typeof projectCategories)[number];
export type WorkCategory = Exclude<ProjectCategory, "All">;
export type CoverVariant = "queue" | "route" | "ledger" | "window" | "dial";

export type Project = {
  slug: string;
  title: string;
  officialName: string;
  category: WorkCategory;
  context: string;
  featured: boolean;
  summary: string;
  problem: string;
  solution: string;
  outcome: string;
  role: string;
  stack: string[];
  cover: CoverVariant;
  /** PLACEHOLDER: public live demo URL, or null. */
  liveUrl: string | null;
  /** PLACEHOLDER: GitHub repository URL, or null. */
  repoUrl: string | null;
};

export const projects: Project[] = [
  {
    slug: "student-request-system",
    title: "Student Request Automation",
    officialName: "University of Karachi Student Request Automation System",
    category: "Web",
    context: "University of Karachi",
    featured: true,
    summary:
      "A web application for filing and storing student requests, so a request is a record instead of a conversation that can be lost.",
    problem:
      "University requests are easy to lose when they move through counters, inboxes, and word of mouth. A student should be able to file a request and know that it exists.",
    solution:
      "A React interface talks to an API built with Express and Node.js. PostgreSQL stores the request, so it can be created and read back as structured data.",
    outcome:
      "An academic web system covering the path from a submitted request to a stored record. It is not publicly deployed.",
    role: "Academic project",
    stack: ["React", "Express", "Node.js", "PostgreSQL"],
    cover: "queue",
    liveUrl: null,
    repoUrl: null,
  },
  {
    slug: "smart-transport",
    title: "Smart Transport Reservation",
    officialName: "Smart Transport Reservation",
    category: "Mobile",
    context: "Academic",
    featured: true,
    summary:
      "A mobile application for reserving transport, with a Python service and PostgreSQL behind the React Native client.",
    problem:
      "A reservation falls apart when the details live in calls and informal lists. The useful version is a record a person can return to.",
    solution:
      "React Native for the mobile client, Python for the application logic, and PostgreSQL for reservation data.",
    outcome:
      "An academic build that crosses a mobile interface, a backend, and a database. A public build is not linked yet.",
    role: "Academic project",
    stack: ["React Native", "Python", "PostgreSQL"],
    cover: "route",
    liveUrl: null,
    repoUrl: null,
  },
  {
    slug: "online-banking",
    title: "Online Banking System",
    officialName: "Online Banking Management System",
    category: "Web",
    context: "Academic",
    featured: true,
    summary:
      "A server-rendered banking web application for account records, built with Java Servlets, JSP, and MySQL.",
    problem:
      "Banking workflows need consistent records. A page that forgets an account, or a table that drifts, is not a banking system.",
    solution:
      "Java Servlets and JSP handle the web layer. MySQL holds account data so the operations have a single store to read and write.",
    outcome:
      "An academic banking system focused on accounts and the operations around them. It is not a live bank, and it is not publicly deployed.",
    role: "Academic project",
    stack: ["Java Servlet", "JSP", "MySQL"],
    cover: "ledger",
    liveUrl: null,
    repoUrl: null,
  },
  {
    slug: "desktop-bank",
    title: "Desktop Bank",
    officialName: "Desktop Bank Application",
    category: "Desktop",
    context: "Academic",
    featured: false,
    summary:
      "A desktop banking application with a JavaFX interface, Java for the logic, and MySQL for storage.",
    problem:
      "The same kind of banking record should be usable in a desktop session, with an interface that makes the next action clear.",
    solution:
      "JavaFX draws the interface. Java holds the application logic. MySQL stores the data the screens read and update.",
    outcome:
      "A desktop academic companion to the web banking system, aimed at local use and structured data. No public download is linked yet.",
    role: "Academic project",
    stack: ["Java", "JavaFX", "MySQL"],
    cover: "window",
    liveUrl: null,
    repoUrl: null,
  },
  {
    slug: "home-automation",
    title: "Home Automation",
    officialName: "Home Automation",
    category: "Hardware",
    context: "Academic",
    featured: false,
    summary: "An Arduino project that connects a small program to physical control in a home setting.",
    problem:
      "Software that never leaves the screen hides a useful lesson: how an instruction becomes something a device actually does.",
    solution:
      "An Arduino-based setup for home automation, with the control logic living on the board rather than in a browser.",
    outcome:
      "A hardware study in connecting code to physical control. There is no hosted demo to open.",
    role: "Academic project",
    stack: ["Arduino"],
    cover: "dial",
    liveUrl: null,
    repoUrl: null,
  },
];

export function getFeaturedProjects(): Project[] {
  return projects.filter((project) => project.featured);
}

export function getProject(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}

export function getAdjacentProjects(slug: string): {
  previous: Project | null;
  next: Project | null;
} {
  const index = projects.findIndex((project) => project.slug === slug);
  if (index < 0) return { previous: null, next: null };
  return {
    previous: projects[index - 1] ?? null,
    next: projects[index + 1] ?? null,
  };
}
