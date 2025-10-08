import { useEffect, useRef, useState } from 'react';
import { MessageSquare, Users, FileSearch, Rocket } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export const HowWeWork = () => {
  const { t } = useLanguage();
  const [activeStep, setActiveStep] = useState(0);
  const sectionRef = useRef(null);
  const stepsRef = useRef([]);

  const steps = [
    {
      number: '01',
      icon: MessageSquare,
      title: t('home.step1Title'),
      description: t('home.step1Description'),
    },
    {
      number: '02',
      icon: Users,
      title: t('home.step2Title'),
      description: t('home.step2Description'),
    },
    {
      number: '03',
      icon: FileSearch,
      title: t('home.step3Title'),
      description: t('home.step3Description'),
    },
    {
      number: '04',
      icon: Rocket,
      title: t('home.step4Title'),
      description: t('home.step4Description'),
    },
  ];

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '-40% 0px -40% 0px',
      threshold: 0,
    };

    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const index = stepsRef.current.indexOf(entry.target);
          if (index !== -1) {
            setActiveStep(index);
          }
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    stepsRef.current.forEach((step) => {
      if (step) observer.observe(step);
    });

    return () => {
      stepsRef.current.forEach((step) => {
        if (step) observer.unobserve(step);
      });
    };
  }, []);

  return (
    <section ref={sectionRef} className="section-padding bg-neutral-50 overflow-hidden">
      <div className="section-container">
        <div className="text-center mb-16">
          <h2 className="heading-lg mb-4 slide-up">{t('home.howWeWorkTitle')}</h2>
          <p className="text-xl text-neutral-600 slide-up stagger-1">
            {t('home.howWeWorkSubtitle')}
          </p>
        </div>

        <div className="relative">
          <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-1 bg-primary-200 transform -translate-x-1/2" />

          <div className="space-y-32">
            {steps.map((step, index) => {
              const Icon = step.icon;
              const isEven = index % 2 === 0;
              const isActive = activeStep === index;

              return (
                <div
                  key={step.number}
                  ref={(el) => (stepsRef.current[index] = el)}
                  className="relative scroll-mt-32"
                >
                  <div
                    className={`grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center ${
                      isEven ? '' : 'lg:flex-row-reverse'
                    }`}
                  >
                    <div
                      className={`${
                        isEven ? 'lg:text-right lg:pr-16' : 'lg:order-2 lg:pl-16'
                      } transition-all duration-700 ${
                        isActive
                          ? 'opacity-100 translate-y-0'
                          : 'opacity-40 translate-y-8'
                      }`}
                    >
                      <div className="flex items-center gap-4 mb-6 lg:inline-flex">
                        <div
                          className={`w-20 h-20 bg-primary-100 rounded-2xl flex items-center justify-center transition-all duration-500 ${
                            isActive ? 'bg-primary-600 scale-110' : ''
                          }`}
                        >
                          <Icon
                            className={`w-10 h-10 transition-colors duration-500 ${
                              isActive ? 'text-white' : 'text-primary-600'
                            }`}
                          />
                        </div>
                      </div>
                      <div className="mb-4">
                        <span
                          className={`text-6xl font-bold transition-colors duration-500 ${
                            isActive ? 'text-primary-600' : 'text-primary-200'
                          }`}
                        >
                          {step.number}
                        </span>
                      </div>
                      <h3 className="heading-md mb-4">{step.title}</h3>
                      <p className="text-body leading-relaxed max-w-md lg:ml-auto">
                        {step.description}
                      </p>
                    </div>

                    <div
                      className={`${
                        isEven ? 'lg:pl-16' : 'lg:order-1 lg:pr-16'
                      } hidden lg:block`}
                    >
                      <div
                        className={`w-full h-64 rounded-2xl overflow-hidden shadow-2xl transition-all duration-700 ${
                          isActive ? 'scale-105 shadow-primary-200' : 'scale-95'
                        }`}
                      >
                        <img
                          src={`https://images.unsplash.com/photo-${
                            index === 0
                              ? '1423666639041-f56000c27a9a'
                              : index === 1
                              ? '1552664730-d307ca884978'
                              : index === 2
                              ? '1460925895917-afdab827c52f'
                              : '1504384308090-c894fdcc538d'
                          }?w=800&h=600&fit=crop&q=80`}
                          alt={step.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="hidden lg:block absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    <div
                      className={`w-6 h-6 rounded-full border-4 border-white transition-all duration-500 ${
                        isActive ? 'bg-primary-600 scale-150' : 'bg-primary-300'
                      }`}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="flex justify-center gap-2 mt-16 lg:hidden">
          {steps.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                stepsRef.current[index]?.scrollIntoView({
                  behavior: 'smooth',
                  block: 'center',
                });
              }}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                activeStep === index ? 'bg-primary-600 w-8' : 'bg-primary-200'
              }`}
              aria-label={`Go to step ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
