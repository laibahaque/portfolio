import Link from "next/link";
import { PageFrame } from "@/components/layout/PageFrame";
import { Container } from "@/components/ui/Container";

export default function NotFound() {
  return (
    <PageFrame>
      <section className="flex min-h-svh items-center pb-20 pt-28">
        <Container>
          <p className="text-[0.72rem] font-medium uppercase tracking-[0.22em] text-oxide">404</p>
          <h1 className="mt-5 max-w-3xl text-[clamp(2.8rem,6vw,5.4rem)] leading-[0.95] tracking-[-0.04em]">
            This page is not on the map.
          </h1>
          <p className="mt-6 max-w-xl text-ink-soft">The link may be old, or the address may have been mistyped.</p>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <Link href="/" className="btn btn-primary">
              Back home
            </Link>
            <Link href="/work" className="btn btn-secondary">
              See the work
            </Link>
          </div>
        </Container>
      </section>
    </PageFrame>
  );
}
