import type { ContactEnvSource } from "../server/contact/env";
import { handleContact, type RateLimiter } from "../server/contact/handler";

/**
 * Bindings declared in wrangler.jsonc. RESEND_API_KEY is a secret set in the
 * Cloudflare dashboard (or `wrangler secret put`), never committed.
 */
export interface Env extends ContactEnvSource {
  readonly ASSETS: { fetch(request: Request): Promise<Response> };
  readonly CONTACT_RATE_LIMITER?: RateLimiter;
}

const CONTACT_PATH = "/api/contact";

/**
 * Cloudflare serves any request that matches a built file straight from
 * static assets, so this only runs for paths with no file behind them.
 */
export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const { pathname } = new URL(request.url);

    if (pathname === CONTACT_PATH) {
      return handleContact(request, { env, limiter: env.CONTACT_RATE_LIMITER });
    }

    return env.ASSETS.fetch(request);
  },
};
