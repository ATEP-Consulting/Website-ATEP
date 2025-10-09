import { Link } from "react-router-dom";

import { Server, CheckCircle } from "lucide-react";
import { useLanguage } from "../../context/LanguageContext";
import { SEO } from "../../components/SEO";
import ImageHero from "../../components/ImageHero";

export const LegacyMigration = () => {
  const { t } = useLanguage();

  const benefits = [
    t("services.legacyMigration.benefit1"),
    t("services.legacyMigration.benefit2"),
    t("services.legacyMigration.benefit3"),
    t("services.legacyMigration.benefit4"),
  ];

  return (
    <>
      <SEO
        title={t("services.legacyMigration.name")}
        description={t("services.legacyMigration.description")}
        keywords="legacy migration, system modernization, digital transformation"
      />

      <ImageHero
        icon={Server}
        title={t("services.legacyMigration.name")}
        description={t("services.legacyMigration.description")}
        backgroundImage="https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=1920&h=1080&fit=crop&q=80"
      />

      <section className="section-padding bg-white">
        <div className="section-container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="slide-up">
              <h2 className="heading-md mb-6">
                {t("services.legacyMigration.whatWeDo")}
              </h2>
              <p className="text-body leading-relaxed">
                {t("services.legacyMigration.whatWeDoText")}
              </p>
            </div>

            <div className="slide-up stagger-1">
              <img
                src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&h=600&fit=crop&q=80"
                alt="Legacy Migration"
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
              {t("services.legacyMigration.benefits")}
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
                src="https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800&h=600&fit=crop&q=80"
                alt="Why Choose Us"
                className="rounded-xl shadow-2xl"
              />
            </div>

            <div className="order-1 lg:order-2 slide-up stagger-1">
              <h2 className="heading-md mb-6">
                {t("services.legacyMigration.whyChoose")}
              </h2>
              <p className="text-body leading-relaxed">
                {t("services.legacyMigration.whyChooseText")}
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
