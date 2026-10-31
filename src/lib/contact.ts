import { site } from "@/data/site";

export type ContactFields = {
  name: string;
  email: string;
  message: string;
};

export type ContactErrors = Partial<Record<keyof ContactFields, string>>;

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/** Removes control characters so a mailto link cannot smuggle extra headers. */
export function sanitizeLine(value: string, max: number): string {
  return value
    .replace(/[\u0000-\u001F\u007F]/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, max);
}

export function sanitizeMessage(value: string, max: number): string {
  return value
    .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, "")
    .trim()
    .slice(0, max);
}

export function validateContact(input: ContactFields): ContactErrors {
  const errors: ContactErrors = {};
  const name = sanitizeLine(input.name, 80);
  const email = sanitizeLine(input.email, 120);
  const message = sanitizeMessage(input.message, 2000);

  if (name.length < 2) errors.name = "Please enter your name.";
  if (!EMAIL.test(email)) errors.email = "Please enter a valid email address.";
  if (message.length < 10) errors.message = "Please write a short message, at least 10 characters.";

  return errors;
}

export function toMailto(input: ContactFields): string {
  const name = sanitizeLine(input.name, 80);
  const email = sanitizeLine(input.email, 120);
  const message = sanitizeMessage(input.message, 2000);
  const subject = `Portfolio enquiry from ${name}`.slice(0, 120);
  const body = `Name: ${name}\nEmail: ${email}\n\n${message}`;

  return `mailto:${site.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}
