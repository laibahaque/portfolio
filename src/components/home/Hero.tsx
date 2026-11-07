import Link from "next/link";
import { ArrowRight, Download } from "lucide-react";
import { site } from "@/data/site";
import { HeroMark } from "@/components/motion/HeroMark";
import { Tilt } from "@/components/motion/Tilt";
import { Container } from "@/components/ui/Container";
import { Magnetic } from "@/components/ui/Magnetic";
import { SocialLinks } from "@/components/ui/SocialLinks";

export function Hero() {
  return (
    <section id="hero" className="scroll-target flex min-h-svh flex-col justify-start pb-16 pt-28 md:pt-32">
      <Container>
        <div className="grid items-start gap-12 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-7">
            <p className="hero-in text-[0.72rem] font-medium uppercase tracking-[0.22em] text-muted">
              <span className="text-oxide">01</span>
              <span aria-hidden="true"> · </span>
              {site.location}
            </p>
            <p className="hero-in mt-4 text-sm font-medium uppercase tracking-[0.18em] text-ink-soft">{site.role}</p>
            <h1 className="hero-in mt-4 text-[clamp(2.8rem,8vw,7.2rem)] leading-[0.9] tracking-[-0.04em] text-balance">
              {site.name}
              <span className="mt-2 block text-[clamp(1.4rem,3.5vw,2.4rem)] font-sans font-medium normal-case tracking-[-0.02em] text-ink-soft">
                {site.headline}
              </span>
            </h1>
            <p className="hero-in hero-d1 mt-8 max-w-xl text-lg leading-relaxed text-ink-soft">{site.lede}</p>
            <div className="hero-in hero-d2 mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
              <Magnetic className="w-full sm:w-auto">
                <Link href="/projects" className="btn btn-primary w-full sm:w-auto">
                  View projects
                  <ArrowRight aria-hidden="true" size={16} />
                </Link>
              </Magnetic>
              <a href={site.resumePath} className="btn btn-secondary w-full sm:w-auto" target="_blank" rel="noopener">
                Download CV
                <Download aria-hidden="true" size={16} />
              </a>
            </div>
            <div className="hero-in hero-d2 mt-6">
              <SocialLinks />
            </div>
            <p className="hero-in hero-d3 mt-8 flex items-center gap-3 text-sm text-ink-soft">
              <span aria-hidden="true" className="size-1.5 shrink-0 rounded-full bg-oxide" />
              {site.availability}
            </p>
          </div>

          <aside className="lg:col-span-5" data-fluid-target>
            <Tilt max={5}>
              <HeroMark />
            </Tilt>
            <figure className="hero-in hero-d2 border border-ink/15 bg-paper p-3">
              <div
                className="flex aspect-square items-center justify-center border border-dashed border-ink/20 bg-bone text-sm text-muted"
                role="img"
                aria-label="Profile image placeholder"
              >
                Profile image
              </div>
              <figcaption className="mt-3 text-sm text-muted">Photograph — add manually under public/images/profile</figcaption>
            </figure>
            <div className="hero-in hero-d3 border border-ink/15 bg-paper p-6 sm:p-8">
              <p className="text-[0.72rem] font-medium uppercase tracking-[0.2em] text-muted">Now</p>
              <p className="mt-4 font-display text-4xl italic leading-none tracking-tight">{site.company}</p>
              <p className="mt-3 text-sm text-ink-soft">{site.role}</p>
              <dl className="mt-8 space-y-5 border-t border-ink/10 pt-6 text-sm">
                <div>
                  <dt className="text-muted">Studying</dt>
                  <dd className="mt-1 text-ink">BSCS, University of Karachi</dd>
                </div>
                <div>
                  <dt className="text-muted">Focus</dt>
                  <dd className="mt-1 text-ink">Web games, JavaScript, Three.js, and the MERN stack</dd>
                </div>
              </dl>
            </div>
          </aside>
        </div>
        <div className="rule-draw mt-16 h-px w-full bg-ink/15" />
      </Container>
    </section>
  );
}
