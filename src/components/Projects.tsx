import { motion, AnimatePresence } from "framer-motion";
import { ExternalLinkIcon, GithubIcon, GamepadIcon, GlobeIcon } from "lucide-react";
import { useState } from "react";
import { useLanguage } from "@/i18n/LanguageContext";
import { cn } from "@/lib/utils";
import {
  FaReact, FaNode, FaJava, FaAngular, FaBootstrap, FaUnity, FaPython, FaDatabase
} from "react-icons/fa";
import {
  SiTypescript, SiTailwindcss, SiVite, SiExpress, SiMongodb, SiMysql,
  SiPostgresql, SiSpringboot, SiSharp, SiDjango, SiShadcnui,
} from "react-icons/si";
import { IoLogoJavascript } from "react-icons/io5";
import { RiNextjsFill } from "react-icons/ri";

interface Project {
  title: string;
  description: { en: string; fr: string };
  image: string;
  tags: string[];
  liveUrl?: string;
  githubUrl?: string;
}

const iconClass = "inline-block mr-1 text-base";

const getTechIcon = (tech: string) => {
  const map: Record<string, JSX.Element> = {
    "React": <FaReact className={iconClass} style={{ color: '#61DAFB' }} />,
    "TypeScript": <SiTypescript className={iconClass} style={{ color: '#3178C6' }} />,
    "Tailwind CSS": <SiTailwindcss className={iconClass} style={{ color: '#06B6D4' }} />,
    "Vite": <SiVite className={iconClass} style={{ color: '#646CFF' }} />,
    "Node.js": <FaNode className={iconClass} style={{ color: '#339933' }} />,
    "Express": <SiExpress className={iconClass} />,
    "MongoDB": <SiMongodb className={iconClass} style={{ color: '#47A248' }} />,
    "Angular": <FaAngular className={iconClass} style={{ color: '#DD0031' }} />,
    "Java": <FaJava className={iconClass} style={{ color: '#007396' }} />,
    "SpringBoot": <SiSpringboot className={iconClass} style={{ color: '#6DB33F' }} />,
    "MySQL": <SiMysql className={iconClass} style={{ color: '#4479A1' }} />,
    "PostgreSQL": <SiPostgresql className={iconClass} style={{ color: '#336791' }} />,
    "Bootstrap": <FaBootstrap className={iconClass} style={{ color: '#7952B3' }} />,
    "Unity": <FaUnity className={iconClass} />,
    "C#": <SiSharp className={iconClass} style={{ color: '#239120' }} />,
    "Django": <SiDjango className={iconClass} style={{ color: '#092E20' }} />,
    "JavaScript": <IoLogoJavascript className={iconClass} style={{ color: '#F7DF1E' }} />,
    "Next.js": <RiNextjsFill className={iconClass} />,
  };
  return map[tech] || null;
};

