---
title: "PRNow — plateforme de distribution de communiqués de presse"
summary: "Développeur principal de PRNow : rédacteur IA, options médias premium, automatisation des partenaires, rapports à la marque du client et API publique."
role: "Développeur principal (pour un client)"
period: "Août 2025 – aujourd'hui"
named: true
liveUrl: "https://prnow.io"
featured: 1
order: 1
stack: ["Next.js 15", "React 19", "TypeScript", "MariaDB", "Tailwind CSS", "DeepSeek & Gemini", "Cloudflare"]
facts:
  - value: "11"
    label: "options médias premium en vente, dont AP News, Yahoo Finance et MarketWatch"
    source: "https://prnow.io/api/pricing"
  - value: "5"
    label: "offres en libre-service, du gratuit à l'agence"
    source: "https://prnow.io/api/pricing"
  - value: "v1"
    label: "API REST publique documentée avec Swagger"
    source: "https://prnow.io/api-docs"
  - value: "1\u00A0000+"
    label: "fichiers de tests automatisés"
    source: "repo:prnow"
image: "../../../assets/work/prnow.png"
imageAlt: "Page d'accueil de PRNow"
service: "press-release-platforms"
---

## Le produit

PRNow permet aux entreprises, aux agences et aux revendeurs de publier un communiqué de presse sans passer par un commercial. On rédige le communiqué (ou on laisse le rédacteur IA proposer un premier jet), on choisit une offre et des médias premium, puis on paie. La plateforme diffuse le communiqué, récupère les liens de publication et envoie un rapport à l'image du client.

## Mon rôle

Je suis le développeur principal depuis août 2025. Le projet est parti d'une maquette de page d'accueil générée ; j'ai construit tout ce qu'il y a derrière : comptes, commandes, paiements, diffusion, rapports, support et back-office. Je travaille directement avec le propriétaire sur les priorités et je livre l'essentiel des changements par pull requests relues — environ 545 à ce jour.

## Ce que j'ai construit

- **Rédacteur IA de communiqués.** Des brouillons appuyés sur des recherches web en direct, avec données de mots-clés, contrôles SEO et « préparation aux LLM », et un repli entre plusieurs fournisseurs de modèles pour qu'une panne n'arrête pas les clients.
- **Chaîne de commande.** Suivi par offre, remboursements sur un registre de crédits, annulation et remboursement automatiques des commandes bloquées, et protection contre les titres en double.
- **Automatisation des partenaires.** Les commandes sont transmises automatiquement aux partenaires de diffusion, suivies, et leurs liens de publication sont rapatriés dans la commande.
- **Rapports à la marque du client.** Rapports web, PDF et Excel, y compris des domaines de rapport en marque blanche pour les agences.
- **Paiement.** Carte, Apple Pay et Google Pay, cartes enregistrées et crypto, avec des identifiants de commande idempotents pour qu'un nouvel essai ne débite jamais deux fois.
- **Support client.** Les tickets venus de l'e-mail, de Telegram et des échanges avec les partenaires arrivent dans une seule boîte. L'IA propose des réponses à partir de la base de connaissances et des tickets passés ; une personne relit toujours avant l'envoi.
- **Outils de croissance.** Campagnes e-mail intégrées avec variantes A/B et envoi cadencé, statistiques d'administration, et environ 17 outils SEO et RP gratuits.
- **Le réseau autour.** Les commandes sont aussi diffusées, via des webhooks signés HMAC, vers un réseau de cinq sites d'actualités que j'ai construit, et une vitrine en marque blanche permet aux revendeurs de tenir leur propre boutique RP sur l'API.

## Problèmes difficiles

- **Quitter Vercel sans interruption.** J'ai déplacé l'application sur un VPS derrière Cloudflare, transformé les tâches planifiées en minuteries système et corrigé la détection de l'IP client pour qu'un en-tête falsifié ne contourne pas les limites de débit.
- **Une page d'admin d'environ 80 Mo.** La liste des communiqués chargeait tous les champs de tous les communiqués. J'ai allégé la liste et chargé le détail à la demande.
- **Une IA qui échoue proprement.** Les erreurs des fournisseurs sont classées et relancées avec un délai aléatoire, et le client voit un message clair au lieu d'une erreur technique.
