import type { Lang } from "@/i18n/ui";

export const SITE_URL = "https://amadouniang.dev";
export const PERSON_NAME = "Amadou Boubacar Niang";
export const EMAIL = "amadouniang2001@gmail.com";
export const GITHUB_URL = "https://github.com/niangamadou888/";
export const LINKEDIN_URL = "https://www.linkedin.com/in/amadou-boubacar-niang-09b973160/";
export const DEFAULT_OG_IMAGE = "/og-image.png";

/** Files in public/. Their names contain spaces, so links pass them through encodeURI. */
export const CV_PATHS: Readonly<Record<Lang, string>> = {
  en: "/Amadou Boubacar Niang - Resume.pdf",
  fr: "/Amadou Boubacar Niang - CV.pdf",
};
