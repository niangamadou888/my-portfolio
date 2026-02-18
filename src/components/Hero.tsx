import { motion } from "framer-motion";
import { GithubIcon, LinkedinIcon, MailIcon, FileDown, ArrowDown } from "lucide-react";
import { toast } from "./ui/use-toast";
import { useLanguage } from "@/i18n/LanguageContext";
import { useEffect, useRef, useState } from "react";

const ROLES = ["Software Developer", "Web Developer", "Mobile Developer", "Game Developer"];

const TypingRole = () => {
  const [roleIdx, setRoleIdx] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [deleting, setDeleting] = useState(false);
  const [pause, setPause] = useState(false);

  useEffect(() => {
    if (pause) {
      const t = setTimeout(() => setPause(false), 1400);
      return () => clearTimeout(t);
    }

    const target = ROLES[roleIdx];

    if (!deleting && displayed === target) {
      setPause(true);
      setTimeout(() => setDeleting(true), 1400);
      return;
    }

    if (deleting && displayed === "") {
      setDeleting(false);
      setRoleIdx((i) => (i + 1) % ROLES.length);
      return;
    }

    const speed = deleting ? 40 : 70;
    const t = setTimeout(() => {
      setDisplayed((d) =>
        deleting ? d.slice(0, -1) : target.slice(0, d.length + 1)
      );
    }, speed);
    return () => clearTimeout(t);
  }, [displayed, deleting, roleIdx, pause]);

  return (
    <span className="gradient-text font-bold">
      {displayed}
      <span
        className="inline-block w-0.5 h-[1em] ml-0.5 align-middle"
        style={{
          background: '#22d3ee',
          animation: 'pingSlow 1s step-end infinite',
          boxShadow: '0 0 8px rgba(34, 211, 238, 0.6)',
        }}
      />
    </span>
  );
};

export const Hero = () => {
  const { t, language } = useLanguage();

  const handleDownload = (language: 'en' | 'fr') => {
    const pdfUrl =
      language === 'en'
        ? '/Amadou Boubacar Niang cv anglais.pdf'
        : '/Amadou Boubacar Niang - CV.pdf';
    window.open(pdfUrl, '_blank');
    toast({
      title: t('hero.toast.title'),
      description: language === 'en' ? t('hero.toast.desc.en') : t('hero.toast.desc.fr'),
    });
  };

  const socials = [
    { icon: GithubIcon, url: "https://github.com/niangamadou888/", label: "GitHub" },
    { icon: LinkedinIcon, url: "https://www.linkedin.com/in/amadou-boubacar-niang-09b973160/", label: "LinkedIn" },
    { icon: MailIcon, url: "mailto:amadouniang2001@gmail.com", label: "Email" },
  ];

  return (
    <section className="min-h-screen flex flex-col justify-center items-center text-center relative overflow-hidden px-4">
      {/* Ambient orbs */}
      <div className="orb orb-purple" style={{ width: 600, height: 600, top: '-10%', left: '-15%' }} />
      <div className="orb orb-cyan" style={{ width: 400, height: 400, bottom: '-5%', right: '-10%' }} />
      <div className="orb orb-pink" style={{ width: 300, height: 300, top: '30%', right: '10%', opacity: 0.07 }} />

      <div className="relative z-10 max-w-4xl mx-auto space-y-8">
        {/* Greeting chip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex justify-center"
        >
          <span
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-medium"
            style={{
              background: 'rgba(214, 201, 182, 0.08)',
              border: '1px solid rgba(214, 201, 182, 0.2)',
              color: 'rgba(214, 201, 182, 0.85)',
            }}
          >
            <span className="w-1.5 h-1.5 rounded-full animate-pulse-glow" style={{ background: '#d6c9b6' }} />
            {language === 'fr' ? 'Disponible pour de nouveaux projets' : 'Available for new projects'}
          </span>
        </motion.div>

        {/* Main heading — rendered immediately, no JS animation delay (critical for LCP) */}
        <div>
          <h1
            className="text-5xl sm:text-6xl md:text-8xl font-bold leading-tight tracking-tight"
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
          >
            <span className="text-white">Amadou</span>
            <br />
            <span className="gradient-text">Boubacar Niang</span>
          </h1>
        </div>

        {/* Typing role */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="text-2xl sm:text-3xl font-medium"
          style={{ minHeight: '2.5rem' }}
        >
          <TypingRole />
        </motion.div>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.9 }}
          className="text-base sm:text-lg max-w-lg mx-auto leading-relaxed"
          style={{ color: 'rgba(255,255,255,0.5)' }}
        >
          {t('hero.subtitle')}
        </motion.p>

        {/* CTA buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.1 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <button
            onClick={() => handleDownload('en')}
            className="btn-glow flex items-center gap-2 px-7 py-3 rounded-full text-sm font-semibold text-white"
            style={{
              background: 'rgba(214, 201, 182, 0.12)',
              border: '1px solid rgba(214, 201, 182, 0.3)',
              boxShadow: '0 0 20px rgba(214, 201, 182, 0.1)',
              cursor: 'none',
            }}
          >
            <FileDown className="w-4 h-4" />
            {t('hero.download.en')}
          </button>
          <button
            onClick={() => handleDownload('fr')}
            className="btn-glow flex items-center gap-2 px-7 py-3 rounded-full text-sm font-semibold"
            style={{
              background: 'rgba(50, 60, 72, 0.6)',
              border: '1px solid rgba(214, 201, 182, 0.15)',
              color: 'rgba(214, 201, 182, 0.7)',
              cursor: 'none',
            }}
          >
            <FileDown className="w-4 h-4" />
            {t('hero.download.fr')}
          </button>
        </motion.div>

        {/* Social links */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.3 }}
          className="flex gap-5 justify-center pt-2"
        >
          {socials.map((s) => (
            <a
              key={s.label}
              href={s.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={s.label}
              style={{ cursor: 'none' }}
              className="group flex items-center justify-center w-10 h-10 rounded-full transition-all duration-300"
            >
              <div
                className="flex items-center justify-center w-10 h-10 rounded-full transition-all duration-300 group-hover:scale-110"
                style={{
                  background: 'rgba(50, 60, 72, 0.6)',
                  border: '1px solid rgba(214, 201, 182, 0.12)',
                  color: 'rgba(214, 201, 182, 0.5)',
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLElement).style.borderColor = 'rgba(214, 201, 182, 0.4)';
                  (e.currentTarget as HTMLElement).style.color = 'rgba(214, 201, 182, 0.9)';
                  (e.currentTarget as HTMLElement).style.boxShadow = '0 0 14px rgba(214, 201, 182, 0.15)';
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLElement).style.borderColor = 'rgba(214, 201, 182, 0.12)';
                  (e.currentTarget as HTMLElement).style.color = 'rgba(214, 201, 182, 0.5)';
                  (e.currentTarget as HTMLElement).style.boxShadow = 'none';
                }}
              >
                <s.icon className="w-4 h-4" />
              </div>
            </a>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 2 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        style={{ color: 'rgba(255,255,255,0.3)' }}
      >
        <span className="text-xs tracking-widest uppercase">Scroll</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <ArrowDown className="w-4 h-4" />
        </motion.div>
      </motion.div>
    </section>
  );
};
