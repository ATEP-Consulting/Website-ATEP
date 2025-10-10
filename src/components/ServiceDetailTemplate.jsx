// src/components/ServiceDetailTemplate.jsx
import { Link } from "react-router-dom";
import { CheckCircle, ArrowRight } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
import { SEO } from "./SEO";
import ImageHero from "./ImageHero";

export const ServiceDetailTemplate = ({ serviceKey, heroIcon, heroImage }) => {
  const { t } = useLanguage();

  // Helper para validar arrays
  const getArray = (key) => {
    const data = t(key, { returnObjects: true });
    return Array.isArray(data) ? data : [];
  };

  // Obtener todos los datos del servicio desde las traducciones
  const service = {
    name: t(`services.${serviceKey}.name`),
    description: t(`services.${serviceKey}.description`),
    whatWeDo: t(`services.${serviceKey}.whatWeDo`),
    whatWeDoText: t(`services.${serviceKey}.whatWeDoText`),
    benefits: t(`services.${serviceKey}.benefits`),
    benefitsSubtitle: t(`services.${serviceKey}.benefitsSubtitle`),
    whyChoose: t(`services.${serviceKey}.whyChoose`),
    whyChooseText: t(`services.${serviceKey}.whyChooseText`),
    ctaText: t(`services.${serviceKey}.ctaText`),

    // Usar helper para arrays
    stats: getArray(`services.${serviceKey}.stats`),
    benefitsList: getArray(`services.${serviceKey}.benefitsList`),
    projectTypes: getArray(`services.${serviceKey}.projectTypes`),
    useCases: getArray(`services.${serviceKey}.useCases`),
    features: getArray(`services.${serviceKey}.features`),
    processSteps: getArray(`services.${serviceKey}.processSteps`),
    techStack: getArray(`services.${serviceKey}.techStack`),
    guarantees: getArray(`services.${serviceKey}.guarantees`),
  };

  return (
    <>
      <SEO
        title={service.name}
        description={service.description}
        keywords={t(`services.${serviceKey}.keywords`)}
      />

      <ImageHero
        icon={heroIcon}
        title={service.name}
        description={service.description}
        backgroundImage={heroImage}
      />

      {/* What We Do */}
      <section className="section-padding bg-white">
        <div className="section-container">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12 slide-up">
              <h2 className="heading-lg mb-6">{service.whatWeDo}</h2>
              <p className="text-body leading-relaxed text-neutral-700 max-w-3xl mx-auto">
                {service.whatWeDoText}
              </p>
            </div>

            {/* Stats - Minimalista */}
            {service.stats.length > 0 && (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16 slide-up stagger-1">
                {service.stats.map((stat, index) => (
                  <div
                    key={index}
                    className="text-center p-6 border border-neutral-200 rounded-lg hover:border-primary-300 transition-all duration-300 group"
                  >
                    <div className="text-3xl font-bold text-primary-600 mb-2 group-hover:scale-110 transition-transform duration-300">
                      {stat.number}
                    </div>
                    <div className="text-sm text-neutral-600">{stat.label}</div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Project Types */}
      {service.projectTypes && service.projectTypes.length > 0 && (
        <section className="section-padding bg-neutral-50">
          <div className="section-container">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-12 slide-up">
                <h2 className="heading-lg mb-4">
                  {t(`services.${serviceKey}.projectTypesTitle`)}
                </h2>
                <p className="text-body text-neutral-600">
                  {t(`services.${serviceKey}.projectTypesSubtitle`)}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {service.projectTypes.map((project, index) => (
                  <div
                    key={index}
                    className="group bg-white p-8 rounded-xl border border-neutral-200 hover:border-primary-200 transition-all duration-300 slide-up"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
                      {project.icon}
                    </div>
                    <h3 className="text-xl font-semibold text-neutral-900 mb-3">
                      {project.title}
                    </h3>
                    <p className="text-neutral-600 leading-relaxed">
                      {project.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Use Cases */}
      {service.useCases.length > 0 && (
        <section className="section-padding bg-white">
          <div className="section-container">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-12 slide-up">
                <h2 className="heading-lg mb-4">
                  {t(`services.${serviceKey}.useCasesTitle`)}
                </h2>
                <p className="text-body text-neutral-600">
                  {t(`services.${serviceKey}.useCasesSubtitle`)}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {service.useCases.map((useCase, index) => (
                  <div
                    key={index}
                    className="group bg-neutral-50 p-8 rounded-xl border border-neutral-200 hover:border-primary-200 transition-all duration-300 slide-up"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
                      {useCase.icon}
                    </div>
                    <h3 className="text-xl font-semibold text-neutral-900 mb-3">
                      {useCase.title}
                    </h3>
                    <p className="text-neutral-600 leading-relaxed">
                      {useCase.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Benefits */}
      {service.benefitsList.length > 0 && (
        <section className="section-padding bg-neutral-50">
          <div className="section-container">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-12 slide-up">
                <h2 className="heading-lg mb-4">{service.benefits}</h2>
                {service.benefitsSubtitle && (
                  <p className="text-body text-neutral-600">
                    {service.benefitsSubtitle}
                  </p>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {service.benefitsList.map((benefit, index) => (
                  <div
                    key={index}
                    className="group flex items-start gap-4 p-6 bg-white rounded-xl border border-neutral-200 hover:border-primary-200 transition-all duration-300 slide-up"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className="flex-shrink-0 w-6 h-6 mt-1">
                      <CheckCircle className="w-6 h-6 text-primary-600 group-hover:scale-110 transition-transform duration-300" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-neutral-900 mb-2">
                        {benefit.title}
                      </h3>
                      <p className="text-neutral-600 leading-relaxed text-sm">
                        {benefit.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Features */}
      {service.features.length > 0 && (
        <section className="section-padding bg-white">
          <div className="section-container">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-12 slide-up">
                <h2 className="heading-lg mb-4">
                  {t(`services.${serviceKey}.featuresTitle`)}
                </h2>
                <p className="text-body text-neutral-600">
                  {t(`services.${serviceKey}.featuresSubtitle`)}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {service.features.map((feature, index) => (
                  <div
                    key={index}
                    className="group text-center p-8 bg-neutral-50 rounded-xl border border-neutral-200 hover:border-primary-200 transition-all duration-300 slide-up"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className="inline-flex w-14 h-14 bg-primary-100 rounded-full items-center justify-center mb-6 group-hover:bg-primary-600 transition-colors duration-300">
                      <CheckCircle className="w-7 h-7 text-primary-600 group-hover:text-white transition-colors duration-300" />
                    </div>
                    <h3 className="text-lg font-semibold text-neutral-900 mb-3">
                      {feature.title}
                    </h3>
                    <p className="text-neutral-600 leading-relaxed text-sm">
                      {feature.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Process Steps - Rediseñado */}
      {service.processSteps.length > 0 && (
        <section className="section-padding bg-neutral-50">
          <div className="section-container">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-16 slide-up">
                <h2 className="heading-lg mb-4">
                  {t(`services.${serviceKey}.processTitle`)}
                </h2>
                <p className="text-body text-neutral-600">
                  {t(`services.${serviceKey}.processSubtitle`)}
                </p>
              </div>

              <div className="space-y-8">
                {service.processSteps.map((step, index) => (
                  <div
                    key={index}
                    className="group flex items-start gap-6 p-8 bg-white rounded-xl border border-neutral-200 hover:border-primary-200 transition-all duration-300 slide-up"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center group-hover:bg-primary-600 transition-colors duration-300">
                        <span className="text-lg font-bold text-primary-600 group-hover:text-white transition-colors duration-300">
                          {step.number || `0${index + 1}`}
                        </span>
                      </div>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-neutral-900 mb-2">
                        {step.title}
                      </h3>
                      <p className="text-neutral-600 leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                    <ArrowRight className="w-5 h-5 text-neutral-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Why Choose Us - Rediseñado más sutil */}
      <section className="section-padding bg-white">
        <div className="section-container">
          <div className="max-w-4xl mx-auto">
            <div className="slide-up">
              <h2 className="heading-lg mb-8 text-center">
                {service.whyChoose}
              </h2>

              <div className="bg-neutral-50 border-l-4 border-primary-600 p-10 rounded-r-xl">
                <p className="text-lg leading-relaxed text-neutral-700 mb-8">
                  {service.whyChooseText}
                </p>

                {service.guarantees.length > 0 && (
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-8 border-t border-neutral-200">
                    {service.guarantees.map((guarantee, index) => (
                      <div key={index} className="flex items-center gap-3">
                        <CheckCircle className="w-5 h-5 text-primary-600 flex-shrink-0" />
                        <p className="font-medium text-neutral-800">
                          {guarantee.text || guarantee}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
