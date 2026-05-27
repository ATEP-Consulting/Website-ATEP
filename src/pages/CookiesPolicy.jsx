import { useLanguage } from "../context/LanguageContext";
import { SEO } from "../components/SEO";
import {
  LegalPage,
  LegalSection,
  LegalP,
  LegalUl,
} from "../components/LegalPage";
import { tEyebrow, tSerif } from "../lib/typography";

export const CookiesPolicy = () => {
  const { t, language } = useLanguage();

  const cookieTypes = [
    {
      type: t("cookies.essentialTitle"),
      description: t("cookies.essentialDesc"),
      examples: t("cookies.essentialExamples"),
      duration: t("cookies.essentialDuration"),
    },
    {
      type: t("cookies.analyticsTitle"),
      description: t("cookies.analyticsDesc"),
      examples: t("cookies.analyticsExamples"),
      duration: t("cookies.analyticsDuration"),
    },
    {
      type: t("cookies.preferenceTitle"),
      description: t("cookies.preferenceDesc"),
      examples: t("cookies.preferenceExamples"),
      duration: t("cookies.preferenceDuration"),
    },
  ];

  return (
    <>
      <SEO
        title="Política de Cookies"
        description="Información sobre el uso de cookies en atepconsulting.com. Tipos de cookies, finalidad y cómo gestionarlas."
        keywords="política cookies, uso cookies, gestión cookies"
        schemaType="WebPage"
      />

      <LegalPage
        eyebrow={language === "es" ? "Aviso legal" : "Legal"}
        title={t("cookies.title")}
        lastUpdatedLabel={t("cookies.lastUpdated")}
        lastUpdatedDate={t("cookies.lastUpdatedDate")}
        intro={t("cookies.intro")}
      >
        <LegalSection title={t("cookies.whatAre")}>
          <LegalP>{t("cookies.whatAreText")}</LegalP>
        </LegalSection>

        <LegalSection title={t("cookies.howWeUse")}>
          <LegalP>{t("cookies.howWeUseText")}</LegalP>
        </LegalSection>

        <LegalSection title={t("cookies.types")}>
          <div className="space-y-7">
            {cookieTypes.map((c) => (
              <div
                key={c.type}
                className="pl-5"
                style={{ borderLeft: "3px solid var(--accent)" }}
              >
                <h3
                  className="mb-3"
                  style={{
                    ...tSerif("clamp(17px, 1.4vw, 20px)", 500),
                    color: "var(--ink)",
                    margin: "0 0 10px",
                  }}
                >
                  {c.type}
                </h3>
                <LegalP>{c.description}</LegalP>
                <p
                  className="text-[13.5px] mb-1"
                  style={{ color: "var(--muted)" }}
                >
                  <span style={tEyebrow("var(--muted)")}>
                    {t("cookies.examplesLabel")}
                  </span>{" "}
                  {c.examples}
                </p>
                <p
                  className="text-[13.5px]"
                  style={{ color: "var(--muted)" }}
                >
                  <span style={tEyebrow("var(--muted)")}>
                    {t("cookies.durationLabel")}
                  </span>{" "}
                  {c.duration}
                </p>
              </div>
            ))}
          </div>
        </LegalSection>

        <LegalSection title={t("cookies.thirdParty")}>
          <LegalP>{t("cookies.thirdPartyText")}</LegalP>
          <LegalUl
            items={[t("cookies.thirdPartyItem1"), t("cookies.thirdPartyItem2")]}
          />
        </LegalSection>

        <LegalSection title={t("cookies.control")}>
          <LegalP>{t("cookies.controlText")}</LegalP>
          <div
            className="mt-5 p-5"
            style={{ background: "var(--bg-surface)" }}
          >
            <h3
              className="mb-4"
              style={{
                ...tSerif("clamp(16px, 1.2vw, 18px)", 500),
                color: "var(--ink)",
                margin: "0 0 14px",
              }}
            >
              {t("cookies.browserSettings")}
            </h3>
            <ul className="space-y-2">
              {[
                ["Chrome", t("cookies.chromeInstructions")],
                ["Firefox", t("cookies.firefoxInstructions")],
                ["Safari", t("cookies.safariInstructions")],
                ["Edge", t("cookies.edgeInstructions")],
              ].map(([b, txt]) => (
                <li
                  key={b}
                  className="text-[14.5px]"
                  style={{ color: "var(--ink)" }}
                >
                  <span style={{ fontWeight: 500 }}>{b}:</span> {txt}
                </li>
              ))}
            </ul>
          </div>
        </LegalSection>

        <LegalSection title={t("cookies.acceptance")}>
          <LegalP>{t("cookies.acceptanceText")}</LegalP>
        </LegalSection>

        <LegalSection title={t("cookies.updates")}>
          <LegalP>{t("cookies.updatesText")}</LegalP>
        </LegalSection>

        <LegalSection title={t("cookies.contact")}>
          <LegalP muted>
            {t("cookies.contactText")}{" "}
            <a
              href="mailto:info@atepconsulting.com"
              style={{
                color: "var(--accent)",
                textDecoration: "underline",
                textUnderlineOffset: 3,
              }}
            >
              info@atepconsulting.com
            </a>
          </LegalP>
        </LegalSection>
      </LegalPage>
    </>
  );
};
