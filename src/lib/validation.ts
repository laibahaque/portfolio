export {
  sanitizeLine,
  sanitizeMessage,
  validateContact,
  type ContactErrors,
  type ContactFields,
} from "@/lib/contact";

export const CONTACT_LIMITS = {
  name: 80,
  email: 120,
  message: 2000,
  honey: 120,
} as const;
