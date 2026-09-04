import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { useLanguage } from "../../context/LanguageContext";
import { SEO } from "../../components/SEO";
import { Btn } from "../../components/Btn";
import { Image } from "../../components/Image";
import { getServicesData } from "../../data/servicesData";

// Índice de servicios, rediseño 2026. Mismas rutas y mismo <SEO>.

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

      <section className="rd-hero rd-hero--page">
        <div className="rd-shot rd-shot--cover">
          <Image
            src="/images/company/Company.webp"
            alt=""
            sizes="100vw"
            priority
            width={1600}
            height={1000}
          />
          <span className="rd-shot-grade" aria-hidden="true" />
        </div>

        <div className="rd-hero-body">
          <div className="rd-hero-copy">
            <div className="rd-eyebrow">
              <i aria-hidden="true" />
              {t("nav.services")}
            </div>
            <h1 className="rd-h1">{t("services.title")}</h1>
            <p className="rd-hero-sub">{t("services.subtitle")}</p>
            <div className="rd-ctas">
              <Btn as={Link} to="/contact">
                {t("CTA.primaryButton")}
              </Btn>
            </div>
          </div>
        </div>
      </section>

      {/* Índice numerado en vez de rejilla de tarjetas: nueve servicios en
          tarjetas obligan a decidir nueve veces; en lista se recorren. */}
      <section className="rd-sec">
        <div className="rd-index" data-stagger>
          {services.map((s, i) => (
            <Link key={s.id} className="rd-index-item" to={s.path}>
              <span className="rd-index-item-n">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="rd-index-item-name">{s.name}</span>
              <span className="rd-index-item-desc">{s.description}</span>
              <span className="rd-index-item-badge">{s.badge}</span>
              <span className="rd-index-item-go" aria-hidden="true">
                <ArrowUpRight size={18} strokeWidth={2} />
              </span>
            </Link>
          ))}
        </div>
      </section>

      <section className="rd-sec rd-cta-sec">
        <div className="rd-cta">
          <div className="rd-shot rd-shot--cover">
            <Image
              src="/images/company/Mission.webp"
              alt=""
              sizes="100vw"
              width={1600}
              height={1000}
            />
            <span className="rd-shot-grade" aria-hidden="true" />
          </div>

          <div className="rd-cta-inner" data-stagger>
            <div className="rd-eyebrow is-center">
              <i aria-hidden="true" />
              {t("CTA.badge")}
            </div>
            <h2 className="rd-h2 rd-cta-title">{t("CTA.title")}</h2>
            <p className="rd-cta-sub">{t("CTA.subtitle")}</p>
            <div className="rd-cta-btns">
              <Btn as={Link} to="/contact">
                {t("CTA.primaryButton")}
              </Btn>
              <Btn as={Link} to="/cases" tone="ghost">
                {t("mega.viewAllCases")}
              </Btn>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
