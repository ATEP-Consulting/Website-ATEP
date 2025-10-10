import { Link } from "react-router-dom";
import {
  Server,
  Globe,
  Zap,
  Cloud,
  RefreshCw,
  Code2,
  Award,
  Users,
  TrendingUp,
} from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
import { SEO } from "../components/SEO";
import { ServicesCarousel } from "../components/ServicesCarousel";
import { HowWeWork } from "../components/HowWeWork";
import Hero from "../components/Hero";
import { ClientLogos } from "../components/ClientLogos";
import StyleLogo from "../assets/logos/style-logo.svg";
import HamptonLogo from "../assets/logos/hampton-logo.svg";
import VertiluxLogo from "../assets/logos/vertilux-logo.svg";
import { getServicesData } from "../data/servicesData";

export const Home = () => {
  const { t } = useLanguage();
  const services = getServicesData(t);

  const whyChoose = [
    {
      icon: Award,
      title: t("home.whyChoose1Title"),
      text: t("home.whyChoose1Text"),
    },
    {
      icon: TrendingUp,
      title: t("home.whyChoose2Title"),
      text: t("home.whyChoose2Text"),
    },
    {
      icon: Users,
      title: t("home.whyChoose3Title"),
      text: t("home.whyChoose3Text"),
    },
  ];

  return (
    <>
      <SEO
        title={t("nav.home")}
        description={t("home.heroSubtitle")}
        keywords="digital transformation, consulting, web development, automation, legacy migration"
      />

      <Hero
        badge={t("hero.heroBadge")}
        title={
          <>
            {t("hero.heroTitle1")}
            <span className="text-primary-600">
              {t("hero.heroTitle2")}
            </span>{" "}
            {t("hero.heroTitle3")}{" "}
            <span className="text-primary-600">{t("hero.heroTitle4")}</span>
          </>
        }
        subtitle={t("hero.heroSubtitle")}
        primaryButton={{
          text: t("hero.heroCta"),
          to: "/contact",
        }}
        secondaryButton={{
          text: t("hero.heroSecondaryCta"),
          to: "/services",
        }}
        image="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=1200&h=1000&fit=crop&q=80"
      />

      <ClientLogos
        logos={[
          { src: StyleLogo, alt: "Client 1" },
          { src: HamptonLogo, alt: "Client 2" },
          { src: VertiluxLogo, alt: "Client 3" },
        ]}
      />

      <HowWeWork />

      <section className="section-padding bg-white">
        <div className="section-container">
          <div className="text-center mb-16 flex flex-col items-center">
            <h2 className="heading-lg mb-4 slide-up">
              {t("home.servicesTitle1")}{" "}
              <span className="text-primary-600">
                {t("home.servicesTitle2")}
              </span>
            </h2>
            <p className="text-xl text-neutral-600 slide-up stagger-1 sm:w-2/3">
              {t("home.servicesSubtitle")}
            </p>
          </div>

          <div className="slide-up stagger-1 -mx-4 sm:-mx-6 lg:-mx-8">
            <ServicesCarousel services={services} />
          </div>

          <div className="text-center mt-20">
            <Link to="/services" className="btn-outline">
              {t("services.viewAll")}
            </Link>
          </div>
        </div>
      </section>

      <section className="section-padding bg-neutral-50">
        <div className="section-container">
          <div className="text-center mb-16 flex flex-col items-center">
            <h2 className="heading-lg mb-4 slide-up">
              {t("home.whyChooseTitle1")}{" "}
              <span className="text-primary-600">
                {t("home.whyChooseTitle2")}
              </span>
              {t("home.whyChooseTitle3")}{" "}
              <span className="text-primary-600">
                {t("home.whyChooseTitle4")}
              </span>
              {t("home.whyChooseTitle5")}{" "}
              <span className="text-primary-600">
                {t("home.whyChooseTitle6")}
              </span>
            </h2>
            <p className="text-xl text-neutral-600 slide-up stagger-1 sm:w-2/3">
              {t("home.whyChooseSubtitle")}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {whyChoose.map((item, index) => {
              const Icon = item.icon;

              // Imágenes para cada tarjeta
              const images = [
                "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=600&fit=crop", // Team collaboration
                "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop", // Analytics/Data
                "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800&h=600&fit=crop", // Technology/Innovation
              ];

              return (
                <div
                  key={item.title}
                  className={`group relative bg-white rounded-xl overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-2 slide-up stagger-${
                    index + 1
                  }`}
                >
                  {/* Imagen con efecto zoom */}
                  <div className="relative h-48 overflow-hidden bg-gradient-to-br from-primary-100 to-primary-50">
                    <img
                      src={images[index]}
                      alt={item.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    {/* Overlay sutil */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                  </div>

                  {/* Icono centrado entre imagen y contenido */}
                  <div
                    className="absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-white rounded-xl flex items-center justify-center shadow-lg"
                    style={{ top: "12rem" }}
                  >
                    <Icon className="w-8 h-8 text-primary-600" />
                  </div>

                  {/* Contenido */}
                  <div className="p-8 pt-12">
                    <h3 className="heading-sm mb-4 transition-colors duration-300 group-hover:text-primary-600">
                      {item.title}
                    </h3>

                    <p className="text-body leading-relaxed">{item.text}</p>
                  </div>

                  {/* Línea decorativa inferior */}
                  <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-1 bg-gradient-to-r from-primary-500 to-primary-600 rounded-full transition-all duration-300 group-hover:w-20"></div>
                </div>
              );
            })}
          </div>
          <div className="text-center mt-12">
            <Link to="/company" className="btn-outline">
              {t("about.viewAll")}
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};
