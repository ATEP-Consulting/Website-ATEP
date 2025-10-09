import { Link } from "react-router-dom";
import { BarChart3, CheckCircle } from "lucide-react";
import { useLanguage } from "../../context/LanguageContext";
import { SEO } from "../../components/SEO";

export const DataAnalytics = () => {
  const { t } = useLanguage();

  const benefits = [
    t("services.dataAnalytics.benefit1"),
    t("services.dataAnalytics.benefit2"),
    t("services.dataAnalytics.benefit3"),
    t("services.dataAnalytics.benefit4"),
  ];

  return (
    <>
      <SEO
        title={t("services.dataAnalytics.name")}
        description={t("services.dataAnalytics.description")}
        keywords="data analytics, business intelligence, BI, data visualization, predictive analytics"
      />

      <section className="section-padding bg-gradient-to-br from-primary-50 to-white">
        <div className="section-container">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-4 mb-6 fade-in">
              <div className="w-16 h-16 bg-primary-100 rounded-xl flex items-center justify-center">
                <BarChart3 className="w-8 h-8 text-primary-600" />
              </div>
              <h1 className="heading-xl">{t("services.dataAnalytics.name")}</h1>
            </div>
            <p className="text-xl text-neutral-600 fade-in stagger-1">
              {t("services.dataAnalytics.description")}
            </p>
          </div>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="section-container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="slide-up">
              <h2 className="heading-md mb-6">
                {t("services.dataAnalytics.whatWeDo")}
              </h2>
              <p className="text-body leading-relaxed">
                {t("services.dataAnalytics.whatWeDoText")}
              </p>
            </div>

            <div className="slide-up stagger-1">
              <img
                src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop&q=80"
                alt="Data Analytics"
                className="rounded-xl shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding bg-neutral-50">
        <div className="section-container">
          <div className="max-w-4xl mx-auto">
            <h2 className="heading-md mb-8 text-center slide-up">
              {t("services.dataAnalytics.benefits")}
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {benefits.map((benefit, index) => (
                <div
                  key={benefit}
                  className={`flex items-start gap-4 slide-up stagger-${
                    index + 1
                  }`}
                >
                  <CheckCircle className="w-6 h-6 text-primary-600 flex-shrink-0 mt-1" />
                  <p className="text-body">{benefit}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="section-container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1 slide-up">
              <img
                src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop&q=80"
                alt="Why Choose Us"
                className="rounded-xl shadow-2xl"
              />
            </div>

            <div className="order-1 lg:order-2 slide-up stagger-1">
              <h2 className="heading-md mb-6">
                {t("services.dataAnalytics.whyChoose")}
              </h2>
              <p className="text-body leading-relaxed">
                {t("services.dataAnalytics.whyChooseText")}
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
