import { GithubIcon, LinkedinIcon, MailIcon } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";

export const Footer = () => {
  const currentYear = new Date().getFullYear();
  const { t } = useLanguage();

  const socials = [
    { icon: GithubIcon, href: "https://github.com/niangamadou888/", label: "GitHub" },
    { icon: LinkedinIcon, href: "https://www.linkedin.com/in/amadou-boubacar-niang-09b973160/", label: "LinkedIn" },
    { icon: MailIcon, href: "mailto:amadouniang2001@gmail.com", label: "Email" },
  ];

  return (
    <footer className="relative py-10 px-4 overflow-hidden">
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(214,201,182,0.3), rgba(184,168,152,0.2), transparent)' }}
      />

      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex flex-col items-center md:items-start gap-1">
          <span
            className="text-lg font-bold tracking-widest"
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              background: 'linear-gradient(135deg, #d6c9b6, #b8a898)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            ABN
          </span>
          <p className="text-sm" style={{ color: 'rgba(255,255,255,0.3)' }}>
            © {currentYear} Amadou Boubacar Niang. {t('footer.rights')}
          </p>
        </div>

        <div className="flex items-center gap-3">
          {socials.map(({ icon: Icon, href, label }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              style={{ cursor: 'none' }}
              className="flex items-center justify-center w-9 h-9 rounded-full transition-all duration-300"
              onMouseEnter={e => {
                (e.currentTarget as HTMLElement).style.background = 'rgba(214, 201, 182, 0.15)';
                (e.currentTarget as HTMLElement).style.borderColor = 'rgba(214, 201, 182, 0.4)';
                (e.currentTarget as HTMLElement).style.color = 'rgba(214, 201, 182, 0.9)';
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.04)';
                (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.08)';
                (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.45)';
              }}
            >
              <div
                className="flex items-center justify-center w-9 h-9 rounded-full"
                style={{
                  background: 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(255,255,255,0.08)',
                  color: 'rgba(255,255,255,0.45)',
                  transition: 'all 0.3s',
                }}
              >
                <Icon className="h-4 w-4" />
              </div>
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
};
