import type { ImageMetadata } from "astro";
import gameEnRoute from "@/assets/projects/game-en-route.png";
import gameRoiPion from "@/assets/projects/game-roi-pion.png";
import gameSokoban from "@/assets/projects/game-sokoban.png";
import logidoo from "@/assets/projects/logidoo.png";
import topaccounts from "@/assets/projects/topaccounts.png";
import tutorPlatform from "@/assets/projects/tutor-platform.png";
import wastewaterDeck from "@/assets/projects/wastewater-deck.png";
import type { Localized } from "@/i18n/ui";

export interface MoreProject {
  readonly title: string;
  readonly description: Localized;
  readonly image: ImageMetadata;
  readonly tags: readonly string[];
  readonly liveUrl?: string;
  readonly githubUrl?: string;
}

const GAME_TAGS = ["Unity", "C#", "Game Design"] as const;

export const MORE_PROJECTS: readonly MoreProject[] = [
  {
    title: "Wastewater Systems Deck",
    description: {
      en: "An interactive sales deck for a septic and sewage tank maker, styled as CAD drawing sheets. Consultants enter a population equivalent and the deck picks the model, redraws it to scale and pre-fills a WhatsApp enquiry. Works offline as one HTML file, with keyboard, swipe and QR sharing. Portfolio concept with a fictional brand.",
      fr: "Une présentation commerciale interactive pour un fabricant de fosses septiques et de stations d'épuration, conçue comme des plans CAO. Le consultant saisit l'équivalent-habitant : la présentation choisit le modèle, le redessine à l'échelle et prépare une demande WhatsApp. Un seul fichier HTML qui fonctionne hors ligne, avec clavier, balayage et partage par QR code. Projet de portfolio avec une marque fictive.",
    },
    image: wastewaterDeck,
    tags: ["JavaScript", "SVG", "esbuild", "Playwright"],
    liveUrl: "https://wastewater-deck.vercel.app/",
    githubUrl: "https://github.com/niangamadou888/wastewater-deck",
  },
  {
    title: "Logidoo - Module Chargement",
    description: {
      en: "Load optimization module for Logidoo that automatically calculates space and weight usage in trucks and containers, reducing costs and planning errors with 3D visualization and PDF export.",
      fr: "Module d'optimisation de chargement pour Logidoo qui calcule automatiquement l'espace et le poids utilisés dans les camions et conteneurs, réduisant les coûts et erreurs de planification avec visualisation 3D et export PDF.",
    },
    image: logidoo,
    tags: ["MongoDB", "Express", "Angular", "Node.js"],
    liveUrl: "https://logidoo.netlify.app/",
    githubUrl: "https://github.com/niangamadou888/logidoo-projet-aide-au-chargement",
  },
  {
    title: "Tutor Recruitment Platform",
    description: {
      en: "Creation of a tutor recruitment platform for our university (UNCHK) as part of a school project.",
      fr: "Création d'une plateforme de recrutement de tuteur pour notre université (UNCHK) dans le cadre d'un projet scolaire.",
    },
    image: tutorPlatform,
    tags: ["Angular", "Java", "SpringBoot", "MySQL"],
    githubUrl: "https://github.com/niangamadou888/Application-de-Gestion-du-Recrutement-des-Tuteurs-Back-End",
  },
  {
    title: "TopAccounts",
    description: {
      en: "Next.js 15 marketplace front end with an admin CMS: 8 categories, 160 platform types, listings, blog and image uploads.",
      fr: "Front-end de marketplace en Next.js 15 avec un back-office : 8 catégories, 160 types de plateformes, annonces, blog et envoi d'images.",
    },
    image: topaccounts,
    tags: ["Next.js", "React", "TypeScript", "Tailwind CSS", "MySQL"],
    liveUrl: "https://topaccounts.io",
  },
  {
    title: "EN ROUTE VERS UNCHK",
    description: {
      en: "A 3D mobile serious game that teaches players about Cheikh Hamidou Kane through interactive scenarios and integrates with a learning platform for progress tracking.",
      fr: "Un serious game mobile 3D qui fait découvrir Cheikh Hamidou Kane à travers des scénarios interactifs.",
    },
    image: gameEnRoute,
    tags: GAME_TAGS,
  },
  {
    title: "ROI PION",
    description: {
      en: "A two-player puzzle game developed during Game Hub's Game Jam, featuring original assets and Unity 3D implementation.",
      fr: "Un jeu de réflexion à deux joueurs développé lors de la Game Jam de Game Hub.",
    },
    image: gameRoiPion,
    tags: GAME_TAGS,
  },
  {
    title: "SOKOBAN",
    description: {
      en: "A challenging mobile puzzle game with multiple difficulty levels and a timer system, inspired by the classic Sokoban.",
      fr: "Un jeu de puzzle mobile exigeant avec plusieurs niveaux de difficulté et un système de chronomètre.",
    },
    image: gameSokoban,
    tags: GAME_TAGS,
  },
];
