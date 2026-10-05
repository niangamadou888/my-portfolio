import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { handleContact, type ContactDeps, type RateLimiter } from "./handler";

const ENDPOINT = "https://amadouniang.dev/api/contact";
const VISITOR_IP = "203.0.113.7";

const VALID_MESSAGE = {
  name: "Ada Lovelace",
  email: "ada@example.com",
  subject: "New project",
  message: "I would like a press release platform built for my agency.",
  website: "",
};

const post = (body: unknown, headers: Record<string, string> = {}): Request =>
  new Request(ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json", "CF-Connecting-IP": VISITOR_IP, ...headers },
    body: typeof body === "string" ? body : JSON.stringify(body),
  });

/** A body with no Content-Length, like a chunked upload; `pulled()` reports bytes read so far. */
const streamedPost = (bytes: number) => {
  const chunk = new TextEncoder().encode("x".repeat(1024));
  let pulledBytes = 0;
  const request = new Request(ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json", "CF-Connecting-IP": VISITOR_IP },
    body: new ReadableStream({
      pull(controller) {
        if (pulledBytes >= bytes) return controller.close();
        pulledBytes += chunk.byteLength;
        controller.enqueue(chunk);
      },
    }),
    duplex: "half",
  } as RequestInit);
  return { request, pulled: () => pulledBytes };
};

const limiterReturning = (success: boolean) => ({
  limit: vi.fn<RateLimiter["limit"]>(async () => ({ success })),
});

const deps = (overrides: Partial<ContactDeps> = {}): ContactDeps => ({
  env: { RESEND_API_KEY: "re_test_key" },
  limiter: limiterReturning(true),
  ...overrides,
});

const resendAccepts = () =>
  vi.fn(async () => new Response(JSON.stringify({ id: "email_123" }), { status: 200 }));

let resendFetch: ReturnType<typeof vi.fn>;

const sentEmail = () => {
  const [url, init] = resendFetch.mock.calls[0] as [string, RequestInit];
  return { url, headers: init.headers as Record<string, string>, body: JSON.parse(init.body as string) };
};

beforeEach(() => {
  resendFetch = resendAccepts();
  vi.stubGlobal("fetch", resendFetch);
  // The handler logs failures for the Workers dashboard; keep test output clean.
  vi.spyOn(console, "error").mockImplementation(() => {});
  vi.spyOn(console, "warn").mockImplementation(() => {});
  vi.spyOn(console, "info").mockImplementation(() => {});
});

afterEach(() => {
  vi.unstubAllGlobals();
  vi.restoreAllMocks();
});

