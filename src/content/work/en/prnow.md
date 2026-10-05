---
title: "PRNow — press release distribution platform"
summary: "Lead developer of PRNow, a self-serve press release platform: AI writer, premium outlet add-ons, partner automation, branded reports and a public API."
role: "Lead developer (for a client)"
period: "Aug 2025 – present"
named: true
liveUrl: "https://prnow.io"
featured: 1
order: 1
stack: ["Next.js 15", "React 19", "TypeScript", "MariaDB", "Tailwind CSS", "DeepSeek & Gemini", "Cloudflare"]
facts:
  - value: "11"
    label: "premium add-ons on sale, including AP News, Yahoo Finance and MarketWatch"
    source: "https://prnow.io/api/pricing"
  - value: "5"
    label: "self-serve plans, from free to agency"
    source: "https://prnow.io/api/pricing"
  - value: "v1"
    label: "public REST API with Swagger docs"
    source: "https://prnow.io/api-docs"
  - value: "1,000+"
    label: "automated test files"
    source: "repo:prnow"
image: "../../../assets/work/prnow.png"
imageAlt: "PRNow homepage"
service: "press-release-platforms"
---

## The product

PRNow lets businesses, agencies and resellers publish a press release without talking to a salesperson. You write the release (or let the AI writer draft it), pick a plan and any premium outlets, and pay. The platform distributes it, collects the live placement links and sends a branded report.

## My role

I've been the lead developer since August 2025. The project started as a generated homepage mock-up; I built everything behind it: accounts, orders, payments, distribution, reporting, support and the admin back office. I work directly with the owner on priorities and ship most changes as reviewed pull requests — around 545 so far.

## What I built

- **AI press release writer.** Drafts grounded in live web-search references, with keyword data, SEO and "LLM-readiness" checks, and a fallback across several model providers so one outage doesn't stop customers.
- **Order pipeline.** Per-package status tracking, refunds to a credit ledger, automatic cancel-and-refund for orders that stall, and a duplicate-title guard.
- **Partner fulfilment automation.** Orders are submitted to wholesale distribution partners automatically, tracked, and their placement links harvested back into the order.
- **Branded reports.** Web, PDF and Excel reports, including white-label report domains for agencies.
- **Checkout.** Cards, Apple Pay and Google Pay, saved cards and crypto, with idempotent order IDs so a retry can never charge twice.
- **Support desk.** Tickets from email, Telegram and partner threads land in one inbox. AI drafts replies from the knowledge base and past tickets; a person always reviews before anything is sent.
- **Growth tools.** Built-in email campaigns with A/B variants and paced sending, admin analytics, and about 17 free SEO and PR tools.
- **The network around it.** Orders also fan out, through HMAC-signed webhooks, to a five-site newsroom network I built, and a white-label storefront lets resellers run their own branded PR shop on top of the API.

## Hard problems

- **Moving off Vercel without downtime.** I moved the app to a VPS behind Cloudflare, rebuilt the scheduled jobs as system timers, and fixed client-IP handling so a forged header can't bypass rate limits.
- **An admin page that shipped an estimated 80 MB.** The release list loaded every field of every release. I slimmed the list payload and load details on demand.
- **AI that fails gracefully.** Provider errors are classified and retried with jitter, and customers see a plain message instead of a vendor error.
