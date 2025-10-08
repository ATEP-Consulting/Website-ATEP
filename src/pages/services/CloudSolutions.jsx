import { Link } from 'react-router-dom';
import { Cloud, CheckCircle } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { SEO } from '../../components/SEO';

export const CloudSolutions = () => {
  const { t } = useLanguage();

  const benefits = [
    t('services.cloudSolutions.benefit1'),
    t('services.cloudSolutions.benefit2'),
    t('services.cloudSolutions.benefit3'),
    t('services.cloudSolutions.benefit4'),
  ];

  return (
    <>
      <SEO
        title={t('services.cloudSolutions.name')}
        description={t('services.cloudSolutions.description')}
        keywords="cloud solutions, AWS, Azure, Google Cloud, cloud migration"
      />

      <section className="section-padding bg-gradient-to-br from-primary-50 to-white">
        <div className="section-container">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-4 mb-6 fade-in">
              <div className="w-16 h-16 bg-primary-100 rounded-xl flex items-center justify-center">
                <Cloud className="w-8 h-8 text-primary-600" />
              </div>
              <h1 className="heading-xl">{t('services.cloudSolutions.name')}</h1>
            </div>
            <p className="text-xl text-neutral-600 fade-in stagger-1">
              {t('services.cloudSolutions.description')}
            </p>
          </div>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="section-container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="slide-up">
              <h2 className="heading-md mb-6">{t('services.cloudSolutions.whatWeDo')}</h2>
              <p className="text-body leading-relaxed">
                {t('services.cloudSolutions.whatWeDoText')}
              </p>
            </div>

            <div className="slide-up stagger-1">
              <img
                src="https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=800&h=600&fit=crop&q=80"
                alt="Cloud Solutions"
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
              {t('services.cloudSolutions.benefits')}
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {benefits.map((benefit, index) => (
                <div
                  key={benefit}
                  className={`flex items-start gap-4 slide-up stagger-${index + 1}`}
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
                src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&h=600&fit=crop&q=80"
                alt="Why Choose Us"
                className="rounded-xl shadow-2xl"
              />
            </div>

            <div className="order-1 lg:order-2 slide-up stagger-1">
              <h2 className="heading-md mb-6">{t('services.cloudSolutions.whyChoose')}</h2>
              <p className="text-body leading-relaxed">
                {t('services.cloudSolutions.whyChooseText')}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding bg-primary-600 text-white">
        <div className="section-container">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl lg:text-4xl font-bold mb-8 slide-up">
              {t('services.ctaTitle')}
            </h2>
            <Link to="/contact" className="btn-secondary slide-up stagger-1">
              {t('services.ctaButton')}
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};
