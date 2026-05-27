import { Linkedin } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
import { SEO } from "../components/SEO";
import ImageHero from "../components/ImageHero";
import { Reveal, RevealStagger } from "../components/Reveal";
import { CountingNumber } from "../components/CountingNumber";
import { getHeroStats } from "../config/heroStats";
import { tDisplay, tSerif, tEyebrow } from "../lib/typography";

const SectionEyebrow = ({ children }) => (
  <div className="mb-4" style={tEyebrow("var(--muted)")}>
    — {children}
  </div>
);

export const AboutUs = () => {
  const { t, language } = useLanguage();
  const stats = getHeroStats(t);

  const values = [
    {
      title: t("about.value1Title"),
      description: t("about.value1Text"),
      image: "/images/company/Assistance.webp",
    },
    {
      title: t("about.value2Title"),
      description: t("about.value2Text"),
      image: "/images/company/Trust.webp",
    },
    {
      title: t("about.value3Title"),
      description: t("about.value3Text"),
      image: "/images/company/Excellence.webp",
    },
    {
      title: t("about.value4Title"),
      description: t("about.value4Text"),
      image: "/images/company/Professionalism.webp",
    },
  ];

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

      <ImageHero
        eyebrow={language === "es" ? "La empresa" : "The company"}
        title={t("about.title")}
        description={t("about.subtitle")}
        backgroundImage="/images/company/Company.webp"
        alt={t("about.title")}
      />

      {/* STATS */}
      <section
        className="px-6 sm:px-10 lg:px-16 py-16 tm:py-20"
        style={{ background: "var(--bg-surface)" }}
      >
        <RevealStagger
          stagger={120}
          base={0}
          y={20}
          className="grid grid-cols-2 tm:grid-cols-4 gap-6 tm:gap-7"
        >
          {stats.map((s) => (
            <div
              key={s.label}
              className="pt-4 tm:pt-5"
              style={{ borderTop: "1px solid var(--navy)" }}
            >
              <div
                style={{
                  ...tDisplay("clamp(36px, 4.5vw, 56px)", 500),
                  color: "var(--ink)",
                }}
              >
                <CountingNumber value={s.number} dur={1800} />
              </div>
              <div
                className="mt-[6px]"
                style={{ fontSize: 13, color: "var(--muted)" }}
              >
                {s.label}
              </div>
            </div>
          ))}
        </RevealStagger>
      </section>

      {/* MISSION & VISION */}
      <section
        className="px-6 sm:px-10 lg:px-16 py-20 tm:py-28"
        style={{ background: "var(--bg)" }}
      >
        <div className="grid grid-cols-1 tm:grid-cols-2 gap-12 tm:gap-20 items-start">
          <Reveal y={24}>
            <SectionEyebrow>
              {language === "es" ? "Nuestra misión" : "Our mission"}
            </SectionEyebrow>
            <h2
              className="mb-5"
              style={{
                ...tDisplay("clamp(28px, 3.4vw, 44px)", 500),
                color: "var(--ink)",
                margin: 0,
              }}
            >
              {t("about.missionTitle")}
            </h2>
            <p
              className="mt-5"
              style={{
                ...tSerif("clamp(16px, 1.2vw, 18px)", 400),
                color: "var(--muted)",
                lineHeight: 1.6,
              }}
            >
              {t("about.missionText")}
            </p>
          </Reveal>

          <Reveal y={24} delay={140}>
            <SectionEyebrow>
              {language === "es" ? "Nuestra visión" : "Our vision"}
            </SectionEyebrow>
            <h2
              className="mb-5"
              style={{
                ...tDisplay("clamp(28px, 3.4vw, 44px)", 500),
                color: "var(--ink)",
                margin: 0,
              }}
            >
              {t("about.visionTitle")}
            </h2>
            <p
              className="mt-5"
              style={{
                ...tSerif("clamp(16px, 1.2vw, 18px)", 400),
                color: "var(--muted)",
                lineHeight: 1.6,
              }}
            >
              {t("about.visionText")}
            </p>
          </Reveal>
        </div>
      </section>

      {/* VALUES */}
      <section
        className="px-6 sm:px-10 lg:px-16 py-20 tm:py-28"
        style={{ background: "var(--bg-surface)" }}
      >
        <Reveal y={20}>
          <SectionEyebrow>
            {language === "es" ? "Nuestros valores" : "Our values"}
          </SectionEyebrow>
          <h2
            className="mb-10 tm:mb-14"
            style={{
              ...tDisplay("clamp(34px, 4.5vw, 56px)", 500),
              color: "var(--ink)",
              margin: 0,
              maxWidth: 900,
            }}
          >
            {language === "es" ? (
              <>
                Los principios que <em>guían</em> nuestro trabajo.
              </>
            ) : (
              <>
                The principles that <em>guide</em> our work.
              </>
            )}
          </h2>
        </Reveal>

        <div style={{ borderTop: "1px solid var(--navy)" }}>
          {values.map((value, idx) => {
            const reversed = idx % 2 === 1;
            return (
              <Reveal key={value.title} y={28}>
                <div
                  className="grid grid-cols-1 tm:grid-cols-[1fr_320px] gap-8 tm:gap-12 py-10 tm:py-14 items-center"
                  style={{ borderBottom: "1px solid var(--navy)" }}
                >
                  <div className={reversed ? "tm:order-2" : ""}>
                    <div style={tEyebrow("var(--accent)")} className="mb-4">
                      {String(idx + 1).padStart(2, "0")}
                    </div>
                    <h3
                      className="mb-4"
                      style={{
                        ...tDisplay("clamp(26px, 3vw, 40px)", 500),
                        color: "var(--ink)",
                        margin: "0 0 16px",
                      }}
                    >
                      {value.title}
                    </h3>
                    <p
                      style={{
                        ...tSerif("clamp(16px, 1.2vw, 18px)", 400),
                        color: "var(--muted)",
                        lineHeight: 1.6,
                        margin: 0,
                        maxWidth: 600,
                      }}
                    >
                      {value.description}
                    </p>
                  </div>
                  <div
                    className={reversed ? "tm:order-1" : ""}
                    style={{ aspectRatio: "4/3" }}
                  >
                    <img
                      src={value.image}
                      alt={value.title}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </section>

      {/* TEAM */}
      <section
        className="px-6 sm:px-10 lg:px-16 py-20 tm:py-28"
        style={{ background: "var(--bg)" }}
      >
        <Reveal y={20}>
          <SectionEyebrow>
            {language === "es" ? "Equipo" : "Team"}
          </SectionEyebrow>
          <h2
            className="mb-10 tm:mb-14"
            style={{
              ...tDisplay("clamp(34px, 4.5vw, 56px)", 500),
              color: "var(--ink)",
              margin: 0,
              maxWidth: 900,
            }}
          >
            {t("about.teamTitle1")}
            <em>{t("about.teamTitle2")}</em>.
          </h2>
        </Reveal>

        <RevealStagger
          stagger={120}
          base={180}
          y={24}
          className="grid grid-cols-1 tm:grid-cols-2 gap-8 tm:gap-12"
          itemClassName="h-full"
        >
          {team.map((member, idx) => (
            <article
              key={member.name}
              className="p-6 tm:p-8 h-full"
              style={{
                background: "var(--bg-surface)",
                borderTop: "2px solid var(--accent)",
              }}
            >
              <div style={tEyebrow("var(--muted)")} className="mb-3">
                {String(idx + 1).padStart(2, "0")}
              </div>
              <h3
                style={{
                  ...tSerif("clamp(22px, 2vw, 26px)", 500),
                  color: "var(--ink)",
                  margin: "0 0 4px",
                }}
              >
                {member.name}
              </h3>
              <div
                className="mb-4 italic"
                style={{
                  ...tSerif("clamp(14px, 1.1vw, 16px)", 400),
                  color: "var(--accent)",
                }}
              >
                {member.role}
              </div>
              <p
                className="m-0 mb-5"
                style={{
                  fontSize: 14.5,
                  color: "var(--muted)",
                  lineHeight: 1.6,
                }}
              >
                {member.bio}
              </p>
              <a
                href={member.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`LinkedIn de ${member.name}`}
                className="inline-flex items-center justify-center w-10 h-10 transition-colors duration-150"
                style={{
                  border: "1px solid var(--rule-strong)",
                  color: "var(--ink)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "var(--accent)";
                  e.currentTarget.style.color = "var(--bg)";
                  e.currentTarget.style.borderColor = "var(--accent)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "transparent";
                  e.currentTarget.style.color = "var(--ink)";
                  e.currentTarget.style.borderColor = "var(--rule-strong)";
                }}
              >
                <Linkedin size={16} />
              </a>
            </article>
          ))}
        </RevealStagger>
      </section>
    </>
  );
};
