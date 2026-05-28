import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LanguageProvider } from "./context/LanguageContext";
import { ThemeProvider } from "./context/ThemeContext";
import { MainLayout } from "./layouts/MainLayout";
import { Home } from "./pages/Home";
import { ScrollToTop } from "./components/ScrollToTop";
import { SnackbarProvider } from "./context/SnackBarContext";
import { WhatsAppButton } from "./components/WhatsAppButton";
import { CookieBanner } from "./components/CookieBanner";
import { HelmetProvider } from "react-helmet-async";

const AboutUs = lazy(() =>
  import("./pages/AboutUs").then((m) => ({ default: m.AboutUs })),
);
const ServicesOverview = lazy(() =>
  import("./pages/services/ServicesOverview").then((m) => ({
    default: m.ServicesOverview,
  })),
);
const ProfessionalWebsites = lazy(() =>
  import("./pages/services/ProfessionalWebsites").then((m) => ({
    default: m.ProfessionalWebsites,
  })),
);
const FullStackDevelopment = lazy(() =>
  import("./pages/services/FullStackDevelopment").then((m) => ({
    default: m.FullStackDevelopment,
  })),
);
const OnDemandTeam = lazy(() =>
  import("./pages/services/OnDemandTeam").then((m) => ({
    default: m.OnDemandTeam,
  })),
);
const LegacyMigration = lazy(() =>
  import("./pages/services/LegacyMigration").then((m) => ({
    default: m.LegacyMigration,
  })),
);
const Automation = lazy(() =>
  import("./pages/services/Automation").then((m) => ({
    default: m.Automation,
  })),
);
const AISolutions = lazy(() =>
  import("./pages/services/AISolutions").then((m) => ({
    default: m.AISolutions,
  })),
);
const MobileApps = lazy(() =>
  import("./pages/services/MobileApps").then((m) => ({
    default: m.MobileApps,
  })),
);
const Ecommerce = lazy(() =>
  import("./pages/services/Ecommerce").then((m) => ({ default: m.Ecommerce })),
);
const Support = lazy(() =>
  import("./pages/services/Support").then((m) => ({ default: m.Support })),
);
const BlogList = lazy(() =>
  import("./pages/blog/BlogList").then((m) => ({ default: m.BlogList })),
);
const BlogPost = lazy(() =>
  import("./pages/blog/BlogPost").then((m) => ({ default: m.BlogPost })),
);
const CasesList = lazy(() =>
  import("./pages/cases/CasesList").then((m) => ({ default: m.CasesList })),
);
const CasePost = lazy(() =>
  import("./pages/cases/CasePost").then((m) => ({ default: m.CasePost })),
);
const Contact = lazy(() =>
  import("./pages/Contact").then((m) => ({ default: m.Contact })),
);
const PrivacyPolicy = lazy(() =>
  import("./pages/PrivacyPolicy").then((m) => ({ default: m.PrivacyPolicy })),
);
const CookiesPolicy = lazy(() =>
  import("./pages/CookiesPolicy").then((m) => ({ default: m.CookiesPolicy })),
);
const LegalNotice = lazy(() =>
  import("./pages/LegalNotice").then((m) => ({ default: m.LegalNotice })),
);
const NotFound = lazy(() =>
  import("./pages/NotFound").then((m) => ({ default: m.NotFound })),
);

function AppRoutes() {
  return (
    <Suspense fallback={null}>
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
    </Suspense>
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
