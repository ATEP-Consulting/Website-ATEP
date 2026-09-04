import { Link } from "react-router-dom";
import { Check } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
import { Image } from "./Image";
import { Btn } from "./Btn";
import { trackEvent } from "../lib/analytics";

// Plantilla de las 9 fichas de servicio, rediseño 2026.
//
// Lee EXACTAMENTE las mismas claves de i18n que la versión anterior —
// whatWeDo, stats, projectTypes, useCases, benefitsList, features,
// processSteps, whyChoose y guarantees— y ninguna sección se pierde: las que
// un servicio no tenga simplemente no se pintan. Sólo cambia la piel.

// Cada servicio con su foto para que las nueve fichas no se vean idénticas.
// Todas existen ya en public/images.
const HERO_IMAGE = {
  "professional-websites": "/images/company/Excellence.webp",
  "full-stack-development": "/images/home/Implementation.webp",
  "on-demand-team": "/images/home/ExpertTeam.webp",
  "legacy-migration": "/images/company/Trust.webp",
  automation: "/images/home/Diagnosis.webp",
  "ai-solutions": "/images/company/Mission.webp",
  "mobile-apps": "/images/company/Professionalism.webp",
  ecommerce: "/images/home/CustomerFocus.webp",
  support: "/images/company/Assistance.webp",
};

const Shot = ({ src, className = "", priority = false }) => (
  <div className={`rd-shot ${className}`}>
    <Image src={src} alt="" sizes="100vw" priority={priority} width={1600} height={1000} />
    <span className="rd-shot-grade" aria-hidden="true" />
  </div>
);

const Eyebrow = ({ children }) => (
  <div className="rd-eyebrow" data-reveal>
    <i aria-hidden="true" />
    {children}
  </div>
);

