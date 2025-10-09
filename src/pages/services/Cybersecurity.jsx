import { Link } from "react-router-dom";
import { Shield, CheckCircle } from "lucide-react";
import { useLanguage } from "../../context/LanguageContext";
import { SEO } from "../../components/SEO";
import ImageHero from "../../components/ImageHero";

export const Cybersecurity = () => {
  const { t } = useLanguage();

  const benefits = [
    t("services.cybersecurity.benefit1"),
    t("services.cybersecurity.benefit2"),
    t("services.cybersecurity.benefit3"),
    t("services.cybersecurity.benefit4"),
  ];

  return (
    <>
      <SEO
        title={t("services.cybersecurity.name")}
        description={t("services.cybersecurity.description")}
        keywords="cybersecurity, security audit, penetration testing, compliance, security consulting"
      />

      <ImageHero
        icon={Shield}
        title={t("services.cybersecurity.name")}
        description={t("services.cybersecurity.description")}
        backgroundImage="https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=1920&h=1080&fit=crop&q=80"
      />

      <section className="section-padding bg-white">
        <div className="section-container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="slide-up">
              <h2 className="heading-md mb-6">
                {t("services.cybersecurity.whatWeDo")}
              </h2>
              <p className="text-body leading-relaxed">
                {t("services.cybersecurity.whatWeDoText")}
              </p>
            </div>

            <div className="slide-up stagger-1">
              <img
                src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&h=600&fit=crop&q=80"
                alt="Cybersecurity"
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
              {t("services.cybersecurity.benefits")}
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
                src="https://images.unsplash.com/photo-1563986768494-4dee2763ff3f?w=800&h=600&fit=crop&q=80"
                alt="Why Choose Us"
                className="rounded-xl shadow-2xl"
              />
            </div>

            <div className="order-1 lg:order-2 slide-up stagger-1">
              <h2 className="heading-md mb-6">
                {t("services.cybersecurity.whyChoose")}
              </h2>
              <p className="text-body leading-relaxed">
                {t("services.cybersecurity.whyChooseText")}
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