describe("handleContact", () => {
  it("emails a valid message through Resend with the visitor as reply-to", async () => {
    const response = await handleContact(post(VALID_MESSAGE), deps());

    expect(response.status).toBe(200);
    expect(await response.json()).toEqual({ ok: true });
    expect(resendFetch).toHaveBeenCalledTimes(1);

    const email = sentEmail();
    expect(email.url).toBe("https://api.resend.com/emails");
    expect(email.headers.Authorization).toBe("Bearer re_test_key");
    expect(email.body.to).toEqual(["amadouniang2001@gmail.com"]);
    expect(email.body.from).toBe("Portfolio <contact@amadouniang.dev>");
    expect(email.body.reply_to).toBe("ada@example.com");
    expect(email.body.subject).toBe("[Portfolio] New project — Ada Lovelace");
  });

  it("uses the configured recipient and sender when they are set", async () => {
    const env = {
      RESEND_API_KEY: "re_test_key",
      CONTACT_TO_EMAIL: "inbox@example.com",
      CONTACT_FROM_EMAIL: "Site <hello@example.com>",
    };

    await handleContact(post(VALID_MESSAGE), deps({ env }));

    expect(sentEmail().body.to).toEqual(["inbox@example.com"]);
    expect(sentEmail().body.from).toBe("Site <hello@example.com>");
  });

  it("rejects methods other than POST with 405", async () => {
    const response = await handleContact(new Request(ENDPOINT), deps());

    expect(response.status).toBe(405);
    expect(response.headers.get("Allow")).toBe("POST");
    expect(resendFetch).not.toHaveBeenCalled();
  });

  it("rejects a body that is not JSON with 400", async () => {
    const response = await handleContact(post("name=Ada"), deps());

    expect(response.status).toBe(400);
    expect((await response.json()).ok).toBe(false);
  });

  it("rejects an oversized body with 413 without emailing", async () => {
    const huge = { ...VALID_MESSAGE, message: "x".repeat(40_000) };

    const response = await handleContact(post(huge), deps());

    expect(response.status).toBe(413);
    expect(resendFetch).not.toHaveBeenCalled();
  });

  it("returns field errors when validation fails", async () => {
    const response = await handleContact(post({ ...VALID_MESSAGE, email: "not-an-email" }), deps());
    const body = await response.json();

    expect(response.status).toBe(400);
    expect(body.fields.email).toBeDefined();
    expect(resendFetch).not.toHaveBeenCalled();
  });

  it("answers honeypot submissions exactly like real ones but sends nothing", async () => {
    const response = await handleContact(post({ ...VALID_MESSAGE, website: "spam.example" }), deps());

    expect(response.status).toBe(200);
    expect(await response.json()).toEqual({ ok: true });
    expect(resendFetch).not.toHaveBeenCalled();
  });

  it("drops honeypot submissions before field validation can reveal the trap", async () => {
    const bot = { ...VALID_MESSAGE, email: "not-an-email", website: "x".repeat(500) };

    const response = await handleContact(post(bot), deps());

    expect(response.status).toBe(200);
    expect(resendFetch).not.toHaveBeenCalled();
  });

  it("still sends when an autofill puts only whitespace in the honeypot", async () => {
    const response = await handleContact(post({ ...VALID_MESSAGE, website: "  " }), deps());

    expect(response.status).toBe(200);
    expect(resendFetch).toHaveBeenCalledTimes(1);
  });

  it("rejects a declared Content-Length over the cap with 413", async () => {
    const response = await handleContact(post(VALID_MESSAGE, { "Content-Length": "999999" }), deps());

    expect(response.status).toBe(413);
    expect(resendFetch).not.toHaveBeenCalled();
  });

  it("stops reading an undeclared streamed body once it passes the cap", async () => {
    const upload = streamedPost(10 * 1024 * 1024);

    const response = await handleContact(upload.request, deps());

    expect(response.status).toBe(413);
    expect(upload.pulled()).toBeLessThan(256 * 1024);
  });

  it("rejects bodies not sent as JSON with 415, blocking cross-site form posts", async () => {
    const response = await handleContact(post(VALID_MESSAGE, { "Content-Type": "text/plain" }), deps());

    expect(response.status).toBe(415);
    expect(resendFetch).not.toHaveBeenCalled();
  });

  it("rejects submissions from another origin with 403", async () => {
    const response = await handleContact(post(VALID_MESSAGE, { Origin: "https://evil.example" }), deps());

    expect(response.status).toBe(403);
    expect(resendFetch).not.toHaveBeenCalled();
  });

  it("accepts submissions from the site's own origin", async () => {
    const response = await handleContact(post(VALID_MESSAGE, { Origin: "https://amadouniang.dev" }), deps());

    expect(response.status).toBe(200);
  });

  it("keeps the form working when the rate limiter itself fails", async () => {
    const limiter = { limit: vi.fn<RateLimiter["limit"]>(async () => Promise.reject(new Error("binding down"))) };

    const response = await handleContact(post(VALID_MESSAGE), deps({ limiter }));

    expect(response.status).toBe(200);
  });

  it("returns a generic 500 when Resend cannot be reached", async () => {
    resendFetch.mockImplementation(async () => Promise.reject(new TypeError("fetch failed")));

    const response = await handleContact(post(VALID_MESSAGE), deps());

    expect(response.status).toBe(500);
  });

  it("marks JSON responses nosniff so browsers never reinterpret them", async () => {
    const response = await handleContact(post(VALID_MESSAGE), deps());

    expect(response.headers.get("X-Content-Type-Options")).toBe("nosniff");
  });

  it("returns 429 once the visitor's IP exceeds the rate limit", async () => {
    const limiter = limiterReturning(false);

    const response = await handleContact(post(VALID_MESSAGE), deps({ limiter }));

    expect(response.status).toBe(429);
    expect(limiter.limit).toHaveBeenCalledWith({ key: VISITOR_IP });
    expect(resendFetch).not.toHaveBeenCalled();
  });

  it("still sends when no rate limiter is bound", async () => {
    const response = await handleContact(post(VALID_MESSAGE), deps({ limiter: undefined }));

    expect(response.status).toBe(200);
  });

  it("returns a generic 500 when the Resend key is missing", async () => {
    const response = await handleContact(post(VALID_MESSAGE), deps({ env: {} }));
    const body = await response.json();

    expect(response.status).toBe(500);
    expect(body.error).not.toMatch(/RESEND_API_KEY/);
    expect(resendFetch).not.toHaveBeenCalled();
  });

  it("hides Resend's rejection reason from the visitor", async () => {
    resendFetch.mockImplementation(
      async () => new Response(JSON.stringify({ message: "domain is not verified" }), { status: 403 }),
    );

    const response = await handleContact(post(VALID_MESSAGE), deps());
    const body = await response.json();

    expect(response.status).toBe(500);
    expect(body.error).not.toMatch(/domain/);
  });
});
