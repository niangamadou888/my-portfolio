import { LANGS } from "@/i18n/ui";
import { parseEntryId } from "./entry-id";

export interface WorkRuleInput {
  readonly named: boolean;
  readonly liveUrl?: string;
  readonly image?: unknown;
  readonly imageAlt?: string;
}

/** The spec's naming rule: unnamed work never links to or shows the product. */
export function workRuleErrors(data: WorkRuleInput): string[] {
  return [
    data.named && !data.liveUrl ? "Named case studies need a liveUrl." : null,
    !data.named && data.liveUrl ? "Unnamed case studies must not link to the product." : null,
    !data.named && data.image ? "Unnamed case studies must not show a screenshot." : null,
    data.named && data.image && !data.imageAlt ? "Screenshots need imageAlt." : null,
  ].filter((message): message is string => message !== null);
}

/** Every slug must exist in every language; returns the missing "<lang>/<slug>" ids. */
export function missingTranslations(ids: readonly string[]): string[] {
  const entries = ids.map(parseEntryId);
  const slugs = [...new Set(entries.map((entry) => entry.slug))];
  return slugs.flatMap((slug) =>
    LANGS.filter((lang) => !entries.some((entry) => entry.slug === slug && entry.lang === lang)).map(
      (lang) => `${lang}/${slug}`,
    ),
  );
}
