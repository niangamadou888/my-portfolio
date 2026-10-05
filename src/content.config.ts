import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";
import { workRuleErrors } from "./lib/content-rules";

const fact = z.object({
  value: z.string().min(1),
  label: z.string().min(1),
  /** A public https URL, or "repo:<id>" for the developer's own engineering record. */
  source: z.string().regex(/^(https:\/\/\S+|repo:[a-z0-9-]+)$/),
});

const work = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/work" }),
  schema: ({ image }) =>
    z
      .object({
        title: z.string().min(1),
        summary: z.string().min(50).max(160),
        role: z.string().min(1),
        period: z.string().min(1),
        named: z.boolean(),
        liveUrl: z.url().optional(),
        featured: z.number().int().positive().optional(),
        order: z.number().int().positive(),
        stack: z.array(z.string()).min(1),
        facts: z.array(fact).min(3).max(4),
        image: image().optional(),
        imageAlt: z.string().optional(),
        service: z.string().optional(),
      })
      .superRefine((data, ctx) => {
        for (const message of workRuleErrors(data)) ctx.addIssue({ code: "custom", message });
      }),
});

const services = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/services" }),
  schema: z.object({
    title: z.string().min(1),
    headline: z.string().min(1),
    summary: z.string().min(50).max(160),
    audience: z.string().min(1),
    order: z.number().int().positive(),
    proof: z.array(z.string()).min(1),
    features: z.array(z.string()).min(4),
    faq: z.array(z.object({ q: z.string().min(1), a: z.string().min(1) })).min(4).max(6),
  }),
});

export const collections = { work, services };
