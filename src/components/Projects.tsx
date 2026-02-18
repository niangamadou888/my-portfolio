import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { ExternalLinkIcon, GithubIcon, GamepadIcon, GlobeIcon } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { useLanguage } from "@/i18n/LanguageContext";
import { 
  FaReact, 
  FaNode, 
  FaJava, 
  FaAngular, 
  FaBootstrap, 
  FaGithub, 
  FaUnity,
  FaPython,
  FaDatabase
} from "react-icons/fa";
import { 
  SiTypescript, 
  SiTailwindcss, 
  SiVite, 
  SiExpress, 
  SiMongodb, 
  SiMysql, 
  SiPostgresql,
  SiSpringboot,
  SiSharp,
  SiDjango,
  SiShadcnui,
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

const getTechIcon = (tech: string) => {
  const iconProps = { className: "inline-block mr-1 text-lg" };
  const techMap: { [key: string]: JSX.Element } = {
    "React": <FaReact {...iconProps} className={cn(iconProps.className, "text-[#61DAFB]")} />,
    "TypeScript": <SiTypescript {...iconProps} className={cn(iconProps.className, "text-[#3178C6]")} />,
    "Tailwind CSS": <SiTailwindcss {...iconProps} className={cn(iconProps.className, "text-[#06B6D4]")} />,
    "Vite": <SiVite {...iconProps} className={cn(iconProps.className, "text-[#646CFF]")} />,
    "Node.js": <FaNode {...iconProps} className={cn(iconProps.className, "text-[#339933]")} />,
    "Express": <SiExpress {...iconProps} />,
    "MongoDB": <SiMongodb {...iconProps} className={cn(iconProps.className, "text-[#47A248]")} />,
    "Angular": <FaAngular {...iconProps} className={cn(iconProps.className, "text-[#DD0031]")} />,
    "Java": <FaJava {...iconProps} className={cn(iconProps.className, "text-[#007396]")} />,
    "SpringBoot": <SiSpringboot {...iconProps} className={cn(iconProps.className, "text-[#6DB33F]")} />,
    "MySQL": <SiMysql {...iconProps} className={cn(iconProps.className, "text-[#4479A1]")} />,
    "PostgreSQL": <SiPostgresql {...iconProps} className={cn(iconProps.className, "text-[#336791]")} />,
    "Bootstrap": <FaBootstrap {...iconProps} className={cn(iconProps.className, "text-[#7952B3]")} />,
    "Unity": <FaUnity {...iconProps} />,
    "C#": <SiSharp {...iconProps} className={cn(iconProps.className, "text-[#239120]")} />,
    "Django": <SiDjango {...iconProps} className={cn(iconProps.className, "text-[#092E20]")} />,
    "JavaScript": <IoLogoJavascript {...iconProps} className={cn(iconProps.className, "text-[#F7DF1E]")} />,
    "shadcn/ui": <SiShadcnui {...iconProps} className={cn(iconProps.className, "text-[#F7DF1E]")} />,
    "Next.js": <RiNextjsFill {...iconProps} className={cn(iconProps.className)} />,
  };
  
  return techMap[tech] || null;
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
      githubUrl: "https://github.com/niangamadou888/logidoo-projet-aide-au-chargement"
    },
    {
      title: "Tutor Recruitment Platform",
      description: {
        en: "Creation of a tutor recruitment platform for our university (UNCHK) as part of a school project.",
        fr: "Création d'une plateforme de recrutement de tuteur pour notre université (UNCHK) dans le cadre d'un projet scolaire.",
      },
      image: "/Plateforme-Recrutement-Tuteur.png",
      tags: ["Angular", "Java","SpringBoot", "MySQL"],
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
      githubUrl: "https://github.com/niangamadou888/City-Life"
    },
    {
      title: "Glowlikes",
      description: {
        en: "GlowyViews is a multi-platform social media service that helps users purchase social engagement metrics like followers, likes, and views.",
        fr: "GlowyViews est un service multi‑plateforme de réseaux sociaux qui aide les utilisateurs à acheter des métriques d’engagement comme des abonnés, des mentions J’aime et des vues.",
      },
      image: "/glowlikes.png",
      tags: ["React","Vite", "Tailwind CSS"],
      liveUrl: "https://glowlikes.it/",
    },
    {
      title: "PRNow",
      description: {
        en: "An AI-powered press release distribution platform connecting businesses with 400+ publishers across 190 countries, enabling affordable global media coverage at a fraction of traditional PR agency costs.",
        fr: "Une plateforme de distribution de communiqués de presse propulsée par l'IA, connectant les entreprises à plus de 400 éditeurs dans 190 pays pour une couverture médiatique mondiale abordable, à une fraction du coût des agences de relations publiques traditionnelles.",
      },
      image: "/prnow.png",
      tags: ["Next.js", "React", "TypeScript", "Tailwind CSS", "MySQL"],
      liveUrl: "https://prnow.io",
    },
    {
      title: "Podcast Transcription Platform",
      description: {
        en: "A full-stack web application built with Next.js, Node.js/Express, and MongoDB that enables users to search podcasts and automatically transcribe audio files using AssemblyAI's speech-to-text API. Features include JWT authentication, rate limiting, and SSH-based remote processing for compute-intensive transcription tasks.",
        fr: "Une application web full-stack construite avec Next.js, Node.js/Express et MongoDB qui permet aux utilisateurs de rechercher des podcasts et de transcrire automatiquement des fichiers audio en utilisant l'API de synthèse vocale d'AssemblyAI. Les fonctionnalités incluent l'authentification JWT, la limitation de débit et le traitement à distance basé sur SSH pour les tâches de transcription intensives en calcul.",
      },
      image: "/PodcastTranscript.png",
      tags: ["Next.js", "Node.js", "Express", "MongoDB","Whisper AI"],
      liveUrl: "https://podcasttranscript.ai/",
    },
    
  ];

  const gameProjects: Project[] = [
    {
      title: "EN ROUTE VERS UNCHK",
      description: {
        en: "A 3D mobile serious game that teaches players about Cheikh Hamidou Kane through interactive scenarios and integrates with a learning platform for progress tracking.",
        fr: "Un serious game mobile 3D qui fait découvrir Cheikh Hamidou Kane à travers des scénarios interactifs et s’intègre à une plateforme d’apprentissage pour suivre la progression.",
      },
      image: "/1.png",
      tags: ["Unity", "C#", "Game Design", "Internship", "Moodle Learning"],
    },
    {
      title: "ROI PION",
      description: {
        en: "A two-player puzzle game developed during Game Hub's Game Jam, featuring original assets and Unity 3D implementation.",
        fr: "Un jeu de réflexion à deux joueurs développé lors de la Game Jam de Game Hub, avec des assets originaux et une implémentation Unity 3D.",
      },
      image: "/2.png",
      tags: ["Unity", "C#", "Game Design"],
    },
    {
      title: "SOKOBAN",
      description: {
        en: "A challenging mobile puzzle game with multiple difficulty levels and a timer system, inspired by the classic Sokoban.",
        fr: "Un jeu de puzzle mobile exigeant avec plusieurs niveaux de difficulté et un système de chronomètre, inspiré du classique Sokoban.",
      },
      image: "/3.png",
      tags: ["Unity", "C#", "Game Design"]
    }
  ];

  const activeProjects = activeTab === "web" ? webProjects : gameProjects;

  return (
    <section id="projects" className="py-20 px-4 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(var(--primary-rgb),0.05),transparent_50%),radial-gradient(ellipse_at_bottom_left,rgba(147,51,234,0.05),transparent_50%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(45deg,#80808008_1px,transparent_1px),linear-gradient(135deg,#80808008_1px,transparent_1px)] bg-[size:24px_24px]" />

      <div className="max-w-6xl mx-auto relative">
        <div className="flex items-center gap-3 mb-12">
          <div className="bg-primary/10 p-2.5 rounded-xl">
            <GlobeIcon className="w-6 h-6 text-primary" />
          </div>
          <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary via-purple-400 to-primary animate-text-shine">{t('projects.title')}</h2>
        </div>

        <div className="flex justify-center gap-4 mb-12">
          <Button
            variant={activeTab === "web" ? "default" : "ghost"}
            className={cn(
              "gap-2 px-6 py-2 rounded-full transition-all duration-300",
              activeTab === "web" ? "bg-primary text-primary-foreground shadow-lg shadow-primary/25" : "hover:bg-primary/10"
            )}
            onClick={() => setActiveTab("web")}
          >
            <GlobeIcon className="w-4 h-4" />
            {t('projects.tab.web')}
          </Button>
          <Button
            variant={activeTab === "game" ? "default" : "ghost"}
            className={cn(
              "gap-2 px-6 py-2 rounded-full transition-all duration-300",
              activeTab === "game" ? "bg-primary text-primary-foreground shadow-lg shadow-primary/25" : "hover:bg-primary/10"
            )}
            onClick={() => setActiveTab("game")}
          >
            <GamepadIcon className="w-4 h-4" />
            {t('projects.tab.game')}
          </Button>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {activeProjects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="overflow-hidden group glass gradient-border hover:shadow-xl hover:shadow-primary/10 transition-all duration-500 hover-lift">
                <div className="aspect-video relative overflow-hidden">
                  {project.image && (
                    <img
                      src={project.image}
                      alt={project.title}
                      className="object-cover w-full h-full transform group-hover:scale-105 transition-transform duration-500"
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-end gap-4 p-4">
                    {project.liveUrl && (
                      <Button
                        size="icon"
                        variant="ghost"
                        className="h-9 w-9 rounded-full bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-colors duration-300"
                        onClick={() => window.open(project.liveUrl, '_blank')}
                      >
                        <ExternalLinkIcon className="h-4 w-4 text-white" />
                      </Button>
                    )}
                    {project.githubUrl && (
                      <Button
                        size="icon"
                        variant="ghost"
                        className="h-9 w-9 rounded-full bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-colors duration-300"
                        onClick={() => window.open(project.githubUrl, '_blank')}
                      >
                        <GithubIcon className="h-4 w-4 text-white" />
                      </Button>
                    )}
                  </div>
                </div>
                <div className="p-6 space-y-4">
                  <h3 className="text-lg font-semibold tracking-tight">{project.title}</h3>
                  <p className="text-muted-foreground">{project.description[language]}</p>
                  <div className="flex flex-wrap gap-2 pt-2">
                    {project.tags.map((tag, tagIndex) => (
                      <span
                        key={tagIndex}
                        className="inline-flex items-center px-3 py-1 text-sm rounded-full bg-primary/5 text-primary/80 hover:bg-primary/10 transition-colors duration-300"
                      >
                        {getTechIcon(tag)}
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};