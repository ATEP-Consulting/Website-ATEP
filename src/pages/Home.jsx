import { Link } from 'react-router-dom';
import { Server, Globe, Zap, Award, Users, TrendingUp } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { SEO } from '../components/SEO';
import { ServiceCard } from '../components/ServiceCard';
import { HowWeWork } from '../components/HowWeWork';

export const Home = () => {
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

  const whyChoose = [
    {
      icon: Award,
      title: t('home.whyChoose1Title'),
      text: t('home.whyChoose1Text'),
    },
    {
      icon: TrendingUp,
      title: t('home.whyChoose2Title'),
      text: t('home.whyChoose2Text'),
    },
    {
      icon: Users,
      title: t('home.whyChoose3Title'),
      text: t('home.whyChoose3Text'),
    },
  ];

  return (
    <>
      <SEO
        title={t('nav.home')}
        description={t('home.heroSubtitle')}
        keywords="digital transformation, consulting, web development, automation, legacy migration"
      />

      <section className="relative min-h-[90vh] flex items-center bg-gradient-to-br from-primary-50 via-white to-neutral-50">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1551434678-e076c223a692?w=1920&h=1080&fit=crop&q=80')] bg-cover bg-center opacity-5" />

        <div className="section-container relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="heading-xl mb-6 fade-in">
              {t('home.heroTitle')}
            </h1>
            <p className="text-xl lg:text-2xl text-neutral-600 mb-8 fade-in stagger-1">
              {t('home.heroSubtitle')}
            </p>
            <Link to="/contact" className="btn-primary fade-in stagger-2">
              {t('home.heroCta')}
            </Link>
          </div>
        </div>
      </section>

      <HowWeWork />

      <section className="section-padding bg-white">
        <div className="section-container">
          <div className="text-center mb-16">
            <h2 className="heading-lg mb-4 slide-up">{t('home.servicesTitle')}</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div key={service.link} className={`slide-up stagger-${index + 1}`}>
                <ServiceCard {...service} />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding bg-neutral-50">
        <div className="section-container">
          <div className="text-center mb-16">
            <h2 className="heading-lg mb-4 slide-up">{t('home.whyChooseTitle')}</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {whyChoose.map((item, index) => {
              const Icon = item.icon;
              return (
                <div key={item.title} className={`text-center slide-up stagger-${index + 1}`}>
                  <div className="w-20 h-20 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Icon className="w-10 h-10 text-primary-600" />
                  </div>
                  <h3 className="heading-sm mb-4">{item.title}</h3>
                  <p className="text-body">{item.text}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section-padding bg-primary-600 text-white">
        <div className="section-container">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4 slide-up">
              {t('home.ctaTitle')}
            </h2>
            <p className="text-xl mb-8 text-primary-100 slide-up stagger-1">
              {t('home.ctaSubtitle')}
            </p>
            <Link to="/contact" className="btn-secondary slide-up stagger-2">
              {t('home.ctaButton')}
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};
