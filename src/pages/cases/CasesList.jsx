import { Link } from "react-router-dom";
import { useLanguage } from "../../context/LanguageContext";
import { SEO } from "../../components/SEO";
import { Btn } from "../../components/Btn";
import { ProjectPlate } from "../../components/ProjectPlate";
import { Image } from "../../components/Image";
import { cases as casesData } from "../../data/casesData";

// Índice de casos, rediseño 2026. Mismas rutas y mismo <SEO>.

// En los datos el cliente viene con el rol detrás ("Nilyan Herrera · Agente
// inmobiliaria"); en la placa solo cabe —y solo interesa— la primera mitad.
const nombreCorto = (texto = "") => texto.split(" · ")[0];

export const CasesList = () => {
  const { t, language } = useLanguage();

  // Del más reciente al más antiguo: el trabajo nuevo es el que mejor vende.
  const lista = [...casesData].sort((a, b) => (b.year || 0) - (a.year || 0));

  return (
    <>
      <SEO
        title={
          language === "es"
            ? "Casos de Éxito - Proyectos Reales de ATEP Consulting"
            : "Case Studies - Real Projects by ATEP Consulting"
        }
        description={
          language === "es"
            ? "Plataformas SaaS, e-commerce, sistemas de gestión, dashboards de business intelligence. Casos reales de desarrollo software entregados por ATEP Consulting."
            : "SaaS platforms, e-commerce, management systems, BI dashboards. Real software development cases delivered by ATEP Consulting."
        }
        keywords="casos éxito, case studies, proyectos software, desarrollo a medida, SaaS, dashboard BI, e-commerce, Valencia"
        schemaType="WebPage"
      />

      <section className="rd-hero rd-hero--page">
        <div className="rd-shot rd-shot--cover">
          <Image
            src="/images/company/Excellence.webp"
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
              {t("nav.cases")}
            </div>
            <h1 className="rd-h1">
              {t("home.casesTitle1")}{" "}
              <span className="rd-dim">{t("home.casesTitle2")}</span>
            </h1>
            <p className="rd-hero-sub">{t("mega.similarProjectText")}</p>
          </div>
        </div>
      </section>

      <section className="rd-sec">
        <div className="rd-grid2" data-stagger>
          {lista.map((c, i) => (
            <article key={c.slug}>
              {/* La placa ES el enlace: anidar dos <a> sería HTML inválido. */}
              <ProjectPlate
                as={Link}
                to={`/cases/${c.slug}`}
                index={i}
                name={nombreCorto(c.client[language])}
                sector={c.sector[language]}
                metric={c.metric.value}
                metricLabel={c.metric.label[language]}
              />
              <p className="rd-card-text rd-plate-caption">
                {c.description[language]}
              </p>
            </article>
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
              {t("mega.similarProject")}
            </div>
            <h2 className="rd-h2 rd-cta-title">{t("CTA.title")}</h2>
            <p className="rd-cta-sub">{t("CTA.subtitle")}</p>
            <div className="rd-cta-btns">
              <Btn as={Link} to="/contact">
                {t("CTA.primaryButton")}
              </Btn>
              <Btn as={Link} to="/services" tone="ghost">
                {t("mega.viewAllServices")}
              </Btn>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
