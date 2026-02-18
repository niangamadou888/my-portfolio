import { motion, useScroll, useTransform } from "framer-motion";
import { GithubIcon, LinkedinIcon, MailIcon, FileDown, Sparkles } from "lucide-react";
import { Button } from "./ui/button";
import { toast } from "./ui/use-toast";
import { useLanguage } from "@/i18n/LanguageContext";
import { useEffect, useRef, useState } from "react";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3
    }
  }
};

const item = {
  hidden: { opacity: 0, y: 30, scale: 0.9 },
  show: { 
    opacity: 1, 
    y: 0, 
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 10
    }
  }
};

const glowAnimation = {
  initial: { opacity: 0.5, scale: 0.8 },
  animate: {
    opacity: [0.5, 1, 0.5],
    scale: [0.8, 1.2, 0.8],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }
};

export const Hero = () => {
  const { t } = useLanguage();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const heroRef = useRef<HTMLElement>(null);
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, -150]);
  const handleDownload = (language: 'en' | 'fr') => {
    const pdfUrl = language === 'en' ? '/Amadou Boubacar Niang cv anglais.pdf' : '/Amadou Boubacar Niang - CV.pdf';
    window.open(pdfUrl, '_blank');

    toast({
      title: t('hero.toast.title'),
      description: language === 'en' ? t('hero.toast.desc.en') : t('hero.toast.desc.fr'),
    });
  };

  return (
    <section ref={heroRef} className="min-h-screen flex flex-col justify-center items-center text-center p-4 sm:p-6 relative overflow-hidden">
      {/* Modern geometric background */}
      <div className="absolute inset-0 bg-[linear-gradient(45deg,#80808008_1px,transparent_1px),linear-gradient(135deg,#80808008_1px,transparent_1px)] bg-[size:20px_20px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
      
      {/* Enhanced gradient effects */}
      <div className="absolute inset-0">
        <div className="absolute w-full h-full bg-[radial-gradient(circle_at_center,rgba(var(--primary-rgb),0.08)_0%,transparent_65%)]" />
        <div className="absolute w-full h-full bg-[radial-gradient(circle_at_top_right,rgba(147,51,234,0.08)_0%,transparent_65%)]" />
      </div>

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="space-y-6 sm:space-y-10 relative z-10 max-w-4xl mx-auto"
      >
        <motion.div variants={item} className="space-y-4">
          <div className="inline-block">
            <motion.div
              animate={{
                scale: [1, 1.02, 1],
                transition: { duration: 2, repeat: Infinity }
              }}
            >
              <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold relative px-2 sm:px-0">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary via-purple-400 to-primary bg-[length:200%_auto] animate-text-shine">
                  {t('hero.greeting')}
                </span>
                <div className="absolute -inset-x-6 -inset-y-4 bg-gradient-to-r from-primary/20 via-purple-500/20 to-primary/20 blur-2xl opacity-50 group-hover:opacity-75 transition duration-500" />
              </h1>
            </motion.div>
          </div>

          <motion.p variants={item} className="text-lg sm:text-xl md:text-2xl font-medium text-muted-foreground/90">
            <span className="inline-flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-1.5 rounded-full bg-primary/5 border border-primary/10 flex-wrap justify-center">
              <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
              {t('hero.role.software')}
              <span className="text-primary/60 hidden sm:inline">•</span>
              <span className="text-primary/80">{t('hero.role.web')}</span>
              <span className="text-primary/60 hidden sm:inline">•</span>
              <span className="text-primary/80">{t('hero.role.mobile')}</span>
              <span className="text-primary/60 hidden sm:inline">•</span>
              <span className="text-primary/80">{t('hero.role.gaming')}</span>
            </span>
          </motion.p>
        </motion.div>

        <motion.p 
          variants={item}
          className="text-base sm:text-lg text-muted-foreground/80 max-w-lg mx-auto backdrop-blur-sm bg-background/30 px-4 sm:px-6 py-2 sm:py-3 rounded-full"
        >
          {t('hero.subtitle')}
        </motion.p>
        
        <motion.div 
          variants={item}
          className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center w-full sm:w-auto px-4 sm:px-0"
        >
          <Button 
            variant="default" 
            onClick={() => handleDownload('en')}
            className="w-full sm:w-auto bg-gradient-to-r from-primary to-purple-600 hover:opacity-90 transition-all duration-300 shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 hover:-translate-y-0.5"
          >
            <FileDown className="mr-2" />
            {t('hero.download.en')}
          </Button>
          <Button 
            variant="default" 
            onClick={() => handleDownload('fr')}
            className="w-full sm:w-auto bg-gradient-to-r from-purple-600 to-primary hover:opacity-90 transition-all duration-300 hover:-translate-y-0.5"
          >
            <FileDown className="mr-2" />
            {t('hero.download.fr')}
          </Button>
        </motion.div>

        <motion.div 
          variants={item}
          className="flex gap-4 sm:gap-6 justify-center pt-2 sm:pt-4"
        >
          {[
            { icon: GithubIcon, url: "https://github.com/niangamadou888/", label: "GitHub profile" },
            { icon: LinkedinIcon, url: "https://www.linkedin.com/in/amadou-boubacar-niang-09b973160/", label: "LinkedIn profile" },
            { icon: MailIcon, url: "mailto:amadouniang2001@gmail.com", label: "Send an email" }
          ].map((social, index) => (
            <Button
              key={index}
              variant="outline"
              size="icon"
              aria-label={social.label}
              className="rounded-full hover:scale-110 transition-all duration-300 hover:bg-primary/5 border-primary/10 hover:border-primary/20 backdrop-blur-sm"
              onClick={() => window.open(social.url, "_blank")}
            >
              <social.icon className="h-5 w-5" />
            </Button>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
};