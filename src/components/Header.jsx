import { useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, X, ChevronDown } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { ThemeToggle } from "./ThemeToggle";
import { CaseStripe } from "./CaseStripe";
import { getServicesData } from "../data/servicesData";
import { cases as casesData } from "../data/casesData";
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

// Devuelve true cuando el scroll vertical supera el threshold (default 4px).
// Se usa para fusionar el header con el fondo cuando estás arriba del todo,
// y separar con borderBottom cuando empieza a haber contenido por debajo.
const useScrolled = (threshold = 4) => {
  const [scrolled, setScrolled] = useState(() =>
    typeof window !== "undefined" && window.scrollY > threshold,
  );
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > threshold);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [threshold]);
  return scrolled;
};

const NavDot = ({ active }) => (
  <span
    aria-hidden
    className={`absolute left-1/2 -translate-x-1/2 -bottom-[10px] w-[5px] h-[5px] rounded-full transition-opacity duration-200 ${
      active ? "opacity-100" : "opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100"
    }`}
    style={{ background: "var(--accent)" }}
  />
);

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
  const { t } = useLanguage();
  const location = useLocation();
  const navigate = useNavigate();
  const services = getServicesData(t);
  const [openMenu, setOpenMenu] = useState(null); // null | "services" | "cases"
  const closeTimer = useRef(null);
  const scrolled = useScrolled();

  const openMegaMenu = (key) => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setOpenMenu(key);
  };
  const scheduleCloseMega = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setOpenMenu(null), 220);
  };
  const closeMega = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setOpenMenu(null);
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
    { key: "services", path: "/services", label: t("nav.services"), mega: "services" },
    { key: "cases", path: "/cases", label: t("nav.cases"), mega: "cases" },
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
      className="sticky top-0 z-30 py-[22px]"
      style={{
        background: "var(--bg)",
        borderBottom: `1px solid ${scrolled ? "var(--rule)" : "transparent"}`,
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        transition: "border-color .2s ease",
      }}
    >
      <div className="max-w-[1600px] mx-auto w-full px-16 flex items-center justify-between">
      <Logo />

      <nav className="flex items-center gap-8">
        {items.map((it) => {
          const active = isActive(it.path);
          const isThisOpen = it.mega && openMenu === it.mega;
          if (it.mega) {
            return (
              <div
                key={it.key}
                onMouseEnter={() => openMegaMenu(it.mega)}
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
                  onFocus={() => openMegaMenu(it.mega)}
                  className="group relative text-[13.5px] cursor-pointer inline-flex items-center gap-[6px] transition-colors duration-150 bg-transparent border-none focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
                  style={{
                    color: active || isThisOpen ? "var(--ink)" : "var(--muted)",
                    fontWeight: active || isThisOpen ? 500 : 400,
                    fontFamily: "inherit",
                  }}
                  onMouseEnter={(e) => {
                    if (!active && !isThisOpen) e.currentTarget.style.color = "var(--ink)";
                  }}
                  onMouseLeave={(e) => {
                    if (!active && !isThisOpen) e.currentTarget.style.color = "var(--muted)";
                  }}
                >
                  {it.label}
                  <ChevronDown
                    size={12}
                    className="transition-transform duration-200"
                    style={{ transform: isThisOpen ? "rotate(180deg)" : "rotate(0)" }}
                  />
                  <NavDot active={active || isThisOpen} />
                </button>
              </div>
            );
          }
          return (
            <Link
              key={it.key}
              to={it.path}
              onMouseEnter={(e) => {
                if (openMenu) scheduleCloseMega();
                if (!active) e.currentTarget.style.color = "var(--ink)";
              }}
              onMouseLeave={(e) => {
                if (!active) e.currentTarget.style.color = "var(--muted)";
              }}
              className="group relative text-[13.5px] cursor-pointer no-underline transition-colors duration-150 inline-block"
              style={{
                color: active ? "var(--ink)" : "var(--muted)",
                fontWeight: active ? 500 : 400,
              }}
            >
              {it.label}
              <NavDot active={active} />
            </Link>
          );
        })}
      </nav>

      <div className="flex items-center gap-3">
        <ThemeToggle />
        <LanguageSwitcher />
        <CtaButton to="/contact" primary>
          {t("nav.scheduleCall")} →
        </CtaButton>
      </div>
      </div>

      <MegaServices
        open={openMenu === "services"}
        services={services}
        onMouseEnter={() => openMegaMenu("services")}
        onMouseLeave={scheduleCloseMega}
        onNavigate={closeMega}
      />
      <MegaCases
        open={openMenu === "cases"}
        cases={casesData}
        onMouseEnter={() => openMegaMenu("cases")}
        onMouseLeave={scheduleCloseMega}
        onNavigate={closeMega}
      />
    </header>
  );
};

