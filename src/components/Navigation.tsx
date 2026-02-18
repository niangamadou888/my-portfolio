import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";
import { Button } from "./ui/button";
import { useLanguage } from "@/i18n/LanguageContext";

export const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const { t } = useLanguage();

  const menuItems = [
    { name: t("nav.home"), href: "#home" },
    { name: t("nav.about"), href: "#about" },
    { name: t("nav.experience"), href: "#experience" },
    { name: t("nav.education"), href: "#education" },
    { name: t("nav.certifications"), href: "#certifications" },
    { name: t("nav.projects"), href: "#projects" },
    { name: t("nav.contact"), href: "#contact" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const sections = menuItems.map(item => item.href.substring(1));
      const scrollPosition = window.scrollY + 100;

      const currentSection = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          return scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight;
        }
        return false;
      });

      if (currentSection) {
        setActiveSection(currentSection);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* Mobile Menu Button */}
      <Button
        variant="ghost"
        size="icon"
        className="fixed top-4 right-4 z-50 md:hidden"
        onClick={() => setIsOpen(!isOpen)}
        aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
        aria-expanded={isOpen}
        aria-controls="mobile-nav"
      >
        {isOpen ? (
          <X className="h-6 w-6" />
        ) : (
          <Menu className="h-6 w-6" />
        )}
      </Button>

      {/* Desktop Navigation */}
      <nav aria-label="Main navigation" className="hidden md:block fixed top-0 right-0 h-screen z-40 pr-8 pt-20">
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-end space-y-4"
        >
          {menuItems.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className={cn(
                "text-sm font-medium relative group py-1 px-4",
                activeSection === item.href.substring(1)
                  ? "text-primary"
                  : "text-muted-foreground hover:text-primary transition-colors"
              )}
            >
              {item.name}
              <span
                className={cn(
                  "absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full transition-all duration-300",
                  activeSection === item.href.substring(1)
                    ? "bg-primary scale-100"
                    : "bg-primary/50 scale-0 group-hover:scale-75"
                )}
              />
            </a>
          ))}
        </motion.div>
      </nav>

      {/* Mobile Navigation */}
      <motion.div
        id="mobile-nav"
        role="dialog"
        aria-label="Mobile navigation menu"
        initial={{ opacity: 0, x: "100%" }}
        animate={{ opacity: isOpen ? 1 : 0, x: isOpen ? 0 : "100%" }}
        transition={{ duration: 0.3 }}
        className={cn(
          "fixed inset-y-0 right-0 z-40 w-full bg-background/95 backdrop-blur-lg md:hidden",
          isOpen ? "pointer-events-auto" : "pointer-events-none"
        )}
      >
        <div className="flex items-center justify-center h-full">
          <div className="flex flex-col items-center space-y-6">
            {menuItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className={cn(
                  "text-lg font-medium",
                  activeSection === item.href.substring(1)
                    ? "text-primary"
                    : "text-muted-foreground"
                )}
              >
                {item.name}
              </a>
            ))}
          </div>
        </div>
      </motion.div>
    </>
  );
};
