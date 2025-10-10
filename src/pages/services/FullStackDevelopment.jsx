import { Link } from "react-router-dom";
import { Globe, CheckCircle } from "lucide-react";
import { useLanguage } from "../../context/LanguageContext";
import { SEO } from "../../components/SEO";
import ImageHero from "../../components/ImageHero";

export const FullStackDevelopment = () => {
  const { t } = useLanguage();

  const benefits = [
    t("services.fullStackDevelopment.benefit1"),
    t("services.fullStackDevelopment.benefit2"),
    t("services.fullStackDevelopment.benefit3"),
    t("services.fullStackDevelopment.benefit4"),
  ];

  return (
    <>
      <SEO
        title={t("services.fullStackDevelopment.name")}
        description={t("services.fullStackDevelopment.description")}
        keywords="web development, web applications, responsive design, full-stack development"
      />

      <ImageHero
        icon={Globe}
        title={t("services.fullStackDevelopment.name")}
        description={t("services.fullStackDevelopment.description")}
        backgroundImage="https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=1920&h=1080&fit=crop&q=80"
      />

      <section className="section-padding bg-white">
        <div className="section-container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="slide-up">
              <h2 className="heading-md mb-6">
                {t("services.fullStackDevelopment.whatWeDo")}
              </h2>
              <p className="text-body leading-relaxed">
                {t("services.fullStackDevelopment.whatWeDoText")}
              </p>
            </div>

            <div className="slide-up stagger-1">
              <img
                src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&h=600&fit=crop&q=80"
                alt="Web Development"
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
              {t("services.fullStackDevelopment.benefits")}
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
                {t("services.fullStackDevelopment.whyChoose")}
              </h2>
              <p className="text-body leading-relaxed">
                {t("services.fullStackDevelopment.whyChooseText")}
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