const MegaServices = ({ open, services, onMouseEnter, onMouseLeave, onNavigate }) => {
  const { t, language } = useLanguage();
  const practicesLabel =
    language === "es"
      ? `${services.length} prácticas`
      : `${services.length} practices`;
  return (
    <div
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      aria-hidden={!open}
      className="absolute top-full left-0 right-0"
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
      <div className="max-w-[1600px] mx-auto w-full px-16 pt-12 pb-9">
      <div className="grid gap-14" style={{ gridTemplateColumns: "2.2fr 1fr" }}>
        {/* Services grid */}
        <div>
          <div
            className="flex justify-between items-baseline mb-7 pb-3"
            style={{ borderBottom: "1px solid var(--rule)" }}
          >
            <div style={tEyebrow("var(--muted)")}>
              — {t("mega.ourServices")}
            </div>
            <div style={{ ...tEyebrow("var(--dim)"), fontSize: 10 }}>
              {practicesLabel}
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
              — {t("mega.needHelp")}
            </div>
          </div>
          <h3
            style={{ ...tSerif(22, 500), color: "var(--ink)", margin: "0 0 12px", lineHeight: 1.2 }}
          >
            {t("mega.helpTitle")}
          </h3>
          <p
            className="m-0 mb-5 leading-[1.55]"
            style={{ fontSize: 13.5, color: "var(--muted)" }}
          >
            {t("mega.helpText")}
          </p>
          <Link
            to="/contact"
            onClick={onNavigate}
            className="inline-block px-[18px] py-[10px] text-[13px] no-underline whitespace-nowrap transition-all duration-150 hover:-translate-y-[1px]"
            style={{ background: "var(--navy)", color: "var(--bg)" }}
          >
            {t("mega.contactNow")} →
          </Link>
        </div>
      </div>

      {/* Bottom strip */}
      <div
        className="mt-9 pt-5 flex justify-between items-center flex-wrap gap-4"
        style={{ borderTop: "1px solid var(--rule)" }}
      >
        <div style={{ ...tEyebrow("var(--muted)"), fontSize: 10.5 }}>
          — {t("mega.notSure")}
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
            {t("services.viewAll") || t("mega.viewAllServices")} →
          </Link>
        </div>
      </div>
      </div>
    </div>
  );
};

