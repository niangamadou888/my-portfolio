import { TechStack } from "./ui/tech-stack";
import { motion } from "framer-motion";
import { useLanguage } from "@/i18n/LanguageContext";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.15, ease: [0.4, 0, 0.2, 1] },
  }),
};

export const About = () => {
  const { t } = useLanguage();

  return (
    <section id="about" className="section-container">
      <span className="section-num" aria-hidden="true">01</span>

      {/* Background orbs */}
      <div className="orb orb-purple" style={{ width: 500, height: 500, top: '-5%', left: '-10%', opacity: 0.08 }} />
      <div className="orb orb-cyan" style={{ width: 350, height: 350, bottom: '0%', right: '-8%', opacity: 0.07 }} />

      <div className="section-inner">
        {/* Section heading */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-14"
        >
          <p className="text-sm font-medium tracking-widest uppercase mb-3" style={{ color: 'rgba(214, 201, 182, 0.6)' }}>
            01 — {t('nav.about')}
          </p>
          <h2 className="text-4xl sm:text-5xl font-bold gradient-text">
            {t('about.title')}
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Left: about text */}
          <motion.div
            custom={0}
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <div
              className="glass-card glow-border rounded-2xl p-8 h-full space-y-6"
            >
              <p className="leading-relaxed text-base" style={{ color: 'rgba(255,255,255,0.6)' }}>
                {t('about.p1')}
              </p>
              <div
                className="h-px w-16"
                style={{ background: 'linear-gradient(90deg, rgba(139,92,246,0.4), transparent)' }}
              />
              <blockquote
                className="text-sm leading-relaxed pl-4 font-medium"
                style={{
                  color: 'rgba(214, 201, 182, 0.7)',
                  borderLeft: '2px solid rgba(214, 201, 182, 0.3)',
                }}
              >
                {t('about.p3')}
              </blockquote>
            </div>
          </motion.div>

          {/* Right: tech stack */}
          <motion.div
            custom={1}
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <div className="glass-card glow-border rounded-2xl p-8 h-full">
              <h3
                className="text-sm font-semibold tracking-widest uppercase mb-6"
                style={{ color: 'rgba(214, 201, 182, 0.6)' }}
              >
                {t('about.skills')}
              </h3>
              <TechStack />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
