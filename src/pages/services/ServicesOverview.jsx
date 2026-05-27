import { Link } from "react-router-dom";
import { useLanguage } from "../../context/LanguageContext";
import { SEO } from "../../components/SEO";
import ImageHero from "../../components/ImageHero";
import { Reveal } from "../../components/Reveal";
import { getServicesData } from "../../data/servicesData";
import { tDisplay, tSerif, tEyebrow, FONT } from "../../lib/typography";

export const ServicesOverview = () => {
  const { t, language } = useLanguage();
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
                itemOffered: { "@type": "Service", name: "Equipos On-Demand" },
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
        eyebrow={t("nav.services")}
        title={t("services.title")}
        description={t("services.subtitle")}
      />

      <section
        className="px-6 sm:px-10 lg:px-16"
        style={{ background: "var(--bg)" }}
      >
        {services.map((s, i) => (
          <Reveal key={s.id} y={28}>
            <div
              className="grid gap-5 tm:gap-14 items-start py-10 tm:py-16"
              style={{
                gridTemplateColumns: "1fr",
                borderBottom:
                  i < services.length - 1 ? "1px solid var(--rule)" : "none",
              }}
            >
              <div className="grid grid-cols-1 tm:grid-cols-[120px_1.4fr_1fr] gap-6 tm:gap-14 items-start">
                <div
                  style={{
                    ...tDisplay("clamp(40px, 5vw, 64px)", 500),
                    color: "var(--accent)",
                    lineHeight: 1,
                  }}
                >
                  {String(i + 1).padStart(2, "0")}
                </div>

                <div>
                  <h2
                    style={{
                      ...tDisplay("clamp(28px, 3.6vw, 48px)", 500),
                      color: "var(--ink)",
                      margin: "0 0 16px",
                    }}
                  >
                    {s.name}
                  </h2>
                  <p
                    style={{
                      ...tSerif("clamp(16px, 1.4vw, 19px)", 400),
                      color: "var(--muted)",
                      lineHeight: 1.55,
                      margin: 0,
                    }}
                  >
                    {s.description}
                  </p>
                  {s.badge && (
                    <div className="mt-6 flex flex-wrap gap-2">
                      <span
                        style={{
                          fontSize: 10.5,
                          padding: "6px 12px",
                          border: "1px solid var(--navy)",
                          color: "var(--ink)",
                          fontFamily: FONT.mono,
                          letterSpacing: "0.08em",
                          textTransform: "uppercase",
                        }}
                      >
                        {s.badge}
                      </span>
                    </div>
                  )}
                </div>

                <div>
                  <div style={tEyebrow("var(--muted)")} className="mb-3">
                    {language === "es" ? "Más información" : "Learn more"}
                  </div>
                  <Link
                    to={s.path}
                    className="inline-block text-[14px] no-underline mt-2"
                    style={{
                      color: "var(--ink)",
                      textDecoration: "underline",
                      textUnderlineOffset: 4,
                    }}
                  >
                    {language === "es"
                      ? "Ver detalles del servicio"
                      : "View service details"}{" "}
                    →
                  </Link>
                </div>
              </div>
            </div>
          </Reveal>
        ))}
      </section>
    </>
  );
};
