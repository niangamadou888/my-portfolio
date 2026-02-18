import { motion } from "framer-motion";
import { AwardIcon, CalendarIcon, ExternalLinkIcon } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";

export const Certifications = () => {
  const { t, language } = useLanguage();

  const certifications = [
    {
      title: language === 'fr' ? "Ingenieur FullStack" : "FullStack Engineer",
      issuer: "EDACY",
      date: "2025",
      skills: ["Full Stack Development", "Software Engineering", "Web Development", "Application Architecture"],
      accent: '#d6c9b6',
    },
    {
      title: "Legacy Full Stack Developer",
      issuer: "freeCodeCamp",
      date: "2023",
      link: "https://www.freecodecamp.org/certification/niangamadou888/full-stack",
      skills: ["Responsive Web Design", "JavaScript Algorithms", "Data Visualization", "Front End", "Back End"],
      accent: '#d6c9b6',
    },
    {
      title: language === 'fr' ? "Développement Python" : "Python Development",
      issuer: "FORCE-N",
      date: "2023",
      link: "https://formation.force-n.sn/mod/customcert/verify_certificate.php?contextid=418479&code=FI0GkJ2BIi",
      skills: ["Python", "Angular", "Django", "SQL/NoSQL", "Git", "Docker"],
      accent: '#d6c9b6',
    },
    {
      title: language === 'fr' ? "Administrateur Réseau" : "Network Administrator",
      issuer: "IMSAS",
      date: "2023",
      skills: ["Network Security", "System Administration", "Protocols", "Troubleshooting", "Infrastructure"],
      accent: '#f59e0b',
    },
  ];

  return (
    <section id="certifications" className="section-container">
      <span className="section-num" aria-hidden="true">04</span>

      <div className="orb orb-purple" style={{ width: 450, height: 450, bottom: '0%', right: '-8%', opacity: 0.08 }} />

      <div className="section-inner" style={{ maxWidth: '90rem' }}>
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-14"
        >
          <p className="text-sm font-medium tracking-widest uppercase mb-3" style={{ color: 'rgba(251, 191, 36, 0.8)' }}>
            04 — {t('nav.certifications')}
          </p>
          <h2 className="text-4xl sm:text-5xl font-bold gradient-text">
            {t('certifications.title')}
          </h2>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {certifications.map((cert, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group"
            >
              <div
                className="glass-card rounded-2xl p-6 h-full flex flex-col relative overflow-hidden transition-all duration-350 hover:scale-[1.02]"
                style={{ cursor: 'default' }}
              >
                {/* Top accent bar */}
                <div
                  className="absolute top-0 left-0 right-0 h-0.5 opacity-60 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ background: `linear-gradient(90deg, ${cert.accent}, transparent)` }}
                />

                <div className="flex items-start justify-between mb-3">
                  <AwardIcon className="h-5 w-5 flex-shrink-0 mt-0.5" style={{ color: cert.accent + 'cc' }} />
                  <div
                    className="flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full"
                    style={{
                      background: `${cert.accent}12`,
                      border: `1px solid ${cert.accent}25`,
                      color: cert.accent + 'bb',
                    }}
                  >
                    <CalendarIcon className="h-3 w-3" />
                    {cert.date}
                  </div>
                </div>

                <h3 className="font-semibold text-base leading-snug mb-1" style={{ color: 'rgba(255,255,255,0.88)' }}>
                  {cert.title}
                </h3>
                <p className="text-sm font-medium mb-4" style={{ color: cert.accent + 'cc' }}>
                  {cert.issuer}
                </p>

                <p className="text-xs leading-relaxed flex-1" style={{ color: cert.accent + '88' }}>
                  {cert.skills.join(' · ')}
                </p>

                {cert.link && (
                  <a
                    href={cert.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ cursor: 'none', color: cert.accent + 'bb' }}
                    className="mt-5 flex items-center justify-between text-xs font-medium pt-4 border-t transition-colors duration-200 hover:opacity-100"
                    onMouseEnter={e => (e.currentTarget.style.color = cert.accent)}
                    onMouseLeave={e => (e.currentTarget.style.color = cert.accent + 'bb')}
                  >
                    <span
                      style={{ borderColor: cert.accent + '20' }}
                      className="border-t"
                    >
                      {t('certifications.view')}
                    </span>
                    <ExternalLinkIcon className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </a>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
