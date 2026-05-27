import { Link } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext";
import { SEO } from "../components/SEO";
import { Reveal } from "../components/Reveal";
import { tDisplay, tSerif, tEyebrow } from "../lib/typography";

export const NotFound = () => {
  const { t, language } = useLanguage();

  const quickLinks = [
    {
      title: t("404.homeLink") || (language === "es" ? "Inicio" : "Home"),
      description:
        t("404.homeDesc") ||
        (language === "es" ? "Volver al inicio" : "Back to homepage"),
      path: "/",
    },
    {
      title:
        t("404.servicesLink") || (language === "es" ? "Servicios" : "Services"),
      description:
        t("404.servicesDesc") ||
        (language === "es"
          ? "Explora nuestros servicios"
          : "Explore our services"),
      path: "/services",
    },
    {
      title: t("404.blogLink") || "Blog",
      description:
        t("404.blogDesc") ||
        (language === "es" ? "Lee nuestros artículos" : "Read our articles"),
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

      <section
        className="px-6 sm:px-10 lg:px-16 py-20 tm:py-32"
        style={{ background: "var(--bg)" }}
      >
        <Reveal y={16}>
          <div style={tEyebrow("var(--accent)")} className="mb-6">
            — Error 404
          </div>
        </Reveal>

        <Reveal y={28} delay={120} dur={1100}>
          <h1
            style={{
              ...tDisplay("clamp(56px, 12vw, 160px)", 500),
              color: "var(--ink)",
              margin: 0,
              lineHeight: 0.95,
            }}
          >
            {language === "es" ? (
              <>
                Página{" "}
                <em style={{ color: "var(--accent)" }}>no encontrada</em>.
              </>
            ) : (
              <>
                Page <em style={{ color: "var(--accent)" }}>not found</em>.
              </>
            )}
          </h1>
        </Reveal>

        <Reveal y={20} delay={320}>
          <p
            className="mt-6 tm:mt-10 italic"
            style={{
              ...tSerif("clamp(17px, 1.4vw, 20px)", 400),
              color: "var(--muted)",
              lineHeight: 1.5,
              maxWidth: 600,
            }}
          >
            {t("404.message") ||
              (language === "es"
                ? "La página que buscas no existe o ha sido movida. Probablemente sea un enlace antiguo o un error de tipeo."
                : "The page you're looking for doesn't exist. It might have been moved or deleted.")}
          </p>
        </Reveal>

        <Reveal y={16} delay={480}>
          <div className="mt-8 tm:mt-12">
            <Link
              to="/"
              className="inline-block px-6 py-[14px] text-[13.5px] font-medium tracking-[0.02em] no-underline transition-all duration-150 hover:-translate-y-[1px]"
              style={{ background: "var(--navy)", color: "var(--bg)" }}
            >
              ← {t("404.backHome") || (language === "es" ? "Volver al inicio" : "Back to home")}
            </Link>
          </div>
        </Reveal>

        <Reveal y={20} delay={640}>
          <div
            className="mt-16 tm:mt-24 pt-8"
            style={{ borderTop: "1px solid var(--rule)" }}
          >
            <div style={tEyebrow("var(--muted)")} className="mb-6">
              — {t("404.quickLinks") || (language === "es" ? "Atajos" : "Quick links")}
            </div>
            <div className="grid grid-cols-1 tm:grid-cols-3 gap-px">
              {quickLinks.map((l, idx) => (
                <Link
                  key={l.path}
                  to={l.path}
                  className="block no-underline p-6 transition-colors duration-150"
                  style={{
                    color: "inherit",
                    background: "var(--bg-panel)",
                    borderTop: "1px solid var(--navy)",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.background = "var(--bg-surface)")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.background = "var(--bg-panel)")
                  }
                >
                  <div style={tEyebrow("var(--accent)")} className="mb-3">
                    {String(idx + 1).padStart(2, "0")}
                  </div>
                  <h3
                    style={{
                      ...tDisplay("clamp(20px, 2vw, 24px)", 500),
                      color: "var(--ink)",
                      margin: "0 0 6px",
                    }}
                  >
                    {l.title}
                  </h3>
                  <p
                    className="m-0"
                    style={{
                      fontSize: 13.5,
                      color: "var(--muted)",
                      lineHeight: 1.5,
                    }}
                  >
                    {l.description}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </Reveal>
      </section>
    </>
  );
};
