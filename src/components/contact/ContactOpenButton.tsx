"use client";

import { useContactModal } from "@/components/contact/ContactModalProvider";
import { cn } from "@/lib/utils";

type ContactOpenButtonProps = {
  className?: string;
  variant?: "primary" | "secondary" | "link";
  children?: React.ReactNode;
};

export function ContactOpenButton({
  className,
  variant = "primary",
  children = "Contact",
}: ContactOpenButtonProps) {
  const { open } = useContactModal();

  if (variant === "link") {
    return (
      <button type="button" className={cn("link-underline text-left", className)} onClick={open}>
        {children}
      </button>
    );
  }

  return (
    <button
      type="button"
      className={cn(variant === "primary" ? "btn btn-primary" : "btn btn-secondary", className)}
      onClick={open}
    >
      {children}
    </button>
  );
}
