import { ArrowUpRight } from "lucide-react";
import { site } from "@/data/site";
import { cn } from "@/lib/utils";

type SocialLinksProps = {
  className?: string;
  showEmail?: boolean;
  onDark?: boolean;
};

export function SocialLinks({ className, showEmail = false, onDark }: SocialLinksProps) {
  const buttonClass = onDark ? "btn btn-on-dark" : "btn btn-secondary";

  return (
    <div className={cn("flex flex-wrap gap-3", className)}>
      {showEmail ? (
        <a href={`mailto:${site.email}`} className={buttonClass}>
          Email
          <ArrowUpRight aria-hidden="true" size={15} />
        </a>
      ) : null}
      <a
        href={site.linkedin}
        className={buttonClass}
        target="_blank"
        rel="me noreferrer noopener"
        aria-label="LinkedIn profile"
      >
        LinkedIn
        <ArrowUpRight aria-hidden="true" size={15} />
      </a>
      {site.github ? (
        <a
          href={site.github}
          className={buttonClass}
          target="_blank"
          rel="noreferrer noopener"
          aria-label="GitHub profile"
        >
          GitHub
          <ArrowUpRight aria-hidden="true" size={15} />
        </a>
      ) : null}
    </div>
  );
}
