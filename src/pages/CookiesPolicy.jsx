import { Cookie } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
import { SEO } from "../components/SEO";

export const CookiesPolicy = () => {
  const { t } = useLanguage();

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
        title={t("cookies.title")}
        description={t("cookies.intro")}
        keywords="cookies policy, cookie consent, tracking, política de cookies"
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
              {t("cookies.lastUpdated")}: {t("cookies.lastUpdatedDate")}
            </p>
          </div>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="section-container">
          <div className="max-w-4xl mx-auto space-y-12">
            {/* Introducción */}
            <div className="slide-up">
              <p className="text-body leading-relaxed">{t("cookies.intro")}</p>
            </div>

            {/* Qué son las cookies */}
            <div className="slide-up stagger-1">
              <h2 className="heading-md mb-4">{t("cookies.whatAre")}</h2>
              <p className="text-body leading-relaxed">
                {t("cookies.whatAreText")}
              </p>
            </div>

            {/* Cómo usamos las cookies */}
            <div className="slide-up stagger-2">
              <h2 className="heading-md mb-4">{t("cookies.howWeUse")}</h2>
              <p className="text-body leading-relaxed">
                {t("cookies.howWeUseText")}
              </p>
            </div>

            {/* Tipos de cookies */}
            <div className="slide-up stagger-3">
              <h2 className="heading-md mb-4">{t("cookies.types")}</h2>
              <div className="space-y-6">
                {cookieTypes.map((cookie, index) => (
                  <div
                    key={index}
                    className="border-l-4 border-primary-500 pl-6 py-2"
                  >
                    <h3 className="font-semibold text-lg text-neutral-800 mb-2">
                      {cookie.type}
                    </h3>
                    <p className="text-body mb-2">{cookie.description}</p>
                    <p className="text-sm text-neutral-600">
                      <span className="font-medium">
                        {t("cookies.examplesLabel")}:
                      </span>{" "}
                      {cookie.examples}
                    </p>
                    <p className="text-sm text-neutral-600">
                      <span className="font-medium">
                        {t("cookies.durationLabel")}:
                      </span>{" "}
                      {cookie.duration}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Cookies de terceros */}
            <div className="slide-up stagger-4">
              <h2 className="heading-md mb-4">{t("cookies.thirdParty")}</h2>
              <p className="text-body leading-relaxed mb-4">
                {t("cookies.thirdPartyText")}
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4 text-body">
                <li>{t("cookies.thirdPartyItem1")}</li>
                <li>{t("cookies.thirdPartyItem2")}</li>
              </ul>
            </div>

            {/* Control de cookies */}
            <div className="slide-up stagger-5">
              <h2 className="heading-md mb-4">{t("cookies.control")}</h2>
              <p className="text-body leading-relaxed mb-4">
                {t("cookies.controlText")}
              </p>
              <div className="bg-neutral-50 p-6 rounded-lg">
                <h3 className="font-semibold text-neutral-800 mb-3">
                  {t("cookies.browserSettings")}
                </h3>
                <ul className="space-y-2 text-body">
                  <li>
                    <span className="font-medium">Chrome:</span>{" "}
                    {t("cookies.chromeInstructions")}
                  </li>
                  <li>
                    <span className="font-medium">Firefox:</span>{" "}
                    {t("cookies.firefoxInstructions")}
                  </li>
                  <li>
                    <span className="font-medium">Safari:</span>{" "}
                    {t("cookies.safariInstructions")}
                  </li>
                  <li>
                    <span className="font-medium">Edge:</span>{" "}
                    {t("cookies.edgeInstructions")}
                  </li>
                </ul>
              </div>
            </div>

            {/* Aceptación de cookies */}
            <div className="slide-up stagger-6">
              <h2 className="heading-md mb-4">{t("cookies.acceptance")}</h2>
              <p className="text-body leading-relaxed">
                {t("cookies.acceptanceText")}
              </p>
            </div>

            {/* Actualizaciones */}
            <div className="slide-up stagger-7">
              <h2 className="heading-md mb-4">{t("cookies.updates")}</h2>
              <p className="text-body leading-relaxed">
                {t("cookies.updatesText")}
              </p>
            </div>

            {/* Contacto */}
            <div className="slide-up stagger-8 border-t border-neutral-200 pt-8">
              <h2 className="heading-md mb-4">{t("cookies.contact")}</h2>
              <p className="text-body text-neutral-600">
                {t("cookies.contactText")}{" "}
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
