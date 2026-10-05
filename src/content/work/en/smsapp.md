---
title: "SmsApp — SMS verification platform"
summary: "Lead developer of SmsApp: virtual numbers for SMS verification in 24 languages, with a prepaid wallet, three payment providers and a public API."
role: "Lead developer (for a client)"
period: "Feb 2026 – present"
named: true
liveUrl: "https://smsapp.io"
featured: 2
order: 2
stack: ["React", "TypeScript", "Express", "MySQL", "Tailwind CSS", "Flutter", "DeepSeek"]
facts:
  - value: "24"
    label: "interface languages, including right-to-left Arabic and Hebrew"
    source: "https://smsapp.io"
  - value: "150+"
    label: "countries with numbers available"
    source: "https://backend.smsapp.io/api/public/countries"
  - value: "4,700+"
    label: "pages in its 24 language sitemaps"
    source: "https://smsapp.io/sitemap.xml"
  - value: "4,000+"
    label: "automated tests across server, web and mobile"
    source: "repo:smsapp-io"
image: "../../../assets/work/smsapp.png"
imageAlt: "SmsApp homepage"
service: "sms-verification-platforms"
---

## The product

SmsApp rents virtual phone numbers so people can receive a one-time verification code — for WhatsApp, Telegram, Gmail and 150+ other services — or keep a number for a month. Customers top up a prepaid wallet, and resellers can automate everything through a REST API.

## My role

I took over as lead developer in February 2026. My first big change was moving the backend from Firestore to MySQL; since then I've written about 99% of the code changes, from payments and fraud controls to the support desk and the multilingual SEO setup.

## What I built

- **A wallet that can't go negative.** Balance checks and debits happen in one atomic statement, and a failed purchase is refunded exactly once — this fixed a real bug where parallel purchases overdrew a wallet.
- **Automatic refunds.** If no code arrives, a background job refunds the customer; it survives crashes and can never pay twice.
- **Three payment providers.** Card and two crypto gateways, each with webhook verification designed so a forged callback can't credit an account.
- **Fraud controls.** 3-D Secure checks, card holds, shared-IP bans, chargeback tracking and ID-verification tickets.
- **Smart supplier routing.** Operators are ranked by delivery rate, price and stock, and a supplier is switched off automatically when its success rate collapses.
- **Monthly rentals.** Including shared numbers whose incoming SMS are routed to the right renter, and a free receive-only email inbox per rental.
- **Support.** Tickets from email and Telegram, with AI-drafted replies from a knowledge base and automatic language detection.
- **SEO in 24 languages.** Pre-rendered pages with translated URLs, titles and hreflang for every service and country.

## Hard problems

- **Payments you can't fake.** One provider's callbacks are unsigned, so they're treated only as a hint and re-checked against the provider's API before any credit.
- **Background jobs that can't double-pay.** The refund job uses a lock that frees itself if a run hangs, and every refund is claimed atomically.
