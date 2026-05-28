import { Link } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext";
import ImageHero from "./ImageHero";
import { Reveal, RevealStagger } from "./Reveal";
import { CountingNumber } from "./CountingNumber";
import { tDisplay, tSerif, tEyebrow } from "../lib/typography";

const SectionEyebrow = ({ children }) => (
  <div className="mb-4" style={tEyebrow("var(--muted)")}>
    — {children}
  </div>
);

export const ServiceDetailTemplate = ({ serviceKey, heroImage }) => {
  const { t, language } = useLanguage();

  const getArray = (key) => {
    const data = t(key, { returnObjects: true });
    return Array.isArray(data) ? data : [];
  };

  const service = {
    name: t(`services.${serviceKey}.name`),
    description: t(`services.${serviceKey}.description`),
    whatWeDo: t(`services.${serviceKey}.whatWeDo`),
    whatWeDoText: t(`services.${serviceKey}.whatWeDoText`),
    benefits: t(`services.${serviceKey}.benefits`),
    benefitsSubtitle: t(`services.${serviceKey}.benefitsSubtitle`),
    whyChoose: t(`services.${serviceKey}.whyChoose`),
    whyChooseText: t(`services.${serviceKey}.whyChooseText`),
    stats: getArray(`services.${serviceKey}.stats`),
    benefitsList: getArray(`services.${serviceKey}.benefitsList`),
    projectTypes: getArray(`services.${serviceKey}.projectTypes`),
    useCases: getArray(`services.${serviceKey}.useCases`),
    features: getArray(`services.${serviceKey}.features`),
    processSteps: getArray(`services.${serviceKey}.processSteps`),
    guarantees: getArray(`services.${serviceKey}.guarantees`),
  };

  return (
    <>
      <ImageHero
        eyebrow={t("nav.services")}
        title={service.name}
        description={service.description}
        backgroundImage={heroImage}
        alt={service.name}
        cta={{
          label: t("CTA.primaryButton"),
          to: "/contact",
        }}
      />

      {/* WHAT WE DO + STATS */}
      <section
        className="px-6 sm:px-10 lg:px-16 py-20 tm:py-24"
        style={{ background: "var(--bg)" }}
      >
        <div className="grid grid-cols-1 tm:grid-cols-3 gap-10 tm:gap-16 items-start">
          <Reveal y={24}>
            <SectionEyebrow>
              {language === "es" ? "Lo que hacemos" : "What we do"}
            </SectionEyebrow>
            <h2
              style={{
                ...tDisplay("clamp(32px, 4vw, 52px)", 500),
                color: "var(--ink)",
                margin: 0,
              }}
            >
              {service.whatWeDo}
            </h2>
          </Reveal>
          <Reveal y={20} delay={120} className="tm:col-span-2">
            <p
              style={{
                ...tSerif("clamp(17px, 1.4vw, 20px)", 400),
                color: "var(--ink)",
                lineHeight: 1.6,
                margin: 0,
              }}
            >
              {service.whatWeDoText}
            </p>
          </Reveal>
        </div>

        {service.stats.length > 0 && (
          <RevealStagger
            stagger={120}
            base={240}
            y={20}
            className="mt-14 tm:mt-20 grid grid-cols-2 tm:grid-cols-4 gap-6 tm:gap-7"
          >
            {service.stats.map((stat) => (
              <div
                key={stat.label}
                className="pt-4 tm:pt-5"
                style={{ borderTop: "1px solid var(--navy)" }}
              >
                <div
                  style={{
                    ...tDisplay("clamp(36px, 4.5vw, 56px)", 500),
                    color: "var(--ink)",
                  }}
                >
                  <CountingNumber value={stat.number} dur={1800} />
                </div>
                <div
                  className="mt-[6px]"
                  style={{ fontSize: 13, color: "var(--muted)" }}
                >
                  {stat.label}
                </div>
              </div>
            ))}
          </RevealStagger>
        )}
      </section>

      {/* PROJECT TYPES */}
      {service.projectTypes.length > 0 && (
        <section
          className="px-6 sm:px-10 lg:px-16 py-20 tm:py-24"
          style={{ background: "var(--bg-surface)" }}
        >
          <Reveal y={20}>
            <SectionEyebrow>
              {language === "es" ? "Tipos de proyecto" : "Project types"}
            </SectionEyebrow>
            <h2
              className="mb-3"
              style={{
                ...tDisplay("clamp(30px, 3.6vw, 48px)", 500),
                color: "var(--ink)",
                margin: 0,
                maxWidth: 900,
              }}
            >
              {t(`services.${serviceKey}.projectTypesTitle`)}
            </h2>
            <p
              className="mt-5 italic"
              style={{
                ...tSerif("clamp(16px, 1.2vw, 18px)", 400),
                color: "var(--muted)",
                maxWidth: 700,
              }}
            >
              {t(`services.${serviceKey}.projectTypesSubtitle`)}
            </p>
          </Reveal>
          <RevealStagger
            stagger={100}
            base={180}
            y={20}
            className="mt-10 tm:mt-14 grid grid-cols-1 tm:grid-cols-2"
            style={{ borderTop: "1px solid var(--navy)" }}
            itemClassName="h-full"
          >
            {service.projectTypes.map((project, idx) => (
              <div
                key={project.title}
                className="p-6 tm:p-8 h-full"
                style={{
                  borderBottom: "1px solid var(--navy)",
                  borderRight: idx % 2 === 0 ? "1px solid var(--navy)" : "none",
                }}
              >
                <div style={tEyebrow("var(--accent)")} className="mb-3">
                  {String(idx + 1).padStart(2, "0")}
                </div>
                <h3
                  style={{
                    ...tSerif("clamp(20px, 1.8vw, 22px)", 500),
                    color: "var(--ink)",
                    margin: "0 0 10px",
                  }}
                >
                  {project.title}
                </h3>
                <p
                  className="m-0"
                  style={{
                    fontSize: 14.5,
                    lineHeight: 1.55,
                    color: "var(--muted)",
                  }}
                >
                  {project.description}
                </p>
              </div>
            ))}
          </RevealStagger>
        </section>
      )}

      {/* USE CASES */}
      {service.useCases.length > 0 && (
        <section
          className="px-6 sm:px-10 lg:px-16 py-20 tm:py-24"
          style={{ background: "var(--bg)" }}
        >
          <Reveal y={20}>
            <SectionEyebrow>
              {language === "es" ? "Casos de uso" : "Use cases"}
            </SectionEyebrow>
            <h2
              style={{
                ...tDisplay("clamp(30px, 3.6vw, 48px)", 500),
                color: "var(--ink)",
                margin: 0,
                maxWidth: 900,
              }}
            >
              {t(`services.${serviceKey}.useCasesTitle`)}
            </h2>
            <p
              className="mt-5 italic"
              style={{
                ...tSerif("clamp(16px, 1.2vw, 18px)", 400),
                color: "var(--muted)",
                maxWidth: 700,
              }}
            >
              {t(`services.${serviceKey}.useCasesSubtitle`)}
            </p>
          </Reveal>
          <RevealStagger
            stagger={100}
            base={180}
            y={20}
            className="mt-10 tm:mt-14 grid grid-cols-1 tm:grid-cols-2 gap-6 tm:gap-8"
            itemClassName="h-full"
          >
            {service.useCases.map((useCase, idx) => (
              <article
                key={useCase.title}
                className="p-6 tm:p-7 h-full"
                style={{
                  background: "var(--bg-surface)",
                  border: "1px solid var(--rule)",
                }}
              >
                <div style={tEyebrow("var(--accent)")} className="mb-3">
                  {String(idx + 1).padStart(2, "0")}
                </div>
                <h3
                  style={{
                    ...tSerif("clamp(18px, 1.6vw, 22px)", 500),
                    color: "var(--ink)",
                    margin: "0 0 10px",
                  }}
                >
                  {useCase.title}
                </h3>
                <p
                  className="m-0"
                  style={{
                    fontSize: 14.5,
                    lineHeight: 1.55,
                    color: "var(--muted)",
                  }}
                >
                  {useCase.description}
                </p>
              </article>
            ))}
          </RevealStagger>
        </section>
      )}

      {/* BENEFITS */}
      {service.benefitsList.length > 0 && (
        <section
          className="px-6 sm:px-10 lg:px-16 py-20 tm:py-24"
          style={{ background: "var(--bg-surface)" }}
        >
          <Reveal y={20}>
            <SectionEyebrow>
              {language === "es" ? "Beneficios" : "Benefits"}
            </SectionEyebrow>
            <h2
              style={{
                ...tDisplay("clamp(30px, 3.6vw, 48px)", 500),
                color: "var(--ink)",
                margin: 0,
                maxWidth: 900,
              }}
            >
              {service.benefits}
            </h2>
            {service.benefitsSubtitle && (
              <p
                className="mt-5 italic"
                style={{
                  ...tSerif("clamp(16px, 1.2vw, 18px)", 400),
                  color: "var(--muted)",
                  maxWidth: 700,
                }}
              >
                {service.benefitsSubtitle}
              </p>
            )}
          </Reveal>
          <RevealStagger
            stagger={90}
            base={180}
            y={20}
            className="mt-10 tm:mt-14 grid grid-cols-1 tm:grid-cols-2 gap-y-6 gap-x-10"
            itemClassName="h-full"
          >
            {service.benefitsList.map((benefit, idx) => (
              <div
                key={benefit.title}
                className="pt-4 h-full"
                style={{ borderTop: "1px solid var(--navy)" }}
              >
                <div className="flex items-baseline justify-between mb-2">
                  <span style={tEyebrow("var(--accent)")}>
                    {String(idx + 1).padStart(2, "0")}
                  </span>
                </div>
                <h3
                  style={{
                    ...tSerif("clamp(18px, 1.6vw, 22px)", 500),
                    color: "var(--ink)",
                    margin: "0 0 8px",
                  }}
                >
                  {benefit.title}
                </h3>
                <p
                  className="m-0"
                  style={{
                    fontSize: 14.5,
                    lineHeight: 1.55,
                    color: "var(--muted)",
                  }}
                >
                  {benefit.description}
                </p>
              </div>
            ))}
          </RevealStagger>
        </section>
      )}

      {/* FEATURES */}
      {service.features.length > 0 && (
        <section
          className="px-6 sm:px-10 lg:px-16 py-20 tm:py-24"
          style={{ background: "var(--bg)" }}
        >
          <Reveal y={20}>
            <SectionEyebrow>
              {language === "es" ? "Características" : "Features"}
            </SectionEyebrow>
            <h2
              style={{
                ...tDisplay("clamp(30px, 3.6vw, 48px)", 500),
                color: "var(--ink)",
                margin: 0,
                maxWidth: 900,
              }}
            >
              {t(`services.${serviceKey}.featuresTitle`)}
            </h2>
            <p
              className="mt-5 italic"
              style={{
                ...tSerif("clamp(16px, 1.2vw, 18px)", 400),
                color: "var(--muted)",
                maxWidth: 700,
              }}
            >
              {t(`services.${serviceKey}.featuresSubtitle`)}
            </p>
          </Reveal>
          <RevealStagger
            stagger={90}
            base={180}
            y={20}
            className="mt-10 tm:mt-14 grid grid-cols-1 gap-3 tm:gap-0 tm:grid-cols-3 tm:border-t tm:border-[var(--navy)]"
            itemClassName="h-full"
          >
            {service.features.map((feature, idx) => (
              <div
                key={feature.title}
                // Mobile: cada feature es un rectángulo cerrado con sus 4
                // bordes. Desktop: layout tabla — sin borderTop (lo aporta
                // el contenedor) y sin borderRight en la última columna.
                className={`p-6 tm:p-7 h-full border border-[var(--navy)] tm:border-t-0 tm:border-l-0 tm:border-b ${
                  idx % 3 !== 2 ? "tm:border-r" : "tm:border-r-0"
                }`}
              >
                <div style={tEyebrow("var(--accent)")} className="mb-3">
                  {String(idx + 1).padStart(2, "0")}
                </div>
                <h3
                  style={{
                    ...tSerif("clamp(18px, 1.4vw, 20px)", 500),
                    color: "var(--ink)",
                    margin: "0 0 8px",
                  }}
                >
                  {feature.title}
                </h3>
                <p
                  className="m-0"
                  style={{
                    fontSize: 14,
                    lineHeight: 1.55,
                    color: "var(--muted)",
                  }}
                >
                  {feature.description}
                </p>
              </div>
            ))}
          </RevealStagger>
        </section>
      )}

      {/* PROCESS STEPS */}
      {service.processSteps.length > 0 && (
        <section
          className="px-6 sm:px-10 lg:px-16 py-20 tm:py-24"
          style={{ background: "var(--bg-surface)" }}
        >
          <Reveal y={20}>
            <SectionEyebrow>
              {language === "es" ? "Proceso" : "Process"}
            </SectionEyebrow>
            <h2
              style={{
                ...tDisplay("clamp(30px, 3.6vw, 48px)", 500),
                color: "var(--ink)",
                margin: 0,
                maxWidth: 900,
              }}
            >
              {t(`services.${serviceKey}.processTitle`)}
            </h2>
            <p
              className="mt-5 italic"
              style={{
                ...tSerif("clamp(16px, 1.2vw, 18px)", 400),
                color: "var(--muted)",
                maxWidth: 700,
              }}
            >
              {t(`services.${serviceKey}.processSubtitle`)}
            </p>
          </Reveal>
          <RevealStagger
            stagger={120}
            base={200}
            y={24}
            className="mt-10 tm:mt-14"
            style={{ borderTop: "1px solid var(--navy)" }}
          >
            {service.processSteps.map((step, idx) => (
              <div
                key={step.title}
                className="grid grid-cols-1 tm:grid-cols-[120px_1fr] gap-4 tm:gap-12 py-8 tm:py-10"
                style={{ borderBottom: "1px solid var(--navy)" }}
              >
                <div
                  style={{
                    ...tDisplay("clamp(40px, 4vw, 56px)", 500),
                    color: "var(--accent)",
                    lineHeight: 1,
                  }}
                >
                  {step.number || String(idx + 1).padStart(2, "0")}
                </div>
                <div>
                  <h3
                    style={{
                      ...tSerif("clamp(20px, 1.8vw, 24px)", 500),
                      color: "var(--ink)",
                      margin: "0 0 10px",
                    }}
                  >
                    {step.title}
                  </h3>
                  <p
                    className="m-0"
                    style={{
                      fontSize: 15,
                      lineHeight: 1.6,
                      color: "var(--muted)",
                    }}
                  >
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </RevealStagger>
        </section>
      )}

      {/* WHY CHOOSE US */}
      <section
        className="px-6 sm:px-10 lg:px-16 py-20 tm:py-24"
        style={{ background: "var(--bg)" }}
      >
        <Reveal y={20}>
          <SectionEyebrow>
            {language === "es" ? "Por qué nosotros" : "Why us"}
          </SectionEyebrow>
          <h2
            className="mb-10 tm:mb-12"
            style={{
              ...tDisplay("clamp(30px, 3.6vw, 48px)", 500),
              color: "var(--ink)",
              margin: 0,
              maxWidth: 900,
            }}
          >
            {service.whyChoose}
          </h2>
        </Reveal>

        <Reveal y={24} delay={140}>
          <blockquote
            className="m-0 my-10 tm:my-12 p-6 tm:p-10"
            style={{
              borderLeft: "3px solid var(--accent)",
              ...tSerif("clamp(17px, 1.5vw, 21px)", 400),
              color: "var(--ink)",
              lineHeight: 1.55,
              fontStyle: "italic",
            }}
          >
            {service.whyChooseText}
          </blockquote>

          {service.guarantees.length > 0 && (
            <div
              className="grid grid-cols-1 tm:grid-cols-3 gap-y-3 gap-x-10 pt-8"
              style={{ borderTop: "1px solid var(--rule)" }}
            >
              {service.guarantees.map((g, i) => (
                <div
                  key={i}
                  className="flex items-baseline gap-3"
                  style={{ fontSize: 14.5, color: "var(--ink)" }}
                >
                  <span style={{ color: "var(--accent)", fontWeight: 600 }}>
                    ✓
                  </span>
                  <span>{g.text || g}</span>
                </div>
              ))}
            </div>
          )}
        </Reveal>

        <div className="mt-12 flex flex-wrap gap-3">
          <Link
            to="/contact"
            className="inline-block px-6 py-[14px] text-[13.5px] font-medium tracking-[0.02em] no-underline transition-all duration-150 hover:-translate-y-[1px]"
            style={{ background: "var(--navy)", color: "var(--bg)" }}
          >
            {t("CTA.primaryButton")} →
          </Link>
          <Link
            to="/services"
            className="inline-block px-6 py-[14px] text-[13.5px] font-medium tracking-[0.02em] no-underline transition-colors duration-150"
            style={{
              background: "transparent",
              color: "var(--ink)",
              border: "1px solid var(--ink)",
            }}
          >
            {language === "es"
              ? "Ver todos los servicios"
              : "View all services"}
          </Link>
        </div>
      </section>
    </>
  );
};
