// Actualizar ServicesOverview.jsx
import { Globe, Code2, Users, RefreshCw, Zap } from "lucide-react";
import { useLanguage } from "../../context/LanguageContext";
import { SEO } from "../../components/SEO";
import { ServiceCard } from "../../components/ServiceCard";
import ImageHero from "../../components/ImageHero";
import { getServicesData } from "../../data/servicesData";

export const ServicesOverview = () => {
  const { t } = useLanguage();
  const services = getServicesData(t);

  return (
    <>
      <SEO
        title={t("services.title")}
        description={t("services.subtitle")}
        keywords="web development, full stack, staff augmentation, legacy migration, automation, consulting"
      />

      <ImageHero
        icon={Globe}
        title={t("services.title")}
        description={t("services.subtitle")}
        backgroundImage="https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=1920&h=1080&fit=crop&q=80"
      />

      <section className="section-padding bg-white">
        <div className="section-container">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div key={service.id} className={`slide-up stagger-${index + 1}`}>
                <ServiceCard {...service} />
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};
