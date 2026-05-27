import { Link } from "react-router-dom";
import { Linkedin, Instagram } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
import { useTheme } from "../context/ThemeContext";
import { getServicesData } from "../data/servicesData";
import { tDisplay, tEyebrow } from "../lib/typography";
import CTA from "./CTA";

const LinkRow = ({ to, href, external = false, children, onNavy }) => {
  const color = onNavy ? "rgba(245,241,232,0.85)" : "var(--ink-soft)";
  const hover = "var(--accent)";
  const baseStyle = {
    color,
    textDecoration: "none",
    transition: "color .15s",
    fontSize: 14,
  };
  const handlers = {
    onMouseEnter: (e) => (e.currentTarget.style.color = hover),
    onMouseLeave: (e) => (e.currentTarget.style.color = color),
  };
  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" style={baseStyle} {...handlers}>
        {children}
      </a>
    );
  }
  if (to) {
    return (
      <Link to={to} style={baseStyle} {...handlers}>
        {children}
      </Link>
    );
  }
  return (
    <span style={{ ...baseStyle, cursor: "default" }}>{children}</span>
  );
};

export const Footer = () => {
  const { t, language } = useLanguage();
  const { theme } = useTheme();
  const services = getServicesData(t);
  const isDark = theme === "dark";

  // Light theme → navy bg, cream text. Dark theme → bg-surface, ink text.
  const onNavy = !isDark;
  const footerBg = isDark ? "var(--bg-surface)" : "var(--navy)";
  const footerInk = isDark ? "var(--ink)" : "rgba(245,241,232,0.92)";
  const ruleColor = isDark ? "var(--rule)" : "rgba(245,241,232,0.18)";
  const eyebrowColor = isDark
    ? "var(--muted)"
    : "rgba(245,241,232,0.55)";
  const dimColor = isDark
    ? "var(--dim)"
    : "rgba(245,241,232,0.55)";

  const companyLinks = [
    { path: "/company", label: t("nav.about") },
    { path: "/cases", label: t("nav.cases") },
    { path: "/blog", label: t("nav.blog") },
    { path: "/contact", label: t("nav.contact") },
  ];

  const legalLinks = [
    { path: "/privacy-policy", label: t("privacy.title") },
    { path: "/cookies-policy", label: t("cookies.title") },
    { path: "/legal-notice", label: t("legal.title") },
  ];

  return (
    <>
      <CTA
        badge={t("CTA.badge")}
        title={t("CTA.title")}
        subtitle={t("CTA.subtitle")}
        primaryButton={{ text: t("CTA.primaryButton"), to: "/contact" }}
        secondaryButton={{ text: t("CTA.secondaryButton"), to: "/services" }}
        trustIndicators={[
          t("CTA.trust1"),
          t("CTA.trust2"),
          t("CTA.trust3"),
        ].filter(Boolean)}
      />

      <footer
        className="px-6 sm:px-10 lg:px-16 pt-20 pb-9"
        style={{ background: footerBg, color: footerInk }}
      >
       <div className="max-w-[1600px] mx-auto w-full">
        <div
          className="grid gap-10 tm:gap-14 pb-14"
          style={{
            gridTemplateColumns: "1fr",
            borderBottom: `1px solid ${ruleColor}`,
          }}
        >
          <div className="grid grid-cols-1 tm:grid-cols-4 gap-10 tm:gap-14">
            <div className="tm:col-span-2">
              <div
                style={{
                  ...tDisplay("clamp(28px, 4vw, 44px)", 500),
                  color: footerInk,
                  maxWidth: 420,
                }}
              >
                {language === "es" ? (
                  <>
                    Construimos
                    <br />
                    el software{" "}
                    <em style={{ color: "var(--accent)" }}>
                      que sostiene tu negocio.
                    </em>
                  </>
                ) : (
                  <>
                    We build
                    <br />
                    the software{" "}
                    <em style={{ color: "var(--accent)" }}>
                      that runs your business.
                    </em>
                  </>
                )}
              </div>
              <div
                style={{ ...tEyebrow(eyebrowColor), color: eyebrowColor, marginTop: 24 }}
              >
                ATEP Consulting · {language === "es" ? "desde 2023" : "since 2023"}
              </div>

              <div className="mt-8 flex gap-3">
                <a
                  href="https://www.linkedin.com/company/atepconsulting"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                  className="w-10 h-10 flex items-center justify-center transition-colors duration-150"
                  style={{
                    border: `1px solid ${ruleColor}`,
                    color: footerInk,
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = "var(--accent)";
                    e.currentTarget.style.borderColor = "var(--accent)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "transparent";
                    e.currentTarget.style.borderColor = ruleColor;
                  }}
                >
                  <Linkedin size={16} />
                </a>
                <a
                  href="https://www.instagram.com/atepconsulting"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="w-10 h-10 flex items-center justify-center transition-colors duration-150"
                  style={{
                    border: `1px solid ${ruleColor}`,
                    color: footerInk,
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = "var(--accent)";
                    e.currentTarget.style.borderColor = "var(--accent)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "transparent";
                    e.currentTarget.style.borderColor = ruleColor;
                  }}
                >
                  <Instagram size={16} />
                </a>
              </div>
            </div>

            <div>
              <div
                style={{ ...tEyebrow(eyebrowColor), color: eyebrowColor, marginBottom: 18 }}
              >
                {t("nav.services")}
              </div>
              <div className="flex flex-col gap-[10px]">
                {services.map((s) => (
                  <LinkRow key={s.id} to={s.path} onNavy={onNavy}>
                    {s.name}
                  </LinkRow>
                ))}
                <LinkRow to="/services" onNavy={onNavy}>
                  {t("services.viewAll") || (language === "es" ? "Ver todos" : "View all")} →
                </LinkRow>
              </div>
            </div>

            <div className="flex flex-col gap-10">
              <div>
                <div
                  style={{ ...tEyebrow(eyebrowColor), color: eyebrowColor, marginBottom: 18 }}
                >
                  {language === "es" ? "Empresa" : "Company"}
                </div>
                <div className="flex flex-col gap-[10px]">
                  {companyLinks.map((l) => (
                    <LinkRow key={l.path} to={l.path} onNavy={onNavy}>
                      {l.label}
                    </LinkRow>
                  ))}
                </div>
              </div>

              <div>
                <div
                  style={{ ...tEyebrow(eyebrowColor), color: eyebrowColor, marginBottom: 18 }}
                >
                  {t("nav.contact")}
                </div>
                <div className="flex flex-col gap-[10px]">
                  <LinkRow href="mailto:info@atepconsulting.com" external onNavy={onNavy}>
                    info@atepconsulting.com
                  </LinkRow>
                  <LinkRow href="tel:+34647748705" external onNavy={onNavy}>
                    +34 647 748 705
                  </LinkRow>
                  <LinkRow onNavy={onNavy}>
                    {language === "es"
                      ? "Paterna · Valencia · España"
                      : "Paterna · Valencia · Spain"}
                  </LinkRow>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div
          className="pt-6 flex flex-col tm:flex-row justify-between gap-2 tm:gap-0"
          style={{ fontSize: 11.5, color: dimColor }}
        >
          <span>{t("footer.copyright")}</span>
          <div className="flex flex-wrap gap-x-4 gap-y-1">
            {legalLinks.map((l, i) => (
              <span key={l.path} className="inline-flex items-center gap-4">
                {i > 0 && <span aria-hidden>·</span>}
                <Link
                  to={l.path}
                  style={{ color: "inherit", textDecoration: "none" }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "var(--accent)")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "inherit")}
                >
                  {l.label}
                </Link>
              </span>
            ))}
          </div>
        </div>
       </div>
      </footer>
    </>
  );
};
