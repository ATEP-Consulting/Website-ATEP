import { Link } from "react-router-dom";
import { useLanguage } from "../../context/LanguageContext";
import { SEO } from "../../components/SEO";
import ImageHero from "../../components/ImageHero";
import { Reveal, RevealStagger } from "../../components/Reveal";
import { CaseCard } from "../../components/CaseCard";
import { cases } from "../../data/casesData";
import { tDisplay, tSerif, tEyebrow } from "../../lib/typography";

export const CasesList = () => {
  const { t, language } = useLanguage();

  const sorted = [...cases].sort((a, b) => b.year - a.year);

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

      <ImageHero
        eyebrow={t("nav.cases") || (language === "es" ? "Casos" : "Cases")}
        title={
          language === "es"
            ? "El trabajo habla por nosotros."
            : "The work speaks for itself."
        }
        description={
          language === "es"
            ? "Cinco proyectos reales que muestran cómo trabajamos y qué entregamos: plataformas SaaS, dashboards de inteligencia de negocio, e-commerce y sistemas de gestión a medida."
            : "Five real projects showing how we work and what we deliver: SaaS platforms, business intelligence dashboards, e-commerce and bespoke management systems."
        }
      />

      <section
        className="px-6 sm:px-10 lg:px-16 py-16 tm:py-24"
        style={{ background: "var(--bg)" }}
      >
        <Reveal y={20}>
          <div
            className="flex flex-col tm:flex-row justify-between items-start tm:items-end gap-4 tm:gap-0 mb-10 tm:mb-12"
          >
            <div>
              <div style={tEyebrow("var(--muted)")} className="mb-3">
                — {language === "es" ? "Trabajo entregado" : "Delivered work"}
              </div>
              <h2
                className="m-0"
                style={{
                  ...tDisplay("clamp(28px, 3.4vw, 44px)", 500),
                  color: "var(--ink)",
                }}
              >
                {sorted.length}{" "}
                {language === "es" ? "casos seleccionados" : "selected cases"}.
              </h2>
            </div>
            <Link
              to="/contact"
              className="text-[14px] no-underline whitespace-nowrap"
              style={{
                color: "var(--ink)",
                textDecoration: "underline",
                textUnderlineOffset: 4,
              }}
            >
              {language === "es"
                ? "¿Tienes un proyecto similar?"
                : "Got a similar project?"}{" "}
              →
            </Link>
          </div>
        </Reveal>

        <RevealStagger
          stagger={120}
          base={120}
          y={24}
          className="grid grid-cols-1 tm:grid-cols-2 gap-6 tm:gap-8"
        >
          {sorted.map((c, i) => (
            <CaseCard
              key={c.slug}
              caseItem={c}
              variant={i % 2 === 0 ? "navy" : "cream"}
            />
          ))}
        </RevealStagger>
      </section>

      {/* CTA strip */}
      <section
        className="px-6 sm:px-10 lg:px-16 py-16 tm:py-24"
        style={{ background: "var(--bg-surface)" }}
      >
        <Reveal y={20}>
          <div className="grid grid-cols-1 tm:grid-cols-[1fr_auto] gap-6 tm:gap-12 items-end">
            <h2
              className="m-0"
              style={{
                ...tDisplay("clamp(28px, 3.6vw, 48px)", 500),
                color: "var(--ink)",
                maxWidth: 900,
              }}
            >
              {language === "es" ? (
                <>
                  ¿Reconoces algún reto{" "}
                  <em style={{ color: "var(--accent)" }}>parecido</em> al tuyo?
                </>
              ) : (
                <>
                  Recognize any challenge{" "}
                  <em style={{ color: "var(--accent)" }}>similar</em> to yours?
                </>
              )}
            </h2>
            <Link
              to="/contact"
              className="inline-block px-7 py-[16px] text-[14px] font-medium tracking-[0.02em] no-underline transition-all duration-150 hover:-translate-y-[1px] whitespace-nowrap"
              style={{ background: "var(--navy)", color: "var(--bg)" }}
            >
              {language === "es" ? "Hablemos" : "Let's talk"} →
            </Link>
          </div>
          <p
            className="mt-6 italic"
            style={{
              ...tSerif("clamp(16px, 1.2vw, 18px)", 400),
              color: "var(--muted)",
              lineHeight: 1.55,
              maxWidth: 700,
            }}
          >
            {language === "es"
              ? "Cada proyecto empieza con una conversación corta para entender el contexto. Sin compromiso, sin commercial genérico — respuesta en menos de 24h."
              : "Every project starts with a short conversation to understand the context. No commitment, no generic sales pitch — reply in under 24h."}
          </p>
        </Reveal>
      </section>
    </>
  );
};
