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
      image: "https://images.pexels.com/photos/1181244/pexels-photo-1181244.jpeg?auto=compress&cs=tinysrgb&w=800",
    },
    {
      icon: Globe,
      title: t("services.webDevelopment.name"),
      description: t("services.webDevelopment.description"),
      link: "/services/web-development",
      image: "https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=800",
    },
    {
      icon: Zap,
      title: t("services.automation.name"),
      description: t("services.automation.description"),
      link: "/services/automation",
      image: "https://images.pexels.com/photos/373543/pexels-photo-373543.jpeg?auto=compress&cs=tinysrgb&w=800",
    },
    {
      icon: Cloud,
      title: t("services.cloudSolutions.name"),
      description: t("services.cloudSolutions.description"),
      link: "/services/cloud-solutions",
      image: "https://images.pexels.com/photos/1181354/pexels-photo-1181354.jpeg?auto=compress&cs=tinysrgb&w=800",
    },
    {
      icon: BarChart3,
      title: t("services.dataAnalytics.name"),
      description: t("services.dataAnalytics.description"),
      link: "/services/data-analytics",
      image: "https://images.pexels.com/photos/590022/pexels-photo-590022.jpeg?auto=compress&cs=tinysrgb&w=800",
    },
    {
      icon: Shield,
      title: t("services.cybersecurity.name"),
      description: t("services.cybersecurity.description"),
      link: "/services/cybersecurity",
      image: "https://images.pexels.com/photos/60504/security-protection-anti-virus-software-60504.jpeg?auto=compress&cs=tinysrgb&w=800",
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
          <div className="flex flex-col gap-8">
            {services.map((service, index) => (
              <div
                key={service.link}
                className={`slide-up stagger-${index + 1}`}
              >
                <ServiceCard {...service} index={index} />
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};
