// src/pages/LegalNotice.jsx
import { Scale } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
import { SEO } from "../components/SEO";

export const LegalNotice = () => {
  const { t } = useLanguage();

  return (
    <>
      <SEO
        title={t("legal.title")}
        description={t("legal.intro")}
        keywords="legal notice, terms of use, aviso legal, términos legales"
      />

      <section className="section-padding bg-gradient-to-br from-primary-50 to-white">
        <div className="section-container">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-4 mb-6 fade-in">
              <div className="w-16 h-16 bg-primary-100 rounded-xl flex items-center justify-center">
                <Scale className="w-8 h-8 text-primary-600" />
              </div>
              <h1 className="heading-xl">{t("legal.title")}</h1>
            </div>
            <p className="text-neutral-600 fade-in stagger-1">
              {t("legal.lastUpdated")}: {t("legal.lastUpdatedDate")}
            </p>
          </div>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="section-container">
          <div className="max-w-4xl mx-auto space-y-12">
            {/* Introducción */}
            <div className="slide-up">
              <p className="text-body leading-relaxed">{t("legal.intro")}</p>
            </div>

            {/* Datos identificativos */}
            <div className="slide-up stagger-1">
              <h2 className="heading-md mb-4">{t("legal.identification")}</h2>
              <div className="text-body leading-relaxed space-y-2">
                <p>{t("legal.identificationText")}</p>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>
                    <span className="font-medium">
                      {t("legal.companyNameLabel")}:
                    </span>{" "}
                    ATEP CONSULTING 2.0 SL.
                  </li>
                  <li>
                    <span className="font-medium">{t("legal.cifLabel")}:</span>{" "}
                    B44593572
                  </li>
                  <li>
                    <span className="font-medium">
                      {t("legal.addressLabel")}:
                    </span>{" "}
                    CALLE NUMERO 611 (MONTECAÑADA), 3
                  </li>
                  <li>
                    <span className="font-medium">
                      {t("legal.emailLabel")}:
                    </span>{" "}
                    info@atepconsulting.com
                  </li>
                  <li>
                    <span className="font-medium">
                      {t("legal.phoneLabel")}:
                    </span>{" "}
                    +43 647 748 705
                  </li>
                </ul>
              </div>
            </div>

            {/* Objeto */}
            <div className="slide-up stagger-2">
              <h2 className="heading-md mb-4">{t("legal.purpose")}</h2>
              <p className="text-body leading-relaxed">
                {t("legal.purposeText")}
              </p>
            </div>

            {/* Condiciones de acceso */}
            <div className="slide-up stagger-3">
              <h2 className="heading-md mb-4">{t("legal.accessConditions")}</h2>
              <p className="text-body leading-relaxed mb-4">
                {t("legal.accessConditionsText")}
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4 text-body">
                <li>{t("legal.accessItem1")}</li>
                <li>{t("legal.accessItem2")}</li>
                <li>{t("legal.accessItem3")}</li>
                <li>{t("legal.accessItem4")}</li>
              </ul>
            </div>

            {/* Propiedad intelectual */}
            <div className="slide-up stagger-4">
              <h2 className="heading-md mb-4">
                {t("legal.intellectualProperty")}
              </h2>
              <p className="text-body leading-relaxed">
                {t("legal.intellectualPropertyText")}
              </p>
            </div>

            {/* Responsabilidad */}
            <div className="slide-up stagger-5">
              <h2 className="heading-md mb-4">{t("legal.liability")}</h2>
              <p className="text-body leading-relaxed mb-4">
                {t("legal.liabilityText")}
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4 text-body">
                <li>{t("legal.liabilityItem1")}</li>
                <li>{t("legal.liabilityItem2")}</li>
                <li>{t("legal.liabilityItem3")}</li>
              </ul>
            </div>

            {/* Enlaces externos */}
            <div className="slide-up stagger-6">
              <h2 className="heading-md mb-4">{t("legal.externalLinks")}</h2>
              <p className="text-body leading-relaxed">
                {t("legal.externalLinksText")}
              </p>
            </div>

            {/* Protección de datos */}
            <div className="slide-up stagger-7">
              <h2 className="heading-md mb-4">{t("legal.dataProtection")}</h2>
              <p className="text-body leading-relaxed">
                {t("legal.dataProtectionText")}{" "}
                <a
                  href="/privacy-policy"
                  className="text-primary-600 hover:underline font-medium"
                >
                  {t("legal.privacyPolicyLink")}
                </a>
                .
              </p>
            </div>

            {/* Legislación aplicable */}
            <div className="slide-up stagger-8">
              <h2 className="heading-md mb-4">
                {t("legal.applicableLegislation")}
              </h2>
              <p className="text-body leading-relaxed">
                {t("legal.applicableLegislationText")}
              </p>
            </div>

            {/* Modificaciones */}
            <div className="slide-up stagger-9">
              <h2 className="heading-md mb-4">{t("legal.modifications")}</h2>
              <p className="text-body leading-relaxed">
                {t("legal.modificationsText")}
              </p>
            </div>

            {/* Contacto */}
            <div className="slide-up stagger-10 border-t border-neutral-200 pt-8">
              <h2 className="heading-md mb-4">{t("legal.contact")}</h2>
              <p className="text-body text-neutral-600">
                {t("legal.contactText")}{" "}
                <a
                  href="mailto:info@atepconsulting.com"
                  className="text-primary-600 hover:underline"
                >
                  info@atepconsulting.com
                </a>
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
