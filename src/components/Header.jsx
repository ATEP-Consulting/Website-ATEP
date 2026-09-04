import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  ChevronDown,
  ChevronRight,
  FileText,
  Menu,
  Moon,
  Newspaper,
  Plus,
  Star,
  Sun,
  X,
} from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
import { useTheme } from "../context/ThemeContext";
import { getServicesData } from "../data/servicesData";
import { cases as casesData } from "../data/casesData";
import { blogPosts } from "../data/blogData";
import { trackEvent } from "../lib/analytics";
import { Btn } from "./Btn";

// Cabecera del rediseño 2026.
//
// Seis apartados: Inicio, Servicios, Casos, Empresa, Blog y Contacto. Los tres
// que tienen varias opciones —Servicios, Casos y Blog— llevan mega menú; los
// otros tres son enlaces directos. Selector de idioma, conmutador de tema y
// CTA a la derecha. En móvil, acordeón.
//
// Ninguna URL cambia. El evento `schedule_call_click` se conserva.

const DESTACADOS = ["full-stack-development", "automation", "legacy-migration"];

export const Header = () => {
  const { t, language, setLanguage } = useLanguage();
  const { theme, toggleTheme } = useTheme();
  const { pathname } = useLocation();

  const [open, setOpen] = useState(null); // null | "services" | "cases" | "blog"
  const [stuck, setStuck] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileSection, setMobileSection] = useState(null);
  const timer = useRef(null);

  const services = getServicesData(t);
  const destacados = DESTACADOS.map((id) => services.find((s) => s.id === id)).filter(Boolean);
  const restoServicios = services.filter((s) => !DESTACADOS.includes(s.id));

  const casosOrdenados = [...casesData].sort((a, b) => (b.year || 0) - (a.year || 0));
  const casosDestacados = casosOrdenados.slice(0, 3);
  const restoCasos = casosOrdenados.slice(3);

  const postsOrdenados = [...blogPosts].sort((a, b) => new Date(b.date) - new Date(a.date));
  const postsDestacados = postsOrdenados.slice(0, 3);
  const restoPosts = postsOrdenados.slice(3, 9);

  const nombreCorto = (c) => c.client[language].split("·")[0].trim();

  // Retardo de intención: sin él, cruzar la barra con el ratón abre y cierra
  // menús en cascada y la cabecera parpadea.
  const abrirConIntencion = (menu) => {
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setOpen(menu), 120);
  };
  const cerrarConIntencion = () => {
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setOpen(null), 180);
  };

  useEffect(() => {
    const onKey = (e) => {
      if (e.key !== "Escape") return;
      setOpen(null);
      setMobileOpen(false);
    };
    const onScroll = () => {
      setStuck(window.scrollY > 20);
      setOpen(null);
    };
    onScroll();
    window.addEventListener("keydown", onKey);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("scroll", onScroll);
      clearTimeout(timer.current);
    };
  }, []);

  // Al navegar se cierra todo: si no, el menú móvil se queda abierto encima
  // de la página nueva.
  useEffect(() => {
    setOpen(null);
    setMobileOpen(false);
    setMobileSection(null);
  }, [pathname]);

  // Con el menú móvil abierto el fondo no debe poder desplazarse.
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const BigCard = ({ to, icon: Icon, title, text }) => (
    <Link className="rd-nv-big" to={to}>
      <span className="rd-nv-big-grid" aria-hidden="true" />
      <span className="rd-nv-big-icon" aria-hidden="true">
        <Icon size={22} strokeWidth={1.7} />
      </span>
      <span className="rd-nv-big-body">
        <strong>{title}</strong>
        <span>{text}</span>
      </span>
    </Link>
  );

  const Panel = ({ kind, grandes, laterales, pieLabel, pieTo }) => (
    <div
      className={`rd-nv-panel rd-nv-panel--${kind}`}
      onMouseEnter={() => clearTimeout(timer.current)}
    >
      <div className="rd-nv-panel-main">
        <div className="rd-nv-bigs rd-nv-bigs--3">
          {grandes.map((g) => (
            <BigCard key={g.to + g.title} {...g} />
          ))}
        </div>
      </div>
      <aside className="rd-nv-panel-side">
        {laterales.map((l) => (
          <Link key={l.to + l.label} className="rd-nv-link" to={l.to}>
            {l.icon ? <l.icon size={17} strokeWidth={1.7} /> : <span className="rd-nv-link-dot" aria-hidden="true" />}
            {l.label}
          </Link>
        ))}
        <Link className="rd-nv-side-foot" to={pieTo}>
          {pieLabel}
          <ChevronRight size={15} strokeWidth={2} />
        </Link>
      </aside>
    </div>
  );

  // La palabra es un ENLACE: al pincharla se va a la ruta. El chevron es un
  // botón aparte que abre el desplegable. Van separados porque meter un botón
  // dentro de un enlace es HTML inválido, y porque así el teclado tiene un
  // control explícito para abrir el menú en vez de depender del hover.
  const NavMenu = ({ id, label, to }) => (
    <span
      className={`rd-nv-group${open === id ? " is-on" : ""}`}
      onMouseEnter={() => abrirConIntencion(id)}
    >
      <Link className="rd-nv-item" to={to}>
        {label}
      </Link>
      <button
        type="button"
        className="rd-nv-chevbtn"
        aria-expanded={open === id}
        aria-label={`${label} · ${open === id ? t("nav.closeMenu") : t("nav.openMenu")}`}
        onClick={() => setOpen(open === id ? null : id)}
      >
        <ChevronDown size={15} strokeWidth={2} className="rd-nv-chev" />
      </button>
    </span>
  );

  const ctaAgendar = (location) => (
    <Btn
      as={Link}
      to="/contact"
      tone="invert"
      size="sm"
      onClick={() => trackEvent("schedule_call_click", { location })}
    >
      {t("nav.scheduleCall")}
    </Btn>
  );

  const selectorIdioma = (
    <div className="rd-nv-lang" role="group" aria-label="Idioma">
      {["es", "en"].map((l) => (
        <button
          key={l}
          type="button"
          className={language === l ? "is-on" : undefined}
          aria-pressed={language === l}
          aria-label={l === "es" ? "Español" : "English"}
          onClick={() => setLanguage(l)}
        >
          {l}
        </button>
      ))}
    </div>
  );

  return (
    <div
      className={`rd-nv-wrap${open ? " is-open" : ""}${stuck ? " is-stuck" : ""}`}
      onMouseLeave={cerrarConIntencion}
    >
      <div className="rd-nv-bar">
        {/* El texto de marca se oculta por debajo de 1180px y con la barra
            condensada: sin aria-label el enlace se queda sin nombre accesible.
            Contiene el texto visible, como exige "Label in Name" (WCAG 2.5.3). */}
        <Link
          className="rd-nv-logo"
          to="/"
          aria-label={`ATEP Consulting — ${t("nav.home")}`}
        >
          <img
            className="rd-nv-logo-mark"
            src="/new-logo-atep.svg"
            alt=""
            aria-hidden="true"
            width={24}
            height={24}
          />
          <span className="rd-nv-logo-text">ATEP CONSULTING</span>
        </Link>

        <nav className="rd-nv-items" aria-label={t("nav.home")}>
          <Link className="rd-nv-item" to="/" onMouseEnter={cerrarConIntencion}>
            {t("nav.home")}
          </Link>
          <NavMenu id="services" label={t("nav.services")} to="/services" />
          <NavMenu id="cases" label={t("nav.cases")} to="/cases" />
          <Link className="rd-nv-item" to="/company" onMouseEnter={cerrarConIntencion}>
            {t("nav.about")}
          </Link>
          <NavMenu id="blog" label={t("nav.blog")} to="/blog" />
          <Link className="rd-nv-item" to="/contact" onMouseEnter={cerrarConIntencion}>
            {t("nav.contact")}
          </Link>
        </nav>

        {/* Idioma, tema y CTA agrupados: sueltos competían con la
            navegación y la barra parecía una lista de nueve elementos. */}
        <div className="rd-nv-tools">
          {selectorIdioma}
          <button
            type="button"
            className="rd-nv-theme"
            onClick={toggleTheme}
            aria-label={theme === "dark" ? t("theme.toLight") : t("theme.toDark")}
          >
            {theme === "dark" ? <Sun size={16} strokeWidth={1.8} /> : <Moon size={16} strokeWidth={1.8} />}
          </button>
          <div className="rd-nv-cta">{ctaAgendar("header_desktop")}</div>
        </div>

        <button
          type="button"
          className="rd-nv-burger"
          onClick={() => setMobileOpen((v) => !v)}
          aria-label={mobileOpen ? t("nav.closeMenu") : t("nav.openMenu")}
          aria-expanded={mobileOpen}
        >
          {mobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {open === "services" && (
        <Panel
          kind="services"
          grandes={destacados.map((s) => ({
            to: s.path,
            icon: s.icon,
            title: s.name,
            text: s.description,
          }))}
          laterales={restoServicios.map((s) => ({ to: s.path, icon: s.icon, label: s.name }))}
          pieLabel={t("megaNav.viewAllServices")}
          pieTo="/services"
        />
      )}

      {open === "cases" && (
        <Panel
          kind="cases"
          grandes={casosDestacados.map((c) => ({
            to: `/cases/${c.slug}`,
            icon: Star,
            title: nombreCorto(c),
            text: `${c.metric.value} · ${c.metric.label[language]}`,
          }))}
          laterales={restoCasos.map((c) => ({ to: `/cases/${c.slug}`, label: nombreCorto(c) }))}
          pieLabel={t("megaNav.viewAllCases")}
          pieTo="/cases"
        />
      )}

      {open === "blog" && (
        <Panel
          kind="blog"
          grandes={postsDestacados.map((p) => ({
            to: `/blog/${p.slug}`,
            icon: Newspaper,
            title: p.title[language],
            text: p.category[language],
          }))}
          laterales={restoPosts.map((p) => ({
            to: `/blog/${p.slug}`,
            icon: FileText,
            label: p.title[language],
          }))}
          pieLabel={t("blog.viewAll")}
          pieTo="/blog"
        />
      )}

      {/* ---------------- menú móvil ---------------- */}
      <div className={`rd-nv-mobile${mobileOpen ? " is-open" : ""}`} aria-hidden={!mobileOpen}>
        <nav className="rd-nv-mobile-inner">
          <Link className="rd-nv-mobile-row" to="/">
            {t("nav.home")}
          </Link>

          {[
            { id: "services", label: t("nav.services"), items: services.map((s) => ({ to: s.path, label: s.name })), verTodo: { to: "/services", label: t("megaNav.viewAllServices") } },
            { id: "cases", label: t("nav.cases"), items: casosOrdenados.map((c) => ({ to: `/cases/${c.slug}`, label: nombreCorto(c) })), verTodo: { to: "/cases", label: t("megaNav.viewAllCases") } },
          ].map((sec) => (
            <div key={sec.id}>
              {/* La palabra lleva a la ruta; el + despliega. */}
              <div className="rd-nv-mobile-rowgroup">
                <Link className="rd-nv-mobile-row" to={sec.verTodo.to}>
                  {sec.label}
                </Link>
                <button
                  type="button"
                  className="rd-nv-mobile-plus"
                  onClick={() => setMobileSection(mobileSection === sec.id ? null : sec.id)}
                  aria-expanded={mobileSection === sec.id}
                  aria-label={`${sec.label} · ${mobileSection === sec.id ? t("nav.closeMenu") : t("nav.openMenu")}`}
                >
                  <Plus size={18} className={mobileSection === sec.id ? "is-open" : ""} />
                </button>
              </div>
              <div className={`rd-nv-mobile-sub${mobileSection === sec.id ? " is-open" : ""}`}>
                <div>
                  {sec.items.map((i) => (
                    <Link key={i.to} to={i.to}>
                      {i.label}
                    </Link>
                  ))}
                  <Link to={sec.verTodo.to}>{sec.verTodo.label}</Link>
                </div>
              </div>
            </div>
          ))}

          <Link className="rd-nv-mobile-row" to="/company">
            {t("nav.about")}
          </Link>

          <div className="rd-nv-mobile-rowgroup">
            <Link className="rd-nv-mobile-row" to="/blog">
              {t("nav.blog")}
            </Link>
            <button
              type="button"
              className="rd-nv-mobile-plus"
              onClick={() => setMobileSection(mobileSection === "blog" ? null : "blog")}
              aria-expanded={mobileSection === "blog"}
              aria-label={`${t("nav.blog")} · ${mobileSection === "blog" ? t("nav.closeMenu") : t("nav.openMenu")}`}
            >
              <Plus size={18} className={mobileSection === "blog" ? "is-open" : ""} />
            </button>
          </div>
          <div className={`rd-nv-mobile-sub${mobileSection === "blog" ? " is-open" : ""}`}>
            <div>
              {postsOrdenados.slice(0, 6).map((p) => (
                <Link key={p.slug} to={`/blog/${p.slug}`}>
                  {p.title[language]}
                </Link>
              ))}
              <Link to="/blog">{t("blog.viewAll")}</Link>
            </div>
          </div>

          <Link className="rd-nv-mobile-row" to="/contact">
            {t("nav.contact")}
          </Link>

          <div className="rd-nv-mobile-foot">
            {selectorIdioma}
            {ctaAgendar("header_mobile")}
          </div>
        </nav>
      </div>
    </div>
  );
};
