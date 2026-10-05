---
title: "Podcast Transcript AI — transcription at scale"
summary: "Took over and rebuilt Podcast Transcript AI: self-hosted Whisper on a GPU server and a public library of 52,700+ transcripts in 73 languages."
role: "Lead developer (took over in 2025)"
period: "Sep 2025 – present"
named: true
liveUrl: "https://podcasttranscript.ai"
featured: 3
order: 3
stack: ["Next.js", "Node.js", "Express", "MongoDB", "whisper.cpp", "Meilisearch", "DeepSeek"]
facts:
  - value: "52,700+"
    label: "public transcripts in the library (October 2026)"
    source: "https://backend.podcasttranscript.ai/library/stats"
  - value: "41,000+"
    label: "hours of audio transcribed into the library"
    source: "https://backend.podcasttranscript.ai/library/stats"
  - value: "73"
    label: "languages represented"
    source: "https://backend.podcasttranscript.ai/api/v1/languages"
  - value: "3,200+"
    label: "backend tests"
    source: "repo:transcript-back-v2"
image: "../../../assets/work/podcasttranscript.png"
imageAlt: "Podcast Transcript AI homepage"
service: "ai-transcription-apps"
---

## The product

Paste a podcast link from Apple Podcasts, Spotify or RSS and get a transcript, summary, chapters and FAQs. Transcripts are published in a public, searchable library, and developers can use the same engine through a paid API.

## My role

Another developer built the first version. I took over in September 2025 and have written nearly all of the code since — about 576 of 593 backend commits — including the move to self-hosted transcription.

## What I built

- **Self-hosted transcription.** Replaced a paid speech-to-text API with whisper.cpp running on our own GPU server, with three model sizes.
- **A queue across two servers.** Jobs live in MongoDB with paid, free and crawler tiers; workers on two machines claim jobs, recover from crashes and never run more than the GPU's memory allows.
- **Long audio.** Files are split into chunks with their own time budgets, timestamps are stitched back together, and progress is real.
- **Cost-controlled AI.** Summaries route between a local model and a hosted one, with a daily spending cap — added after an outage in which an empty API balance published 531 transcripts without summaries.
- **A library that grows on its own.** A crawler reads the charts, finds each show's feed and transcribes back catalogues when the GPU is idle, so paying users always go first.
- **Finding the audio.** When a platform blocks downloads, a fallback chain searches other public sources and matches the episode by its duration.
- **More features.** Speaker labels, search across every transcript, chat with an episode, PDF/SRT/VTT exports, Notion and Obsidian export, and a public API with credit plans.
- **A second brand on the same backend.** A sister transcription product runs on this backend with isolated accounts, sessions and payments.

## Hard problems

- **A clean-up step that froze the server.** Removing Whisper's repeated lines was quadratic and blocked the server for minutes on long episodes; I rewrote it to run in bounded time.
- **Billing that's right every time.** API refunds are claimed exactly once, and an append-only ledger records every credit change.
