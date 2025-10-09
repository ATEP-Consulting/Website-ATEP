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
        keywords="privacy policy, data protection, GDPR"
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
              {t("privacy.lastUpdated")}: January 1, 2025
            </p>
          </div>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="section-container">
          <div className="max-w-4xl mx-auto space-y-12">
            <div className="slide-up">
              <p className="text-body leading-relaxed">{t("privacy.intro")}</p>
            </div>

            <div className="slide-up stagger-1">
              <h2 className="heading-md mb-4">{t("privacy.collection")}</h2>
              <p className="text-body leading-relaxed">
                {t("privacy.collectionText")}
              </p>
            </div>

            <div className="slide-up stagger-2">
              <h2 className="heading-md mb-4">{t("privacy.usage")}</h2>
              <p className="text-body leading-relaxed">
                {t("privacy.usageText")}
              </p>
            </div>

            <div className="slide-up stagger-3">
              <h2 className="heading-md mb-4">{t("privacy.protection")}</h2>
              <p className="text-body leading-relaxed">
                {t("privacy.protectionText")}
              </p>
            </div>

            <div className="slide-up stagger-4">
              <h2 className="heading-md mb-4">{t("privacy.rights")}</h2>
              <p className="text-body leading-relaxed">
                {t("privacy.rightsText")}
              </p>
            </div>

            <div className="slide-up stagger-4 border-t border-neutral-200 pt-8">
              <p className="text-body text-neutral-600">
                {t("privacy.questions")}{" "}
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
