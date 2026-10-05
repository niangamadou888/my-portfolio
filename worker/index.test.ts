import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import worker, { type Env } from "./index";

const JSON_HEADERS = { "Content-Type": "application/json" };

const assetResponse = () => new Response("<!doctype html><title>Home</title>", { status: 200 });

const makeEnv = (overrides: Partial<Env> = {}): Env => ({
  ASSETS: { fetch: vi.fn(async () => assetResponse()) },
  RESEND_API_KEY: "re_test_key",
  ...overrides,
});

beforeEach(() => {
  vi.stubGlobal("fetch", vi.fn(async () => new Response(JSON.stringify({ id: "email_1" }))));
  vi.spyOn(console, "info").mockImplementation(() => {});
});

afterEach(() => {
  vi.unstubAllGlobals();
  vi.restoreAllMocks();
});

describe("worker fetch", () => {
  it("sends POST /api/contact to the contact handler, not to static assets", async () => {
    const env = makeEnv();
    const request = new Request("https://amadouniang.dev/api/contact", { method: "POST", headers: JSON_HEADERS, body: "{}" });

    const response = await worker.fetch(request, env);

    expect(response.status).toBe(400);
    expect(env.ASSETS.fetch).not.toHaveBeenCalled();
  });

  it("hands the rate limiter binding to the contact handler", async () => {
    const limiter = { limit: vi.fn(async () => ({ success: false })) };
    const request = new Request("https://amadouniang.dev/api/contact", { method: "POST", headers: JSON_HEADERS, body: "{}" });

    const response = await worker.fetch(request, makeEnv({ CONTACT_RATE_LIMITER: limiter }));

    expect(response.status).toBe(429);
  });

  it("serves every other path from static assets", async () => {
    const env = makeEnv();
    const request = new Request("https://amadouniang.dev/missing-page");

    const response = await worker.fetch(request, env);

    expect(env.ASSETS.fetch).toHaveBeenCalledWith(request);
    expect(response.status).toBe(200);
  });
});

describe("worker fetch, non-POST", () => {
  it("answers GET /api/contact with 405 instead of serving a page", async () => {
    const env = makeEnv();

    const response = await worker.fetch(new Request("https://amadouniang.dev/api/contact"), env);

    expect(response.status).toBe(405);
    expect(env.ASSETS.fetch).not.toHaveBeenCalled();
  });
});
