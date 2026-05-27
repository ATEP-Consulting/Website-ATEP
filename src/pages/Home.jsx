import { Link } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext";
import { SEO } from "../components/SEO";
import { Reveal, RevealStagger } from "../components/Reveal";
import { CountingNumber } from "../components/CountingNumber";
import { getServicesData } from "../data/servicesData";
import { cases as casesData } from "../data/casesData";
import { CaseCard } from "../components/CaseCard";
import { ClientsMarquee } from "../components/ClientsMarquee";
import { blogPosts } from "../data/blogData";
import { getHeroStats } from "../config/heroStats";
import { tDisplay, tSerif, tEyebrow, FONT } from "../lib/typography";

const SectionEyebrow = ({ children }) => (
  <div className="mb-4" style={tEyebrow("var(--muted)")}>
    — {children}
  </div>
);

export const Home = () => {
  const { t, language } = useLanguage();
  const services = getServicesData(t);

  const stats = getHeroStats(t);

  const processSteps = [
    {
      num: "01",
      title: t("home.step1Title"),
      text: t("home.step1Description"),
    },
    {
      num: "02",
      title: t("home.step2Title"),
      text: t("home.step2Description"),
    },
    {
      num: "03",
      title: t("home.step3Title"),
      text: t("home.step3Description"),
    },
    {
      num: "04",
      title: t("home.step4Title"),
      text: t("home.step4Description"),
    },
  ];

  const whyChoose = [
    {
      title: t("home.whyChoose1Title"),
      text: t("home.whyChoose1Text"),
      img: "/images/home/ExpertTeam.webp",
    },
    {
      title: t("home.whyChoose2Title"),
      text: t("home.whyChoose2Text"),
      img: "/images/home/ProvenResults.webp",
    },
    {
      title: t("home.whyChoose3Title"),
      text: t("home.whyChoose3Text"),
      img: "/images/home/CustomerFocus.webp",
    },
  ];

  const recentPosts = [...blogPosts]
    .sort((a, b) => (a.date < b.date ? 1 : -1))
    .slice(0, 3);

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

      {/* HERO */}
      <section
        className="px-6 sm:px-10 lg:px-16 pt-12 pb-14 tm:pt-24 tm:pb-24"
        style={{ background: "var(--bg)" }}
      >
        <div className="max-w-[1600px] mx-auto">
          <div className="grid grid-cols-1 tm:grid-cols-5 gap-10 tm:gap-16 items-center">
            <div className="tm:col-span-3">
              <Reveal y={16}>
                <div style={tEyebrow("var(--muted)")}>
                  —{" "}
                  {language === "es"
                    ? "Consultoría IT & desarrollo de software · Valencia, España"
                    : "IT consulting & software development · Valencia, Spain"}
                </div>
              </Reveal>
              <Reveal delay={120} y={32} dur={1100}>
                <h1
                  className="mt-12 tm:mt-10 mb-0"
                  style={{
                    ...tDisplay("clamp(44px, 8vw, 96px)", 500),
                    color: "var(--ink)",
                  }}
                >
                  {t("hero.heroTitle1").trim()}{" "}
                  <em style={{ color: "var(--accent)", fontWeight: 400 }}>
                    {t("hero.heroTitle2").trim()}
                  </em>{" "}
                  {t("hero.heroTitle3").trim()}{" "}
                  <em style={{ color: "var(--accent)", fontWeight: 400 }}>
                    {t("hero.heroTitle4").trim()}
                  </em>
                </h1>
              </Reveal>
              <Reveal delay={360} y={24}>
                <p
                  className="mt-6 tm:mt-9 italic"
                  style={{
                    ...tSerif("clamp(17px, 1.4vw, 20px)", 400),
                    color: "var(--muted)",
                    maxWidth: 580,
                    lineHeight: 1.5,
                  }}
                >
                  {t("hero.heroSubtitle")}
                </p>
              </Reveal>
              <Reveal delay={520} y={16}>
                <div className="mt-7 tm:mt-10 flex gap-3 flex-wrap">
                  <Link
                    to="/contact"
                    className="inline-block px-6 py-[14px] text-[13.5px] font-medium tracking-[0.02em] no-underline transition-all duration-150 hover:-translate-y-[1px]"
                    style={{ background: "var(--navy)", color: "var(--bg)" }}
                  >
                    {t("hero.heroCta")} →
                  </Link>
                  <Link
                    to="/services"
                    className="inline-block px-6 py-[14px] text-[13.5px] font-medium tracking-[0.02em] no-underline transition-colors duration-150"
                    style={{
                      background: "transparent",
                      color: "var(--ink)",
                      border: "1px solid var(--ink)",
                    }}
                  >
                    {t("hero.heroSecondaryCta")}
                  </Link>
                </div>
              </Reveal>
            </div>

            <Reveal delay={280} y={36} dur={1100} className="tm:col-span-2">
              <div
                className="relative w-full mx-auto"
                style={{
                  aspectRatio: "4/5",
                  maxHeight: "min(720px, 80vh)",
                  maxWidth: "min(560px, 100%)",
                }}
              >
                <img
                  src="/images/home/ExpertTeam.webp"
                  alt={
                    language === "es"
                      ? "Equipo de ATEP Consulting"
                      : "ATEP Consulting team"
                  }
                  className="absolute inset-0 w-full h-full object-cover"
                  loading="eager"
                  fetchpriority="high"
                />
                <div
                  className="absolute bottom-4 left-4 right-4 tm:bottom-6 tm:left-6 tm:right-6 p-5 tm:p-6"
                  style={{
                    background: "var(--bg)",
                    border: "1px solid var(--navy)",
                  }}
                >
                  <div className="mb-[10px]" style={tEyebrow("var(--muted)")}>
                    {language === "es"
                      ? "Valencia · España"
                      : "Valencia · Spain"}
                  </div>
                  <div
                    style={{
                      ...tDisplay("clamp(20px, 2.4vw, 28px)", 500),
                      color: "var(--ink)",
                    }}
                  >
                    {language === "es" ? (
                      <>
                        {t("hero.heroBadge").split(" ").slice(0, -3).join(" ")}{" "}
                        <em>
                          {t("hero.heroBadge").split(" ").slice(-3).join(" ")}.
                        </em>
                      </>
                    ) : (
                      <>{t("hero.heroBadge")}.</>
                    )}
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* CLIENT LOGOS — marquee infinito de wordmarks */}
      <ClientsMarquee />

      {/* STATS */}
      <section
        className="px-6 sm:px-10 lg:px-16 py-20 tm:py-28"
        style={{ background: "var(--bg-surface)" }}
      >
        <div
          className="grid gap-10 tm:gap-16 items-end"
          style={{ gridTemplateColumns: "1fr" }}
        >
          <div className="grid grid-cols-1 tm:grid-cols-3 gap-10 tm:gap-16 items-end">
            <Reveal y={24}>
              <div>
                <SectionEyebrow>
                  {language === "es" ? "En números" : "In numbers"}
                </SectionEyebrow>
                <h2
                  style={{
                    ...tDisplay("clamp(32px, 4vw, 52px)", 500),
                    margin: 0,
                    color: "var(--ink)",
                  }}
                >
                  {language === "es" ? (
                    <>
                      Resultados que <em>cuentan</em>.
                    </>
                  ) : (
                    <>
                      Results that <em>count</em>.
                    </>
                  )}
                </h2>
              </div>
            </Reveal>
            <RevealStagger
              stagger={120}
              base={200}
              y={20}
              className="tm:col-span-2 grid grid-cols-2 tm:grid-cols-4 gap-6 tm:gap-7"
            >
              {stats.map((s) => (
                <div
                  key={s.label}
                  className="pt-4 tm:pt-5"
                  style={{ borderTop: "1px solid var(--navy)" }}
                >
                  <div
                    style={{
                      ...tDisplay("clamp(40px, 5vw, 60px)", 500),
                      color: "var(--ink)",
                    }}
                  >
                    <CountingNumber value={s.number} dur={1800} />
                  </div>
                  <div
                    className="mt-[6px]"
                    style={{ fontSize: 13, color: "var(--muted)" }}
                  >
                    {s.label}
                  </div>
                </div>
              ))}
            </RevealStagger>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section
        className="px-6 sm:px-10 lg:px-16 py-20 tm:py-28"
        style={{ background: "var(--bg)" }}
      >
        <Reveal y={24}>
          <div className="flex flex-col tm:flex-row justify-between items-start tm:items-end gap-4 tm:gap-0 mb-10 tm:mb-14">
            <div>
              <SectionEyebrow>{t("nav.services")}</SectionEyebrow>
              <h2
                style={{
                  ...tDisplay("clamp(36px, 5vw, 60px)", 500),
                  margin: 0,
                  color: "var(--ink)",
                }}
              >
                {language === "es" ? (
                  <>
                    Cinco prácticas,
                    <br />
                    <em>un mismo</em> estándar.
                  </>
                ) : (
                  <>
                    Five practices,
                    <br />
                    <em>one</em> standard.
                  </>
                )}
              </h2>
            </div>
            <Link
              to="/services"
              className="text-[14px] no-underline whitespace-nowrap"
              style={{
                color: "var(--ink)",
                textDecoration: "underline",
                textUnderlineOffset: 4,
              }}
            >
              {t("services.viewAll")} →
            </Link>
          </div>
        </Reveal>
        <RevealStagger
          stagger={80}
          base={180}
          y={20}
          className="grid grid-cols-1 tm:grid-cols-3"
          style={{
            borderTop: "1px solid var(--navy)",
          }}
          itemClassName="h-full"
        >
          {services.map((s, idx) => (
            <Link
              key={s.id}
              to={s.path}
              className="block h-full no-underline p-6 tm:p-7 tm:min-h-[260px] transition-colors duration-150"
              style={{
                color: "inherit",
                borderRight: "1px solid var(--navy)",
                borderBottom: "1px solid var(--navy)",
                borderLeft: idx % 3 === 0 ? "1px solid var(--navy)" : "none",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.background = "var(--bg-surface)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.background = "transparent")
              }
            >
              <div style={tEyebrow("var(--accent)")}>
                {String(idx + 1).padStart(2, "0")}
              </div>
              <h3
                className="my-3"
                style={{
                  ...tDisplay("clamp(22px, 2.4vw, 28px)", 500),
                  color: "var(--ink)",
                  margin: "14px 0 12px",
                }}
              >
                {s.name}
              </h3>
              <p
                className="m-0"
                style={{
                  fontSize: 14.5,
                  lineHeight: 1.55,
                  color: "var(--muted)",
                }}
              >
                {s.description}
              </p>
              <div className="mt-5 text-[13px]" style={{ color: "var(--ink)" }}>
                {language === "es" ? "Leer más" : "Read more"} →
              </div>
            </Link>
          ))}
        </RevealStagger>
      </section>

      {/* CASES */}
      <section
        className="px-6 sm:px-10 lg:px-16 py-20 tm:py-28"
        style={{ background: "var(--navy)", color: "var(--bg)" }}
      >
        <Reveal y={20}>
          <div className="flex flex-col tm:flex-row justify-between items-start tm:items-end gap-4 tm:gap-0 mb-10 tm:mb-14">
            <div>
              <div
                className="mb-4"
                style={{
                  ...tEyebrow("rgba(245,241,232,0.6)"),
                  color: "rgba(245,241,232,0.6)",
                }}
              >
                — {language === "es" ? "Casos de éxito" : "Case studies"}
              </div>
              <h2
                style={{
                  ...tDisplay("clamp(36px, 5vw, 60px)", 500),
                  color: "var(--bg)",
                  margin: 0,
                }}
              >
                {language === "es" ? (
                  <>
                    Trabajo entregado,
                    <br />
                    <em style={{ color: "#d94661" }}>
                      resultados medibles
                    </em>
                    .
                  </>
                ) : (
                  <>
                    Delivered work,
                    <br />
                    <em style={{ color: "#d94661" }}>
                      measurable results
                    </em>
                    .
                  </>
                )}
              </h2>
            </div>
            <Link
              to="/cases"
              className="text-[14px] no-underline whitespace-nowrap"
              style={{
                color: "var(--bg)",
                textDecoration: "underline",
                textUnderlineOffset: 4,
              }}
            >
              {language === "es" ? "Ver todos los casos" : "View all cases"} →
            </Link>
          </div>
        </Reveal>
        <RevealStagger
          stagger={140}
          base={140}
          y={28}
          className="grid grid-cols-1 tm:grid-cols-2 gap-6 tm:gap-8"
          itemClassName="h-full"
        >
          {casesData.slice(0, 2).map((c) => (
            <CaseCard key={c.slug} caseItem={c} variant="navy" />
          ))}
        </RevealStagger>
      </section>

      {/* PROCESS */}
      <section
        className="px-6 sm:px-10 lg:px-16 py-20 tm:py-28"
        style={{ background: "var(--bg)" }}
      >
        <Reveal y={20}>
          <SectionEyebrow>
            {language === "es" ? "Cómo trabajamos" : "How we work"}
          </SectionEyebrow>
          <h2
            className="mb-10 tm:mb-16"
            style={{
              ...tDisplay("clamp(36px, 5vw, 60px)", 500),
              color: "var(--ink)",
              maxWidth: 900,
              margin: "0 0 56px",
            }}
          >
            {language === "es" ? (
              <>
                Un proceso transparente,
                <br />
                <em>previsible</em> y medible.
              </>
            ) : (
              <>
                A transparent process —
                <br />
                <em>predictable</em> and measurable.
              </>
            )}
          </h2>
        </Reveal>
        <div className="relative">
          {/* Línea del timeline — horizontal en desktop, vertical en mobile.
              Coincide con el centro de los bullets (5.5px del top en desktop,
              26.5px del top de cada item en mobile). */}
          <div
            aria-hidden
            className="hidden tm:block absolute h-px pointer-events-none"
            style={{
              background: "var(--accent)",
              top: 5,
              left: "12.5%",
              right: "12.5%",
            }}
          />
          <div
            aria-hidden
            className="tm:hidden absolute w-px pointer-events-none"
            style={{
              background: "var(--accent)",
              left: 5,
              top: 27,
              bottom: 27,
            }}
          />

          <RevealStagger
            stagger={140}
            base={160}
            y={28}
            className="grid grid-cols-1 tm:grid-cols-4 gap-10 tm:gap-10 pl-8 tm:pl-0"
            itemClassName="h-full"
          >
            {processSteps.map((p) => (
              <div key={p.num} className="relative h-full tm:pt-8">
                {/* Bullet (punto del timeline) — granate, sobre la línea.
                    Desktop: top:0 del item, centrado horizontalmente en la
                    columna (la línea cruza por su centro).
                    Mobile: top:21px del item, a la izquierda del número
                    (alineado con el centro vertical del display 48-68px). */}
                <span
                  aria-hidden
                  className="absolute rounded-full tm:top-0 tm:left-1/2 tm:-translate-x-1/2 top-[21px] -left-[36px]"
                  style={{
                    width: 11,
                    height: 11,
                    background: "var(--accent)",
                    boxShadow: "0 0 0 4px var(--bg)",
                  }}
                />
                <div
                  style={{
                    ...tDisplay("clamp(48px, 5vw, 68px)", 500),
                    color: "var(--accent)",
                    lineHeight: 1,
                  }}
                >
                  {p.num}
                </div>
                <h3
                  className="mb-3"
                  style={{
                    ...tDisplay("clamp(18px, 1.8vw, 24px)", 500),
                    color: "var(--ink)",
                    margin: "20px 0 12px",
                  }}
                >
                  {p.title}
                </h3>
                <p
                  style={{
                    fontSize: 14,
                    color: "var(--muted)",
                    margin: 0,
                    lineHeight: 1.55,
                  }}
                >
                  {p.text}
                </p>
              </div>
            ))}
          </RevealStagger>
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section
        className="px-6 sm:px-10 lg:px-16 py-20 tm:py-28"
        style={{ background: "var(--bg-surface)" }}
      >
        <Reveal y={20}>
          <div className="flex flex-col tm:flex-row justify-between items-start tm:items-end gap-4 tm:gap-0 mb-10 tm:mb-14">
            <div>
              <SectionEyebrow>
                {language === "es" ? "Por qué elegirnos" : "Why us"}
              </SectionEyebrow>
              <h2
                style={{
                  ...tDisplay("clamp(36px, 5vw, 60px)", 500),
                  margin: 0,
                  color: "var(--ink)",
                  maxWidth: 800,
                }}
              >
                {language === "es" ? (
                  <>
                    De la estrategia al <em>éxito</em>, sin desvíos.
                  </>
                ) : (
                  <>
                    From strategy to <em>success</em>, no detours.
                  </>
                )}
              </h2>
            </div>
            <Link
              to="/company"
              className="text-[14px] no-underline whitespace-nowrap"
              style={{
                color: "var(--ink)",
                textDecoration: "underline",
                textUnderlineOffset: 4,
              }}
            >
              {t("about.viewAll")} →
            </Link>
          </div>
        </Reveal>
        <RevealStagger
          stagger={120}
          base={160}
          y={24}
          className="grid grid-cols-1 tm:grid-cols-3 gap-8 tm:gap-10"
          itemClassName="h-full"
        >
          {whyChoose.map((item, idx) => (
            <article
              key={item.title}
              className="flex flex-col h-full"
              style={{ background: "var(--bg-panel)" }}
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <img
                  src={item.img}
                  alt={item.title}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                  loading="lazy"
                />
              </div>
              <div className="p-6 tm:p-7">
                <div className="mb-3" style={tEyebrow("var(--accent)")}>
                  {String(idx + 1).padStart(2, "0")}
                </div>
                <h3
                  className="mb-3"
                  style={{
                    ...tDisplay("clamp(22px, 2.2vw, 26px)", 500),
                    color: "var(--ink)",
                    margin: "0 0 12px",
                  }}
                >
                  {item.title}
                </h3>
                <p
                  className="m-0"
                  style={{
                    fontSize: 14.5,
                    color: "var(--muted)",
                    lineHeight: 1.55,
                  }}
                >
                  {item.text}
                </p>
              </div>
            </article>
          ))}
        </RevealStagger>
      </section>

      {/* BLOG */}
      <section
        className="px-6 sm:px-10 lg:px-16 py-20 tm:py-28"
        style={{ background: "var(--bg)" }}
      >
        <Reveal y={20}>
          <div className="flex flex-col tm:flex-row justify-between items-start tm:items-end gap-4 tm:gap-0 mb-10 tm:mb-14">
            <div>
              <SectionEyebrow>
                {language === "es"
                  ? "Notas y publicaciones"
                  : "Writing & notes"}
              </SectionEyebrow>
              <h2
                style={{
                  ...tDisplay("clamp(34px, 4.5vw, 54px)", 500),
                  margin: 0,
                  color: "var(--ink)",
                }}
              >
                {language === "es" ? (
                  <>
                    Lo último
                    <br />
                    desde el blog.
                  </>
                ) : (
                  <>
                    Recent
                    <br />
                    from our blog.
                  </>
                )}
              </h2>
            </div>
            <Link
              to="/blog"
              className="text-[14px] no-underline whitespace-nowrap"
              style={{
                color: "var(--ink)",
                textDecoration: "underline",
                textUnderlineOffset: 4,
              }}
            >
              {language === "es"
                ? "Ver todos los artículos"
                : "See all articles"}{" "}
              →
            </Link>
          </div>
        </Reveal>
        <RevealStagger
          stagger={130}
          base={160}
          y={20}
          className="grid grid-cols-1 tm:grid-cols-3 gap-0 tm:gap-8"
          itemClassName="h-full"
        >
          {recentPosts.map((post) => {
            const dateStr = new Date(post.date).toLocaleDateString(
              language === "es" ? "es-ES" : "en-US",
              { year: "numeric", month: "long" },
            );
            return (
              <Link
                key={post.slug}
                to={`/blog/${post.slug}`}
                className="flex flex-col h-full no-underline pt-6 pb-5 tm:pb-0 transition-colors duration-150"
                style={{
                  color: "inherit",
                  borderTop: "1px solid var(--navy)",
                }}
              >
                <div
                  className="flex justify-between mb-5"
                  style={tEyebrow("var(--muted)")}
                >
                  <span>
                    {post.category?.[language] || post.category?.es || ""}
                  </span>
                  <span>{dateStr}</span>
                </div>
                <h3
                  className="m-0"
                  style={{
                    ...tDisplay("clamp(20px, 2.2vw, 26px)", 500),
                    color: "var(--ink)",
                    lineHeight: 1.2,
                  }}
                >
                  {post.title?.[language] || post.title?.es}
                </h3>
                <div
                  className="mt-5 italic"
                  style={{
                    fontSize: 13,
                    color: "var(--muted)",
                    fontFamily: FONT.serif,
                  }}
                >
                  {language === "es" ? "Leer artículo" : "Read article"} →
                </div>
              </Link>
            );
          })}
        </RevealStagger>
      </section>
    </>
  );
};
