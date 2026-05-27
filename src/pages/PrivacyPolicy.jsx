import { useLanguage } from "../context/LanguageContext";
import { SEO } from "../components/SEO";
import {
  LegalPage,
  LegalSection,
  LegalP,
  LegalUl,
} from "../components/LegalPage";

export const PrivacyPolicy = () => {
  const { t, language } = useLanguage();

  return (
    <>
      <SEO
        title="Política de Privacidad"
        description="Política de privacidad y protección de datos de ATEP Consulting. Información sobre cómo tratamos tus datos personales según RGPD."
        keywords="política privacidad, protección datos, RGPD, LOPD"
        schemaType="WebPage"
      />

      <LegalPage
        eyebrow={language === "es" ? "Aviso legal" : "Legal"}
        title={t("privacy.title")}
        lastUpdatedLabel={t("privacy.lastUpdated")}
        lastUpdatedDate={t("privacy.lastUpdatedDate")}
        intro={t("privacy.intro")}
      >
        <LegalSection title={t("privacy.responsible")}>
          <LegalP>{t("privacy.responsibleText")}</LegalP>
          <LegalUl
            items={[
              t("privacy.companyName"),
              t("privacy.companyAddress"),
              t("privacy.companyEmail"),
              t("privacy.companyPhone"),
            ]}
          />
        </LegalSection>

        <LegalSection title={t("privacy.collection")}>
          <LegalP>{t("privacy.collectionText")}</LegalP>
          <LegalUl
            items={[
              t("privacy.collectionItem1"),
              t("privacy.collectionItem2"),
              t("privacy.collectionItem3"),
              t("privacy.collectionItem4"),
            ]}
          />
        </LegalSection>

        <LegalSection title={t("privacy.purpose")}>
          <LegalP>{t("privacy.purposeText")}</LegalP>
          <LegalUl
            items={[
              t("privacy.purposeItem1"),
              t("privacy.purposeItem2"),
              t("privacy.purposeItem3"),
              t("privacy.purposeItem4"),
            ]}
          />
        </LegalSection>

        <LegalSection title={t("privacy.legalBasis")}>
          <LegalP>{t("privacy.legalBasisText")}</LegalP>
        </LegalSection>

        <LegalSection title={t("privacy.retention")}>
          <LegalP>{t("privacy.retentionText")}</LegalP>
        </LegalSection>

        <LegalSection title={t("privacy.recipients")}>
          <LegalP>{t("privacy.recipientsText")}</LegalP>
          <LegalUl
            items={[
              t("privacy.recipientsItem1"),
              t("privacy.recipientsItem2"),
              t("privacy.recipientsItem3"),
            ]}
          />
        </LegalSection>

        <LegalSection title={t("privacy.rights")}>
          <LegalP>{t("privacy.rightsText")}</LegalP>
          <LegalUl
            items={[
              t("privacy.rightsItem1"),
              t("privacy.rightsItem2"),
              t("privacy.rightsItem3"),
              t("privacy.rightsItem4"),
              t("privacy.rightsItem5"),
              t("privacy.rightsItem6"),
              t("privacy.rightsItem7"),
            ]}
          />
          <LegalP>{t("privacy.rightsExercise")}</LegalP>
        </LegalSection>

        <LegalSection title={t("privacy.protection")}>
          <LegalP>{t("privacy.protectionText")}</LegalP>
        </LegalSection>

        <LegalSection title={t("privacy.cookies")}>
          <LegalP>{t("privacy.cookiesText")}</LegalP>
        </LegalSection>

        <LegalSection title={t("privacy.thirdParty")}>
          <LegalP>{t("privacy.thirdPartyText")}</LegalP>
        </LegalSection>

        <LegalSection title={t("privacy.modifications")}>
          <LegalP>{t("privacy.modificationsText")}</LegalP>
        </LegalSection>

        <LegalSection title={t("privacy.contact")}>
          <LegalP muted>
            {t("privacy.contactText")}{" "}
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
