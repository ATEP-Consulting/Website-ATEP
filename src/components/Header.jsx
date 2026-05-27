import { useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, X, ChevronDown } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { ThemeToggle } from "./ThemeToggle";
import { getServicesData } from "../data/servicesData";
import { tDisplay, tSerif, tEyebrow, FONT } from "../lib/typography";
import logo from "../assets/logos/new-logo-atep.svg";

const useMediaQuery = (query) => {
  const get = () =>
    typeof window !== "undefined" && window.matchMedia
      ? window.matchMedia(query).matches
      : false;
  const [matches, setMatches] = useState(get);
  useEffect(() => {
    if (!window.matchMedia) return;
    const m = window.matchMedia(query);
    const h = () => setMatches(m.matches);
    h();
    m.addEventListener?.("change", h) ?? m.addListener(h);
    return () => {
      m.removeEventListener?.("change", h) ?? m.removeListener(h);
    };
  }, [query]);
  return matches;
};

const Logo = () => (
  <Link
    to="/"
    className="flex items-center gap-3 no-underline focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
    style={{ color: "var(--ink)" }}
  >
    <img
      src={logo}
      alt="ATEP Consulting"
      className="h-9 w-9 object-contain"
    />
    <span style={tSerif(20, 500)} className="leading-none">
      ATEP{" "}
      <span style={{ color: "var(--muted)", fontStyle: "italic" }}>
        Consulting
      </span>
    </span>
  </Link>
);

const CtaButton = ({ to, children, primary = false }) => {
  if (primary) {
    return (
      <Link
        to={to}
        className="px-6 py-[14px] text-[13.5px] font-medium tracking-[0.02em] inline-block whitespace-nowrap no-underline transition-all duration-150 hover:-translate-y-[1px]"
        style={{ background: "var(--navy)", color: "var(--bg)" }}
      >
        {children}
      </Link>
    );
  }
  return (
    <Link
      to={to}
      className="px-6 py-[14px] text-[13.5px] font-medium tracking-[0.02em] inline-block whitespace-nowrap no-underline transition-colors duration-150"
      style={{
        background: "transparent",
        color: "var(--ink)",
        border: "1px solid var(--ink)",
      }}
    >
      {children}
    </Link>
  );
};

const DesktopHeader = () => {
  const { t, language } = useLanguage();
  const location = useLocation();
  const navigate = useNavigate();
  const services = getServicesData(t);
  const [megaOpen, setMegaOpen] = useState(false);
  const closeTimer = useRef(null);

  const openMega = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setMegaOpen(true);
  };
  const scheduleCloseMega = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setMegaOpen(false), 220);
  };
  const closeMega = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setMegaOpen(false);
  };

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") closeMega();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    closeMega();
  }, [location.pathname]);

  const items = [
    { key: "home", path: "/", label: t("nav.home") },
    { key: "services", path: "/services", label: t("nav.services"), mega: true },
    { key: "about", path: "/company", label: t("nav.about") },
    { key: "blog", path: "/blog", label: t("nav.blog") },
    { key: "contact", path: "/contact", label: t("nav.contact") },
  ];

  const isActive = (path) => {
    if (path === "/") return location.pathname === "/";
    return location.pathname.startsWith(path);
  };

  return (
    <header
      className="sticky top-0 z-30 px-16 py-[22px] flex items-center justify-between"
      style={{
        background: "var(--bg)",
        borderBottom: "1px solid var(--rule)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
      }}
    >
      <Logo />

      <nav className="flex items-center gap-8">
        {items.map((it) => {
          const active = isActive(it.path);
          if (it.mega) {
            return (
              <div
                key={it.key}
                onMouseEnter={openMega}
                onMouseLeave={scheduleCloseMega}
                className="relative"
              >
                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    closeMega();
                    navigate(it.path);
                  }}
                  onFocus={openMega}
                  className="text-[13.5px] cursor-pointer pb-[3px] flex items-center gap-[6px] transition-all duration-150 bg-transparent border-none focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
                  style={{
                    color: active || megaOpen ? "var(--ink)" : "var(--muted)",
                    fontWeight: active || megaOpen ? 500 : 400,
                    fontFamily: "inherit",
                    borderBottom:
                      active || megaOpen
                        ? "1px solid var(--ink)"
                        : "1px solid transparent",
                  }}
                >
                  {it.label}
                  <ChevronDown
                    size={12}
                    className="transition-transform duration-200"
                    style={{ transform: megaOpen ? "rotate(180deg)" : "rotate(0)" }}
                  />
                </button>
              </div>
            );
          }
          return (
            <Link
              key={it.key}
              to={it.path}
              onMouseEnter={megaOpen ? scheduleCloseMega : undefined}
              className="text-[13.5px] cursor-pointer pb-[3px] no-underline transition-all duration-150"
              style={{
                color: active ? "var(--ink)" : "var(--muted)",
                fontWeight: active ? 500 : 400,
                borderBottom: active
                  ? "1px solid var(--ink)"
                  : "1px solid transparent",
              }}
            >
              {it.label}
            </Link>
          );
        })}
      </nav>

      <div className="flex items-center gap-3">
        <ThemeToggle />
        <LanguageSwitcher />
        <CtaButton to="/contact" primary>
          {language === "es" ? "Agendar llamada" : "Schedule a call"} →
        </CtaButton>
      </div>

      <MegaServices
        open={megaOpen}
        services={services}
        onMouseEnter={openMega}
        onMouseLeave={scheduleCloseMega}
        onNavigate={closeMega}
      />
    </header>
  );
};

