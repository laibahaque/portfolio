import { Container } from "@/components/ui/Container";
import { ContactOpenButton } from "@/components/contact/ContactOpenButton";
import { site } from "@/data/site";

/** Compact contact prompt on inner pages — opens the global modal. */
export function ContactCTA() {
  return (
    <section className="border-t border-ink/10 bg-paper py-16 md:py-20">
      <Container className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-[0.72rem] font-medium uppercase tracking-[0.22em] text-oxide">Contact</p>
          <h2 className="mt-4 max-w-lg text-4xl leading-[1.05] tracking-[-0.03em]">Tell me what you are making.</h2>
          <p className="mt-4 max-w-md text-ink-soft">{site.availability}</p>
        </div>
        <ContactOpenButton className="shrink-0" />
      </Container>
    </section>
  );
}
