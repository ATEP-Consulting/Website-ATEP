import { Shield } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
import { SEO } from "../components/SEO";

export const PrivacyPolicy = () => {
  const { t } = useLanguage();

  return (
    <>
      <SEO
        title={t("privacy.title")}
        description={t("privacy.intro")}
        keywords="privacy policy, data protection, GDPR, política de privacidad"
      />

      <section className="section-padding bg-gradient-to-br from-primary-50 to-white">
        <div className="section-container">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-4 mb-6 fade-in">
              <div className="w-16 h-16 bg-primary-100 rounded-xl flex items-center justify-center">
                <Shield className="w-8 h-8 text-primary-600" />
              </div>
              <h1 className="heading-xl">{t("privacy.title")}</h1>
            </div>
            <p className="text-neutral-600 fade-in stagger-1">
              {t("privacy.lastUpdated")}: {t("privacy.lastUpdatedDate")}
            </p>
          </div>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="section-container">
          <div className="max-w-4xl mx-auto space-y-12">
            {/* Introducción */}
            <div className="slide-up">
              <p className="text-body leading-relaxed">{t("privacy.intro")}</p>
            </div>

            {/* Responsable del tratamiento */}
            <div className="slide-up stagger-1">
              <h2 className="heading-md mb-4">{t("privacy.responsible")}</h2>
              <div className="text-body leading-relaxed space-y-2">
                <p>{t("privacy.responsibleText")}</p>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>{t("privacy.companyName")}</li>
                  <li>{t("privacy.companyAddress")}</li>
                  <li>{t("privacy.companyEmail")}</li>
                  <li>{t("privacy.companyPhone")}</li>
                </ul>
              </div>
            </div>

            {/* Datos que recopilamos */}
            <div className="slide-up stagger-2">
              <h2 className="heading-md mb-4">{t("privacy.collection")}</h2>
              <p className="text-body leading-relaxed mb-4">
                {t("privacy.collectionText")}
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4 text-body">
                <li>{t("privacy.collectionItem1")}</li>
                <li>{t("privacy.collectionItem2")}</li>
                <li>{t("privacy.collectionItem3")}</li>
                <li>{t("privacy.collectionItem4")}</li>
              </ul>
            </div>

            {/* Finalidad del tratamiento */}
            <div className="slide-up stagger-3">
              <h2 className="heading-md mb-4">{t("privacy.purpose")}</h2>
              <p className="text-body leading-relaxed mb-4">
                {t("privacy.purposeText")}
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4 text-body">
                <li>{t("privacy.purposeItem1")}</li>
                <li>{t("privacy.purposeItem2")}</li>
                <li>{t("privacy.purposeItem3")}</li>
                <li>{t("privacy.purposeItem4")}</li>
              </ul>
            </div>

            {/* Base legal */}
            <div className="slide-up stagger-4">
              <h2 className="heading-md mb-4">{t("privacy.legalBasis")}</h2>
              <p className="text-body leading-relaxed">
                {t("privacy.legalBasisText")}
              </p>
            </div>

            {/* Conservación de datos */}
            <div className="slide-up stagger-5">
              <h2 className="heading-md mb-4">{t("privacy.retention")}</h2>
              <p className="text-body leading-relaxed">
                {t("privacy.retentionText")}
              </p>
            </div>

            {/* Destinatarios de los datos */}
            <div className="slide-up stagger-6">
              <h2 className="heading-md mb-4">{t("privacy.recipients")}</h2>
              <p className="text-body leading-relaxed mb-4">
                {t("privacy.recipientsText")}
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4 text-body">
                <li>{t("privacy.recipientsItem1")}</li>
                <li>{t("privacy.recipientsItem2")}</li>
                <li>{t("privacy.recipientsItem3")}</li>
              </ul>
            </div>

            {/* Derechos del usuario */}
            <div className="slide-up stagger-7">
              <h2 className="heading-md mb-4">{t("privacy.rights")}</h2>
              <p className="text-body leading-relaxed mb-4">
                {t("privacy.rightsText")}
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4 text-body">
                <li>{t("privacy.rightsItem1")}</li>
                <li>{t("privacy.rightsItem2")}</li>
                <li>{t("privacy.rightsItem3")}</li>
                <li>{t("privacy.rightsItem4")}</li>
                <li>{t("privacy.rightsItem5")}</li>
                <li>{t("privacy.rightsItem6")}</li>
                <li>{t("privacy.rightsItem7")}</li>
              </ul>
              <p className="text-body leading-relaxed mt-4">
                {t("privacy.rightsExercise")}
              </p>
            </div>

            {/* Medidas de seguridad */}
            <div className="slide-up stagger-8">
              <h2 className="heading-md mb-4">{t("privacy.protection")}</h2>
              <p className="text-body leading-relaxed">
                {t("privacy.protectionText")}
              </p>
            </div>

            {/* Cookies */}
            <div className="slide-up stagger-9">
              <h2 className="heading-md mb-4">{t("privacy.cookies")}</h2>
              <p className="text-body leading-relaxed">
                {t("privacy.cookiesText")}
              </p>
            </div>

            {/* Enlaces a terceros */}
            <div className="slide-up stagger-10">
              <h2 className="heading-md mb-4">{t("privacy.thirdParty")}</h2>
              <p className="text-body leading-relaxed">
                {t("privacy.thirdPartyText")}
              </p>
            </div>

            {/* Modificaciones */}
            <div className="slide-up stagger-11">
              <h2 className="heading-md mb-4">{t("privacy.modifications")}</h2>
              <p className="text-body leading-relaxed">
                {t("privacy.modificationsText")}
              </p>
            </div>

            {/* Contacto */}
            <div className="slide-up stagger-12 border-t border-neutral-200 pt-8">
              <h2 className="heading-md mb-4">{t("privacy.contact")}</h2>
              <p className="text-body text-neutral-600">
                {t("privacy.contactText")}{" "}
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
