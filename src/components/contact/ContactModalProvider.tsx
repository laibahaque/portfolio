"use client";

import { createContext, useCallback, useContext, useMemo, useState } from "react";
import { ContactModal } from "@/components/contact/ContactModal";

type ContactModalContextValue = {
  open: () => void;
  close: () => void;
  isOpen: boolean;
};

const ContactModalContext = createContext<ContactModalContextValue | null>(null);

export function ContactModalProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);

  const value = useMemo(() => ({ open, close, isOpen }), [open, close, isOpen]);

  return (
    <ContactModalContext.Provider value={value}>
      {children}
      <ContactModal open={isOpen} onClose={close} />
    </ContactModalContext.Provider>
  );
}

export function useContactModal(): ContactModalContextValue {
  const value = useContext(ContactModalContext);
  if (!value) {
    throw new Error("useContactModal must be used within ContactModalProvider");
  }
  return value;
}
