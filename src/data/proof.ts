import type { Localized } from "@/i18n/ui";

export interface ProofItem {
  readonly value: Localized;
  readonly label: Localized;
  /** Same sources as the matching case-study facts; checked by scripts/check-sources.mjs. */
  readonly source: string;
  /** English-form path of the case study the number comes from. */
  readonly href: string;
}

export const PROOF: readonly ProofItem[] = [
  {
    value: { en: "52,700+", fr: "52\u00A0700+" },
    label: { en: "public transcripts on Podcast Transcript AI", fr: "transcriptions publiques sur Podcast Transcript AI" },
    source: "https://backend.podcasttranscript.ai/library/stats",
    href: "/work/podcasttranscript/",
  },
  {
    value: { en: "24", fr: "24" },
    label: { en: "languages served by SmsApp", fr: "langues servies par SmsApp" },
    source: "https://smsapp.io",
    href: "/work/smsapp/",
  },
  {
    value: { en: "11", fr: "11" },
    label: { en: "premium add-ons on sale on PRNow", fr: "options médias premium en vente sur PRNow" },
    source: "https://prnow.io/api/pricing",
    href: "/work/prnow/",
  },
  {
    value: { en: "13", fr: "13" },
    label: { en: "production servers on one deploy panel", fr: "serveurs de production sur un seul panneau" },
    source: "repo:infra",
    href: "/work/multi-server-hosting/",
  },
];
