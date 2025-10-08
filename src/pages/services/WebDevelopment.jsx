import { Link } from 'react-router-dom';
import { Globe, CheckCircle } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { SEO } from '../../components/SEO';

export const WebDevelopment = () => {
  const { t } = useLanguage();

  const benefits = [
    t('services.webDevelopment.benefit1'),
    t('services.webDevelopment.benefit2'),
    t('services.webDevelopment.benefit3'),
    t('services.webDevelopment.benefit4'),
  ];

  return (
    <>
      <SEO
        title={t('services.webDevelopment.name')}
        description={t('services.webDevelopment.description')}
        keywords="web development, web applications, responsive design, full-stack development"
      />

      <section className="section-padding bg-gradient-to-br from-primary-50 to-white">
        <div className="section-container">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-4 mb-6 fade-in">
              <div className="w-16 h-16 bg-primary-100 rounded-xl flex items-center justify-center">
                <Globe className="w-8 h-8 text-primary-600" />
              </div>
              <h1 className="heading-xl">{t('services.webDevelopment.name')}</h1>
            </div>
            <p className="text-xl text-neutral-600 fade-in stagger-1">
              {t('services.webDevelopment.description')}
            </p>
          </div>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="section-container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="slide-up">
              <h2 className="heading-md mb-6">{t('services.webDevelopment.whatWeDo')}</h2>
              <p className="text-body leading-relaxed">
                {t('services.webDevelopment.whatWeDoText')}
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
              {t('services.webDevelopment.benefits')}
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
                src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop&q=80"
                alt="Why Choose Us"
                className="rounded-xl shadow-2xl"
              />
            </div>

            <div className="order-1 lg:order-2 slide-up stagger-1">
              <h2 className="heading-md mb-6">{t('services.webDevelopment.whyChoose')}</h2>
              <p className="text-body leading-relaxed">
                {t('services.webDevelopment.whyChooseText')}
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
