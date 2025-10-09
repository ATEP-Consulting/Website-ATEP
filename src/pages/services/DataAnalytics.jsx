import { Link } from "react-router-dom";
import { BarChart3, CheckCircle } from "lucide-react";
import { useLanguage } from "../../context/LanguageContext";
import { SEO } from "../../components/SEO";
import ImageHero from "../../components/ImageHero";

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

      <ImageHero
        icon={BarChart3}
        title={t("services.dataAnalytics.name")}
        description={t("services.dataAnalytics.description")}
        backgroundImage="https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=1920&h=1080&fit=crop&q=80"
      />

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
