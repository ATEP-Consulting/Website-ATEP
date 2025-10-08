import { Mail, Phone, MapPin, Linkedin, Twitter, Facebook } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { SEO } from '../components/SEO';
import { ContactForm } from '../components/ContactForm';

export const Contact = () => {
  const { t } = useLanguage();

  const contactInfo = [
    {
      icon: Mail,
      label: t('contact.email'),
      value: 'info@atepconsulting.com',
      link: 'mailto:info@atepconsulting.com',
    },
    {
      icon: Phone,
      label: t('contact.phone'),
      value: '+1 (234) 567-890',
      link: 'tel:+1234567890',
    },
    {
      icon: MapPin,
      label: 'Location',
      value: 'San Francisco, CA',
      link: null,
    },
  ];

  const socialLinks = [
    { icon: Linkedin, url: 'https://linkedin.com', label: 'LinkedIn' },
    { icon: Twitter, url: 'https://twitter.com', label: 'Twitter' },
    { icon: Facebook, url: 'https://facebook.com', label: 'Facebook' },
  ];

  return (
    <>
      <SEO
        title={t('contact.title')}
        description={t('contact.subtitle')}
        keywords="contact, get in touch, consulting inquiry"
      />

      <section className="section-padding bg-gradient-to-br from-primary-50 to-white">
        <div className="section-container">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="heading-xl mb-6 fade-in">{t('contact.title')}</h1>
            <p className="text-xl text-neutral-600 fade-in stagger-1">
              {t('contact.subtitle')}
            </p>
          </div>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="section-container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="slide-up">
              <h2 className="heading-md mb-8">{t('contact.infoTitle')}</h2>

              <div className="space-y-6 mb-8">
                {contactInfo.map((info) => {
                  const Icon = info.icon;
                  return (
                    <div key={info.label} className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Icon className="w-6 h-6 text-primary-600" />
                      </div>
                      <div>
                        <p className="font-semibold text-neutral-900 mb-1">{info.label}</p>
                        {info.link ? (
                          <a
                            href={info.link}
                            className="text-neutral-600 hover:text-primary-600 transition-colors"
                          >
                            {info.value}
                          </a>
                        ) : (
                          <p className="text-neutral-600">{info.value}</p>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>

              <div>
                <h3 className="font-semibold text-neutral-900 mb-4">{t('contact.followUs')}</h3>
                <div className="flex gap-4">
                  {socialLinks.map((social) => {
                    const Icon = social.icon;
                    return (
                      <a
                        key={social.label}
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center hover:bg-primary-600 hover:text-white transition-colors duration-200"
                        aria-label={social.label}
                      >
                        <Icon className="w-6 h-6" />
                      </a>
                    );
                  })}
                </div>
              </div>

              <div className="mt-8">
                <div className="w-full h-64 bg-neutral-200 rounded-xl overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1524661135-423995f22d0b?w=800&h=400&fit=crop&q=80"
                    alt="Office Location"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>

            <div className="slide-up stagger-1">
              <div className="card">
                <ContactForm />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
