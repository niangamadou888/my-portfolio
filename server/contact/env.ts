export interface ContactEnv {
  readonly resendApiKey: string;
  readonly toEmail: string;
  readonly fromEmail: string;
}

/** The raw bindings a Worker receives; every value is optional until checked. */
export interface ContactEnvSource {
  readonly RESEND_API_KEY?: string;
  readonly CONTACT_TO_EMAIL?: string;
  readonly CONTACT_FROM_EMAIL?: string;
}

export class MissingEnvError extends Error {
  constructor(name: string) {
    super(`Missing required environment variable: ${name}`);
    this.name = "MissingEnvError";
  }
}

/** Sender must sit on a domain verified in Resend, otherwise the API rejects it. */
const DEFAULT_FROM_EMAIL = "Portfolio <contact@amadouniang.dev>";
const DEFAULT_TO_EMAIL = "amadouniang2001@gmail.com";

/**
 * Read at request time rather than module scope so a missing key surfaces as a
 * handled 500 on one request instead of failing every request to the Worker.
 */
export function readContactEnv(source: ContactEnvSource): ContactEnv {
  const resendApiKey = source.RESEND_API_KEY?.trim();

  if (!resendApiKey) {
    throw new MissingEnvError("RESEND_API_KEY");
  }

  return {
    resendApiKey,
    toEmail: source.CONTACT_TO_EMAIL?.trim() || DEFAULT_TO_EMAIL,
    fromEmail: source.CONTACT_FROM_EMAIL?.trim() || DEFAULT_FROM_EMAIL,
  };
}
