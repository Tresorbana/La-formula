import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { LanguageProvider, useLanguage } from "./contexts/LanguageContext";
import { HomePage } from "./components/HomePage";
import NotFound from "./pages/NotFound";
import { AboutUs } from "./pages/AboutUs";
import { Services } from "./pages/Services";
import { Contact } from "./pages/Contact";
import { Careers } from "./pages/Careers";
import { TermsOfUse } from "./pages/TermsOfUse";
import { PrivacyPolicy } from "./pages/PrivacyPolicy";
import { Cookies } from "./pages/Cookies";
import CanvasBackground from "./components/CanvasBackground";
import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";

// Wrapper component to handle language initialization
const LanguageRouter = ({ children }: { children: React.ReactNode }) => {
  const { lang, setLanguage } = useLanguage();
  const location = useLocation();

  // Ensure URL matches the current language
  useEffect(() => {
    const path = location.pathname;
    // If there is literally no path (rare), default to Spanish home
    if (path === '') {
      setLanguage('es');
      window.history.replaceState({}, '', '/spanish');
    }
  }, [location.pathname, lang, setLanguage]);

  return <>{children}</>;
};

const queryClient = new QueryClient();

const AppContent = () => {
  const location = useLocation();

  // Scroll behavior: top on page change, to anchor if hash is present
  useEffect(() => {
    if (location.hash) {
      // Defer to allow route content to mount
      setTimeout(() => {
        const target = document.querySelector(location.hash);
        if (target) {
          (target as HTMLElement).scrollIntoView({ behavior: 'auto', block: 'start' });
        } else {
          window.scrollTo({ top: 0, behavior: 'auto' });
        }
      }, 0);
    } else {
      window.scrollTo({ top: 0, behavior: 'auto' });
    }
  }, [location.pathname, location.hash]);

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -12 }}
        transition={{ duration: 0.15, ease: "easeOut" }}
     >
        <Routes location={location}>
          {/* Home Pages */}
          <Route path="/" element={<HomePage />} />
          <Route path="/spanish" element={<HomePage />} />

          {/* English Pages */}
          <Route path="/about" element={<AboutUs />} />
          <Route path="/services" element={<Services />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/careers" element={<Careers />} />
          <Route path="/terms" element={<TermsOfUse />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="/cookies" element={<Cookies />} />

          {/* Spanish Pages */}
          <Route path="/spanish/about" element={<AboutUs />} />
          <Route path="/spanish/services" element={<Services />} />
          <Route path="/spanish/contact" element={<Contact />} />
          <Route path="/spanish/careers" element={<Careers />} />
          <Route path="/spanish/terms" element={<TermsOfUse />} />
          <Route path="/spanish/privacy" element={<PrivacyPolicy />} />
          <Route path="/spanish/cookies" element={<Cookies />} />

          {/* 404 */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </motion.div>
    </AnimatePresence>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <CanvasBackground/>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <LanguageProvider>
          <LanguageRouter>
            <AppContent />
          </LanguageRouter>
        </LanguageProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
