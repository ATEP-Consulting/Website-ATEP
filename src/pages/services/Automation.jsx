import { Link } from "react-router-dom";
import { Zap, CheckCircle } from "lucide-react";
import { useLanguage } from "../../context/LanguageContext";
import { SEO } from "../../components/SEO";
import ImageHero from "../../components/ImageHero";

export const Automation = () => {
  const { t } = useLanguage();

  const benefits = [
    t("services.automation.benefit1"),
    t("services.automation.benefit2"),
    t("services.automation.benefit3"),
    t("services.automation.benefit4"),
  ];

  return (
    <>
      <SEO
        title={t("services.automation.name")}
        description={t("services.automation.description")}
        keywords="automation, RPA, process automation, AI automation, efficiency"
      />

      <ImageHero
        icon={Zap}
        title={t("services.automation.name")}
        description={t("services.automation.description")}
        backgroundImage="https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=1920&h=1080&fit=crop&q=80"
      />

      <section className="section-padding bg-white">
        <div className="section-container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="slide-up">
              <h2 className="heading-md mb-6">
                {t("services.automation.whatWeDo")}
              </h2>
              <p className="text-body leading-relaxed">
                {t("services.automation.whatWeDoText")}
              </p>
            </div>

            <div className="slide-up stagger-1">
              <img
                src="https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&h=600&fit=crop&q=80"
                alt="Automation"
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
              {t("services.automation.benefits")}
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
                src="https://images.unsplash.com/photo-1518186285589-2f7649de83e0?w=800&h=600&fit=crop&q=80"
                alt="Why Choose Us"
                className="rounded-xl shadow-2xl"
              />
            </div>

            <div className="order-1 lg:order-2 slide-up stagger-1">
              <h2 className="heading-md mb-6">
                {t("services.automation.whyChoose")}
              </h2>
              <p className="text-body leading-relaxed">
                {t("services.automation.whyChooseText")}
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
