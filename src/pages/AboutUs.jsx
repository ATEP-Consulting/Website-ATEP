import { Target, Eye, Linkedin } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { SEO } from '../components/SEO';

export const AboutUs = () => {
  const { t } = useLanguage();

  const team = [
    {
      name: t('about.gabriela.name'),
      role: t('about.gabriela.role'),
      bio: t('about.gabriela.bio'),
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop&q=80',
      linkedin: 'https://linkedin.com',
    },
    {
      name: t('about.pablo.name'),
      role: t('about.pablo.role'),
      bio: t('about.pablo.bio'),
      image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=400&fit=crop&q=80',
      linkedin: 'https://linkedin.com',
    },
  ];

  return (
    <>
      <SEO
        title={t('about.title')}
        description={t('about.subtitle')}
        keywords="about us, team, consulting experts, digital transformation specialists"
      />

      <section className="section-padding bg-gradient-to-br from-primary-50 to-white">
        <div className="section-container">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="heading-xl mb-6 fade-in">{t('about.title')}</h1>
            <p className="text-xl text-neutral-600 fade-in stagger-1">
              {t('about.subtitle')}
            </p>
          </div>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="section-container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="slide-up">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 bg-primary-100 rounded-xl flex items-center justify-center">
                  <Target className="w-8 h-8 text-primary-600" />
                </div>
                <h2 className="heading-md">{t('about.missionTitle')}</h2>
              </div>
              <p className="text-body leading-relaxed">{t('about.missionText')}</p>
            </div>

            <div className="slide-up stagger-1">
              <img
                src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=600&fit=crop&q=80"
                alt="Mission"
                className="rounded-xl shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding bg-neutral-50">
        <div className="section-container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1 slide-up">
              <img
                src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800&h=600&fit=crop&q=80"
                alt="Vision"
                className="rounded-xl shadow-2xl"
              />
            </div>

            <div className="order-1 lg:order-2 slide-up stagger-1">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 bg-primary-100 rounded-xl flex items-center justify-center">
                  <Eye className="w-8 h-8 text-primary-600" />
                </div>
                <h2 className="heading-md">{t('about.visionTitle')}</h2>
              </div>
              <p className="text-body leading-relaxed">{t('about.visionText')}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="section-container">
          <div className="text-center mb-16">
            <h2 className="heading-lg mb-4 slide-up">{t('about.teamTitle')}</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-5xl mx-auto">
            {team.map((member, index) => (
              <div key={member.name} className={`card text-center slide-up stagger-${index + 1}`}>
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-40 h-40 rounded-full object-cover mx-auto mb-6 shadow-lg"
                />
                <h3 className="heading-sm mb-2">{member.name}</h3>
                <p className="text-primary-600 font-semibold mb-4">{member.role}</p>
                <p className="text-body mb-6">{member.bio}</p>
                <a
                  href={member.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center w-12 h-12 bg-primary-100 rounded-full hover:bg-primary-600 hover:text-white transition-colors duration-200"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="w-6 h-6" />
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};
