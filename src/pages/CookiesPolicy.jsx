import { Cookie } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
import { SEO } from "../components/SEO";

export const CookiesPolicy = () => {
  const { t } = useLanguage();

  return (
    <>
      <SEO
        title={t("cookies.title")}
        description={t("cookies.intro")}
        keywords="cookies policy, cookie consent, tracking"
      />

      <section className="section-padding bg-gradient-to-br from-primary-50 to-white">
        <div className="section-container">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-4 mb-6 fade-in">
              <div className="w-16 h-16 bg-primary-100 rounded-xl flex items-center justify-center">
                <Cookie className="w-8 h-8 text-primary-600" />
              </div>
              <h1 className="heading-xl">{t("cookies.title")}</h1>
            </div>
            <p className="text-neutral-600 fade-in stagger-1">
              {t("cookies.lastUpdated")}: January 1, 2025
            </p>
          </div>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="section-container">
          <div className="max-w-4xl mx-auto space-y-12">
            <div className="slide-up">
              <p className="text-body leading-relaxed">{t("cookies.intro")}</p>
            </div>

            <div className="slide-up stagger-1">
              <h2 className="heading-md mb-4">{t("cookies.whatAre")}</h2>
              <p className="text-body leading-relaxed">
                {t("cookies.whatAreText")}
              </p>
            </div>

            <div className="slide-up stagger-2">
              <h2 className="heading-md mb-4">{t("cookies.howWeUse")}</h2>
              <p className="text-body leading-relaxed">
                {t("cookies.howWeUseText")}
              </p>
            </div>

            <div className="slide-up stagger-3">
              <h2 className="heading-md mb-4">{t("cookies.types")}</h2>
              <ul className="space-y-3 ml-6">
                <li className="text-body flex items-start gap-2">
                  <span className="text-primary-600 font-bold">•</span>
                  <span>{t("cookies.essential")}</span>
                </li>
                <li className="text-body flex items-start gap-2">
                  <span className="text-primary-600 font-bold">•</span>
                  <span>{t("cookies.analytics")}</span>
                </li>
                <li className="text-body flex items-start gap-2">
                  <span className="text-primary-600 font-bold">•</span>
                  <span>{t("cookies.preference")}</span>
                </li>
              </ul>
            </div>

            <div className="slide-up stagger-4">
              <h2 className="heading-md mb-4">{t("cookies.control")}</h2>
              <p className="text-body leading-relaxed">
                {t("cookies.controlText")}
              </p>
            </div>

            <div className="slide-up stagger-4 border-t border-neutral-200 pt-8">
              <p className="text-body text-neutral-600">
                {t("cookies.questions")}{" "}
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
