import { Users, CheckCircle } from "lucide-react";
import { useLanguage } from "../../context/LanguageContext";
import { SEO } from "../../components/SEO";
import ImageHero from "../../components/ImageHero";
import { Link } from "react-router-dom";

export const OnDemandTeam = () => {
  const { t } = useLanguage();

  const benefits = [
    t("services.onDemandTeam.benefit1"),
    t("services.onDemandTeam.benefit2"),
    t("services.onDemandTeam.benefit3"),
    t("services.onDemandTeam.benefit4"),
  ];

  return (
    <>
      <SEO
        title={t("services.onDemandTeam.name")}
        description={t("services.onDemandTeam.description")}
        keywords="staff augmentation, developers on demand, technical team, software development, outstaffing"
      />

      <ImageHero
        icon={Users}
        title={t("services.onDemandTeam.name")}
        description={t("services.onDemandTeam.description")}
        backgroundImage="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1920&h=1080&fit=crop&q=80"
      />

      <section className="section-padding bg-white">
        <div className="section-container">
          <div className="max-w-4xl mx-auto">
            {/* What We Do */}
            <div className="mb-16 slide-up">
              <h2 className="heading-lg mb-6">
                {t("services.onDemandTeam.whatWeDo")}
              </h2>
              <p className="text-body leading-relaxed text-neutral-700">
                {t("services.onDemandTeam.whatWeDoText")}
              </p>
            </div>

            {/* Benefits */}
            <div className="mb-16 slide-up stagger-1">
              <h2 className="heading-lg mb-8">
                {t("services.onDemandTeam.benefits")}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {benefits.map((benefit, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-4 p-6 bg-primary-50 rounded-xl hover:bg-primary-100 transition-colors"
                  >
                    <div className="flex-shrink-0">
                      <CheckCircle className="w-6 h-6 text-primary-600" />
                    </div>
                    <p className="text-neutral-800 font-medium">{benefit}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Why Choose Us */}
            <div className="mb-16 slide-up stagger-2">
              <h2 className="heading-lg mb-6">
                {t("services.onDemandTeam.whyChoose")}
              </h2>
              <div className="bg-gradient-to-br from-primary-50 to-white p-8 rounded-2xl border border-primary-100">
                <p className="text-body leading-relaxed text-neutral-700">
                  {t("services.onDemandTeam.whyChooseText")}
                </p>
              </div>
            </div>

            {/* CTA */}
            <div className="text-center slide-up stagger-3">
              <h3 className="heading-md mb-6">{t("services.ctaTitle")}</h3>
              <Link to="/contact" className="btn-primary inline-flex">
                {t("services.ctaButton")}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
