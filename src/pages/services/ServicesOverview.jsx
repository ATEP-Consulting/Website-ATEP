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
        title="Nuestros Servicios - Soluciones IT Completas"
        description="Ofrecemos desarrollo web profesional, aplicaciones full-stack, equipos on-demand, migración de sistemas legacy y automatización de procesos. Soluciones tecnológicas a medida para tu empresa."
        keywords="servicios IT, desarrollo web, aplicaciones personalizadas, migración legacy, automatización, staff augmentation, Valencia"
        schemaType="Service"
        schemaData={{
          serviceType: "Consultoría IT y Desarrollo de Software",
          hasOfferCatalog: {
            "@type": "OfferCatalog",
            name: "Servicios de Tecnología",
            itemListElement: [
              {
                "@type": "Offer",
                itemOffered: {
                  "@type": "Service",
                  name: "Desarrollo Web Profesional",
                },
              },
              {
                "@type": "Offer",
                itemOffered: {
                  "@type": "Service",
                  name: "Desarrollo Full-Stack",
                },
              },
              {
                "@type": "Offer",
                itemOffered: {
                  "@type": "Service",
                  name: "Equipos On-Demand",
                },
              },
              {
                "@type": "Offer",
                itemOffered: {
                  "@type": "Service",
                  name: "Migración de Sistemas Legacy",
                },
              },
              {
                "@type": "Offer",
                itemOffered: {
                  "@type": "Service",
                  name: "Automatización de Procesos",
                },
              },
            ],
          },
        }}
      />

      <ImageHero
        icon={Globe}
        title={t("services.title")}
        description={t("services.subtitle")}
        backgroundImage="/images/services/ServicesOverview.webp"
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
