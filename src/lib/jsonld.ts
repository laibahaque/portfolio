import { education } from "@/data/education";
import { site } from "@/data/site";
import { skillGroups } from "@/data/skills";

export function personJsonLd() {
  const sameAs = [site.linkedin, site.github].filter((url): url is string => Boolean(url));

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${site.url}/#website`,
        url: site.url,
        name: site.name,
        description: site.description,
        inLanguage: "en",
        publisher: { "@id": `${site.url}/#person` },
      },
      {
        "@type": "Person",
        "@id": `${site.url}/#person`,
        name: site.fullName,
        alternateName: site.name,
        jobTitle: site.role,
        email: site.email,
        url: site.url,
        image: `${site.url}/opengraph-image`,
        address: {
          "@type": "PostalAddress",
          addressLocality: "Karachi",
          addressCountry: "PK",
        },
        worksFor: {
          "@type": "Organization",
          name: site.company,
        },
        alumniOf: education.slice(0, 2).map((item) => ({
          "@type": "CollegeOrUniversity",
          name: item.school,
        })),
        knowsAbout: skillGroups.flatMap((group) => [...group.items]),
        sameAs,
      },
    ],
  };
}

export function jsonLdScript(data: unknown): string {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}
