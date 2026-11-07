"use client";

import { site, nav } from "@/data/site";
import Link from "next/link";

type MobileMenuProps = {
  open: boolean;
  panelId: string;
  onClose: () => void;
  onContact: () => void;
};

export function MobileMenu({ open, panelId, onClose, onContact }: MobileMenuProps) {
  return (
    <div
      id={panelId}
      data-open={open}
      data-lenis-prevent
      className="menu-panel fixed inset-x-0 bottom-0 top-16 z-40 bg-bone md:hidden"
      role="dialog"
      aria-modal={open}
      aria-hidden={!open}
      inert={open ? undefined : true}
      aria-label="Menu"
    >
      <nav aria-label="Mobile" className="flex h-full flex-col justify-between px-6 py-10">
        <ul className="space-y-4">
          <li>
            <Link href="/" className="font-display text-5xl italic leading-none" onClick={onClose}>
              Home
            </Link>
          </li>
          {nav.map((item) => (
            <li key={item.href}>
              <Link href={item.href} className="font-display text-5xl italic leading-none" onClick={onClose}>
                {item.label}
              </Link>
            </li>
          ))}
          <li>
            <button
              type="button"
              className="font-display text-5xl italic leading-none text-oxide"
              onClick={onContact}
            >
              Contact
            </button>
          </li>
        </ul>
        <div className="space-y-3 border-t border-ink/10 pt-6 text-sm">
          <a href={site.resumePath} className="block" target="_blank" rel="noopener">
            Resume PDF
          </a>
          <a href={`mailto:${site.email}`} className="block">
            {site.email}
          </a>
          <a href={site.linkedin} className="block" target="_blank" rel="noreferrer noopener">
            LinkedIn
          </a>
        </div>
      </nav>
    </div>
  );
}
