import { Server, Globe, Zap } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { SEO } from '../../components/SEO';
import { ServiceCard } from '../../components/ServiceCard';

export const ServicesOverview = () => {
  const { t } = useLanguage();

  const services = [
    {
      icon: Server,
      title: t('services.legacyMigration.name'),
      description: t('services.legacyMigration.description'),
      link: '/services/legacy-migration',
    },
    {
      icon: Globe,
      title: t('services.webDevelopment.name'),
      description: t('services.webDevelopment.description'),
      link: '/services/web-development',
    },
    {
      icon: Zap,
      title: t('services.automation.name'),
      description: t('services.automation.description'),
      link: '/services/automation',
    },
  ];

  return (
    <>
      <SEO
        title={t('services.title')}
        description={t('services.subtitle')}
        keywords="services, digital transformation, web development, automation, legacy migration"
      />

      <section className="section-padding bg-gradient-to-br from-primary-50 to-white">
        <div className="section-container">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="heading-xl mb-6 fade-in">{t('services.title')}</h1>
            <p className="text-xl text-neutral-600 fade-in stagger-1">
              {t('services.subtitle')}
            </p>
          </div>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="section-container">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div key={service.link} className={`slide-up stagger-${index + 1}`}>
                <ServiceCard {...service} />
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};
