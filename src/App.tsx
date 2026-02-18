import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import { ThemeProvider } from "./components/theme-provider";
import { LanguageProvider } from "./i18n/LanguageContext";
import { LanguageToggle } from "./components/LanguageToggle";
import { CustomCursor } from "./components/CustomCursor";
import { NoiseOverlay } from "./components/NoiseOverlay";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <ThemeProvider defaultTheme="dark" storageKey="portfolio-theme">
        <LanguageProvider>
          <CustomCursor />
          <NoiseOverlay />
          <div className="min-h-screen bg-background text-foreground relative">
            <LanguageToggle />
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Index />} />
              </Routes>
            </BrowserRouter>
          </div>
        </LanguageProvider>
      </ThemeProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
