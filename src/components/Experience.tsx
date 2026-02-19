import { motion } from "framer-motion";
import { BriefcaseIcon, CalendarIcon, MapPinIcon } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";

export const Experience = () => {
  const { t, language } = useLanguage();

  const experiences = [
    {
      title: language === 'fr' ? "Développeur Web Freelance" : "Web Developer Freelance",
      company: "Upwork",
      location: language === 'fr' ? "Freelance" : "Freelance",
      period: language === 'fr' ? "Mai 2024 - Janvier 2026" : "May 2024 – Jan 2026",
      description:
        language === 'fr'
          ? "Conception et programmation de solutions web réactifs et esthétiques."
          : "Design and programming of responsive and aesthetic websites.",
    },
    {
      title: language === 'fr' ? "Développeur Jeu Vidéo" : "Video Game Developer",
      company: "Learning Adventure",
      location: "France",
      period: language === 'fr' ? "Juil 2024 - Déc 2024" : "Jul 2024 – Dec 2024",
      description:
        language === 'fr'
          ? "Conception et programmation d'un serious game générique interagissant avec une plateforme d'apprentissage. Développement conforme au cahier des charges, avec communication serveur et modularité du scénario."
          : "Design and programming of a generic serious game interacting with a learning platform. Development in accordance with specifications, with server communication and scenario modularity.",
    },
    {
      title: language === 'fr' ? "Administrateur Réseau" : "Network Administrator",
      company: language === 'fr' ? "SAED, Saint-Louis (Sénégal)" : "SAED, Saint-Louis (Senegal)",
      location: language === 'fr' ? "Saint-Louis, Sénégal" : "Saint-Louis, Senegal",
      period: language === 'fr' ? "Mars 2023 - Juin 2023" : "Mar 2023 – Jun 2023",
      description:
        language === 'fr'
          ? "Gestion des incidents réseaux et systèmes. Installation et configuration des équipements informatiques. Assistance et formation des utilisateurs."
          : "Network and system incident management. Installation and configuration of IT equipment. User assistance and training.",
    },
    {
      title: language === 'fr' ? "Développeur Jeu Vidéo" : "Video Game Developer",
      company: "Hatice Technologie",
      location: "Dakar",
      period: language === 'fr' ? "Mars 2022 - Juin 2022" : "Mar 2022 – Jun 2022",
      description:
        language === 'fr'
          ? "Conception et développement de jeux mobiles et d'applications logicielles selon cahier des charges."
          : "Design and development of mobile games and software applications according to specifications.",
    },
  ];

  return (
    <section id="experience" className="section-container">
      <span className="section-num" aria-hidden="true">02</span>

      <div className="orb orb-pink" style={{ width: 400, height: 400, top: '10%', right: '-5%', opacity: 0.07 }} />

      <div className="section-inner">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-14"
        >
          <p className="text-sm font-medium tracking-widest uppercase mb-3" style={{ color: 'rgba(214, 201, 182, 0.8)' }}>
            02 — {t('nav.experience')}
          </p>
          <h2 className="text-4xl sm:text-5xl font-bold gradient-text-pink">
            {t('experience.title')}
          </h2>
        </motion.div>

        <div className="relative pl-8 md:pl-12">
          {/* Timeline vertical line */}
          <div className="timeline-line hidden md:block" />

          <div className="space-y-8">
            {experiences.map((exp, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative"
              >
                {/* Timeline dot */}
                <div className="timeline-dot hidden md:block" />

                <div className="glass-card glow-border rounded-2xl p-6 md:p-8 hover:scale-[1.01] transition-transform duration-300">
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                    <div className="space-y-2">
                      <div className="flex items-center gap-3">
                        <BriefcaseIcon className="h-4 w-4 flex-shrink-0" style={{ color: 'rgba(214, 201, 182, 0.8)' }} />
                        <h3 className="font-semibold text-lg" style={{ color: 'rgba(255,255,255,0.9)' }}>
                          {exp.title}
                        </h3>
                      </div>
                      <div className="pl-7 space-y-1.5">
                        <p className="font-medium text-sm" style={{ color: 'rgba(214, 201, 182, 0.8)' }}>
                          {exp.company}
                        </p>
                        <div className="flex items-center gap-2" style={{ color: 'rgba(255,255,255,0.4)' }}>
                          <MapPinIcon className="h-3.5 w-3.5" />
                          <span className="text-sm">{exp.location}</span>
                        </div>
                      </div>
                    </div>

                    <div
                      className="flex items-center gap-2 text-sm font-medium px-3 py-1.5 rounded-full self-start flex-shrink-0"
                      style={{
                        background: 'rgba(214, 201, 182, 0.1)',
                        border: '1px solid rgba(214, 201, 182, 0.2)',
                        color: 'rgba(214, 201, 182, 0.8)',
                      }}
                    >
                      <CalendarIcon className="h-3.5 w-3.5" />
                      {exp.period}
                    </div>
                  </div>

                  <p
                    className="mt-4 text-sm leading-relaxed pl-7"
                    style={{ color: 'rgba(255,255,255,0.5)' }}
                  >
                    {exp.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
