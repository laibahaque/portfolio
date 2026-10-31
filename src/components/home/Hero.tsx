import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { site } from "@/data/site";
import { HeroMark } from "@/components/motion/HeroMark";
import { Tilt } from "@/components/motion/Tilt";
import { Container } from "@/components/ui/Container";
import { Magnetic } from "@/components/ui/Magnetic";

export function Hero() {
  return (
    <section className="flex min-h-svh flex-col justify-start pb-16 pt-28 md:pt-32">
      <Container>
        <div className="grid items-start gap-12 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-7">
            <p className="hero-in text-[0.72rem] font-medium uppercase tracking-[0.22em] text-muted">
              <span className="text-oxide">01</span>
              <span aria-hidden="true"> · </span>
              {site.location}
            </p>
            <h1 className="mt-6 text-[clamp(2.8rem,8vw,7.2rem)] leading-[0.9] tracking-[-0.04em] text-balance">
              Serious
              <span className="block italic text-oxide">about play.</span>
            </h1>
            <p className="hero-in hero-d1 mt-8 max-w-xl text-lg leading-relaxed text-ink-soft">{site.lede}</p>
            <div className="hero-in hero-d2 mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Magnetic className="w-full sm:w-auto">
                <Link href="/work" className="btn btn-primary w-full sm:w-auto">
                  See the projects
                  <ArrowRight aria-hidden="true" size={16} />
                </Link>
              </Magnetic>
              <Link href="/about" className="btn btn-secondary w-full sm:w-auto">
                About me
              </Link>
            </div>
            <p className="hero-in hero-d3 mt-8 flex items-center gap-3 text-sm text-ink-soft">
              <span aria-hidden="true" className="size-1.5 shrink-0 rounded-full bg-oxide" />
              {site.availability}
            </p>
          </div>

          <aside className="lg:col-span-5">
            <Tilt max={5}>
              <HeroMark />
            </Tilt>
            <div className="hero-in hero-d2 border border-ink/15 bg-paper p-6 sm:p-8">
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
                <div>
                  <dt className="text-muted">Also</dt>
                  <dd className="mt-1 text-ink">AI agents, from hackathons in 2026</dd>
                </div>
                <div>
                  <dt className="text-muted">Earlier</dt>
                  <dd className="mt-1 text-ink">Front-end and web development at Ajd Marketing</dd>
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
