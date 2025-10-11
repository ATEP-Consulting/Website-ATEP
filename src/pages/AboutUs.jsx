import {
  Target,
  Eye,
  Linkedin,
  Handshake,
  Users,
  Star,
  ShieldPlus,
} from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
import { SEO } from "../components/SEO";
import ImageHero from "../components/ImageHero";
import { Stats } from "../components/Stats";
import { getHeroStats } from "../config/heroStats";

export const AboutUs = () => {
  const { t } = useLanguage();

  const values = [
    {
      icon: Users,
      title: t("about.value1Title") || "Assistance",
      description:
        t("about.value1Text") ||
        "We are always by your side. We provide proactive and continuous support, guaranteeing a smooth implementation and the efficient achievement of your goals",
      image:
        "https://images.unsplash.com/photo-1492724441997-5dc865305da7?auto=format&fit=crop&w=800&q=80",
    },
    {
      icon: Handshake,
      title: t("about.value2Title") || "Trust",
      description:
        t("about.value2Text") ||
        "We build every relationship on trust. We maintain open communication and clear processes to ensure an honest and complete vision at every phase",
      image:
        "https://images.unsplash.com/photo-1492724441997-5dc865305da7?auto=format&fit=crop&w=800&q=80",
    },
    {
      icon: Star,
      title: t("about.value3Title") || "Excellence",
      description:
        t("about.value3Text") ||
        "We exceed the standard in every solution. Our commitment to quality and expert knowledge drives us to deliver results that surpass expectations",
      image:
        "https://images.unsplash.com/photo-1492724441997-5dc865305da7?auto=format&fit=crop&w=800&q=80",
    },
    {
      icon: ShieldPlus,
      title: t("about.value4Title") || "Professionalism",
      description:
        t("about.value4Text") ||
        "We act with the highest rigor and ethics. We adhere to the industry's highest standards, ensuring seriousness, responsibility, and respectful treatment",
      image:
        "https://images.unsplash.com/photo-1492724441997-5dc865305da7?auto=format&fit=crop&w=800&q=80",
    },
  ];

  const team = [
    {
      name: t("about.gabriela.name"),
      role: t("about.gabriela.role"),
      bio: t("about.gabriela.bio"),
      image:
        "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop&q=80",
      linkedin: "https://linkedin.com",
    },
    {
      name: t("about.pablo.name"),
      role: t("about.pablo.role"),
      bio: t("about.pablo.bio"),
      image:
        "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=400&fit=crop&q=80",
      linkedin: "https://linkedin.com",
    },
  ];

  const stats = [
    { number: "15+", label: t("about.stat1") || "Years Experience" },
    { number: "500+", label: t("about.stat2") || "Projects Completed" },
    { number: "50+", label: t("about.stat3") || "Team Members" },
    { number: "98%", label: t("about.stat4") || "Client Satisfaction" },
  ];

  return (
    <>
      <SEO
        title="Sobre Nosotros - Equipo de Expertos IT"
        description="Equipo técnico senior especializado en React, TypeScript, Node.js y tecnologías cloud. Más de 10 años de experiencia en desarrollo de software y consultoría IT. Valencia, España."
        keywords="equipo IT, consultores tecnológicos, desarrolladores React, expertos TypeScript, equipo senior, Valencia"
        schemaType="WebPage"
      />

      {/* Hero con imagen de fondo */}
      <ImageHero
        icon={Users}
        title={t("about.title")}
        description={t("about.subtitle")}
        backgroundImage="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1920&h=1080&fit=crop&q=80"
      />

      {/* Stats Section */}
      <Stats stats={getHeroStats(t)} />

      {/* Our Story - Alternating Layout */}
      <section className="section-padding bg-gradient-to-br from-neutral-50 to-white">
        <div className="section-container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="slide-up">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 bg-primary-100 rounded-xl flex items-center justify-center">
                  <Target className="w-8 h-8 text-primary-600" />
                </div>
                <h2 className="heading-md">{t("about.missionTitle")}</h2>
              </div>
              <p className="text-body leading-relaxed mb-6">
                {t("about.missionText")}
              </p>

              {/* Vision inline */}
              <div className="flex items-center gap-4 mb-4 mt-8">
                <div className="w-16 h-16 bg-primary-100 rounded-xl flex items-center justify-center">
                  <Eye className="w-8 h-8 text-primary-600" />
                </div>
                <h2 className="heading-md">{t("about.visionTitle")}</h2>
              </div>
              <p className="text-body leading-relaxed">
                {t("about.visionText")}
              </p>
            </div>

            <div className="relative slide-up stagger-1">
              <div className="absolute -inset-4 bg-gradient-to-br from-primary-200 to-primary-300 rounded-3xl blur-2xl opacity-30"></div>
              <img
                src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=600&fit=crop&q=80"
                alt="Our Story"
                className="relative rounded-2xl shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Our Values - Grid 2x2 */}
      <section className="section-padding bg-white">
        <div className="section-container">
          <div className="text-center mb-16">
            <h2 className="heading-lg mb-4 slide-up">
              {t("about.valuesTitle1")}
              <span className="text-primary-600">
                {t("about.valuesTitle2")}
              </span>
            </h2>
            <p className="text-xl text-neutral-600 slide-up stagger-1">
              {t("about.valuesSubtitle") || "The principles that guide us"}
            </p>
          </div>

          <div className="relative">
            {values.map((value, index) => {
              const Icon = value.icon;

              return (
                <div
                  key={index}
                  className="sticky mb-8 lg:mb-12"
                  style={{
                    top: `${120 + index * 20}px`,
                    zIndex: index + 1,
                  }}
                >
                  <div className="group rounded-lg bg-gradient-to-br from-primary-50 via-white to-neutral-50 border border-neutral-100 overflow-hidden">
                    <div className="grid md:grid-cols-2 gap-0 items-center">
                      {/* Contenido de texto - SIEMPRE A LA IZQUIERDA */}
                      <div className="p-8 lg:p-12">
                        <div className="w-16 h-16 bg-gradient-to-br from-primary-100 to-primary-50 rounded-2xl flex items-center justify-center mb-6 transform transition-transform duration-300 group-hover:scale-110">
                          <Icon className="w-8 h-8 text-primary-600" />
                        </div>
                        <h3 className="text-2xl lg:text-3xl font-bold text-neutral-900 mb-4">
                          {value.title}
                        </h3>
                        <p className="text-lg text-neutral-600 leading-relaxed">
                          {value.description}
                        </p>
                      </div>

                      {/* Imagen - SIEMPRE A LA DERECHA */}
                      <div className="relative h-64 md:h-full min-h-[320px] overflow-hidden">
                        <img
                          src={value.image}
                          alt={value.title}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent"></div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Team Section - Improved Cards */}
      <section className="section-padding bg-gradient-to-br bg-neutral-50 ">
        <div className="section-container">
          <div className="text-center mb-16">
            <h2 className="heading-lg mb-4 slide-up">
              {t("about.teamTitle1")}
              <span className="text-primary-600">{t("about.teamTitle2")}</span>
            </h2>
            <p className="text-xl text-neutral-600 slide-up stagger-1">
              {t("about.teamSubtitle") || "Meet the people behind our success"}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-5xl mx-auto">
            {team.map((member, index) => (
              <div
                key={member.name}
                className={`group relative bg-white rounded-2xl overflow-hidden shadow-lg transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 slide-up stagger-${
                  index + 1
                }`}
              >
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-80 object-cover object-top grayscale transition-all duration-700 ease-out group-hover:grayscale-0 group-hover:scale-105"
                />

                <div className="p-6 text-center">
                  <h3 className="text-xl font-semibold text-neutral-900 mb-1">
                    {member.name}
                  </h3>
                  <p className="text-primary-600 font-medium mb-4">
                    {member.role}
                  </p>
                  <p className="text-neutral-600 leading-relaxed mb-6">
                    {member.bio}
                  </p>

                  <a
                    href={member.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary-100 text-primary-600 hover:bg-primary-600 hover:text-white transition-colors duration-300"
                    aria-label="LinkedIn"
                  >
                    <Linkedin className="w-6 h-6" />
                  </a>
                </div>
                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-1 bg-gradient-to-r from-primary-500 to-primary-600 rounded-full transition-all duration-300 group-hover:w-20"></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};
