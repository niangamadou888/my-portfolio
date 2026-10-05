import type { Lang } from "@/i18n/ui";
import { localizePath } from "@/i18n/utils";
import { absoluteUrl } from "./seo";
import { EMAIL, GITHUB_URL, LINKEDIN_URL, PERSON_NAME, SITE_URL } from "./site";

type JsonLd = Record<string, unknown>;

const CONTEXT = "https://schema.org";
const PERSON_ID = `${SITE_URL}/#person`;

const personRef = (): JsonLd => ({ "@type": "Person", "@id": PERSON_ID, name: PERSON_NAME, url: `${SITE_URL}/` });

export function personJsonLd(): JsonLd {
  return {
    "@context": CONTEXT,
    ...personRef(),
    image: absoluteUrl("/logo.jpeg"),
    jobTitle: "Full-stack developer",
    email: `mailto:${EMAIL}`,
    sameAs: [GITHUB_URL, LINKEDIN_URL],
    knowsLanguage: ["en", "fr"],
    knowsAbout: ["Full-stack development", "SaaS", "TypeScript", "React", "Next.js", "Astro", "Node.js", "SEO", "AI integrations"],
  };
}

export function websiteJsonLd(lang: Lang): JsonLd {
  return {
    "@context": CONTEXT,
    "@type": "WebSite",
    name: PERSON_NAME,
    url: absoluteUrl(localizePath("/", lang)),
    inLanguage: lang,
    author: personRef(),
  };
}

interface PageInput {
  readonly name: string;
  readonly description: string;
  readonly path: string;
  readonly lang: Lang;
}

export function serviceJsonLd(input: PageInput): JsonLd {
  return {
    "@context": CONTEXT,
    "@type": "Service",
    name: input.name,
    serviceType: input.name,
    description: input.description,
    url: absoluteUrl(localizePath(input.path, input.lang)),
    areaServed: "Worldwide",
    availableLanguage: ["en", "fr"],
    provider: personRef(),
  };
}

export function caseStudyJsonLd(input: PageInput & { readonly image?: string }): JsonLd {
  return {
    "@context": CONTEXT,
    "@type": "CreativeWork",
    name: input.name,
    description: input.description,
    url: absoluteUrl(localizePath(input.path, input.lang)),
    inLanguage: input.lang,
    creator: personRef(),
    ...(input.image ? { image: absoluteUrl(input.image) } : {}),
  };
}

export function breadcrumbJsonLd(items: readonly { name: string; path: string }[]): JsonLd {
  return {
    "@context": CONTEXT,
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}
