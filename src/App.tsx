import { lazy, Suspense, useEffect } from "react";
import Index from "./pages/Index";
import { ThemeProvider } from "./components/theme-provider";
import { LanguageProvider } from "./i18n/LanguageContext";
import { NoiseOverlay } from "./components/NoiseOverlay";

// CustomCursor is invisible until the user moves the mouse — no need to be in critical path
const CustomCursor = lazy(() =>
  import("./components/CustomCursor").then((m) => ({ default: m.CustomCursor }))
);

// These all pull in @radix-ui — lazy-load so radix-ui stays out of the critical path.
// Toast/dropdown are only needed on interaction, not on first paint.
const Toaster = lazy(() =>
  import("@/components/ui/toaster").then((m) => ({ default: m.Toaster }))
);
const Sonner = lazy(() =>
  import("@/components/ui/sonner").then((m) => ({ default: m.Toaster }))
);
const LanguageToggle = lazy(() =>
  import("./components/LanguageToggle").then((m) => ({ default: m.LanguageToggle }))
);

// Single-page app — no routing needed, removing react-router-dom from critical path
const App = () => {
  // Hide the static hero shell after React mounts by pushing it behind the page content.
  // We do NOT remove it from the DOM — Chrome drops an element's LCP candidate when it's
  // removed. By keeping it in DOM with z-index:-1 it remains the LCP candidate while
  // React's h1 (same or smaller area) doesn't trigger a new LCP update.
  useEffect(() => {
    const shell = document.getElementById('__hshell');
    if (shell) {
      shell.style.zIndex = '-1';
      shell.style.pointerEvents = 'none';
    }
  }, []);

  return (
  <ThemeProvider defaultTheme="dark" storageKey="portfolio-theme">
    <LanguageProvider>
      <Suspense fallback={null}>
        <CustomCursor />
        <Toaster />
        <Sonner />
        <LanguageToggle />
      </Suspense>
      <NoiseOverlay />
      <div className="min-h-screen bg-background text-foreground relative">
        <Index />
      </div>
    </LanguageProvider>
  </ThemeProvider>
  );
};

export default App;
