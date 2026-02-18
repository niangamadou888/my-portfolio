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
        <div className="flex justify-center" style={{ animation: 'fadeInUp 0.6s ease 0.2s both' }}>
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
        </div>

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
        <div
          className="text-2xl sm:text-3xl font-medium"
          style={{ minHeight: '2.5rem', animation: 'fadeIn 0.6s ease 0.7s both' }}
        >
          <TypingRole />
        </div>

        {/* Subtitle */}
        <p
          className="text-base sm:text-lg max-w-lg mx-auto leading-relaxed"
          style={{ color: 'rgba(255,255,255,0.5)', animation: 'fadeInUp 0.6s ease 0.9s both' }}
        >
          {t('hero.subtitle')}
        </p>

        {/* CTA buttons */}
        <div
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          style={{ animation: 'fadeInUp 0.6s ease 1.1s both' }}
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
        </div>

        {/* Social links */}
        <div
          className="flex gap-5 justify-center pt-2"
          style={{ animation: 'fadeInUp 0.6s ease 1.3s both' }}
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
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        style={{ color: 'rgba(255,255,255,0.3)', animation: 'fadeIn 0.6s ease 2s both' }}
      >
        <span className="text-xs tracking-widest uppercase">Scroll</span>
        <div style={{ animation: 'bounceMini 1.5s ease-in-out infinite' }}>
          <ArrowDown className="w-4 h-4" />
        </div>
      </div>
    </section>
  );
};
