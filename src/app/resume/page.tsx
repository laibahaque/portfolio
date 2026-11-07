import type { Metadata } from "next";
import { Download } from "lucide-react";
import { ContactOpenButton } from "@/components/contact/ContactOpenButton";
import { PageContainer } from "@/components/layout/PageContainer";
import { Container } from "@/components/ui/Container";
import { site } from "@/data/site";
import { pageMeta } from "@/lib/metadata";

export const metadata: Metadata = pageMeta({
  title: "Resume",
  description: "Download Laiba Haque's CV.",
  path: "/resume",
});

export default function ResumePage() {
  return (
    <PageContainer>
      <section className="pb-20 pt-28 md:pb-28 md:pt-36">
        <Container>
          <p className="text-[0.72rem] font-medium uppercase tracking-[0.22em] text-muted">Resume</p>
          <h1 className="mt-6 max-w-3xl text-[clamp(2.6rem,5vw,4.8rem)] leading-[0.95] tracking-[-0.04em]">
            CV on file.
          </h1>
          <p className="mt-6 max-w-xl text-ink-soft">
            Download the PDF, or open it in a new tab. Replace the file at your resume path when you update the CV.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href={site.resumePath} className="btn btn-primary" target="_blank" rel="noopener">
              Open resume
              <Download aria-hidden="true" size={16} />
            </a>
            <ContactOpenButton variant="secondary" />
          </div>
          <iframe
            title="Resume preview"
            src={site.resumePath}
            className="mt-12 h-[min(80vh,900px)] w-full border border-ink/15 bg-paper"
          />
        </Container>
      </section>
    </PageContainer>
  );
}
