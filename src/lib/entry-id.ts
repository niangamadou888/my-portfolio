import { LANGS, type Lang } from "@/i18n/ui";

export interface EntryIdParts {
  readonly lang: Lang;
  readonly slug: string;
}

const isLang = (value: string): value is Lang => (LANGS as readonly string[]).includes(value);

/** Content files live at <collection>/<en|fr>/<slug>.md, so ids look like "fr/prnow". */
export function parseEntryId(id: string): EntryIdParts {
  const [lang = "", slug = "", ...rest] = id.split("/");
  if (!isLang(lang) || slug === "" || rest.length > 0) {
    throw new Error(`Content entry "${id}" must live at <en|fr>/<slug>.md`);
  }
  return { lang, slug };
}
