import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";

export const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [scrolled, setScrolled] = useState(false);
  const { t } = useLanguage();

  const menuItems = [
    { name: t("nav.home"), href: "#home", id: "home" },
    { name: t("nav.about"), href: "#about", id: "about" },
    { name: t("nav.experience"), href: "#experience", id: "experience" },
    { name: t("nav.education"), href: "#education", id: "education" },
    { name: t("nav.certifications"), href: "#certifications", id: "certifications" },
    { name: t("nav.projects"), href: "#projects", id: "projects" },
    { name: t("nav.contact"), href: "#contact", id: "contact" },
  ];

  useEffect(() => {
    const sectionIds = ["home", "about", "experience", "education", "certifications", "projects", "contact"];
    let cachedOffsets: { id: string; top: number }[] = [];

    const updateOffsets = () => {
      cachedOffsets = sectionIds
        .map(id => {
          const el = document.getElementById(id);
          if (!el) return { id, top: -1 };
          return { id, top: el.getBoundingClientRect().top + window.scrollY };
        })
        .filter(s => s.top >= 0);
    };
    updateOffsets();

    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
      const scrollPos = window.scrollY + window.innerHeight / 3;
      for (let i = cachedOffsets.length - 1; i >= 0; i--) {
        if (cachedOffsets[i].top <= scrollPos) {
          setActiveSection(cachedOffsets[i].id);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", updateOffsets, { passive: true });
    handleScroll();
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", updateOffsets);
    };
  }, []);

  return (
    <>
      {/* ── Desktop top bar ── */}
      <motion.nav
        aria-label="Main navigation"
        initial={{ y: -60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, delay: 0.3 }}
        className="hidden md:flex fixed top-0 left-0 right-0 z-40 justify-center pt-5"
      >
        <div
          className={cn(
            "flex items-center gap-1 px-4 py-2 rounded-full transition-all duration-500",
            scrolled
              ? "bg-black/40 backdrop-blur-xl border border-white/08"
              : "bg-transparent"
          )}
          style={{ border: scrolled ? '1px solid rgba(255,255,255,0.07)' : 'none' }}
        >
          {menuItems.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <a
                key={item.id}
                href={item.href}
                className={cn(
                  "relative px-4 py-1.5 text-sm font-medium rounded-full transition-all duration-300",
                  isActive
                    ? "text-white"
                    : "text-white/45 hover:text-white/80"
                )}
                style={{ cursor: 'none' }}
              >
                {isActive && (
                  <motion.span
                    layoutId="nav-active"
                    className="absolute inset-0 rounded-full"
                    style={{
                      background: 'rgba(214, 201, 182, 0.1)',
                      border: '1px solid rgba(214, 201, 182, 0.25)',
                    }}
                    transition={{ type: "spring", bounce: 0.2, duration: 0.5 }}
                  />
                )}
                <span className="relative z-10">{item.name}</span>
              </a>
            );
          })}
        </div>
      </motion.nav>

      {/* ── Desktop side dots ── */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.8 }}
        className="hidden md:flex fixed right-6 top-1/2 -translate-y-1/2 z-40 flex-col items-end gap-3"
      >
        {menuItems.map((item) => {
          const isActive = activeSection === item.id;
          return (
            <a
              key={item.id}
              href={item.href}
              title={item.name}
              style={{ cursor: 'none' }}
              className="group flex items-center gap-2"
            >
              <span
                className={cn(
                  "text-xs font-medium transition-all duration-300 opacity-0 group-hover:opacity-100 translate-x-2 group-hover:translate-x-0 whitespace-nowrap",
                  isActive ? "text-[#d6c9b6]" : "text-white/30"
                )}
              >
                {item.name}
              </span>
              {/* Fixed wrapper keeps dot position stable regardless of its size */}
              <span className="flex items-center justify-center w-3 h-3 flex-shrink-0">
                <span
                  className={cn(
                    "block rounded-full transition-all duration-300",
                    isActive
                      ? "w-2 h-2 bg-[#d6c9b6]"
                      : "w-1.5 h-1.5 bg-white/20 group-hover:bg-white/50"
                  )}
                  style={isActive ? { boxShadow: '0 0 8px rgba(214, 201, 182, 0.6)' } : {}}
                />
              </span>
            </a>
          );
        })}
      </motion.div>

      {/* ── Mobile hamburger button ── */}
      <button
        className="fixed top-5 right-5 z-50 md:hidden flex items-center justify-center w-10 h-10 rounded-full"
        style={{
          background: 'rgba(255,255,255,0.05)',
          border: '1px solid rgba(255,255,255,0.1)',
          cursor: 'none',
        }}
        onClick={() => setIsOpen(!isOpen)}
        aria-label={isOpen ? "Close menu" : "Open menu"}
        aria-expanded={isOpen}
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.span
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <X className="h-5 w-5 text-white" />
            </motion.span>
          ) : (
            <motion.span
              key="open"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <Menu className="h-5 w-5 text-white" />
            </motion.span>
          )}
        </AnimatePresence>
      </button>

      {/* ── Mobile full-screen menu ── */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="mobile-nav"
            role="dialog"
            aria-label="Mobile navigation"
            initial={{ opacity: 0, clipPath: "circle(0% at calc(100% - 2.5rem) 2.5rem)" }}
            animate={{ opacity: 1, clipPath: "circle(150% at calc(100% - 2.5rem) 2.5rem)" }}
            exit={{ opacity: 0, clipPath: "circle(0% at calc(100% - 2.5rem) 2.5rem)" }}
            transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
            className="fixed inset-0 z-40 md:hidden"
            style={{ background: 'rgba(3, 3, 8, 0.97)', backdropFilter: 'blur(20px)' }}
          >
            <div className="flex items-center justify-center h-full">
              <nav className="flex flex-col items-center gap-8">
                {menuItems.map((item, i) => (
                  <motion.a
                    key={item.id}
                    href={item.href}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 + i * 0.07 }}
                    onClick={() => setIsOpen(false)}
                    style={{ cursor: 'none' }}
                    className={cn(
                      "text-2xl font-semibold tracking-wide transition-colors duration-200",
                      activeSection === item.id
                        ? "gradient-text"
                        : "text-white/50 hover:text-white/90"
                    )}
                  >
                    {item.name}
                  </motion.a>
                ))}
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
