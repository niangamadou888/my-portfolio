import { z } from "zod";

/**
 * Shared between the Contact form (client) and the contact Worker (server),
 * so both sides reject exactly the same payloads. Never trust the client copy:
 * the Worker re-validates every request against this schema.
 */
export const CONTACT_LIMITS = {
  name: { min: 2, max: 100 },
  email: { max: 254 },
  subject: { min: 3, max: 150 },
  message: { min: 20, max: 5000 },
} as const;

export const contactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(CONTACT_LIMITS.name.min, "Name must be at least 2 characters")
    .max(CONTACT_LIMITS.name.max, "Name must be under 100 characters"),
  email: z
    .string()
    .trim()
    .email("Please enter a valid email address")
    .max(CONTACT_LIMITS.email.max, "Email address is too long"),
  subject: z
    .string()
    .trim()
    .min(CONTACT_LIMITS.subject.min, "Subject must be at least 3 characters")
    .max(CONTACT_LIMITS.subject.max, "Subject must be under 150 characters"),
  message: z
    .string()
    .trim()
    .min(CONTACT_LIMITS.message.min, "Message must be at least 20 characters")
    .max(CONTACT_LIMITS.message.max, "Message must be under 5000 characters"),
  /**
   * Honeypot. Hidden from real users via CSS, so a non-blank value means a bot
   * filled the form. Unbounded on purpose: the Worker checks it before
   * validation, so no length error can tip a bot off.
   */
  website: z.string().optional(),
});

export type ContactFormData = z.infer<typeof contactSchema>;

/** The payload actually emailed, once the honeypot has been stripped. */
export type ContactMessage = Omit<ContactFormData, "website">;
