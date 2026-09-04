import { Link } from "react-router-dom";
import { Linkedin } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
import { SEO } from "../components/SEO";
import { Btn } from "../components/Btn";
import { Image } from "../components/Image";
import { getHeroStats } from "../config/heroStats";
import { trackEvent } from "../lib/analytics";

// Compañía, rediseño 2026. Mismo contenido, misma ruta, mismo <SEO>.

export const AboutUs = () => {
  const { t } = useLanguage();
  const stats = getHeroStats(t);

  const values = [1, 2, 3, 4].map((n) => ({
    title: t(`about.value${n}Title`),
    description: t(`about.value${n}Text`),
  }));

  const team = [
    {
      name: t("about.gabriela.name"),
      role: t("about.gabriela.role"),
      bio: t("about.gabriela.bio"),
      linkedin: "https://www.linkedin.com/in/gabriela-albertini/",
    },
    {
      name: t("about.pablo.name"),
      role: t("about.pablo.role"),
      bio: t("about.pablo.bio"),
      linkedin: "https://www.linkedin.com/in/pablo-teijeiro-55a483191/",
    },
  ];

  return (
    <>
      <SEO
        title="Sobre Nosotros - Equipo de Expertos IT"
        description="Equipo técnico senior especializado en React, TypeScript, Node.js y tecnologías cloud. Más de 10 años de experiencia en desarrollo de software y consultoría IT. Valencia, España."
        keywords="equipo IT, consultores tecnológicos, desarrolladores React, expertos TypeScript, equipo senior, Valencia"
        schemaType="WebPage"
      />

      <section className="rd-hero rd-hero--page">
        <div className="rd-shot rd-shot--cover">
          <Image src="/images/company/Company.webp" alt="" sizes="100vw" priority width={1600} height={1000} />
          <span className="rd-shot-grade" aria-hidden="true" />
        </div>
        <div className="rd-hero-body">
          <div className="rd-hero-copy">
            <div className="rd-eyebrow">
              <i aria-hidden="true" />
              {t("nav.about")}
            </div>
            <h1 className="rd-h1">{t("about.title")}</h1>
            <p className="rd-hero-sub">{t("about.subtitle")}</p>
          </div>
        </div>
      </section>

      {/* Misión y visión */}
      <section className="rd-sec">
        <div className="rd-two">
          <div data-reveal>
            <div className="rd-eyebrow">
              <i aria-hidden="true" />
              {t("about.missionTitle")}
            </div>
            <p className="rd-prose-lead">{t("about.missionText")}</p>
          </div>
          <div data-reveal>
            <div className="rd-eyebrow">
              <i aria-hidden="true" />
              {t("about.visionTitle")}
            </div>
            <p className="rd-prose-lead">{t("about.visionText")}</p>
          </div>
        </div>

        <div className="rd-stats" data-stagger>
          {stats.map((s) => (
            <div key={s.label}>
              <strong>{s.number}</strong>
              <span>{s.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Valores */}
      <section className="rd-sec">
        <div className="rd-eyebrow" data-reveal>
          <i aria-hidden="true" />
          {t("about.value1Title")}
        </div>
        <div className="rd-grid2" data-stagger>
          {values.map((v) => (
            <article key={v.title} className="rd-bcard">
              <h3 className="rd-card-title">{v.title}</h3>
              <p className="rd-card-text">{v.description}</p>
            </article>
          ))}
        </div>
      </section>

      {/* Equipo */}
      <section className="rd-sec">
        <div className="rd-eyebrow" data-reveal>
          <i aria-hidden="true" />
          {t("about.teamTitle1")}
        </div>
        <h2 className="rd-h2" data-reveal>
          {t("about.teamTitle1")} <span className="rd-dim">{t("about.teamTitle2")}</span>
        </h2>
        <div className="rd-grid2" data-stagger>
          {team.map((m) => (
            <article key={m.name} className="rd-person">
              <h3>{m.name}</h3>
              <div className="rd-person-role">{m.role}</div>
              <p className="rd-card-text">{m.bio}</p>
              <a href={m.linkedin} target="_blank" rel="noopener noreferrer" aria-label={`LinkedIn — ${m.name}`}>
                <Linkedin size={16} strokeWidth={1.8} />
                LinkedIn
              </a>
            </article>
          ))}
        </div>
      </section>

      <section className="rd-sec rd-cta-sec">
        <div className="rd-cta">
          <div className="rd-shot rd-shot--cover">
            <Image src="/images/company/Mission.webp" alt="" sizes="100vw" width={1600} height={1000} />
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
              <Btn
                as={Link}
                to="/contact"
                onClick={() =>
                  trackEvent("cta_click", {
                    location: "about_footer",
                    cta_type: "primary",
                    cta_text: t("CTA.primaryButton"),
                  })
                }
              >
                {t("CTA.primaryButton")}
              </Btn>
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
