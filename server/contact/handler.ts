import { contactSchema, type ContactMessage } from "../../src/lib/contact-schema";
import { MissingEnvError, readContactEnv, type ContactEnvSource } from "./env";
import { buildHtmlBody, buildSubject, buildTextBody } from "./email-template";
import { ResendError, sendEmail } from "./resend";

/** Shape of Cloudflare's Rate Limiting binding (`ratelimits` in wrangler.jsonc). */
export interface RateLimiter {
  limit(options: { key: string }): Promise<{ success: boolean }>;
}

export interface ContactDeps {
  readonly env: ContactEnvSource;
  /** Optional so a missing binding degrades to "no limit" instead of breaking the form. */
  readonly limiter?: RateLimiter;
}

/** Generous for a 5,000-character message plus JSON overhead and multi-byte text. */
const MAX_BODY_BYTES = 32 * 1024;

/** Bots get exactly what a real submission gets, so the honeypot teaches them nothing. */
const ACCEPTED = { ok: true } as const;

const json = (body: unknown, status: number, headers: Record<string, string> = {}): Response =>
  new Response(JSON.stringify(body), {
    status,
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "no-store",
      "X-Content-Type-Options": "nosniff",
      ...headers,
    },
  });

const fail = (status: number, error: string, extra: Record<string, unknown> = {}): Response =>
  json({ ok: false, error, ...extra }, status);

const isJsonRequest = (request: Request): boolean =>
  request.headers.get("Content-Type")?.split(";")[0].trim().toLowerCase() === "application/json";

/** Browsers always send Origin on a cross-site POST; a mismatch means another site is posting. */
const isForeignOrigin = (request: Request): boolean => {
  const origin = request.headers.get("Origin");
  return origin !== null && origin !== new URL(request.url).origin;
};

/** Cheap header checks that run before the rate limiter or the body are touched. */
function rejectRequestShape(request: Request): Response | null {
  if (request.method !== "POST") {
    return json({ ok: false, error: "Method not allowed" }, 405, { Allow: "POST" });
  }
  // Requiring JSON forces a CORS preflight, which blocks cross-site text/plain form posts.
  if (!isJsonRequest(request)) return fail(415, "Send the form as JSON.");
  if (isForeignOrigin(request)) return fail(403, "Forbidden");
  return null;
}

async function isRateLimited(request: Request, limiter?: RateLimiter): Promise<boolean> {
  if (!limiter) return false;
  try {
    const { success } = await limiter.limit({ key: request.headers.get("CF-Connecting-IP") ?? "unknown" });
    return !success;
  } catch (error: unknown) {
    // Fail open: a broken limiter must not cost a real enquiry.
    console.error("Rate limiter failed; allowing the request:", error);
    return false;
  }
}

/** Reads at most MAX_BODY_BYTES, cancelling the stream as soon as it goes over. */
async function readCappedBody(request: Request): Promise<string | null> {
  if (Number(request.headers.get("Content-Length") ?? 0) > MAX_BODY_BYTES) return null;
  if (!request.body) return "";

  const reader = request.body.getReader();
  const chunks: Uint8Array[] = [];
  let total = 0;
  for (let next = await reader.read(); !next.done; next = await reader.read()) {
    total += next.value.byteLength;
    if (total > MAX_BODY_BYTES) {
      await reader.cancel();
      return null;
    }
    chunks.push(next.value);
  }

  const bytes = new Uint8Array(total);
  chunks.reduce((offset, chunk) => (bytes.set(chunk, offset), offset + chunk.byteLength), 0);
  return new TextDecoder().decode(bytes);
}

/** Checked before validation, so a bot never sees field errors that reveal the trap. */
const isHoneypotFilled = (payload: unknown): boolean => {
  const website = (payload as { website?: unknown } | null)?.website;
  return typeof website === "string" && website.trim() !== "";
};

async function deliver(contact: ContactMessage, envSource: ContactEnvSource): Promise<Response> {
  try {
    const env = readContactEnv(envSource);
    const id = await sendEmail(env.resendApiKey, {
      from: env.fromEmail,
      to: env.toEmail,
      subject: buildSubject(contact),
      html: buildHtmlBody(contact),
      text: buildTextBody(contact),
      replyTo: contact.email,
    });

    console.info("Contact email sent", { id });
    return json(ACCEPTED, 200);
  } catch (error: unknown) {
    // The detailed cause stays in the Workers log; the visitor gets a safe message.
    if (error instanceof MissingEnvError) {
      console.error("Contact form is not configured:", error.message);
    } else if (error instanceof ResendError) {
      console.error("Resend rejected the email:", error.status, error.message);
    } else {
      console.error("Unexpected contact form failure:", error);
    }
    return fail(500, "Could not send your message right now. Please email me directly.");
  }
}

/** Handles `POST /api/contact`. Every check runs before anything is emailed. */
export async function handleContact(request: Request, deps: ContactDeps): Promise<Response> {
  const rejected = rejectRequestShape(request);
  if (rejected) return rejected;

  if (await isRateLimited(request, deps.limiter)) {
    return fail(429, "Too many messages in a short time. Please wait a minute and try again.");
  }

  const raw = await readCappedBody(request);
  if (raw === null) return fail(413, "Your message is too long.");

  let payload: unknown;
  try {
    payload = JSON.parse(raw);
  } catch {
    return fail(400, "Request body must be valid JSON");
  }

  if (isHoneypotFilled(payload)) {
    console.warn("Contact form honeypot triggered");
    return json(ACCEPTED, 200);
  }

  const parsed = contactSchema.safeParse(payload);
  if (!parsed.success) {
    return fail(400, "Some fields need fixing", { fields: parsed.error.flatten().fieldErrors });
  }

  const { name, email, subject, message } = parsed.data;
  return deliver({ name, email, subject, message }, deps.env);
}
