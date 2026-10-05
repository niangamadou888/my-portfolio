---
title: "Podcast Transcript AI — la transcription à grande échelle"
summary: "Reprise et refonte de Podcast Transcript AI : Whisper auto-hébergé sur GPU et bibliothèque publique de 52\u00A0700+ transcriptions en 73 langues."
role: "Développeur principal (projet repris en 2025)"
period: "Sept. 2025 – aujourd'hui"
named: true
liveUrl: "https://podcasttranscript.ai"
featured: 3
order: 3
stack: ["Next.js", "Node.js", "Express", "MongoDB", "whisper.cpp", "Meilisearch", "DeepSeek"]
facts:
  - value: "52\u00A0700+"
    label: "transcriptions publiques dans la bibliothèque (octobre 2026)"
    source: "https://backend.podcasttranscript.ai/library/stats"
  - value: "41\u00A0000+"
    label: "heures d'audio transcrites dans la bibliothèque"
    source: "https://backend.podcasttranscript.ai/library/stats"
  - value: "73"
    label: "langues représentées"
    source: "https://backend.podcasttranscript.ai/api/v1/languages"
  - value: "3\u00A0200+"
    label: "tests côté serveur"
    source: "repo:transcript-back-v2"
image: "../../../assets/work/podcasttranscript.png"
imageAlt: "Page d'accueil de Podcast Transcript AI"
service: "ai-transcription-apps"
---

## Le produit

Collez le lien d'un podcast Apple Podcasts, Spotify ou RSS et obtenez la transcription, un résumé, des chapitres et une FAQ. Les transcriptions sont publiées dans une bibliothèque publique consultable, et les développeurs peuvent utiliser le même moteur via une API payante.

## Mon rôle

Un autre développeur a construit la première version. J'ai repris le projet en septembre 2025 et j'ai écrit presque tout le code depuis — environ 576 des 593 commits du backend —, dont le passage à une transcription auto-hébergée.

## Ce que j'ai construit

- **Transcription auto-hébergée.** J'ai remplacé une API payante de reconnaissance vocale par whisper.cpp sur notre propre serveur GPU, avec trois tailles de modèle.
- **Une file d'attente sur deux serveurs.** Les tâches vivent dans MongoDB avec des niveaux payant, gratuit et robot ; les workers des deux machines les réservent, se rétablissent après un plantage et ne dépassent jamais ce que la mémoire du GPU permet.
- **Les longs fichiers audio.** Les fichiers sont découpés en morceaux avec leur propre budget de temps, les horodatages sont recousus, et la progression affichée est réelle.
- **Une IA aux coûts maîtrisés.** Les résumés passent par un modèle local ou hébergé, avec un plafond de dépense quotidien — ajouté après un incident où un solde d'API vide a publié 531 transcriptions sans résumé.
- **Une bibliothèque qui grandit toute seule.** Un robot lit les classements, trouve le flux de chaque émission et transcrit les anciens épisodes quand le GPU est libre, pour que les clients payants passent toujours en premier.
- **Retrouver l'audio.** Quand une plateforme bloque le téléchargement, une chaîne de secours cherche d'autres sources publiques et retrouve l'épisode grâce à sa durée.
- **D'autres fonctionnalités.** Identification des intervenants, recherche dans toutes les transcriptions, discussion avec un épisode, exports PDF/SRT/VTT, export vers Notion et Obsidian, et une API publique avec des forfaits de crédits.
- **Une deuxième marque sur le même backend.** Un produit de transcription jumeau tourne sur ce backend avec des comptes, des sessions et des paiements isolés.

## Problèmes difficiles

- **Un nettoyage qui gelait le serveur.** La suppression des lignes répétées par Whisper était quadratique et bloquait le serveur plusieurs minutes sur les longs épisodes ; je l'ai réécrite pour qu'elle s'exécute en temps borné.
- **Une facturation toujours juste.** Les remboursements de l'API sont réservés une seule fois, et un registre en ajout seul trace chaque mouvement de crédit.
