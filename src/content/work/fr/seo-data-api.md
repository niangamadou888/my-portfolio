---
title: "Une API de données SEO unifiée"
summary: "Conception d'une API unique devant 10 fournisseurs de données SEO, avec cache, disjoncteurs, facturation à crédits et une migration sans risque."
role: "Développeur principal (pour un client)"
period: "Août – oct. 2026"
named: false
order: 5
stack: ["TypeScript", "Node.js", "Fastify", "MariaDB", "zod", "Dokploy"]
facts:
  - value: "10"
    label: "fournisseurs de données derrière une seule clé d'API"
    source: "repo:seo-api"
  - value: "29"
    label: "décisions de conception actées après une revue contradictoire"
    source: "repo:seo-api"
  - value: "1\u00A0700+"
    label: "tests automatisés"
    source: "repo:seo-api"
---

## Le problème

Les produits d'un client appelaient chacun Ahrefs, Similarweb et des API de résultats de recherche de leur côté. Le même adaptateur avait été copié six fois, un même identifiant vivait dans sept fichiers, et le « domain rating » portait cinq noms avec trois types différents.

## Ce que j'ai construit

- **Un seul contrat.** Un point d'accès et une clé renvoient domain rating, trafic, principaux pays, mots-clés, résultats de recherche, backlinks et statut d'indexation — chaque champ indique le fournisseur dont il vient, sans jamais être fusionné en silence.
- **De la résilience.** Un cache « stale-while-revalidate » sert la dernière bonne réponse (signalée) quand un fournisseur échoue ; les requêtes identiques sont regroupées en un seul appel ; des disjoncteurs cessent de solliciter un fournisseur qui nous rejette ; des délais imbriqués garantissent qu'un appel ne survit jamais au client qui l'attend.
- **Une adoption sans risque.** Un mode « ombre » permet à chaque produit d'appeler la nouvelle API en parallèle de son ancien code et de journaliser les écarts champ par champ avant de basculer.
- **Facturation intégrée.** Comptes, forfaits à crédits, packs prépayés, un vérificateur gratuit à débit limité et des webhooks de paiement.
- **Des traitements groupés.** Les grandes listes de domaines sont traitées en arrière-plan, avec une réservation des tâches en base qui permet à deux copies de tourner sans conflit pendant une migration.

## Résultat

Les produits du client disposent d'une intégration testée — environ 1 700 tests automatisés — pour remplacer six adaptateurs copiés, et le mode « ombre » permet à chacun de basculer sans risque. J'ai aussi mesuré l'usage réel des fournisseurs avant d'annoncer des économies — et corrigé ma propre estimation quand deux produits se sont révélés partager un seul abonnement.
