import { ui, type Lang, type UiKey } from "./ui";

const FR_PREFIX = "/fr";

export function t(lang: Lang, key: UiKey): string {
  return ui[lang][key];
}

/** Guarantees a leading and a trailing slash: "about" -> "/about/". */
export function normalizePath(path: string): string {
  const withLeading = path.startsWith("/") ? path : `/${path}`;
  return withLeading.endsWith("/") ? withLeading : `${withLeading}/`;
}

export function langFromPath(pathname: string): Lang {
  const path = normalizePath(pathname);
  return path === `${FR_PREFIX}/` || path.startsWith(`${FR_PREFIX}/`) ? "fr" : "en";
}

/** "/fr/work/" -> "/work/"; English paths come back normalized. */
export function stripLang(pathname: string): string {
  const path = normalizePath(pathname);
  return langFromPath(path) === "fr" ? path.slice(FR_PREFIX.length) : path;
}

export function localizePath(path: string, lang: Lang): string {
  const base = stripLang(path);
  return lang === "fr" ? `${FR_PREFIX}${base}` : base;
}

export function otherLang(lang: Lang): Lang {
  return lang === "en" ? "fr" : "en";
}
