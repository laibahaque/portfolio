/**
 * Certifications.
 * PLACEHOLDER: copy the object shape below to add another certificate.
 * Leave `credentialUrl` null until you have a public link. Null hides the button.
 *
 * {
 *   id: "example",
 *   title: "Certificate name",
 *   issuer: "Issuer",
 *   issued: "Month YYYY",
 *   credentialUrl: null,
 * }
 */

export type Certification = {
  id: string;
  title: string;
  issuer: string;
  issued: string;
  /** PLACEHOLDER: public credential URL, or null. */
  credentialUrl: string | null;
};

export const certifications: Certification[] = [
  {
    id: "smit-javascript",
    title: "JavaScript Crash Course",
    issuer: "Saylani Mass IT Training (SMIT)",
    issued: "April 2023",
    credentialUrl: null,
  },
  {
    id: "women-tech-quest",
    title: "Build with AI Hackathon, Women Tech Quest 2026",
    issuer: "10Pearls",
    issued: "2026",
    credentialUrl: null,
  },
  {
    id: "alibaba-ai-hackathon",
    title: "Alibaba Cloud AI Hackathon Pakistan 2026",
    issuer: "Alibaba Cloud",
    issued: "2026",
    credentialUrl: null,
  },
];
