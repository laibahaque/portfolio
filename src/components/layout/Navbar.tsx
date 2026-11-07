"use client";

import { site, nav } from "@/data/site";
import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useState } from "react";
import { useContactModal } from "@/components/contact/ContactModalProvider";
import { MobileMenu } from "@/components/layout/MobileMenu";
import { SoundMuteToggle } from "@/components/layout/SoundMuteToggle";
import { ThemeToggle } from "@/components/layout/ThemeToggle";

function isCurrent(pathname: string, href: string): boolean {
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function Navbar() {
  const pathname = usePathname();
  const { open: openContact } = useContactModal();
  const [openPath, setOpenPath] = useState<string | null>(null);
  const open = openPath === pathname;
  const panelId = useId();

  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") setOpenPath(null);
    }
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previous;
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <header className="site-header fixed inset-x-0 top-0 z-50 border-b border-ink/10 bg-bone">
      <div className="mx-auto flex h-16 max-w-[1180px] items-center justify-between gap-4 px-5 sm:px-8 md:h-[4.5rem]">
        <Link href="/" className="font-display text-[1.7rem] italic leading-none tracking-tight text-ink">
          Lh<span className="text-oxide">.</span>
          <span className="sr-only">{site.name}, home</span>
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-6 md:flex">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              aria-current={isCurrent(pathname, item.href) ? "page" : undefined}
              className={cn(
                "text-[0.78rem] font-medium uppercase tracking-[0.18em]",
                isCurrent(pathname, item.href) ? "text-oxide" : "text-ink hover:text-oxide",
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          <SoundMuteToggle className="hidden sm:inline-flex" />
          <ThemeToggle className="hidden sm:inline-flex" />
          <a href={site.resumePath} className="btn btn-secondary hidden sm:inline-flex" target="_blank" rel="noopener">
            Resume
          </a>
          <button type="button" className="btn btn-primary hidden md:inline-flex" onClick={openContact}>
            Contact
          </button>
          <button
            type="button"
            className="inline-flex size-11 items-center justify-center border border-ink/15 md:hidden"
            aria-expanded={open}
            aria-controls={panelId}
            onClick={() => setOpenPath(open ? null : pathname)}
          >
            {open ? <X aria-hidden="true" size={18} /> : <Menu aria-hidden="true" size={18} />}
            <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
          </button>
        </div>
      </div>

      <MobileMenu
        open={open}
        panelId={panelId}
        onClose={() => setOpenPath(null)}
        onContact={() => {
          setOpenPath(null);
          openContact();
        }}
      />
    </header>
  );
}

export { Navbar as Header };
