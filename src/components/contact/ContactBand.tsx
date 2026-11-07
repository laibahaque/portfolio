import { site } from "@/data/site";
import { Container } from "@/components/ui/Container";
import { ContactForm } from "@/components/contact/ContactForm";
import { CopyEmail } from "@/components/contact/CopyEmail";
import { SocialLinks } from "@/components/ui/SocialLinks";

export function ContactBand() {
  return (
    <section id="contact" className="scroll-target border-t border-ink/10 bg-paper py-20 md:py-28">
      <Container>
        <div data-reveal className="grid gap-14 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <p className="text-[0.72rem] font-medium uppercase tracking-[0.22em] text-oxide">Contact</p>
            <h2 className="mt-4 text-[clamp(2.6rem,5vw,4.6rem)] leading-[0.95] tracking-[-0.03em]">
              Tell me what you are making.
            </h2>
            <p className="mt-6 max-w-md text-ink-soft">
              {site.availability} Email is the fastest way to reach me. I read every note.
            </p>
            <p className="mt-8 font-display text-[clamp(1.7rem,3vw,2.4rem)] italic leading-tight tracking-tight">
              <a className="link-underline" href={`mailto:${site.email}`}>
                {site.email}
              </a>
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <CopyEmail />
              <SocialLinks />
            </div>
            <p className="mt-6 text-sm text-muted">{site.location}</p>
          </div>
          <div className="lg:col-span-7">
            <ContactForm />
          </div>
        </div>
      </Container>
    </section>
  );
}
