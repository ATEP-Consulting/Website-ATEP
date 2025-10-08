import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown, Server, Globe, Zap, Cloud, BarChart3, Shield } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { LanguageSwitcher } from './LanguageSwitcher';

export const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [visible, setVisible] = useState(true);
  const [servicesOpen, setServicesOpen] = useState(false);
  const { t } = useLanguage();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.scrollY;
      setIsScrolled(currentScrollPos > 10);
      setVisible(prevScrollPos > currentScrollPos || currentScrollPos < 10);
      setPrevScrollPos(currentScrollPos);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [prevScrollPos]);

  useEffect(() => {
    setIsOpen(false);
    setServicesOpen(false);
  }, [location]);

  const navLinks = [
    { path: '/', label: t('nav.home') },
    { path: '/about-us', label: t('nav.about') },
    { path: '/blog', label: t('nav.blog') },
    { path: '/contact', label: t('nav.contact') },
  ];

  const serviceLinks = [
    {
      path: '/services/legacy-migration',
      label: t('services.legacyMigration.name'),
      icon: Server,
    },
    {
      path: '/services/web-development',
      label: t('services.webDevelopment.name'),
      icon: Globe,
    },
    {
      path: '/services/automation',
      label: t('services.automation.name'),
      icon: Zap,
    },
    {
      path: '/services/cloud-solutions',
      label: t('services.cloudSolutions.name'),
      icon: Cloud,
    },
    {
      path: '/services/data-analytics',
      label: t('services.dataAnalytics.name'),
      icon: BarChart3,
    },
    {
      path: '/services/cybersecurity',
      label: t('services.cybersecurity.name'),
      icon: Shield,
    },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-md' : 'bg-white/95 backdrop-blur-sm'
      } ${visible ? 'translate-y-0' : '-translate-y-full'}`}
    >
      <nav className="section-container">
        <div className="flex items-center justify-between h-20">
          <Link to="/" className="flex items-center">
            <span className="text-2xl font-bold text-primary-600">ATEP</span>
            <span className="text-2xl font-light text-neutral-800 ml-1">Consulting</span>
          </Link>

          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`font-medium transition-colors duration-200 ${
                  location.pathname === link.path
                    ? 'text-primary-600'
                    : 'text-neutral-700 hover:text-primary-600'
                }`}
              >
                {link.label}
              </Link>
            ))}

            <div
              className="relative"
              onMouseEnter={() => setServicesOpen(true)}
              onMouseLeave={() => setServicesOpen(false)}
            >
              <button
                className={`font-medium transition-colors duration-200 flex items-center gap-1 ${
                  location.pathname.startsWith('/services')
                    ? 'text-primary-600'
                    : 'text-neutral-700 hover:text-primary-600'
                }`}
              >
                {t('nav.services')}
                <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${servicesOpen ? 'rotate-180' : ''}`} />
              </button>

              {servicesOpen && (
                <div className="absolute top-full left-0 mt-2 w-80 bg-white rounded-xl shadow-2xl border border-neutral-100 py-4 animate-in fade-in slide-in-from-top-2 duration-200">
                  <div className="px-4 pb-3 border-b border-neutral-100">
                    <Link
                      to="/services"
                      className="text-sm font-semibold text-primary-600 hover:text-primary-700"
                    >
                      {t('services.viewAll')} →
                    </Link>
                  </div>
                  <div className="py-2">
                    {serviceLinks.map((service) => {
                      const Icon = service.icon;
                      return (
                        <Link
                          key={service.path}
                          to={service.path}
                          className="flex items-center gap-3 px-4 py-3 hover:bg-primary-50 transition-colors duration-200 group"
                        >
                          <div className="w-10 h-10 bg-primary-50 rounded-lg flex items-center justify-center group-hover:bg-primary-100 transition-colors">
                            <Icon className="w-5 h-5 text-primary-600" />
                          </div>
                          <span className="text-sm font-medium text-neutral-700 group-hover:text-primary-600">
                            {service.label}
                          </span>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            <LanguageSwitcher />
          </div>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2 text-neutral-700 hover:text-primary-600 transition-colors"
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {isOpen && (
          <div className="lg:hidden py-4 border-t border-neutral-200">
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`font-medium py-2 transition-colors duration-200 ${
                    location.pathname === link.path
                      ? 'text-primary-600'
                      : 'text-neutral-700 hover:text-primary-600'
                  }`}
                >
                  {link.label}
                </Link>
              ))}

              <div>
                <button
                  onClick={() => setServicesOpen(!servicesOpen)}
                  className={`font-medium py-2 transition-colors duration-200 flex items-center gap-1 ${
                    location.pathname.startsWith('/services')
                      ? 'text-primary-600'
                      : 'text-neutral-700 hover:text-primary-600'
                  }`}
                >
                  {t('nav.services')}
                  <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${servicesOpen ? 'rotate-180' : ''}`} />
                </button>

                {servicesOpen && (
                  <div className="pl-4 mt-2 space-y-2">
                    <Link
                      to="/services"
                      className="block py-2 text-sm font-semibold text-primary-600"
                    >
                      {t('services.viewAll')} →
                    </Link>
                    {serviceLinks.map((service) => {
                      const Icon = service.icon;
                      return (
                        <Link
                          key={service.path}
                          to={service.path}
                          className="flex items-center gap-2 py-2 text-sm text-neutral-700 hover:text-primary-600"
                        >
                          <Icon className="w-4 h-4" />
                          {service.label}
                        </Link>
                      );
                    })}
                  </div>
                )}
              </div>

              <div className="pt-2 border-t border-neutral-200">
                <LanguageSwitcher />
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};
