import type { ContactMessage } from "../../src/lib/contact-schema";

/**
 * Every value below originates from a public form, so it is escaped before it
 * reaches the HTML body. Without this, a message containing markup would be
 * injected straight into the email client.
 */
const escapeHtml = (value: string): string =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");

/** Name and subject sit on one line; control characters could otherwise forge extra lines. */
// eslint-disable-next-line no-control-regex -- matching control characters is the purpose
const oneLine = (value: string): string => value.replace(/[\u0000-\u001f\u007f]+/g, " ").trim();

const toParagraphs = (message: string): string =>
  message
    .split(/\n{2,}/)
    .map(block => `<p style="margin:0 0 16px;">${escapeHtml(block).replace(/\n/g, "<br />")}</p>`)
    .join("");

export const buildSubject = ({ subject, name }: ContactMessage): string =>
  `[Portfolio] ${oneLine(subject)} — ${oneLine(name)}`;

export const buildTextBody = ({ name, email, subject, message }: ContactMessage): string =>
  [
    "New message from the portfolio contact form",
    "",
    `Name:    ${oneLine(name)}`,
    `Email:   ${email}`,
    `Subject: ${oneLine(subject)}`,
    "",
    "Message:",
    message,
    "",
    `Reply directly to this email to reach ${oneLine(name)}.`,
  ].join("\n");

export const buildHtmlBody = (contact: ContactMessage): string => {
  const { name, email, subject, message } = contact;

  const row = (label: string, value: string): string => `
    <tr>
      <td style="padding:6px 16px 6px 0;color:#6b7280;font-size:13px;white-space:nowrap;">${label}</td>
      <td style="padding:6px 0;color:#111827;font-size:14px;font-weight:500;">${value}</td>
    </tr>`;

  return `<!doctype html>
<html>
  <body style="margin:0;padding:24px;background:#f4f4f5;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;">
    <table role="presentation" cellpadding="0" cellspacing="0" style="max-width:600px;margin:0 auto;background:#ffffff;border-radius:12px;border:1px solid #e4e4e7;">
      <tr>
        <td style="padding:24px 28px 8px;border-bottom:1px solid #f1f1f4;">
          <p style="margin:0;font-size:12px;letter-spacing:.08em;text-transform:uppercase;color:#8b5cf6;font-weight:600;">
            Portfolio contact form
          </p>
          <h1 style="margin:8px 0 0;font-size:20px;color:#111827;font-weight:600;">
            ${escapeHtml(subject)}
          </h1>
        </td>
      </tr>
      <tr>
        <td style="padding:20px 28px 4px;">
          <table role="presentation" cellpadding="0" cellspacing="0">
            ${row("From", escapeHtml(name))}
            ${row("Email", `<a href="mailto:${encodeURI(email)}" style="color:#8b5cf6;text-decoration:none;">${escapeHtml(email)}</a>`)}
          </table>
        </td>
      </tr>
      <tr>
        <td style="padding:12px 28px 28px;color:#374151;font-size:15px;line-height:1.65;">
          ${toParagraphs(message)}
        </td>
      </tr>
      <tr>
        <td style="padding:16px 28px;background:#fafafa;border-top:1px solid #f1f1f4;border-radius:0 0 12px 12px;color:#9ca3af;font-size:12px;">
          Reply to this email to answer ${escapeHtml(name)} directly.
        </td>
      </tr>
    </table>
  </body>
</html>`;
};
