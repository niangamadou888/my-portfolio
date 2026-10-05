---
title: "A unified SEO data API"
summary: "Designed and built one API in front of 10 SEO data providers, with caching, circuit breakers, credit-based billing and a safe migration path."
role: "Lead developer (for a client)"
period: "Aug – Oct 2026"
named: false
order: 5
stack: ["TypeScript", "Node.js", "Fastify", "MariaDB", "zod", "Dokploy"]
facts:
  - value: "10"
    label: "data providers behind one API key"
    source: "repo:seo-api"
  - value: "29"
    label: "binding design decisions recorded after an adversarial review"
    source: "repo:seo-api"
  - value: "1,700+"
    label: "automated tests"
    source: "repo:seo-api"
---

## The problem

A client's products each called Ahrefs, Similarweb and SERP APIs on their own. The same adapter had been copied six times, one credential lived in seven files, and "domain rating" had five names and three types.

## What I built

- **One contract.** A single endpoint and key return domain rating, traffic, top countries, keywords, search results, backlinks and index status — every field labelled with the provider it came from, never silently merged.
- **Resilience.** Stale-while-revalidate caching serves the last good answer (flagged) when a provider fails; identical requests are coalesced into one provider call; circuit breakers stop hammering a provider that's rejecting us; nested timeouts mean a provider call never outlives the client waiting for it.
- **Safe adoption.** A shadow mode lets each product call the new API alongside its old code and log field-level differences before switching over.
- **Billing built in.** Accounts, credit plans, prepaid packs, a rate-limited free checker and payment webhooks.
- **Batch jobs.** Large domain lists are processed in the background, with database job claims that let two copies run safely during a migration.

## Result

The client's products get one tested integration — about 1,700 automated tests — to replace six copied adapters, and shadow mode lets each one switch over safely. I also measured real provider usage before claiming savings — and corrected my own estimate when two products turned out to share one subscription.
