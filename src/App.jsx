import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LanguageProvider } from "./context/LanguageContext";
import { MainLayout } from "./layouts/MainLayout";
import { Home } from "./pages/Home";
import { AboutUs } from "./pages/AboutUs";
import { ServicesOverview } from "./pages/services/ServicesOverview";
import { LegacyMigration } from "./pages/services/LegacyMigration";
import { WebDevelopment } from "./pages/services/WebDevelopment";
import { Automation } from "./pages/services/Automation";
import { CloudSolutions } from "./pages/services/CloudSolutions";
import { DataAnalytics } from "./pages/services/DataAnalytics";
import { Cybersecurity } from "./pages/services/Cybersecurity";
import { BlogList } from "./pages/blog/BlogList";
import { BlogPost } from "./pages/blog/BlogPost";
import { Contact } from "./pages/Contact";
import { PrivacyPolicy } from "./pages/PrivacyPolicy";
import { CookiesPolicy } from "./pages/CookiesPolicy";
import { ScrollToTop } from "./components/ScrollToTop";
import { NotFound } from "./pages/NotFound";

function App() {
  return (
    <LanguageProvider>
      <BrowserRouter>
        <ScrollToTop /> {/* 👈 aquí, antes de las rutas */}
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Home />} />
            <Route path="company" element={<AboutUs />} />
            <Route path="services" element={<ServicesOverview />} />
            <Route
              path="services/legacy-migration"
              element={<LegacyMigration />}
            />
            <Route
              path="services/web-development"
              element={<WebDevelopment />}
            />
            <Route path="services/automation" element={<Automation />} />
            <Route
              path="services/cloud-solutions"
              element={<CloudSolutions />}
            />
            <Route path="services/data-analytics" element={<DataAnalytics />} />
            <Route path="services/cybersecurity" element={<Cybersecurity />} />
            <Route path="blog" element={<BlogList />} />
            <Route path="blog/:slug" element={<BlogPost />} />
            <Route path="contact" element={<Contact />} />
            <Route path="privacy-policy" element={<PrivacyPolicy />} />
            <Route path="cookies-policy" element={<CookiesPolicy />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </LanguageProvider>
  );
}

export default App;