const MegaCases = ({ open, cases, onMouseEnter, onMouseLeave, onNavigate }) => {
  const { t, language } = useLanguage();
  const sorted = [...cases].sort((a, b) => b.year - a.year);
  const featured = sorted[0];
  const list = sorted;
  const countLabel =
    language === "es"
      ? `${cases.length} ${t("mega.casesCount")}`
      : `${cases.length} ${t("mega.casesCount")}`;

  return (
    <div
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      aria-hidden={!open}
      className="absolute top-full left-0 right-0"
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
      <div className="max-w-[1600px] mx-auto w-full px-16 pt-12 pb-9">
        <div className="grid gap-14" style={{ gridTemplateColumns: "1.4fr 1.8fr" }}>
          {/* Featured case (left) */}
          <div>
            <div
              className="flex justify-between items-baseline mb-7 pb-3"
              style={{ borderBottom: "1px solid var(--rule)" }}
            >
              <div style={tEyebrow("var(--muted)")}>
                — {language === "es" ? "Caso destacado" : "Featured case"}
              </div>
              <div style={{ ...tEyebrow("var(--dim)"), fontSize: 10 }}>
                {featured.year}
              </div>
            </div>
            {featured && (
              <Link
                to={`/cases/${featured.slug}`}
                onClick={onNavigate}
                className="block no-underline group"
                style={{ color: "inherit" }}
              >
                <div className="relative w-full mb-5" style={{ aspectRatio: "16/10" }}>
                  <CaseStripe
                    label={`${featured.client[language]} · ${language === "es" ? "vista previa" : "preview"}`}
                    variant="navy"
                  />
                </div>
                <div
                  className="flex items-baseline justify-between mb-2"
                  style={tEyebrow("var(--muted)")}
                >
                  <span>{featured.sector[language]}</span>
                </div>
                <h3
                  style={{
                    ...tSerif(22, 500),
                    color: "var(--ink)",
                    margin: "0 0 10px",
                    lineHeight: 1.2,
                  }}
                >
                  {featured.title[language]}
                </h3>
                <div
                  className="flex justify-between items-baseline pt-3 mt-3"
                  style={{ borderTop: "1px solid var(--rule)" }}
                >
                  <div
                    style={{
                      ...tDisplay(28, 500),
                      color: "var(--accent)",
                      lineHeight: 1,
                    }}
                  >
                    {featured.metric.value}
                  </div>
                  <span
                    className="text-[12px] transition-transform duration-200 group-hover:translate-x-1"
                    style={{
                      ...tEyebrow("var(--muted)"),
                      fontSize: 10.5,
                      textAlign: "right",
                    }}
                  >
                    {featured.metric.label[language]}
                  </span>
                </div>
              </Link>
            )}
          </div>

          {/* All cases (right) */}
          <div className="pl-10" style={{ borderLeft: "1px solid var(--rule)" }}>
            <div
              className="flex justify-between items-baseline mb-5 pb-3"
              style={{ borderBottom: "1px solid var(--rule)" }}
            >
              <div style={tEyebrow("var(--muted)")}>
                — {t("mega.ourCases")}
              </div>
              <div style={{ ...tEyebrow("var(--dim)"), fontSize: 10 }}>
                {countLabel}
              </div>
            </div>
            <div className="flex flex-col">
              {list.map((c, idx) => (
                <Link
                  key={c.slug}
                  to={`/cases/${c.slug}`}
                  onClick={onNavigate}
                  className="grid grid-cols-[40px_1fr_auto] gap-4 items-baseline py-3 no-underline transition-colors duration-150"
                  style={{
                    color: "inherit",
                    borderTop:
                      idx === 0 ? "none" : "1px solid var(--rule)",
                  }}
                  onMouseEnter={(e) => {
                    const title = e.currentTarget.querySelector("[data-title]");
                    if (title) title.style.color = "var(--accent)";
                  }}
                  onMouseLeave={(e) => {
                    const title = e.currentTarget.querySelector("[data-title]");
                    if (title) title.style.color = "var(--ink)";
                  }}
                >
                  <span style={{ ...tEyebrow("var(--accent)"), fontSize: 10 }}>
                    {String(idx + 1).padStart(2, "0")}
                  </span>
                  <div className="min-w-0">
                    <div
                      data-title
                      className="transition-colors duration-150"
                      style={{
                        ...tSerif(16, 500),
                        color: "var(--ink)",
                        lineHeight: 1.3,
                      }}
                    >
                      {c.client[language]}
                    </div>
                    <div
                      className="mt-[2px] truncate"
                      style={{
                        fontSize: 12,
                        color: "var(--muted)",
                        lineHeight: 1.4,
                      }}
                    >
                      {c.sector[language]}
                    </div>
                  </div>
                  <span
                    style={{
                      ...tDisplay(18, 500),
                      color: "var(--accent)",
                      lineHeight: 1,
                    }}
                  >
                    {c.metric.value}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom strip */}
        <div
          className="mt-9 pt-5 flex justify-between items-center flex-wrap gap-4"
          style={{ borderTop: "1px solid var(--rule)" }}
        >
          <div style={{ ...tEyebrow("var(--muted)"), fontSize: 10.5 }}>
            — {t("mega.similarProject")}
          </div>
          <div className="flex gap-4 items-center">
            <Link
              to="/cases"
              onClick={onNavigate}
              className="text-[13.5px] no-underline whitespace-nowrap"
              style={{
                color: "var(--ink)",
                textDecoration: "underline",
                textUnderlineOffset: 4,
              }}
            >
              {t("mega.viewAllCases")} →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

const MobileHeader = () => {
  const { t } = useLanguage();
  const location = useLocation();
  const navigate = useNavigate();
  const services = getServicesData(t);
  const [open, setOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const scrolled = useScrolled();

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
    { key: "cases", path: "/cases", label: t("nav.cases") },
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
          borderBottom: `1px solid ${
            scrolled || open ? "var(--rule)" : "transparent"
          }`,
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
          transition: "border-color .2s ease",
        }}
      >
        <Logo />
        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          aria-label={open ? t("nav.closeMenu") : t("nav.openMenu")}
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
                          {t("services.viewAll") || t("mega.viewAllServices")} →
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
            {t("nav.scheduleCall")} →
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
