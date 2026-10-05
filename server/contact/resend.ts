const RESEND_ENDPOINT = "https://api.resend.com/emails";
const REQUEST_TIMEOUT_MS = 10_000;

export interface SendEmailInput {
  readonly from: string;
  readonly to: string;
  readonly subject: string;
  readonly html: string;
  readonly text: string;
  /** Set to the visitor's address so replying from Gmail reaches them directly. */
  readonly replyTo: string;
}

export class ResendError extends Error {
  constructor(message: string, readonly status?: number) {
    super(message);
    this.name = "ResendError";
  }
}

const extractErrorMessage = async (response: Response): Promise<string> => {
  try {
    const body = (await response.json()) as { message?: string; name?: string };
    return body.message ?? body.name ?? response.statusText;
  } catch {
    return response.statusText || `HTTP ${response.status}`;
  }
};

/**
 * Sends one email through Resend's REST API. Workers speak HTTPS natively,
 * so this is one fetch per message instead of an SMTP session.
 */
export async function sendEmail(apiKey: string, input: SendEmailInput): Promise<string> {
  const timeout = AbortSignal.timeout(REQUEST_TIMEOUT_MS);

  let response: Response;
  try {
    response = await fetch(RESEND_ENDPOINT, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: input.from,
        to: [input.to],
        subject: input.subject,
        html: input.html,
        text: input.text,
        reply_to: input.replyTo,
      }),
      signal: timeout,
    });
  } catch (error: unknown) {
    const reason = error instanceof Error ? error.message : "unknown network error";
    throw new ResendError(`Could not reach Resend: ${reason}`);
  }

  if (!response.ok) {
    throw new ResendError(await extractErrorMessage(response), response.status);
  }

  const body = (await response.json()) as { id?: string };
  if (!body.id) {
    throw new ResendError("Resend accepted the request but returned no email id");
  }

  return body.id;
}
