import { Link } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext";
import { SEO } from "../components/SEO";
import {
  LegalPage,
  LegalSection,
  LegalP,
  LegalUl,
} from "../components/LegalPage";

export const LegalNotice = () => {
  const { t, language } = useLanguage();

  return (
    <>
      <SEO
        title="Aviso Legal"
        description="Aviso legal de ATEP Consulting. Información corporativa, condiciones de uso del sitio web y datos de contacto."
        keywords="aviso legal, información legal, condiciones uso"
        schemaType="WebPage"
      />

      <LegalPage
        eyebrow={language === "es" ? "Aviso legal" : "Legal"}
        title={t("legal.title")}
        lastUpdatedLabel={t("legal.lastUpdated")}
        lastUpdatedDate={t("legal.lastUpdatedDate")}
        intro={t("legal.intro")}
      >
        <LegalSection title={t("legal.identification")}>
          <LegalP>{t("legal.identificationText")}</LegalP>
          <ul className="list-disc pl-6 space-y-2 mb-4">
            <li>
              <span style={{ fontWeight: 500 }}>{t("legal.companyNameLabel")}:</span>{" "}
              ATEP CONSULTING 2.0 SL.
            </li>
            <li>
              <span style={{ fontWeight: 500 }}>{t("legal.cifLabel")}:</span>{" "}
              B44593572
            </li>
            <li>
              <span style={{ fontWeight: 500 }}>{t("legal.addressLabel")}:</span>{" "}
              CALLE NUMERO 611 (MONTECAÑADA), 3
            </li>
            <li>
              <span style={{ fontWeight: 500 }}>{t("legal.emailLabel")}:</span>{" "}
              info@atepconsulting.com
            </li>
            <li>
              <span style={{ fontWeight: 500 }}>{t("legal.phoneLabel")}:</span>{" "}
              +34 647 748 705
            </li>
          </ul>
        </LegalSection>

        <LegalSection title={t("legal.purpose")}>
          <LegalP>{t("legal.purposeText")}</LegalP>
        </LegalSection>

        <LegalSection title={t("legal.accessConditions")}>
          <LegalP>{t("legal.accessConditionsText")}</LegalP>
          <LegalUl
            items={[
              t("legal.accessItem1"),
              t("legal.accessItem2"),
              t("legal.accessItem3"),
              t("legal.accessItem4"),
            ]}
          />
        </LegalSection>

        <LegalSection title={t("legal.intellectualProperty")}>
          <LegalP>{t("legal.intellectualPropertyText")}</LegalP>
        </LegalSection>

        <LegalSection title={t("legal.liability")}>
          <LegalP>{t("legal.liabilityText")}</LegalP>
          <LegalUl
            items={[
              t("legal.liabilityItem1"),
              t("legal.liabilityItem2"),
              t("legal.liabilityItem3"),
            ]}
          />
        </LegalSection>

        <LegalSection title={t("legal.externalLinks")}>
          <LegalP>{t("legal.externalLinksText")}</LegalP>
        </LegalSection>

        <LegalSection title={t("legal.dataProtection")}>
          <LegalP>
            {t("legal.dataProtectionText")}{" "}
            <Link
              to="/privacy-policy"
              style={{
                color: "var(--accent)",
                textDecoration: "underline",
                textUnderlineOffset: 3,
                fontWeight: 500,
              }}
            >
              {t("legal.privacyPolicyLink")}
            </Link>
            .
          </LegalP>
        </LegalSection>

        <LegalSection title={t("legal.applicableLegislation")}>
          <LegalP>{t("legal.applicableLegislationText")}</LegalP>
        </LegalSection>

        <LegalSection title={t("legal.modifications")}>
          <LegalP>{t("legal.modificationsText")}</LegalP>
        </LegalSection>

        <LegalSection title={t("legal.contact")}>
          <LegalP muted>
            {t("legal.contactText")}{" "}
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
