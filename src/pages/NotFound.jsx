import { Link } from "react-router-dom";
import { Home, Search, ArrowLeft, FileQuestion } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
import { SEO } from "../components/SEO";

export const NotFound = () => {
  const { t } = useLanguage();

  const quickLinks = [
    {
      icon: Home,
      title: t("404.homeLink") || "Home",
      description: t("404.homeDesc") || "Back to homepage",
      path: "/",
    },
    {
      icon: Search,
      title: t("404.servicesLink") || "Services",
      description: t("404.servicesDesc") || "Explore our services",
      path: "/services",
    },
    {
      icon: FileQuestion,
      title: t("404.blogLink") || "Blog",
      description: t("404.blogDesc") || "Read our articles",
      path: "/blog",
    },
  ];

  return (
    <>
      <SEO
        title="Página No Encontrada - Error 404"
        description="La página que buscas no existe o ha sido movida. Vuelve a la página principal de ATEP Consulting."
        keywords="error 404, página no encontrada"
        schemaType="WebPage"
      />

      <section className="relative min-h-[calc(100vh-80px)] flex items-center overflow-hidden bg-gradient-to-br from-primary-50 via-white to-neutral-50">
        {/* Elementos decorativos de fondo */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div
            className="absolute w-96 h-96 bg-primary-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30"
            style={{
              top: "5rem",
              right: "5rem",
              animation: "blob 7s infinite",
            }}
          ></div>
          <div
            className="absolute w-96 h-96 bg-primary-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30"
            style={{
              bottom: "5rem",
              left: "5rem",
              animation: "blob 7s infinite 2s",
            }}
          ></div>
        </div>

        {/* Grid pattern sutil */}
        <div
          className="absolute inset-0 opacity-5 pointer-events-none"
          style={{
            backgroundImage: `linear-gradient(rgba(0,0,0,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.05) 1px, transparent 1px)`,
            backgroundSize: "50px 50px",
          }}
        ></div>

        <div className="section-container relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            {/* 404 Grande */}
            <div className="mb-8 fade-in">
              <h1 className="text-9xl lg:text-[12rem] font-bold text-primary-600/20 leading-none select-none">
                404
              </h1>
              <div className="-mt-20 lg:-mt-32">
                <div className="inline-flex items-center justify-center w-24 h-24 lg:w-32 lg:h-32 bg-white rounded-full shadow-xl border-4 border-primary-100">
                  <FileQuestion className="w-12 h-12 lg:w-16 lg:h-16 text-primary-600" />
                </div>
              </div>
            </div>

            {/* Título y descripción */}
            <div className="mb-12 fade-in stagger-1">
              <h2 className="text-3xl lg:text-4xl font-bold text-neutral-900 mb-4">
                {t("404.heading") || "Page Not Found"}
              </h2>
              <p className="text-xl text-neutral-600 max-w-2xl mx-auto leading-relaxed">
                {t("404.message") ||
                  "Oops! The page you're looking for doesn't exist. It might have been moved or deleted."}
              </p>
            </div>

            {/* Botón principal */}
            <div className="mb-16 fade-in stagger-2 flex justify-center items-center">
              <Link
                to="/"
                className="btn-primary flex gap-2 items-center justify-center"
              >
                <ArrowLeft className="w-5 h-5" />
                {t("404.backHome") || "Back to Home"}
              </Link>
            </div>

            {/* Quick Links */}
            <div className="fade-in stagger-3">
              <p className="text-sm font-semibold text-neutral-500 uppercase tracking-wider mb-6">
                {t("404.quickLinks") || "Quick Links"}
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
                {quickLinks.map((link, index) => {
                  const Icon = link.icon;
                  return (
                    <Link
                      key={link.path}
                      to={link.path}
                      className="group p-6 bg-white rounded-xl border-2 border-neutral-100 transition-all duration-300"
                    >
                      <div className="w-12 h-12 bg-gradient-to-br from-primary-100 to-primary-50 rounded-xl flex items-center justify-center mx-auto mb-4 transform transition-transform duration-300 group-hover:scale-110">
                        <Icon className="w-6 h-6 text-primary-600" />
                      </div>
                      <h3 className="font-bold text-neutral-900 mb-1">
                        {link.title}
                      </h3>
                      <p className="text-sm text-neutral-600">
                        {link.description}
                      </p>
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
