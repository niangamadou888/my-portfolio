import type { Localized } from "@/i18n/ui";

export interface EducationItem {
  readonly degree: Localized;
  readonly school: string;
  readonly location: Localized;
  readonly period: Localized;
  readonly description: Localized;
  readonly achievements: readonly Localized[];
}

export const EDUCATION: readonly EducationItem[] = [
  {
    degree: { en: "Master's degree in Software Engineering", fr: "Master en Ingénierie Logicielle" },
    school: "Université Numérique Cheikh Hamidou Kane",
    location: { en: "Dakar, Senegal", fr: "Dakar, Sénégal" },
    period: { en: "Ongoing", fr: "En cours" },
    description: {
      en: "Advanced studies in Software Engineering, focusing on modern software development practices and methodologies.",
      fr: "Études avancées en ingénierie logicielle, axées sur les pratiques et méthodologies modernes de développement.",
    },
    achievements: [
      { en: "Specializing in advanced software architecture", fr: "Spécialisation en architectures logicielles avancées" },
      { en: "Focus on enterprise-level application development", fr: "Focus sur le développement d'applications d'entreprise" },
      { en: "Research in modern software engineering practices", fr: "Recherche en pratiques modernes d'ingénierie logicielle" },
    ],
  },
  {
    degree: {
      en: "Bachelor's degree in Computer Science and Application Development (Web, Mobile, Gaming)",
      fr: "Licence en Informatique et Développement d'Applications (Web, Mobile, Gaming)",
    },
    school: "Université Numérique Cheikh Hamidou Kane",
    location: { en: "Dakar, Senegal", fr: "Dakar, Sénégal" },
    period: { en: "2023", fr: "2023" },
    description: {
      en: "Comprehensive study of software development across web, mobile, and gaming platforms.",
      fr: "Études approfondies du développement logiciel sur les plateformes web, mobile et jeux.",
    },
    achievements: [
      { en: "Full-stack web development expertise", fr: "Expertise en développement web full-stack" },
      { en: "Mobile application development for iOS and Android", fr: "Développement d'applications mobiles pour iOS et Android" },
      { en: "Game development and interactive media", fr: "Développement de jeux et médias interactifs" },
      { en: "Project-based learning with real-world applications", fr: "Apprentissage par projets avec des applications réelles" },
    ],
  },
  {
    degree: {
      en: "High School Diploma in Science and Technique of Economics and Management",
      fr: "Baccalauréat en Science et Technique de l'Économie et de la Gestion",
    },
    school: "Lycée Technique André Peytavin",
    location: { en: "Saint-Louis, Senegal", fr: "Saint-Louis, Sénégal" },
    period: { en: "2019", fr: "2019" },
    description: {
      en: "Comprehensive training in science and technique of economics and management.",
      fr: "Formation complète en sciences et techniques de l'économie et de la gestion.",
    },
    achievements: [
      { en: "Strong foundation in economics and management", fr: "Solides bases en économie et gestion" },
      { en: "Technical training in business applications", fr: "Formation technique aux applications métiers" },
      { en: "Development of analytical and problem-solving skills", fr: "Développement des compétences analytiques" },
    ],
  },
];
