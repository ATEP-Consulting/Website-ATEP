import { Link } from "react-router-dom";
import { Instagram, Linkedin, Mail } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
import { getServicesData } from "../data/servicesData";
import { cases as casesData } from "../data/casesData";

// Pie del rediseño 2026.
//
// Mismos enlaces y mismos datos de contacto que la versión anterior: sólo
// cambia la piel. El cierre es el logotipo gigante en contorno con la placa
// del logo por delante.

export const Footer = () => {
  const { t, language } = useLanguage();
  const services = getServicesData(t);
  const featuredCases = casesData.slice(0, 4);

  const columnas = [
    {
      title: t("nav.services"),
      links: [
        ...services.slice(0, 4).map((s) => ({ label: s.name, to: s.path })),
        { label: t("megaNav.viewAllServices"), to: "/services" },
      ],
    },
    {
      title: t("nav.cases"),
      links: [
        ...featuredCases.map((c) => ({
          label: c.client[language].split("·")[0].trim(),
          to: `/cases/${c.slug}`,
        })),
        { label: t("megaNav.viewAllCases"), to: "/cases" },
      ],
    },
    {
      title: t("megaNav.aboutTitle"),
      links: [
        { label: t("nav.about"), to: "/company" },
        { label: t("nav.blog"), to: "/blog" },
        { label: t("nav.contact"), to: "/contact" },
      ],
    },
    {
      title: t("legal.title"),
      links: [
        { label: t("privacy.title"), to: "/privacy-policy" },
        { label: t("cookies.title"), to: "/cookies-policy" },
        { label: t("legal.title"), to: "/legal-notice" },
      ],
    },
  ];

  return (
    <footer className="rd-footer">
      <div className="rd-footer-top" data-stagger>
        <div className="rd-footer-brand">
          <Link className="rd-brand" to="/">
            <img
              className="rd-brand-mark"
              src="/new-logo-atep.svg"
              alt=""
              aria-hidden="true"
              width={22}
              height={22}
            />
            ATEP CONSULTING
          </Link>
          <p className="rd-card-text">{t("footer.tagline")}</p>

          <div className="rd-foot-label">{t("nav.contact")}</div>
          <ul className="rd-footer-contact">
            <li>
              <a href="mailto:info@atepconsulting.com">info@atepconsulting.com</a>
            </li>
            <li>
              <a href="tel:+34647748705">+34 647 748 705</a>
            </li>
            <li>
              {language === "es"
                ? "Paterna · Valencia · España"
                : "Paterna · Valencia · Spain"}
            </li>
          </ul>
        </div>

        <div className="rd-footer-cols">
          {columnas.map((col) => (
            <div key={col.title}>
              <div className="rd-foot-label">{col.title}</div>
              <ul>
                {col.links.map((l) => (
                  <li key={l.to + l.label}>
                    <Link to={l.to}>{l.label}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Cierre: el logotipo gigante grabado en el fondo, con una estela
          granate saliendo de detrás. Sin placa: la ficha blanca partía la
          palabra por la mitad y competía con el propio logotipo. */}
      <div className="rd-wordmark" aria-hidden="true">
        <span className="rd-wordmark-text">ATEP CONSULTING</span>
      </div>

      <div className="rd-footer-bar">
        <div className="rd-socials">
          <a
            href="https://www.linkedin.com/company/atepconsulting"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
          >
            <Linkedin size={16} strokeWidth={1.8} />
          </a>
          <a
            href="https://www.instagram.com/atepconsulting"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
          >
            <Instagram size={16} strokeWidth={1.8} />
          </a>
          <a href="mailto:info@atepconsulting.com" aria-label="Email">
            <Mail size={16} strokeWidth={1.8} />
          </a>
        </div>
        <span>{t("footer.copyright")}</span>
        <span className="rd-status">
          <i aria-hidden="true" />
          {language === "es" ? "Valencia · España" : "Valencia · Spain"}
        </span>
      </div>
    </footer>
  );
};
