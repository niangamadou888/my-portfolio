import type { Localized } from "@/i18n/ui";

export interface ExperienceItem {
  readonly title: Localized;
  readonly company: Localized;
  readonly location: Localized;
  readonly period: Localized;
  readonly description: Localized;
}

export const EXPERIENCE: readonly ExperienceItem[] = [
  {
    title: { en: "Lead Full-Stack Developer (contract)", fr: "Développeur full-stack principal (contrat)" },
    company: { en: "Client portfolio of web products", fr: "Portefeuille de produits web d'un client" },
    location: { en: "Remote", fr: "À distance" },
    period: { en: "Aug 2025 – present", fr: "Août 2025 – aujourd'hui" },
    description: {
      en: "Lead developer for a client's press release, SMS verification and AI transcription products: features, payments, infrastructure and support tooling.",
      fr: "Développeur principal des produits d'un client — distribution de communiqués de presse, vérification par SMS et transcription IA : fonctionnalités, paiements, infrastructure et outils de support.",
    },
  },
  {
    title: { en: "Web Developer Freelance", fr: "Développeur Web Freelance" },
    company: { en: "Upwork", fr: "Upwork" },
    location: { en: "Freelance", fr: "Freelance" },
    period: { en: "May 2024 – Jan 2026", fr: "Mai 2024 – Janvier 2026" },
    description: {
      en: "Design and programming of responsive and aesthetic websites.",
      fr: "Conception et programmation de solutions web réactives et esthétiques.",
    },
  },
  {
    title: { en: "Video Game Developer", fr: "Développeur Jeu Vidéo" },
    company: { en: "Learning Adventure", fr: "Learning Adventure" },
    location: { en: "France", fr: "France" },
    period: { en: "Jul 2024 – Dec 2024", fr: "Juil 2024 – Déc 2024" },
    description: {
      en: "Design and programming of a generic serious game interacting with a learning platform. Development in accordance with specifications, with server communication and scenario modularity.",
      fr: "Conception et programmation d'un serious game générique interagissant avec une plateforme d'apprentissage. Développement conforme au cahier des charges, avec communication serveur et modularité du scénario.",
    },
  },
  {
    title: { en: "Network Administrator", fr: "Administrateur Réseau" },
    company: { en: "SAED, Saint-Louis (Senegal)", fr: "SAED, Saint-Louis (Sénégal)" },
    location: { en: "Saint-Louis, Senegal", fr: "Saint-Louis, Sénégal" },
    period: { en: "Mar 2023 – Jun 2023", fr: "Mars 2023 – Juin 2023" },
    description: {
      en: "Network and system incident management. Installation and configuration of IT equipment. User assistance and training.",
      fr: "Gestion des incidents réseaux et systèmes. Installation et configuration des équipements informatiques. Assistance et formation des utilisateurs.",
    },
  },
  {
    title: { en: "Video Game Developer", fr: "Développeur Jeu Vidéo" },
    company: { en: "Hatice Technologie", fr: "Hatice Technologie" },
    location: { en: "Dakar", fr: "Dakar" },
    period: { en: "Mar 2022 – Jun 2022", fr: "Mars 2022 – Juin 2022" },
    description: {
      en: "Design and development of mobile games and software applications according to specifications.",
      fr: "Conception et développement de jeux mobiles et d'applications logicielles selon cahier des charges.",
    },
  },
];
