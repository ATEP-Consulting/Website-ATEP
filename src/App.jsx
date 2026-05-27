import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LanguageProvider } from "./context/LanguageContext";
import { ThemeProvider } from "./context/ThemeContext";
import { MainLayout } from "./layouts/MainLayout";
import { Home } from "./pages/Home";
import { AboutUs } from "./pages/AboutUs";
import { ServicesOverview } from "./pages/services/ServicesOverview";
import { ProfessionalWebsites } from "./pages/services/ProfessionalWebsites";
import { FullStackDevelopment } from "./pages/services/FullStackDevelopment";
import { OnDemandTeam } from "./pages/services/OnDemandTeam";
import { LegacyMigration } from "./pages/services/LegacyMigration";
import { Automation } from "./pages/services/Automation";
import { AISolutions } from "./pages/services/AISolutions";
import { MobileApps } from "./pages/services/MobileApps";
import { Ecommerce } from "./pages/services/Ecommerce";
import { Support } from "./pages/services/Support";
import { BlogList } from "./pages/blog/BlogList";
import { BlogPost } from "./pages/blog/BlogPost";
import { CasesList } from "./pages/cases/CasesList";
import { CasePost } from "./pages/cases/CasePost";
import { Contact } from "./pages/Contact";
import { PrivacyPolicy } from "./pages/PrivacyPolicy";
import { CookiesPolicy } from "./pages/CookiesPolicy";
import { LegalNotice } from "./pages/LegalNotice";
import { ScrollToTop } from "./components/ScrollToTop";
import { NotFound } from "./pages/NotFound";
import { SnackbarProvider } from "./context/SnackBarContext";
import { WhatsAppButton } from "./components/WhatsAppButton";
import { CookieBanner } from "./components/CookieBanner";
import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";
import { HelmetProvider } from "react-helmet-async";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="company" element={<AboutUs />} />
        <Route path="services" element={<ServicesOverview />} />

        <Route
          path="/services/professional-websites"
          element={<ProfessionalWebsites />}
        />
        <Route
          path="/services/full-stack-development"
          element={<FullStackDevelopment />}
        />
        <Route path="/services/on-demand-team" element={<OnDemandTeam />} />
        <Route
          path="/services/legacy-migration"
          element={<LegacyMigration />}
        />
        <Route path="/services/automation" element={<Automation />} />
        <Route path="/services/ai-solutions" element={<AISolutions />} />
        <Route path="/services/mobile-apps" element={<MobileApps />} />
        <Route path="/services/ecommerce" element={<Ecommerce />} />
        <Route path="/services/support" element={<Support />} />

        <Route path="blog" element={<BlogList />} />
        <Route path="blog/:slug" element={<BlogPost />} />
        <Route path="cases" element={<CasesList />} />
        <Route path="cases/:slug" element={<CasePost />} />
        <Route path="contact" element={<Contact />} />
        <Route path="privacy-policy" element={<PrivacyPolicy />} />
        <Route path="cookies-policy" element={<CookiesPolicy />} />
        <Route path="legal-notice" element={<LegalNotice />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

function App() {
  return (
    <HelmetProvider>
      <ThemeProvider>
        <LanguageProvider>
          <SnackbarProvider>
            <BrowserRouter>
              <ScrollToTop />
              <AppRoutes />
              <WhatsAppButton />
              <CookieBanner />
            </BrowserRouter>
          </SnackbarProvider>
        </LanguageProvider>
      </ThemeProvider>
    </HelmetProvider>
  );
}

export default App;
