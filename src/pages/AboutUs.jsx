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
      title: t("about.value1Title"),
      description: t("about.value1Text"),
      image: "images/company/Assistance.webp",
    },
    {
      icon: Handshake,
      title: t("about.value2Title"),
      description: t("about.value2Text"),
      image: "images/company/Trust.webp",
    },
    {
      icon: Star,
      title: t("about.value3Title"),
      description: t("about.value3Text"),
      image: "images/company/Excellence.webp",
    },
    {
      icon: ShieldPlus,
      title: t("about.value4Title"),
      description: t("about.value4Text"),
      image: "images/company/Professionalism.webp",
    },
  ];

  const team = [
    {
      name: t("about.gabriela.name"),
      role: t("about.gabriela.role"),
      bio: t("about.gabriela.bio"),
      image:
        "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop&q=80",
      linkedin: "https://www.linkedin.com/in/gabriela-albertini/",
    },
    {
      name: t("about.pablo.name"),
      role: t("about.pablo.role"),
      bio: t("about.pablo.bio"),
      image:
        "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=400&fit=crop&q=80",
      linkedin: "https://www.linkedin.com/in/pablo-teijeiro-55a483191/",
    },
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
        backgroundImage="/images/company/Company.webp"
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
                src="/images/company/Mission.webp"
                alt="Our Story"
                className="relative rounded-2xl shadow-2xl"
                loading="lazy"
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
                  className="sticky mb-8"
                  style={{
                    top: `${80 + index * 32}px`,
                    zIndex: index + 1, // ✅ CORREGIDO
                  }}
                >
                  <div className="group relative rounded-3xl transition-all duration-300 border bg-white min-h-[400px] md:min-h-[320px] overflow-hidden">
                    <div className="flex flex-col md:flex-row items-stretch h-full">
                      {/* Contenido de texto */}
                      <div className="flex-1 p-8 md:p-12 lg:p-16 flex flex-col justify-center">
                        <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold text-neutral-900 mb-4 leading-tight">
                          {value.title}
                        </h3>

                        <div className="w-20 h-1.5 bg-primary-600 rounded-full mb-6"></div>

                        <p className="text-lg md:text-xl text-neutral-600 leading-relaxed max-w-xl">
                          {value.description}
                        </p>
                      </div>

                      {/* Icono grande */}
                      <div className="flex-shrink-0 flex items-center justify-center p-8 md:p-12  md:min-w-[280px]">
                        <div className="w-32 h-32 md:w-40 md:h-40 lg:w-48 lg:h-48 rounded-3xl bg-white flex items-center justify-center transform transition-all duration-500">
                          <Icon
                            className="w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 text-primary-600"
                            strokeWidth={1.5}
                          />
                        </div>
                      </div>
                    </div>

                    {/* Número decorativo */}
                    {/* <div className="absolute top-6 right-6 md:top-8 md:right-8 text-7xl md:text-8xl lg:text-9xl font-bold text-neutral-100 leading-none">
                      0{index + 1}
                    </div> */}
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
                {/* <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-80 object-cover object-top grayscale transition-all duration-700 ease-out group-hover:grayscale-0 group-hover:scale-105"
                  loading="lazy"
                /> */}

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