const MegaServices = ({ open, services, onMouseEnter, onMouseLeave, onNavigate }) => {
  const { t, language } = useLanguage();
  return (
    <div
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      aria-hidden={!open}
      className="absolute top-full left-0 right-0 px-16 pt-12 pb-9"
      style={{
        background: "var(--bg)",
        borderBottom: "1px solid var(--rule)",
        boxShadow: open
          ? "0 24px 64px -24px rgba(10,22,38,0.18)"
          : "none",
        opacity: open ? 1 : 0,
        transform: open ? "translateY(0)" : "translateY(-8px)",
        pointerEvents: open ? "auto" : "none",
        visibility: open ? "visible" : "hidden",
        transition: `opacity .22s ease, transform .22s ease, visibility 0s linear ${
          open ? "0s" : ".22s"
        }`,
      }}
    >
      <div className="grid gap-14" style={{ gridTemplateColumns: "2.2fr 1fr" }}>
        {/* Services grid */}
        <div>
          <div
            className="flex justify-between items-baseline mb-7 pb-3"
            style={{ borderBottom: "1px solid var(--rule)" }}
          >
            <div style={tEyebrow("var(--muted)")}>
              — {language === "es" ? "Nuestros servicios" : "Our services"}
            </div>
            <div style={{ ...tEyebrow("var(--dim)"), fontSize: 10 }}>
              {language === "es"
                ? `${services.length} prácticas`
                : `${services.length} practices`}
            </div>
          </div>
          <div className="grid grid-cols-3 gap-x-8 gap-y-7">
            {services.map((s, idx) => (
              <Link
                key={s.id}
                to={s.path}
                onClick={onNavigate}
                className="block no-underline pt-3 px-3 pb-3 group transition-colors duration-150"
                style={{
                  color: "inherit",
                  borderTop: "1px solid var(--rule)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderTopColor = "var(--accent)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderTopColor = "var(--rule)";
                }}
              >
                <div className="flex items-baseline justify-between mb-[6px]">
                  <span
                    style={{
                      ...tEyebrow("var(--accent)"),
                      fontSize: 10,
                    }}
                  >
                    {String(idx + 1).padStart(2, "0")}
                  </span>
                  <span
                    style={{
                      ...tEyebrow("var(--muted)"),
                      fontSize: 11,
                    }}
                    className="transition-transform duration-200 group-hover:translate-x-1"
                  >
                    →
                  </span>
                </div>
                <h3
                  style={{ ...tSerif(20, 500), color: "var(--ink)", margin: "0 0 6px" }}
                >
                  {s.name}
                </h3>
                <p
                  className="m-0 mb-[10px] leading-[1.45]"
                  style={{ fontSize: 13, color: "var(--muted)" }}
                >
                  {s.description}
                </p>
                <div
                  style={{
                    fontFamily: FONT.mono,
                    fontSize: 10.5,
                    color: "var(--dim)",
                    letterSpacing: "0.02em",
                  }}
                >
                  {s.badge}
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Help block */}
        <div className="pl-10" style={{ borderLeft: "1px solid var(--rule)" }}>
          <div
            className="flex justify-between items-baseline mb-5 pb-3"
            style={{ borderBottom: "1px solid var(--rule)" }}
          >
            <div style={tEyebrow("var(--muted)")}>
              — {language === "es" ? "¿Necesitas ayuda?" : "Need help?"}
            </div>
          </div>
          <h3
            style={{ ...tSerif(22, 500), color: "var(--ink)", margin: "0 0 12px", lineHeight: 1.2 }}
          >
            {language === "es"
              ? "Hablemos de tu proyecto"
              : "Let's talk about your project"}
          </h3>
          <p
            className="m-0 mb-5 leading-[1.55]"
            style={{ fontSize: 13.5, color: "var(--muted)" }}
          >
            {language === "es"
              ? "Te asesoramos sin compromiso sobre el servicio que mejor se adapta a ti. Equipo técnico disponible en 48h."
              : "Free consultation on the service that fits you best. Technical team available within 48h."}
          </p>
          <Link
            to="/contact"
            onClick={onNavigate}
            className="inline-block px-[18px] py-[10px] text-[13px] no-underline whitespace-nowrap transition-all duration-150 hover:-translate-y-[1px]"
            style={{ background: "var(--navy)", color: "var(--bg)" }}
          >
            {t("CTA.primaryButton") || (language === "es" ? "Contactar ahora" : "Get in touch")} →
          </Link>
        </div>
      </div>

      {/* Bottom strip */}
      <div
        className="mt-9 pt-5 flex justify-between items-center flex-wrap gap-4"
        style={{ borderTop: "1px solid var(--rule)" }}
      >
        <div style={{ ...tEyebrow("var(--muted)"), fontSize: 10.5 }}>
          {language === "es"
            ? "— ¿No sabes qué necesitas?"
            : "— Not sure what you need?"}
        </div>
        <div className="flex gap-4 items-center">
          <Link
            to="/services"
            onClick={onNavigate}
            className="text-[13.5px] no-underline whitespace-nowrap"
            style={{
              color: "var(--ink)",
              textDecoration: "underline",
              textUnderlineOffset: 4,
            }}
          >
            {t("services.viewAll") || (language === "es" ? "Ver todos los servicios" : "View all services")} →
          </Link>
        </div>
      </div>
    </div>
  );
};

const MobileHeader = () => {
  const { t, language } = useLanguage();
  const location = useLocation();
  const navigate = useNavigate();
  const services = getServicesData(t);
  const [open, setOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  useEffect(() => {
    setOpen(false);
    setServicesOpen(false);
  }, [location.pathname]);

  const items = [
    { key: "home", path: "/", label: t("nav.home") },
    { key: "services", path: "/services", label: t("nav.services"), expandable: true },
    { key: "about", path: "/company", label: t("nav.about") },
    { key: "blog", path: "/blog", label: t("nav.blog") },
    { key: "contact", path: "/contact", label: t("nav.contact") },
  ];

  const isActive = (path) => {
    if (path === "/") return location.pathname === "/";
    return location.pathname.startsWith(path);
  };

  return (
    <>
      <header
        className="sticky top-0 z-30 px-5 py-4 flex items-center justify-between"
        style={{
          background: "var(--bg)",
          borderBottom: "1px solid var(--rule)",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
        }}
      >
        <Logo />
        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          aria-label={
            open
              ? language === "es"
                ? "Cerrar menú"
                : "Close menu"
              : language === "es"
              ? "Abrir menú"
              : "Open menu"
          }
          aria-expanded={open}
          className="w-11 h-11 flex items-center justify-center bg-transparent cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
          style={{ color: "var(--ink)", border: "1px solid var(--rule-strong)" }}
        >
          {open ? <X size={18} /> : <Menu size={20} />}
        </button>
      </header>

      <div
        aria-hidden={!open}
        className="fixed inset-0 z-20 flex flex-col overflow-y-auto"
        style={{
          background: "var(--bg)",
          opacity: open ? 1 : 0,
          pointerEvents: open ? "auto" : "none",
          transform: open ? "translateY(0)" : "translateY(-12px)",
          transition: "opacity .25s ease, transform .25s ease",
          paddingTop: 76,
        }}
      >
        <nav className="px-6 pt-8 pb-6 flex-1">
          {items.map((it) => {
            const active = isActive(it.path);
            if (it.expandable) {
              return (
                <div key={it.key} style={{ borderTop: "1px solid var(--rule)" }}>
                  <button
                    type="button"
                    onClick={() => setServicesOpen((s) => !s)}
                    className="flex w-full justify-between items-center py-5 min-h-14 cursor-pointer bg-transparent border-none"
                  >
                    <span
                      style={{
                        ...tDisplay(40, 500),
                        color: active ? "var(--accent)" : "var(--ink)",
                        fontStyle: active ? "italic" : "normal",
                      }}
                    >
                      {it.label}
                    </span>
                    <ChevronDown
                      size={20}
                      style={{
                        color: "var(--muted)",
                        transform: servicesOpen ? "rotate(180deg)" : "rotate(0)",
                        transition: "transform .2s",
                      }}
                    />
                  </button>
                  <div
                    className="overflow-hidden transition-[max-height] duration-300"
                    style={{ maxHeight: servicesOpen ? 600 : 0 }}
                  >
                    <div className="pb-4">
                      {services.map((s, idx) => (
                        <Link
                          key={s.id}
                          to={s.path}
                          className="flex items-baseline gap-[14px] py-3 no-underline"
                          style={{
                            color: "var(--ink)",
                            borderTop: "1px solid var(--rule)",
                          }}
                        >
                          <span
                            style={{
                              ...tEyebrow("var(--accent)"),
                              fontSize: 10,
                              minWidth: 24,
                            }}
                          >
                            {String(idx + 1).padStart(2, "0")}
                          </span>
                          <span style={{ ...tSerif(18, 400), color: "var(--ink-soft)" }}>
                            {s.name}
                          </span>
                        </Link>
                      ))}
                      <Link
                        to="/services"
                        className="block mt-3 pt-3 no-underline"
                        style={{ borderTop: "1px solid var(--rule)" }}
                      >
                        <span style={{ ...tEyebrow("var(--muted)"), fontSize: 11 }}>
                          {t("services.viewAll") ||
                            (language === "es"
                              ? "Ver todos los servicios"
                              : "View all services")}{" "}
                          →
                        </span>
                      </Link>
                    </div>
                  </div>
                </div>
              );
            }
            return (
              <Link
                key={it.key}
                to={it.path}
                className="block no-underline py-5 min-h-14"
                style={{
                  ...tDisplay(40, 500),
                  color: active ? "var(--accent)" : "var(--ink)",
                  fontStyle: active ? "italic" : "normal",
                  borderTop: "1px solid var(--rule)",
                }}
              >
                {it.label}
              </Link>
            );
          })}
          <div style={{ borderTop: "1px solid var(--rule)", marginTop: -1 }} />
        </nav>

        <div
          className="px-6 pt-6 pb-10"
          style={{
            borderTop: "1px solid var(--rule)",
            background: "var(--bg-surface)",
          }}
        >
          <div className="flex gap-3 items-center mb-6">
            <ThemeToggle />
            <LanguageSwitcher />
          </div>
          <Link
            to="/contact"
            onClick={() => setOpen(false)}
            className="block text-center px-6 py-[18px] text-[14px] font-medium tracking-[0.02em] no-underline"
            style={{ background: "var(--navy)", color: "var(--bg)" }}
          >
            {language === "es" ? "Agendar llamada" : "Schedule a call"} →
          </Link>
          <div
            className="mt-6 text-center"
            style={{ ...tEyebrow("var(--muted)"), fontSize: 10 }}
          >
            info@atepconsulting.com · +34 647 748 705
          </div>
        </div>
      </div>
    </>
  );
};

export const Header = () => {
  const isMobile = useMediaQuery("(max-width: 820px)");
  return isMobile ? <MobileHeader /> : <DesktopHeader />;
};
