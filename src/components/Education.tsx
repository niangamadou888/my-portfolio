import { motion } from "framer-motion";
import { GraduationCapIcon, CalendarIcon, MapPinIcon, CheckCircleIcon } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";

export const Education = () => {
  const { t, language } = useLanguage();

  const education = [
    {
      degree:
        language === 'fr'
          ? "Master en Ingénierie Logicielle"
          : "Master's degree in Software Engineering",
      school: "Université Numérique Cheikh Hamidou Kane",
      location: language === 'fr' ? "Dakar, Sénégal" : "Dakar, Senegal",
      period: language === 'fr' ? "En cours" : "Ongoing",
      description:
        language === 'fr'
          ? "Études avancées en ingénierie logicielle, axées sur les pratiques et méthodologies modernes de développement."
          : "Advanced studies in Software Engineering, focusing on modern software development practices and methodologies.",
      achievements: [
        language === 'fr' ? "Spécialisation en architectures logicielles avancées" : "Specializing in advanced software architecture",
        language === 'fr' ? "Focus sur le développement d'applications d'entreprise" : "Focus on enterprise-level application development",
        language === 'fr' ? "Recherche en pratiques modernes d'ingénierie logicielle" : "Research in modern software engineering practices",
      ],
      accent: '#d6c9b6',
    },
    {
      degree:
        language === 'fr'
          ? "Licence en Informatique et Développement d'Applications (Web, Mobile, Gaming)"
          : "Bachelor's degree in Computer Science and Application Development (Web, Mobile, Gaming)",
      school: "Université Numérique Cheikh Hamidou Kane",
      location: language === 'fr' ? "Dakar, Sénégal" : "Dakar, Senegal",
      period: "2023",
      description:
        language === 'fr'
          ? "Études approfondies du développement logiciel sur les plateformes web, mobile et jeux."
          : "Comprehensive study of software development across web, mobile, and gaming platforms.",
      achievements: [
        language === 'fr' ? "Expertise en développement web full-stack" : "Full-stack web development expertise",
        language === 'fr' ? "Développement d'applications mobiles pour iOS et Android" : "Mobile application development for iOS and Android",
        language === 'fr' ? "Développement de jeux et médias interactifs" : "Game development and interactive media",
        language === 'fr' ? "Apprentissage par projets avec des applications réelles" : "Project-based learning with real-world applications",
      ],
      accent: '#d6c9b6',
    },
    {
      degree:
        language === 'fr'
          ? "Baccalauréat en Science et Technique de l'Économie et de la Gestion"
          : "High School Diploma in Science and Technique of Economics and Management",
      school: "Lycée Technique André Peytavin",
      location: language === 'fr' ? "Saint-Louis, Sénégal" : "Saint-Louis, Senegal",
      period: "2019",
      description:
        language === 'fr'
          ? "Formation complète en sciences et techniques de l'économie et de la gestion."
          : "Comprehensive training in science and technique of economics and management.",
      achievements: [
        language === 'fr' ? "Solides bases en économie et gestion" : "Strong foundation in economics and management",
        language === 'fr' ? "Formation technique aux applications métiers" : "Technical training in business applications",
        language === 'fr' ? "Développement des compétences analytiques" : "Development of analytical and problem-solving skills",
      ],
      accent: '#d6c9b6',
    },
  ];

  return (
    <section id="education" className="section-container">
      <span className="section-num" aria-hidden="true">03</span>

      <div className="orb orb-cyan" style={{ width: 450, height: 450, top: '0%', left: '-12%', opacity: 0.07 }} />

      <div className="section-inner">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-14"
        >
          <p className="text-sm font-medium tracking-widest uppercase mb-3" style={{ color: 'rgba(214, 201, 182, 0.8)' }}>
            03 — {t('nav.education')}
          </p>
          <h2 className="text-4xl sm:text-5xl font-bold gradient-text">
            {t('education.title')}
          </h2>
        </motion.div>

        <div className="space-y-8">
          {education.map((edu, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: index * 0.12 }}
            >
              <div className="glass-card rounded-2xl p-6 md:p-8 relative overflow-hidden glow-border">
                {/* Top accent line */}
                <div
                  className="absolute top-0 left-0 right-0 h-0.5"
                  style={{ background: `linear-gradient(90deg, ${edu.accent}60, transparent)` }}
                />

                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-4">
                  <div className="space-y-2">
                    <div className="flex items-start gap-3">
                      <GraduationCapIcon className="h-5 w-5 mt-0.5 flex-shrink-0" style={{ color: edu.accent }} />
                      <h3 className="font-semibold text-lg leading-snug" style={{ color: 'rgba(255,255,255,0.9)' }}>
                        {edu.degree}
                      </h3>
                    </div>
                    <div className="pl-8 space-y-1.5">
                      <p className="font-medium text-sm" style={{ color: edu.accent + 'cc' }}>
                        {edu.school}
                      </p>
                      <div className="flex items-center gap-2 text-sm" style={{ color: 'rgba(255,255,255,0.4)' }}>
                        <MapPinIcon className="h-3.5 w-3.5" />
                        {edu.location}
                      </div>
                    </div>
                  </div>

                  <div
                    className="flex items-center gap-2 text-sm font-medium px-3 py-1.5 rounded-full self-start flex-shrink-0"
                    style={{
                      background: `${edu.accent}15`,
                      border: `1px solid ${edu.accent}30`,
                      color: edu.accent + 'cc',
                    }}
                  >
                    <CalendarIcon className="h-3.5 w-3.5" />
                    {edu.period}
                  </div>
                </div>

                <p className="text-sm leading-relaxed pl-8 mb-5" style={{ color: 'rgba(255,255,255,0.5)' }}>
                  {edu.description}
                </p>

                <ul className="space-y-2 pl-8">
                  {edu.achievements.map((ach, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-sm" style={{ color: 'rgba(255,255,255,0.5)' }}>
                      <CheckCircleIcon className="h-4 w-4 mt-0.5 flex-shrink-0" style={{ color: edu.accent + '80' }} />
                      {ach}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