export const ServiceDetailTemplate = ({ serviceKey, heroImage }) => {
  const { t } = useLanguage();

  const getArray = (key) => {
    const value = t(key, { returnObjects: true });
    return Array.isArray(value) ? value : [];
  };

  const heroStatRaw = t(`services.${serviceKey}.heroStat`);
  const heroStat =
    typeof heroStatRaw === "string" && !heroStatRaw.startsWith("services.")
      ? heroStatRaw
      : "";

  const name = t(`services.${serviceKey}.name`);
  const description = t(`services.${serviceKey}.description`);
  const stats = getArray(`services.${serviceKey}.stats`);
  const projectTypes = getArray(`services.${serviceKey}.projectTypes`);
  const useCases = getArray(`services.${serviceKey}.useCases`);
  const benefitsList = getArray(`services.${serviceKey}.benefitsList`);
  const features = getArray(`services.${serviceKey}.features`);
  const processSteps = getArray(`services.${serviceKey}.processSteps`);
  const guarantees = getArray(`services.${serviceKey}.guarantees`);

  const image = heroImage || HERO_IMAGE[serviceKey] || "/images/company/Company.webp";

  const cta = (location, tone = "solid") => (
    <Btn
      as={Link}
      to="/contact"
      tone={tone}
      onClick={() =>
        trackEvent("cta_click", {
          location,
          cta_type: tone === "solid" ? "primary" : "secondary",
          cta_text: t("CTA.primaryButton"),
        })
      }
    >
      {t("CTA.primaryButton")}
    </Btn>
  );

  return (
    <>
      {/* ============================ HERO ============================ */}
      <section className="rd-hero rd-hero--page">
        <Shot src={image} className="rd-shot--cover" priority />
        <div className="rd-hero-body">
          <div className="rd-hero-copy">
            <div className="rd-eyebrow">
              <i aria-hidden="true" />
              {t("nav.services")}
            </div>
            <h1 className="rd-h1">{name}</h1>
            <p className="rd-hero-sub">{description}</p>
            {heroStat && <div className="rd-hero-stat">{heroStat}</div>}
            <div className="rd-ctas">
              {cta(`service_${serviceKey}_hero`)}
              <Btn as={Link} to="/services" tone="ghost">
                {t("megaNav.viewAllServices")}
              </Btn>
            </div>
          </div>
        </div>
      </section>

      {/* ======================= QUÉ HACEMOS + DATOS ==================== */}
      <section className="rd-sec">
        <Eyebrow>{t(`services.${serviceKey}.whatWeDo`)}</Eyebrow>
        <h2 className="rd-h2" data-reveal>
          {t(`services.${serviceKey}.whatWeDo`)}
        </h2>
        <p className="rd-sec-sub" data-reveal>
          {t(`services.${serviceKey}.whatWeDoText`)}
        </p>

        {stats.length > 0 && (
          <div className="rd-stats" data-stagger>
            {stats.map((s) => (
              <div key={s.label}>
                <strong>{s.number}</strong>
                <span>{s.label}</span>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* ========================= TIPOS DE PROYECTO ==================== */}
      {projectTypes.length > 0 && (
        <section className="rd-sec">
          <Eyebrow>{t(`services.${serviceKey}.projectTypesTitle`)}</Eyebrow>
          <h2 className="rd-h2" data-reveal>
            {t(`services.${serviceKey}.projectTypesTitle`)}
          </h2>
          <p className="rd-sec-sub" data-reveal>
            {t(`services.${serviceKey}.projectTypesSubtitle`)}
          </p>
          <div className="rd-grid3 rd-grid3--tight" data-stagger>
            {projectTypes.map((p) => (
              <article key={p.title} className="rd-bcard">
                <h3 className="rd-card-title">{p.title}</h3>
                <p className="rd-card-text">{p.description}</p>
              </article>
            ))}
          </div>
        </section>
      )}

      {/* ============================ CASOS DE USO ===================== */}
      {useCases.length > 0 && (
        <section className="rd-sec">
          <Eyebrow>{t(`services.${serviceKey}.useCasesTitle`)}</Eyebrow>
          <h2 className="rd-h2" data-reveal>
            {t(`services.${serviceKey}.useCasesTitle`)}
          </h2>
          <p className="rd-sec-sub" data-reveal>
            {t(`services.${serviceKey}.useCasesSubtitle`)}
          </p>
          <div className="rd-grid3 rd-grid3--tight" data-stagger>
            {useCases.map((u) => (
              <article key={u.title} className="rd-bcard">
                <h3 className="rd-card-title">{u.title}</h3>
                <p className="rd-card-text">{u.description}</p>
              </article>
            ))}
          </div>
        </section>
      )}

      {/* ============================= BENEFICIOS ====================== */}
      {benefitsList.length > 0 && (
        <section className="rd-sec">
          <Eyebrow>{t(`services.${serviceKey}.benefits`)}</Eyebrow>
          <h2 className="rd-h2" data-reveal>
            {t(`services.${serviceKey}.benefits`)}
          </h2>
          <p className="rd-sec-sub" data-reveal>
            {t(`services.${serviceKey}.benefitsSubtitle`)}
          </p>
          <div className="rd-grid3 rd-grid3--tight" data-stagger>
            {benefitsList.map((b) => (
              <article key={b.title} className="rd-bcard">
                <span className="rd-bicon" aria-hidden="true">
                  <Check size={17} strokeWidth={2} />
                </span>
                <h3 className="rd-card-title">{b.title}</h3>
                <p className="rd-card-text">{b.description}</p>
              </article>
            ))}
          </div>
        </section>
      )}

      {/* ============================== TÉCNICA ======================== */}
      {features.length > 0 && (
        <section className="rd-sec">
          <Eyebrow>{t(`services.${serviceKey}.featuresTitle`)}</Eyebrow>
          <h2 className="rd-h2" data-reveal>
            {t(`services.${serviceKey}.featuresTitle`)}
          </h2>
          <p className="rd-sec-sub" data-reveal>
            {t(`services.${serviceKey}.featuresSubtitle`)}
          </p>
          <div className="rd-features" data-stagger>
            {features.map((f) => (
              <div key={f.title} className="rd-feature">
                <strong>{f.title}</strong>
                <span>{f.description}</span>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ============================== PROCESO ======================== */}
      {processSteps.length > 0 && (
        <section className="rd-sec">
          <Eyebrow>{t(`services.${serviceKey}.processTitle`)}</Eyebrow>
          <h2 className="rd-h2" data-reveal>
            {t(`services.${serviceKey}.processTitle`)}
          </h2>
          <p className="rd-sec-sub" data-reveal>
            {t(`services.${serviceKey}.processSubtitle`)}
          </p>
          <ol className="rd-steps rd-steps--static" data-stagger>
            {processSteps.map((s) => (
              <li key={s.number} className="is-on">
                <span className="rd-step-head">
                  {s.number} — {s.title}
                </span>
                <span className="rd-card-text">{s.description}</span>
              </li>
            ))}
          </ol>
        </section>
      )}

      {/* ============================ POR QUÉ ATEP ===================== */}
      <section className="rd-sec">
        <Eyebrow>{t(`services.${serviceKey}.whyChoose`)}</Eyebrow>
        <h2 className="rd-h2" data-reveal>
          {t(`services.${serviceKey}.whyChoose`)}
        </h2>
        <p className="rd-sec-sub" data-reveal>
          {t(`services.${serviceKey}.whyChooseText`)}
        </p>
        {guarantees.length > 0 && (
          <div className="rd-guarantees" data-stagger>
            {guarantees.map((g) => (
              <span key={g.text}>
                <Check size={14} strokeWidth={2.4} />
                {g.text}
              </span>
            ))}
          </div>
        )}
      </section>

      {/* =============================== CTA =========================== */}
      <section className="rd-sec rd-cta-sec">
        <div className="rd-cta">
          <Shot src={image} className="rd-shot--cover" />
          <div className="rd-cta-inner" data-stagger>
            <div className="rd-eyebrow is-center">
              <i aria-hidden="true" />
              {t("CTA.badge")}
            </div>
            <h2 className="rd-h2 rd-cta-title">{t("CTA.title")}</h2>
            <p className="rd-cta-sub">{t("CTA.subtitle")}</p>
            <div className="rd-cta-btns">
              {cta(`service_${serviceKey}_footer`)}
              <Btn as={Link} to="/cases" tone="ghost">
                {t("megaNav.viewAllCases")}
              </Btn>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