export const Projects = () => {
  const { t, language } = useLanguage();
  const [activeTab, setActiveTab] = useState<"web" | "game">("web");

  const webProjects: Project[] = [
    {
      title: "Logidoo - Module Chargement",
      description: {
        en: "Load optimization module for Logidoo that automatically calculates space and weight usage in trucks and containers, reducing costs and planning errors with 3D visualization and PDF export.",
        fr: "Module d'optimisation de chargement pour Logidoo qui calcule automatiquement l'espace et le poids utilisés dans les camions et conteneurs, réduisant les coûts et erreurs de planification avec visualisation 3D et export PDF.",
      },
      image: "/logidoo-projet-aide-au-chargement.png",
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
      image: "/Plateforme-Recrutement-Tuteur.png",
      tags: ["Angular", "Java", "SpringBoot", "MySQL"],
      githubUrl: "https://github.com/niangamadou888/Application-de-Gestion-du-Recrutement-des-Tuteurs-Back-End",
    },
    {
      title: "City Life",
      description: {
        en: "A platform providing users with information about local services and activities in their city area.",
        fr: "Une plateforme fournissant aux utilisateurs des informations sur les services et activités locales dans leur ville.",
      },
      image: "/CityLife.png",
      tags: ["Angular", "Django", "PostgreSQL"],
      githubUrl: "https://github.com/niangamadou888/City-Life",
    },
    {
      title: "Glowlikes",
      description: {
        en: "GlowyViews is a multi-platform social media service that helps users purchase social engagement metrics like followers, likes, and views.",
        fr: "GlowyViews est un service multi-plateforme de réseaux sociaux qui aide les utilisateurs à acheter des métriques d'engagement.",
      },
      image: "/glowlikes.png",
      tags: ["React", "Vite", "Tailwind CSS"],
      liveUrl: "https://glowlikes.it/",
    },
    {
      title: "PRNow",
      description: {
        en: "An AI-powered press release distribution platform connecting businesses with 400+ publishers across 190 countries.",
        fr: "Une plateforme de distribution de communiqués de presse propulsée par l'IA, connectant les entreprises à plus de 400 éditeurs dans 190 pays.",
      },
      image: "/prnow.png",
      tags: ["Next.js", "React", "TypeScript", "Tailwind CSS", "MySQL"],
      liveUrl: "https://prnow.io",
    },
    {
      title: "Podcast Transcription Platform",
      description: {
        en: "A full-stack web application that enables users to search podcasts and automatically transcribe audio files using AssemblyAI's speech-to-text API.",
        fr: "Une application web full-stack qui permet aux utilisateurs de rechercher des podcasts et de transcrire automatiquement des fichiers audio.",
      },
      image: "/PodcastTranscript.png",
      tags: ["Next.js", "Node.js", "Express", "MongoDB", "Whisper AI"],
      liveUrl: "https://podcasttranscript.ai/",
    },
  ];

  const gameProjects: Project[] = [
    {
      title: "EN ROUTE VERS UNCHK",
      description: {
        en: "A 3D mobile serious game that teaches players about Cheikh Hamidou Kane through interactive scenarios and integrates with a learning platform for progress tracking.",
        fr: "Un serious game mobile 3D qui fait découvrir Cheikh Hamidou Kane à travers des scénarios interactifs.",
      },
      image: "/1.png",
      tags: ["Unity", "C#", "Game Design"],
    },
    {
      title: "ROI PION",
      description: {
        en: "A two-player puzzle game developed during Game Hub's Game Jam, featuring original assets and Unity 3D implementation.",
        fr: "Un jeu de réflexion à deux joueurs développé lors de la Game Jam de Game Hub.",
      },
      image: "/2.png",
      tags: ["Unity", "C#", "Game Design"],
    },
    {
      title: "SOKOBAN",
      description: {
        en: "A challenging mobile puzzle game with multiple difficulty levels and a timer system, inspired by the classic Sokoban.",
        fr: "Un jeu de puzzle mobile exigeant avec plusieurs niveaux de difficulté et un système de chronomètre.",
      },
      image: "/3.png",
      tags: ["Unity", "C#", "Game Design"],
    },
  ];

  const activeProjects = activeTab === "web" ? webProjects : gameProjects;

  return (
    <section id="projects" className="section-container">
      <span className="section-num" aria-hidden="true">05</span>

      <div className="orb orb-purple" style={{ width: 400, height: 400, top: '5%', right: '-5%', opacity: 0.07 }} />
      <div className="orb orb-cyan" style={{ width: 300, height: 300, bottom: '10%', left: '-5%', opacity: 0.06 }} />

      <div className="section-inner" style={{ maxWidth: '90rem' }}>
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-14"
        >
          <p className="text-sm font-medium tracking-widest uppercase mb-3" style={{ color: 'rgba(139, 92, 246, 0.8)' }}>
            05 — {t('nav.projects')}
          </p>
          <h2 className="text-4xl sm:text-5xl font-bold gradient-text">
            {t('projects.title')}
          </h2>
        </motion.div>

        {/* Tab switcher */}
        <div className="flex gap-3 mb-12">
          {[
            { id: 'web' as const, label: t('projects.tab.web'), icon: GlobeIcon },
            { id: 'game' as const, label: t('projects.tab.game'), icon: GamepadIcon },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                "flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300",
                activeTab === tab.id ? "text-white" : "text-white/40 hover:text-white/70"
              )}
              style={{
                cursor: 'none',
                background: activeTab === tab.id
                  ? 'linear-gradient(135deg, rgba(139,92,246,0.25), rgba(34,211,238,0.15))'
                  : 'rgba(255,255,255,0.04)',
                border: activeTab === tab.id
                  ? '1px solid rgba(139, 92, 246, 0.4)'
                  : '1px solid rgba(255,255,255,0.08)',
                boxShadow: activeTab === tab.id
                  ? '0 0 20px rgba(139, 92, 246, 0.2)'
                  : 'none',
              }}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Project cards */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4 }}
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-7"
          >
            {activeProjects.map((project, index) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.07 }}
                className="group"
              >
                <div className="glass-card rounded-2xl overflow-hidden hover:scale-[1.02] transition-transform duration-350 relative">
                  {/* Image */}
                  <div className="aspect-video relative overflow-hidden">
                    {project.image && (
                      <img
                        src={project.image}
                        alt={project.title}
                        className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
                      />
                    )}
                    {/* Image overlay on hover */}
                    <div
                      className="absolute inset-0 flex items-end justify-end gap-3 p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      style={{ background: 'linear-gradient(to top, rgba(3,3,8,0.85) 0%, transparent 60%)' }}
                    >
                      {project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{ cursor: 'none' }}
                          className="flex items-center justify-center w-9 h-9 rounded-full transition-all duration-200 hover:scale-110"
                          title="Live demo"
                          onClick={e => e.stopPropagation()}
                        >
                          <div
                            className="flex items-center justify-center w-9 h-9 rounded-full"
                            style={{ background: 'rgba(255,255,255,0.12)', backdropFilter: 'blur(8px)' }}
                          >
                            <ExternalLinkIcon className="h-4 w-4 text-white" />
                          </div>
                        </a>
                      )}
                      {project.githubUrl && (
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{ cursor: 'none' }}
                          className="flex items-center justify-center w-9 h-9 rounded-full transition-all duration-200 hover:scale-110"
                          title="GitHub"
                          onClick={e => e.stopPropagation()}
                        >
                          <div
                            className="flex items-center justify-center w-9 h-9 rounded-full"
                            style={{ background: 'rgba(255,255,255,0.12)', backdropFilter: 'blur(8px)' }}
                          >
                            <GithubIcon className="h-4 w-4 text-white" />
                          </div>
                        </a>
                      )}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6 space-y-3">
                    <h3 className="font-semibold text-base" style={{ color: 'rgba(255,255,255,0.9)' }}>
                      {project.title}
                    </h3>
                    <p className="text-sm leading-relaxed line-clamp-3" style={{ color: 'rgba(255,255,255,0.5)' }}>
                      {project.description[language]}
                    </p>
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {project.tags.map((tag, i) => (
                        <span key={i} className="tag-pill">
                          {getTechIcon(tag)}
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};
