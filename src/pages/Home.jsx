import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  BookOpen,
  Check,
  CalendarCheck,
  Code2,
  DoorOpen,
  Hourglass,
  MessageSquare,
  Receipt,
  ShieldCheck,
  Sparkles,
  Zap,
} from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
import { SEO } from "../components/SEO";
import { Btn } from "../components/Btn";
import { ProjectPlate } from "../components/ProjectPlate";
import { CountUp } from "../components/CountUp";
import { BlogCard } from "../components/BlogCard";
import { Image } from "../components/Image";
import { getServicesData } from "../data/servicesData";
import { cases as casesData } from "../data/casesData";
import { clients } from "../data/clientsData";
import { blogPosts } from "../data/blogData";
import { getHeroStats } from "../config/heroStats";
import { COMPANY_FOUNDED_YEAR } from "../config/company";
import { trackEvent } from "../lib/analytics";

// Home del rediseño 2026.
//
// Mismas rutas, mismo <SEO>, mismos eventos de analítica y mismo i18n que la
// versión anterior: sólo cambia la piel. Ver design-ref/SISTEMA.md.

const FEATURED_SERVICES = [
  { id: "full-stack-development", statKey: "stat4", image: "/images/home/Implementation.webp" },
  { id: "automation", statKey: "stat3", image: "/images/home/Diagnosis.webp" },
  { id: "legacy-migration", statKey: "stat2", image: "/images/company/Trust.webp" },
];

const PROCESS_MEDIA = [
  "/images/home/FirstConsult.webp",
  "/images/home/Proposal.webp",
  "/images/home/Implementation.webp",
  "/images/home/ProvenResults.webp",
];
const PROCESS_ICONS = [MessageSquare, Sparkles, Hourglass, BookOpen];
const BENEFIT_ICONS = [Code2, ShieldCheck, Zap, Receipt, CalendarCheck, DoorOpen];

// Foto con el viraje oscuro del sistema: una sola pieza para todas las
// imágenes de la página, de ahí que el degradado viva aquí y no en cada uso.
const Shot = ({ src, alt = "", className = "", priority = false }) => (
  <div className={["rd-shot", className].filter(Boolean).join(" ")}>
    <Image
      src={src}
      alt={alt}
      sizes="100vw"
      priority={priority}
      width={1600}
      height={1000}
    />
    <span className="rd-shot-grade" aria-hidden="true" />
  </div>
);

const Eyebrow = ({ children, center }) => (
  <div className={`rd-eyebrow${center ? " is-center" : ""}`} data-reveal>
    <i aria-hidden="true" />
    {children}
  </div>
);

// Titular a dos tonos: el recurso que define la dirección.
const Duo = ({ first, second }) => (
  <h2 className="rd-h2" data-reveal>
    {first} <span className="rd-dim">{second}</span>
  </h2>
);

