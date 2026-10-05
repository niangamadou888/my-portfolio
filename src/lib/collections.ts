import { getCollection, type CollectionEntry } from "astro:content";
import type { Lang } from "@/i18n/ui";
import { missingTranslations } from "./content-rules";
import { parseEntryId } from "./entry-id";

export type WorkEntry = CollectionEntry<"work">;
export type ServiceEntry = CollectionEntry<"services">;

export const slugOf = (entry: { id: string }): string => parseEntryId(entry.id).slug;

function assertComplete(collection: string, ids: readonly string[]): void {
  const missing = missingTranslations(ids);
  if (missing.length > 0) {
    throw new Error(`${collection}: missing translations for ${missing.join(", ")}`);
  }
}

const byOrder = <T extends { data: { order: number } }>(a: T, b: T): number => a.data.order - b.data.order;

export async function getWork(lang: Lang): Promise<WorkEntry[]> {
  const all = await getCollection("work");
  assertComplete("work", all.map((entry) => entry.id));
  return all.filter((entry) => parseEntryId(entry.id).lang === lang).sort(byOrder);
}

export async function getServices(lang: Lang): Promise<ServiceEntry[]> {
  const all = await getCollection("services");
  assertComplete("services", all.map((entry) => entry.id));
  return all.filter((entry) => parseEntryId(entry.id).lang === lang).sort(byOrder);
}

export async function getWorkBySlug(lang: Lang, slug: string): Promise<WorkEntry> {
  const entry = (await getWork(lang)).find((candidate) => slugOf(candidate) === slug);
  if (!entry) throw new Error(`No work entry ${lang}/${slug}`);
  return entry;
}

export async function workPaths(lang: Lang) {
  return (await getWork(lang)).map((entry) => ({ params: { slug: slugOf(entry) }, props: { entry } }));
}

export async function servicePaths(lang: Lang) {
  return (await getServices(lang)).map((entry) => ({ params: { slug: slugOf(entry) }, props: { entry } }));
}
