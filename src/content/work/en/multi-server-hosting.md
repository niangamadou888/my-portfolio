---
title: "One deploy panel for 13 production servers"
summary: "Put 13 servers and their apps under one self-hosted Dokploy panel, then moved 11 live apps over in two days with zero downtime."
role: "Infrastructure lead (for a client)"
period: "Sep – Oct 2026"
named: false
order: 4
stack: ["Dokploy", "Docker Swarm", "Traefik", "nginx", "Caddy", "Bash", "bats"]
facts:
  - value: "13"
    label: "servers attached to one panel"
    source: "repo:infra"
  - value: "11"
    label: "live apps moved in two days, with no downtime"
    source: "repo:infra"
  - value: "24"
    label: "commands in the fleet CLI"
    source: "repo:infra"
  - value: "402"
    label: "automated tests for the tooling"
    source: "repo:infra"
---

## The situation

A client's products were spread over 13 servers at four hosting providers, each set up by hand: nginx here, Caddy there, apps started with pm2 or systemd. Deploying meant SSH and memory.

## What I did

- **Read before installing.** Dokploy's stock installer would have stopped on busy ports, left the servers' cluster, and let its proxy grab ports 80 and 443 at boot — taking every site down. Instead I attached each server *alongside* its existing web server, with the panel's proxy bound to a local port and guards so it can never take the public ports.
- **A fleet CLI.** 24 commands for snapshots, before/after diffs, external port probes, attaching servers and moving apps.
- **Safe app moves.** Each app is deployed side by side, tested against the running copy for every domain, and only then switched over; the old copy stays for seven days and rollback takes seconds. Secrets are compared by hash and never printed.
- **Real client IPs.** I fixed IP handling through the extra proxy hop so rate limits and logs stay correct.

## Result

All 13 servers sit in one panel, and 11 production apps — SaaS backends, Next.js sites and APIs — moved over in two days, with responses checked identical before and after. Along the way I found and logged an expired certificate and a system updater that had been stuck for 165 days.
