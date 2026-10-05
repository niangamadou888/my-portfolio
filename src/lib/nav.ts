import type { Lang, UiKey } from "@/i18n/ui";
import { localizePath, t } from "@/i18n/utils";

export interface NavItem {
  readonly label: string;
  readonly href: string;
  readonly active: boolean;
  /** The current page is this item's own page (not a page inside its section, not a link to a home-page section). */
  readonly exact: boolean;
}

interface NavDefinition {
  readonly key: UiKey;
  readonly path: string;
  readonly hash?: string;
  /** English-form path prefix that marks this item as the current section. */
  readonly section: string;
}

const NAV: readonly NavDefinition[] = [
  { key: "nav.work", path: "/work/", section: "/work/" },
  { key: "nav.services", path: "/", hash: "services", section: "/services/" },
  { key: "nav.about", path: "/about/", section: "/about/" },
  { key: "nav.contact", path: "/contact/", section: "/contact/" },
];

export function navItems(lang: Lang, currentPath: string): NavItem[] {
  return NAV.map((item) => ({
    label: t(lang, item.key),
    href: `${localizePath(item.path, lang)}${item.hash ? `#${item.hash}` : ""}`,
    active: currentPath.startsWith(item.section),
    exact: !item.hash && currentPath === item.path,
  }));
}
