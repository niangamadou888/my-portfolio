import { lazy, Suspense } from "react";
import { Hero } from "@/components/Hero";
import { Logo } from "@/components/Logo";
import { Navigation } from "@/components/Navigation";
import { ScrollProgress } from "@/components/ScrollProgress";

const About = lazy(() => import("@/components/About").then(m => ({ default: m.About })));
const Experience = lazy(() => import("@/components/Experience").then(m => ({ default: m.Experience })));
const Education = lazy(() => import("@/components/Education").then(m => ({ default: m.Education })));
const Certifications = lazy(() => import("@/components/Certifications").then(m => ({ default: m.Certifications })));
const Projects = lazy(() => import("@/components/Projects").then(m => ({ default: m.Projects })));
const Contact = lazy(() => import("@/components/Contact").then(m => ({ default: m.Contact })));
const Footer = lazy(() => import("@/components/Footer").then(m => ({ default: m.Footer })));

export default function Index() {
  return (
    <main className="min-h-screen relative" style={{ zIndex: 2 }}>
      <ScrollProgress />
      <Logo />
      <Navigation />
      <section id="home">
        <Hero />
      </section>
      <Suspense fallback={null}>
        <About />
        <Experience />
        <Education />
        <Certifications />
        <Projects />
        <Contact />
        <Footer />
      </Suspense>
    </main>
  );
}
