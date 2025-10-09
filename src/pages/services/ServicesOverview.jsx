import { Server, Globe, Zap, Cloud, BarChart3, Shield } from "lucide-react";
import { useLanguage } from "../../context/LanguageContext";
import { SEO } from "../../components/SEO";
import { ServiceCard } from "../../components/ServiceCard";
import ImageHero from "../../components/ImageHero";

export const ServicesOverview = () => {
  const { t } = useLanguage();

  const services = [
    {
      icon: Server,
      title: t("services.legacyMigration.name"),
      description: t("services.legacyMigration.description"),
      link: "/services/legacy-migration",
      image:
        "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&h=600&fit=crop&q=80",
    },
    {
      icon: Globe,
      title: t("services.webDevelopment.name"),
      description: t("services.webDevelopment.description"),
      link: "/services/web-development",
      image:
        "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&h=600&fit=crop&q=80",
    },
    {
      icon: Zap,
      title: t("services.automation.name"),
      description: t("services.automation.description"),
      link: "/services/automation",
      image:
        "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&h=600&fit=crop&q=80",
    },
    {
      icon: Cloud,
      title: t("services.cloudSolutions.name"),
      description: t("services.cloudSolutions.description"),
      link: "/services/cloud-solutions",
      image:
        "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&h=600&fit=crop&q=80",
    },
    {
      icon: BarChart3,
      title: t("services.dataAnalytics.name"),
      description: t("services.dataAnalytics.description"),
      link: "/services/data-analytics",
      image:
        "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop&q=80",
    },
    {
      icon: Shield,
      title: t("services.cybersecurity.name"),
      description: t("services.cybersecurity.description"),
      link: "/services/cybersecurity",
      image:
        "https://images.unsplash.com/photo-1563206767-5b18f218e8de?w=800&h=600&fit=crop&q=80",
    },
  ];

  return (
    <>
      <SEO
        title={t("services.title")}
        description={t("services.subtitle")}
        keywords="services, digital transformation, web development, automation, legacy migration"
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
              <div
                key={service.link}
                className={`slide-up stagger-${index + 1}`}
              >
                <ServiceCard {...service} />
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};
