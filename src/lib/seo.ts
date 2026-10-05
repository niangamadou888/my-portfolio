import type { Lang } from "@/i18n/ui";
import { localizePath } from "@/i18n/utils";
import { DEFAULT_OG_IMAGE, SITE_URL } from "./site";

export interface Alternate {
  readonly hreflang: "en" | "fr" | "x-default";
  readonly href: string;
}

export interface SeoInput {
  readonly lang: Lang;
  /** English-form path of the page, e.g. "/work/prnow/". */
  readonly path: string;
  readonly title: string;
  readonly description: string;
  readonly image?: string;
  readonly type?: "website" | "article";
  readonly jsonLd?: readonly object[];
}

export interface SeoTags {
  readonly title: string;
  readonly description: string;
  readonly canonical: string;
  readonly alternates: readonly Alternate[];
  readonly ogImage: string;
  readonly ogType: "website" | "article";
  readonly ogLocale: string;
  readonly ogLocaleAlternate: string;
  readonly jsonLd: readonly string[];
}

const OG_LOCALES: Readonly<Record<Lang, string>> = { en: "en_US", fr: "fr_FR" };

export const absoluteUrl = (path: string): string => new URL(path, SITE_URL).href;

/** JSON for a <script type="application/ld+json">; "<" is escaped so no value can close the tag. */
export const serializeJsonLd = (data: object): string => JSON.stringify(data).replace(/</g, "\\u003c");

export function buildSeo(input: SeoInput): SeoTags {
  const english = absoluteUrl(localizePath(input.path, "en"));
  const french = absoluteUrl(localizePath(input.path, "fr"));

  return {
    title: input.title,
    description: input.description,
    canonical: input.lang === "en" ? english : french,
    alternates: [
      { hreflang: "en", href: english },
      { hreflang: "fr", href: french },
      { hreflang: "x-default", href: english },
    ],
    ogImage: absoluteUrl(input.image ?? DEFAULT_OG_IMAGE),
    ogType: input.type ?? "website",
    ogLocale: OG_LOCALES[input.lang],
    ogLocaleAlternate: OG_LOCALES[input.lang === "en" ? "fr" : "en"],
    jsonLd: (input.jsonLd ?? []).map(serializeJsonLd),
  };
}