export const Home = () => {
  const { t, language } = useLanguage();
  const [activeStep, setActiveStep] = useState(0);
  // Índice del caso que se está mostrando: el carrusel va de uno en uno.
  const [activeCase, setActiveCase] = useState(0);
  // El avance automático se para al pasar el ratón por encima y al tocar los
  // controles: si sigue girando mientras alguien lee, es una molestia.
  const [casesPaused, setCasesPaused] = useState(false);
  const [openFaq, setOpenFaq] = useState(0);

  const services = getServicesData(t);
  const featured = FEATURED_SERVICES.map((f) => ({
    ...f,
    service: services.find((s) => s.id === f.id),
  })).filter((f) => f.service);

  const stats = getHeroStats(t);
  // Todos los casos, del más reciente al más antiguo: en la home se enseña
  // el catálogo entero, no una selección.
  const todosLosCasos = [...casesData].sort((a, b) => (b.year || 0) - (a.year || 0));
  const activeCaseItem = todosLosCasos[activeCase];
  const posts = blogPosts.slice(0, 3);

  const process = [1, 2, 3, 4].map((n, i) => ({
    title: t(`home.step${n}Title`),
    text: t(`home.step${n}Description`),
    image: PROCESS_MEDIA[i],
    Icon: PROCESS_ICONS[i],
  }));

  const faq = t("faq.items");

  const benefits = [1, 2, 3, 4, 5, 6].map((n, i) => ({
    title: t(`home.whyChoose${n}Title`),
    text: t(`home.whyChoose${n}Text`),
    Icon: BENEFIT_ICONS[i],
  }));

  // Avance automático del carrusel de casos. No se arma con
  // `prefers-reduced-motion` ni durante el prerender: un carrusel que se
  // mueve solo es inusable para quien tiene sensibilidad al movimiento.
  useEffect(() => {
    if (casesPaused) return undefined;
    const sinMovimiento =
      (typeof window.matchMedia === "function" &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches) ||
      (typeof navigator !== "undefined" && /ReactSnap/i.test(navigator.userAgent));
    if (sinMovimiento) return undefined;

    const id = setInterval(() => {
      setActiveCase((n) => (n + 1) % todosLosCasos.length);
    }, 6000);
    return () => clearInterval(id);
  }, [casesPaused, todosLosCasos.length]);

  return (
    <>
      <SEO
        title="Consultoría IT y Desarrollo de Software"
        description="Transformamos tu negocio con desarrollo web profesional, aplicaciones a medida, migración de sistemas legacy y automatización de procesos. Equipo técnico disponible en 48h. Valencia, España."
        keywords="consultoría IT, desarrollo software, transformación digital, desarrollo web, migración legacy, automatización, Valencia, España"
        schemaType="Organization"
        schemaData={{
          serviceType: [
            "Desarrollo Web Profesional",
            "Desarrollo Full-Stack",
            "Equipos On-Demand",
            "Migración de Sistemas Legacy",
            "Automatización de Procesos",
          ],
        }}
      />

      {/* ============================ HERO ============================ */}
      <section className="rd-hero">
        <Shot src="/images/company/Company.webp" className="rd-shot--cover" priority />

        <div className="rd-hero-body">
          <div className="rd-hero-copy">
            {/* Etiqueta con el nombre, la actividad y la ciudad. Además de
                situar al visitante, mete marca y localidad en la primera
                pantalla, que el titular por sí solo no lleva. */}
            <div className="rd-eyebrow rd-hero-eyebrow">
              <i aria-hidden="true" />
              {t("home.heroEyebrow")}
            </div>
            <h1 className="rd-h1">
              {t("hero.heroTitle1").trim()} {t("hero.heroTitle2").trim()}
              <br />
              {t("hero.heroTitle3").trim()} {t("hero.heroTitle4").trim()}
            </h1>
            <p className="rd-hero-sub">{t("hero.heroSubtitle")}</p>
            <div className="rd-ctas">
              <Btn
                as={Link}
                to="/contact"
                onClick={() =>
                  trackEvent("cta_click", {
                    location: "home_hero",
                    cta_type: "primary",
                    cta_text: t("hero.heroCta"),
                  })
                }
              >
                {t("hero.heroCta")}
              </Btn>
              <Btn
                as={Link}
                to="/services"
                tone="ghost"
                onClick={() =>
                  trackEvent("cta_click", {
                    location: "home_hero",
                    cta_type: "secondary",
                    cta_text: t("hero.heroSecondaryCta"),
                  })
                }
              >
                {t("hero.heroSecondaryCta")}
              </Btn>
            </div>
          </div>

          {/* Clientes en carrusel, a la altura de los botones. La lista va
              duplicada para que el bucle no dé salto. */}
          <div className="rd-hero-clients">
            <span className="rd-foot-label">{t("home.clientsLabel")}</span>
            <div className="rd-marquee">
              <div className="rd-marquee-track">
                {[0, 1].map((copia) => (
                  <div className="rd-marquee-run" key={copia} aria-hidden={copia === 1}>
                    {clients.map((n) => (
                      <span key={n}>
                        {n}
                        <i aria-hidden="true">/</i>
                      </span>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <a className="rd-scroll" href="#servicios">
            <span className="rd-scroll-word">Scroll</span>
            <span className="rd-scroll-track" aria-hidden="true">
              <i />
            </span>
          </a>
        </div>
      </section>

      {/* ========================== SERVICIOS ========================== */}
      <section className="rd-sec" id="servicios">
        <Eyebrow>{t("nav.services")}</Eyebrow>
        <Duo first={t("home.servicesTitle1")} second={t("home.servicesTitle2")} />
        <p className="rd-sec-sub" data-reveal>
          {t("home.servicesSubtitle")}
        </p>

        <div className="rd-grid3" data-stagger>
          {featured.map(({ id, statKey, image, service }) => (
            <Link key={id} className="rd-card" to={service.path}>
              <div className="rd-card-media">
                <Shot src={image} />
                <div className="rd-note">
                  <div className="rd-note-head">
                    <span className="rd-note-dot" aria-hidden="true" />
                    {service.badge}
                  </div>
                  <div className="rd-note-foot">
                    <strong>{t(`stats.${statKey}.number`)}</strong>
                    <span>{t(`stats.${statKey}.label`)}</span>
                  </div>
                </div>
              </div>
              <h3 className="rd-card-title">{service.name}</h3>
              <p className="rd-card-text">{service.description}</p>
            </Link>
          ))}
        </div>

        <div className="rd-sec-foot" data-reveal>
          <Btn as={Link} to="/services" tone="ghost">
            {t("megaNav.viewAllServices")}
          </Btn>
        </div>
      </section>

      {/* =========================== CASOS ============================ */}
      <section
        className="rd-sec"
        onMouseEnter={() => setCasesPaused(true)}
        onMouseLeave={() => setCasesPaused(false)}
        onFocusCapture={() => setCasesPaused(true)}
      >
        <div className="rd-sec-head">
          <div>
            <Eyebrow>{t("nav.cases")}</Eyebrow>
            <Duo first={t("home.casesTitle1")} second={t("home.casesTitle2")} />
          </div>
          {/* Contador y flechas: el carrusel pasa de uno en uno y se ve
              cuántos quedan. Con pestañas sólo cabían cuatro y en móvil la
              fila se partía. */}
          <div className="rd-carousel-nav" data-reveal>
            <span className="rd-carousel-count">
              {String(activeCase + 1).padStart(2, "0")}
              <i aria-hidden="true">/</i>
              {String(todosLosCasos.length).padStart(2, "0")}
            </span>
            <div className="rd-rail-nav">
              <button
                type="button"
                onClick={() => setActiveCase((n) => (n - 1 + todosLosCasos.length) % todosLosCasos.length)}
                aria-label={language === "es" ? "Caso anterior" : "Previous case"}
              >
                <ArrowRight size={16} style={{ transform: "rotate(180deg)" }} />
              </button>
              <button
                type="button"
                onClick={() => setActiveCase((n) => (n + 1) % todosLosCasos.length)}
                aria-label={language === "es" ? "Caso siguiente" : "Next case"}
              >
                <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </div>

        {/* `key` fuerza el remontaje al cambiar de caso: es lo que dispara la
            entrada escalonada (placa primero, textos detrás). */}
        <div className="rd-usecase rd-usecase--anim" key={activeCaseItem.slug}>
          <ProjectPlate
            as={Link}
            to={`/cases/${activeCaseItem.slug}`}
            onClick={() => trackEvent("view_case", { case_slug: activeCaseItem.slug, location: "home_plate" })}
            index={activeCase}
            name={activeCaseItem.client[language].split("·")[0].trim()}
            sector={activeCaseItem.sector[language]}
            metric={activeCaseItem.metric.value}
            metricLabel={activeCaseItem.metric.label[language]}
            size="lg"
          />
          <div className="rd-usecase-copy">
            <div className="rd-usecase-label">{activeCaseItem.client[language]}</div>
            <h3 className="rd-usecase-title">{activeCaseItem.title[language]}</h3>
            <p className="rd-card-text">{activeCaseItem.description[language]}</p>
            <Btn
              as={Link}
              to={`/cases/${activeCaseItem.slug}`}
              tone="invert"
              onClick={() => trackEvent("view_case", { case_slug: activeCaseItem.slug, location: "home" })}
            >
              {t("home.readCase")}
            </Btn>
          </div>
        </div>

        {/* Puntos: además de indicar dónde estás, permiten saltar a uno
            concreto sin pasar por todos. */}
        <div className="rd-dots" role="tablist" aria-label={t("nav.cases")}>
          {todosLosCasos.map((c, i) => (
            <button
              key={c.slug}
              type="button"
              role="tab"
              aria-selected={i === activeCase}
              aria-label={c.client[language].split("·")[0].trim()}
              className={i === activeCase ? "is-on" : undefined}
              onClick={() => setActiveCase(i)}
            />
          ))}
        </div>

        <div className="rd-sec-foot" data-reveal>
          <Btn as={Link} to="/cases" tone="ghost">
            {t("megaNav.viewAllCases")}
          </Btn>
        </div>
      </section>

      {/* ========================== PROCESO ============================ */}
      <section className="rd-sec">
        <Eyebrow>{t("home.howWeWorkTitle1")}</Eyebrow>
        <Duo first={t("home.howWeWorkTitle1")} second={t("home.howWeWorkTitle2")} />

        <div className="rd-usecase" data-reveal>
          <div className="rd-usecase-media" key={activeStep}>
            <Shot src={process[activeStep].image} className="rd-shot--soft rd-shot--anim" />
            <div className="rd-float-anim">
              <div className="rd-note">
                <div className="rd-note-head">
                  <span className="rd-note-dot" aria-hidden="true" />
                  {String(activeStep + 1).padStart(2, "0")} — {process[activeStep].title}
                </div>
                <p>{process[activeStep].text}</p>
              </div>
            </div>
          </div>

          <ol className="rd-steps">
            {process.map((s, i) => (
              <li key={s.title} className={i === activeStep ? "is-on" : ""}>
                <button type="button" onClick={() => setActiveStep(i)}>
                  <span className="rd-step-head">
                    <s.Icon size={15} strokeWidth={1.8} />
                    {i + 1} — {s.title}
                  </span>
                  <span className="rd-card-text">{s.text}</span>
                </button>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ======================== POR QUÉ ATEP ========================= */}
      <section className="rd-sec">
        <Eyebrow>{t("home.whyChooseTitle2").trim()}</Eyebrow>
        <Duo
          first={`${t("home.whyChooseTitle1")}${t("home.whyChooseTitle2")}${t("home.whyChooseTitle3")}`}
          second={`${t("home.whyChooseTitle4")}${t("home.whyChooseTitle5")}${t("home.whyChooseTitle6")}`}
        />

        <div className="rd-grid3 rd-grid3--tight" data-stagger>
          {benefits.map((b) => (
            <article key={b.title} className="rd-bcard">
              <span className="rd-bicon" aria-hidden="true">
                <b.Icon size={17} strokeWidth={1.6} />
              </span>
              <h3 className="rd-card-title">{b.title}</h3>
              <p className="rd-card-text">{b.text}</p>
            </article>
          ))}
        </div>
      </section>

      {/* ========================== RESULTADOS ========================= */}
      <section className="rd-sec">
        <Eyebrow>{t("home.kpiEyebrow")}</Eyebrow>
        <Duo first={t("home.kpiTitle1")} second={t("home.kpiTitle2")} />

        {/* Uno grande arriba y tres debajo: la jerarquía dice cuál es el dato
            que más vende, en vez de dejar cuatro cifras compitiendo. Los
            números cuentan al entrar en pantalla. */}
        <div className="rd-kpis" data-stagger>
          <article className="rd-kpi rd-kpi--big">
            <span className="rd-kpi-grid" aria-hidden="true" />
            <span className="rd-kpi-glow" aria-hidden="true" />
            <div className="rd-kpi-body">
              <CountUp className="rd-kpi-num" value={stats[2].number} />
              <span className="rd-kpi-label">{stats[2].label}</span>
            </div>
            <span className="rd-kpi-note">{t("home.step3Title")}</span>
          </article>

          {[stats[0], stats[1], stats[3]].map((s) => (
            <article key={s.label} className="rd-kpi">
              <span className="rd-kpi-grid" aria-hidden="true" />
              <div className="rd-kpi-body">
                <CountUp className="rd-kpi-num" value={s.number} />
                <span className="rd-kpi-label">{s.label}</span>
              </div>
            </article>
          ))}
        </div>

        {/* Los datos de volumen van aquí abajo, en pequeño, y no como cifra
            gigante: con números todavía modestos, un "8" a 60px resta más de
            lo que suma. Ver el comentario de src/config/heroStats.js. */}
        {/* Mismo badge que las garantías del CTA: check granate y texto, sin
            contenedor. Una pieza para todo lo que es "dato de apoyo". */}
        <div className="rd-guarantees rd-kpi-foot" data-reveal>
          <span>
            <Check size={14} strokeWidth={2.4} />
            <strong>{casesData.length}</strong> {t("home.kpiProjects")}
          </span>
          <span>
            <Check size={14} strokeWidth={2.4} />
            <strong>{clients.length}</strong> {t("home.kpiClients")}
          </span>
          <span>
            <Check size={14} strokeWidth={2.4} />
            {t("home.kpiSince")} <strong>{COMPANY_FOUNDED_YEAR}</strong>
          </span>
        </div>
      </section>

      {/* ============================ BLOG ============================= */}
      <section className="rd-sec">
        <Eyebrow>{t("nav.blog")}</Eyebrow>
        <Duo first={t("home.blogTitle1")} second={t("home.blogTitle2")} />
        <div className="rd-grid3" data-stagger>
          {posts.map((p) => (
            <BlogCard
              key={p.slug}
              slug={p.slug}
              title={p.title[language]}
              excerpt={p.excerpt[language]}
              image={p.image}
              author={p.author}
              date={p.date}
              category={p.category[language]}
            />
          ))}
        </div>
        <div className="rd-sec-foot" data-reveal>
          <Btn as={Link} to="/blog" tone="ghost">
            {t("blog.viewAll")}
          </Btn>
        </div>
      </section>

      {/* ============================= FAQ ============================= */}
      <section className="rd-sec rd-faq-sec">
        <div className="rd-faq-intro">
          <Eyebrow>{t("faq.eyebrow")}</Eyebrow>
          <Duo first={t("faq.title1")} second={t("faq.title2")} />
          <p className="rd-sec-sub" data-reveal>
            {t("faq.subtitle")}
          </p>
        </div>
        <div className="rd-faq" data-stagger>
          {Array.isArray(faq) &&
            faq.map((f, i) => {
              const abierta = openFaq === i;
              return (
                <div key={f.q} className={`rd-faq-item${abierta ? " is-open" : ""}`}>
                  <button
                    type="button"
                    className="rd-faq-q"
                    aria-expanded={abierta}
                    onClick={() => setOpenFaq(abierta ? -1 : i)}
                  >
                    {f.q}
                    {/* El icono es CSS: la barra vertical gira hasta fundirse
                        con la horizontal, así el + se convierte en − sin salto. */}
                    <span className="rd-faq-icon" aria-hidden="true">
                      <i />
                      <i />
                    </span>
                  </button>
                  {/* Altura animada con grid 0fr → 1fr: la única forma de
                      animar un `auto` sin medir el contenido a mano. */}
                  <div className="rd-faq-panel">
                    <div>
                      <p className="rd-faq-a">{f.a}</p>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      </section>

      {/* ============================= CTA ============================= */}
      <section className="rd-sec rd-cta-sec">
        <div className="rd-cta">
          <Shot src="/images/company/Mission.webp" className="rd-shot--cover" />
          <div className="rd-cta-inner" data-stagger>
            <Eyebrow center>{t("CTA.badge")}</Eyebrow>
            <h2 className="rd-h2 rd-cta-title">{t("CTA.title")}</h2>
            <p className="rd-cta-sub">{t("CTA.subtitle")}</p>
            <div className="rd-cta-btns">
              <Btn
                as={Link}
                to="/contact"
                onClick={() =>
                  trackEvent("cta_click", {
                    location: "home_cta",
                    cta_type: "primary",
                    cta_text: t("CTA.primaryButton"),
                  })
                }
              >
                {t("CTA.primaryButton")}
              </Btn>
              <Btn as={Link} to="/services" tone="ghost">
                {t("CTA.secondaryButton")}
              </Btn>
            </div>
            {/* Mismo badge que las garantías de las fichas de servicio: una
                sola pieza para "esto te lo garantizamos" en toda la web. */}
            <div className="rd-guarantees rd-guarantees--center">
              {[t("CTA.trust1"), t("CTA.trust2"), t("CTA.trust3")].map((x) => (
                <span key={x}>
                  <Check size={14} strokeWidth={2.4} />
                  {x}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
