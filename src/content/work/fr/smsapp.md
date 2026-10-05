---
title: "SmsApp — plateforme de vérification par SMS"
summary: "Développeur principal de SmsApp : numéros virtuels pour la vérification SMS en 24 langues, portefeuille prépayé, trois moyens de paiement et API publique."
role: "Développeur principal (pour un client)"
period: "Févr. 2026 – aujourd'hui"
named: true
liveUrl: "https://smsapp.io"
featured: 2
order: 2
stack: ["React", "TypeScript", "Express", "MySQL", "Tailwind CSS", "Flutter", "DeepSeek"]
facts:
  - value: "24"
    label: "langues d'interface, dont l'arabe et l'hébreu écrits de droite à gauche"
    source: "https://smsapp.io"
  - value: "150+"
    label: "pays avec des numéros disponibles"
    source: "https://backend.smsapp.io/api/public/countries"
  - value: "4\u00A0700+"
    label: "pages dans ses 24 plans de site linguistiques"
    source: "https://smsapp.io/sitemap.xml"
  - value: "4\u00A0000+"
    label: "tests automatisés : serveur, web et mobile"
    source: "repo:smsapp-io"
image: "../../../assets/work/smsapp.png"
imageAlt: "Page d'accueil de SmsApp"
service: "sms-verification-platforms"
---

## Le produit

SmsApp loue des numéros de téléphone virtuels pour recevoir un code de vérification à usage unique — pour WhatsApp, Telegram, Gmail et plus de 150 autres services — ou pour garder un numéro tout un mois. Les clients rechargent un portefeuille prépayé, et les revendeurs peuvent tout automatiser grâce à une API REST.

## Mon rôle

J'ai repris le développement en tant que développeur principal en février 2026. Mon premier grand chantier a été de migrer le backend de Firestore vers MySQL ; depuis, j'ai écrit environ 99 % des changements de code, des paiements et de l'antifraude jusqu'au support et à la configuration SEO multilingue.

## Ce que j'ai construit

- **Un portefeuille qui ne passe jamais en négatif.** La vérification du solde et le débit se font en une seule requête atomique, et un achat raté est remboursé une seule fois — ce qui a corrigé un vrai bug où des achats simultanés mettaient un portefeuille dans le rouge.
- **Remboursements automatiques.** Si aucun code n'arrive, une tâche de fond rembourse le client ; elle résiste aux plantages et ne peut jamais payer deux fois.
- **Trois prestataires de paiement.** Carte et deux passerelles crypto, chacune avec une vérification des webhooks conçue pour qu'un rappel falsifié ne puisse créditer aucun compte.
- **Antifraude.** Contrôles 3-D Secure, blocages de carte, bannissement des IP partagées, suivi des rétrofacturations et tickets de vérification d'identité.
- **Routage intelligent des fournisseurs.** Les opérateurs sont classés selon le taux de réception, le prix et le stock, et un fournisseur est désactivé automatiquement quand son taux de succès s'effondre.
- **Locations mensuelles.** Y compris des numéros partagés dont les SMS entrants sont routés vers le bon locataire, et une boîte e-mail de réception gratuite par location.
- **Support.** Tickets par e-mail et Telegram, avec des réponses rédigées par l'IA à partir d'une base de connaissances et une détection automatique de la langue.
- **SEO en 24 langues.** Pages pré-générées avec URL, titres et hreflang traduits pour chaque service et chaque pays.

## Problèmes difficiles

- **Des paiements impossibles à truquer.** Les rappels d'un des prestataires ne sont pas signés : ils ne servent donc que d'indice et sont revérifiés auprès de l'API du prestataire avant tout crédit.
- **Des tâches de fond qui ne paient jamais deux fois.** La tâche de remboursement utilise un verrou qui se libère si une exécution se bloque, et chaque remboursement est réservé de façon atomique.
