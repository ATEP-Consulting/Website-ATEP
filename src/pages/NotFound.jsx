import { Link } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext";
import { SEO } from "../components/SEO";
import { Btn } from "../components/Btn";

// 404 real, rediseño 2026.
//
// Mantiene el `noindex`: una ruta desconocida no debe indexarse. Antes de
// septiembre de 2026 esto devolvía un 200 y generaba soft-404 masivos.

export const NotFound = () => {
  const { t, language } = useLanguage();

  const enlaces = [
    { to: "/", label: t("404.homeLink"), desc: t("404.homeDesc") },
    { to: "/services", label: t("404.servicesLink"), desc: t("404.servicesDesc") },
    { to: "/blog", label: t("404.blogLink"), desc: t("404.blogDesc") },
  ];

  return (
    <>
      <SEO
        title="Página No Encontrada - Error 404"
        description="La página que buscas no existe o ha sido movida. Vuelve a la página principal de ATEP Consulting."
        keywords="error 404, página no encontrada"
        schemaType="WebPage"
      />

      <section className="rd-hero rd-hero--legal">
        <div className="rd-hero-body">
          <div className="rd-hero-copy">
            <div className="rd-eyebrow">
              <i aria-hidden="true" />
              404
            </div>
            <h1 className="rd-h1">{t("404.message")}</h1>
            <div className="rd-ctas">
              <Btn as={Link} to="/">
                {t("404.homeLink")}
              </Btn>
              <Btn as={Link} to="/contact" tone="ghost">
                {t("nav.contact")}
              </Btn>
            </div>
          </div>
        </div>
      </section>

      <section className="rd-sec">
        <div className="rd-index" data-stagger>
          {enlaces.map((e, i) => (
            <Link key={e.to} className="rd-index-item" to={e.to}>
              <span className="rd-index-item-n">{String(i + 1).padStart(2, "0")}</span>
              <span className="rd-index-item-name">{e.label}</span>
              <span className="rd-index-item-desc">{e.desc}</span>
              <span />
              <span className="rd-index-item-go" aria-hidden="true">
                →
              </span>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
};
