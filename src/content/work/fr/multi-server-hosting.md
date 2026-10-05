---
title: "Un seul panneau de déploiement pour 13 serveurs de production"
summary: "Réunir 13 serveurs et leurs applications sous un panneau Dokploy auto-hébergé, puis migrer 11 applications en production en deux jours, sans interruption."
role: "Responsable infrastructure (pour un client)"
period: "Sept. – oct. 2026"
named: false
order: 4
stack: ["Dokploy", "Docker Swarm", "Traefik", "nginx", "Caddy", "Bash", "bats"]
facts:
  - value: "13"
    label: "serveurs reliés à un seul panneau"
    source: "repo:infra"
  - value: "11"
    label: "applications en production migrées en deux jours, sans interruption"
    source: "repo:infra"
  - value: "24"
    label: "commandes dans l'outil en ligne de commande de la flotte"
    source: "repo:infra"
  - value: "402"
    label: "tests automatisés pour l'outillage"
    source: "repo:infra"
---

## La situation

Les produits d'un client étaient répartis sur 13 serveurs chez quatre hébergeurs, chacun configuré à la main : nginx ici, Caddy là, des applications lancées avec pm2 ou systemd. Déployer voulait dire SSH et mémoire.

## Ce que j'ai fait

- **Lire avant d'installer.** L'installateur standard de Dokploy se serait arrêté sur des ports occupés, aurait fait quitter leur cluster aux serveurs et laissé son proxy s'emparer des ports 80 et 443 au démarrage — faisant tomber tous les sites. J'ai donc relié chaque serveur *à côté* de son serveur web existant, avec le proxy du panneau sur un port local et des garde-fous pour qu'il ne prenne jamais les ports publics.
- **Un outil de flotte.** 24 commandes pour les instantanés, les comparaisons avant/après, les sondes de ports externes, le rattachement des serveurs et le déplacement des applications.
- **Des migrations sans risque.** Chaque application est déployée en parallèle, testée contre la copie en service pour chaque domaine, puis seulement basculée ; l'ancienne copie reste sept jours et le retour arrière prend quelques secondes. Les secrets sont comparés par empreinte et jamais affichés.
- **Les vraies IP des clients.** J'ai corrigé la gestion des IP à travers le saut de proxy supplémentaire pour que limites de débit et journaux restent justes.

## Résultat

Les 13 serveurs sont dans un seul panneau, et 11 applications de production — backends SaaS, sites Next.js et API — ont été migrées en deux jours, avec des réponses vérifiées identiques avant et après. Au passage, j'ai repéré et consigné un certificat expiré et un service de mise à jour système bloqué depuis 165 jours.
