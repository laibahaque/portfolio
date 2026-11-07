import { FooterContactLink } from "@/components/layout/FooterContactLink";
import { nav, site } from "@/data/site";
import Link from "next/link";

export function Footer() {
  const year = 2026;

  return (
    <footer className="site-footer border-t border-ink/10 bg-bone">
      <div className="mx-auto grid max-w-[1180px] gap-10 px-5 py-12 sm:px-8 md:grid-cols-12 md:py-14">
        <div className="md:col-span-5">
          <p className="font-display text-4xl italic leading-none">
            Lh<span className="text-oxide">.</span>
          </p>
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-ink-soft">
            {site.fullName}. {site.role} at {site.company}, based in {site.location}.
          </p>
        </div>
        <div className="md:col-span-3">
          <p className="text-[0.72rem] font-medium uppercase tracking-[0.18em] text-muted">Pages</p>
          <ul className="mt-4 space-y-2 text-sm">
            <li>
              <Link href="/" className="link-underline">
                Home
              </Link>
            </li>
            {nav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="link-underline">
                  {item.label}
                </Link>
              </li>
            ))}
            <li>
              <FooterContactLink />
            </li>
            <li>
              <Link href="/resume" className="link-underline">
                Resume
              </Link>
            </li>
          </ul>
        </div>
        <div className="md:col-span-4">
          <p className="text-[0.72rem] font-medium uppercase tracking-[0.18em] text-muted">Contact</p>
          <ul className="mt-4 space-y-2 text-sm">
            <li>
              <a className="link-underline" href={`mailto:${site.email}`}>
                {site.email}
              </a>
            </li>
            <li>
              <a className="link-underline" href={site.linkedin} target="_blank" rel="me noreferrer noopener">
                LinkedIn
              </a>
            </li>
            {site.github ? (
              <li>
                <a className="link-underline" href={site.github} target="_blank" rel="noreferrer noopener">
                  GitHub
                </a>
              </li>
            ) : null}
            <li>
              <a className="link-underline" href={site.resumePath} target="_blank" rel="noopener">
                Resume
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-ink/10">
        <div className="mx-auto flex max-w-[1180px] flex-col gap-2 px-5 py-5 text-xs text-muted sm:flex-row sm:items-center sm:justify-between sm:px-8">
          <p>
            © {year} {site.name}. All rights reserved.
          </p>
          <p>{site.location}</p>
        </div>
      </div>
    </footer>
  );
}
