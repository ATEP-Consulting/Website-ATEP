import { useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { LanguageProvider } from "./context/LanguageContext";
import { useLanguage } from "./context/LanguageContext";
import { MainLayout } from "./layouts/MainLayout";
import { Home } from "./pages/Home";
import { AboutUs } from "./pages/AboutUs";
import { ServicesOverview } from "./pages/services/ServicesOverview";
import { BlogList } from "./pages/blog/BlogList";
import { BlogPost } from "./pages/blog/BlogPost";
import { Contact } from "./pages/Contact";
import { PrivacyPolicy } from "./pages/PrivacyPolicy";
import { CookiesPolicy } from "./pages/CookiesPolicy";
import { LegalNotice } from "./pages/LegalNotice";
import { ScrollToTop } from "./components/ScrollToTop";
import { NotFound } from "./pages/NotFound";
import { SnackbarProvider } from "./context/SnackBarContext";
import { WhatsAppButton } from "./components/WhatsAppButton";
import { getServicesData } from "./data/servicesData";

function AppRoutes() {
  const { t } = useLanguage();
  const services = getServicesData(t);

  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="company" element={<AboutUs />} />
        <Route path="services" element={<ServicesOverview />} />

        {services.map((service) => (
          <Route
            key={service.id}
            path={service.path}
            element={<service.component />}
          />
        ))}

        <Route path="blog" element={<BlogList />} />
        <Route path="blog/:slug" element={<BlogPost />} />
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
  const location = useLocation();

  useEffect(() => {
    ReactGA.pageview(location.pathname + location.search);
  }, [location]);

  return (
    <LanguageProvider>
      <SnackbarProvider>
        <BrowserRouter>
          <ScrollToTop />
          <AppRoutes />
        </BrowserRouter>
        <WhatsAppButton />
      </SnackbarProvider>
    </LanguageProvider>
  );
}

export default App;
