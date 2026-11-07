"use client";

import { useEffect, useId } from "react";
import { X } from "lucide-react";
import { site } from "@/data/site";
import { ContactForm } from "@/components/contact/ContactForm";
import { CopyEmail } from "@/components/contact/CopyEmail";
import { SocialLinks } from "@/components/ui/SocialLinks";

type ContactModalProps = {
  open: boolean;
  onClose: () => void;
};

export function ContactModal({ open, onClose }: ContactModalProps) {
  const titleId = useId();

  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") onClose();
    }
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previous;
      document.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[70] flex items-end justify-center p-0 sm:items-center sm:p-4">
      <button
        type="button"
        className="absolute inset-0 bg-ink/55"
        aria-label="Close contact form"
        onClick={onClose}
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        data-lenis-prevent
        className="relative max-h-[92vh] w-full max-w-2xl overflow-y-auto border border-ink/15 bg-bone p-6 shadow-lg sm:p-8"
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-[0.72rem] font-medium uppercase tracking-[0.22em] text-oxide">Contact</p>
            <h2 id={titleId} className="mt-2 text-3xl tracking-[-0.03em] md:text-4xl">
              Tell me what you are making.
            </h2>
            <p className="mt-3 text-sm text-ink-soft">{site.availability}</p>
          </div>
          <button
            type="button"
            className="inline-flex size-11 shrink-0 items-center justify-center border border-ink/15"
            onClick={onClose}
            aria-label="Close"
          >
            <X aria-hidden="true" size={18} />
          </button>
        </div>

        <p className="mt-6 font-display text-2xl italic leading-tight tracking-tight">
          <a className="link-underline" href={`mailto:${site.email}`}>
            {site.email}
          </a>
        </p>
        <div className="mt-4 flex flex-wrap gap-3">
          <CopyEmail />
          <SocialLinks />
        </div>

        <div className="mt-8 border-t border-ink/10 pt-8">
          <ContactForm />
        </div>
      </div>
    </div>
  );
}
