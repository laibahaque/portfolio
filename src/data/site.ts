/**
 * SITE CONTENT
 * Edit this file to update your name, contact details, and positioning.
 * Search the `src/data` folder for "PLACEHOLDER" before you publish new links.
 *
 * Set NEXT_PUBLIC_SITE_URL to the live domain before deploy.
 * On Vercel, the production domain is used when that variable is unset.
 */

export const site = {
  name: "Laiba Haque",
  fullName: "Laiba Sualeha Haque",
  role: "Junior Game Developer",
  company: "Techversol",
  location: "Karachi, Pakistan",
  email: "laibahaque14@gmail.com",
  linkedin: "https://www.linkedin.com/in/laiba-haque-779201284/",
  /**
   * PLACEHOLDER: paste your GitHub profile URL, or leave null.
   * Null hides the link. The site will not render a dead button.
   */
  github: null as string | null,
  resumePath: "/Laiba-Haque-CV.pdf",
  availability: "Open to roles, collaborations, and new work.",
  headline: "Serious about play.",
  lede: "I am a junior game developer at Techversol in Karachi. I build web games, and I make full-stack systems that still have to work after the first impression. I have also built AI agents in public hackathons.",
  description:
    "Laiba Haque is a junior game developer at Techversol in Karachi. She builds web games and full-stack systems, studies computer science at the University of Karachi, and has built AI agents in public hackathons.",
  url: (process.env.NEXT_PUBLIC_SITE_URL ?? "https://laibahaque.vercel.app").replace(/\/$/, ""),
};

export const nav = [
  { href: "/work", label: "Projects" },
  { href: "/events", label: "Events" },
  { href: "/about", label: "About" },
] as const;
