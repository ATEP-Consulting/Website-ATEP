import { useParams, Navigate, Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { useLanguage } from "../../context/LanguageContext";
import { SEO } from "../../components/SEO";
import { Reveal, RevealStagger } from "../../components/Reveal";
import { CountingNumber } from "../../components/CountingNumber";
import { CaseStripe } from "../../components/CaseStripe";
import { CaseCard } from "../../components/CaseCard";
import { cases, getCaseBySlug } from "../../data/casesData";
import { tDisplay, tSerif, tEyebrow, FONT } from "../../lib/typography";

export const CasePost = () => {
  const { slug } = useParams();
  const { language } = useLanguage();

  const caseItem = getCaseBySlug(slug);
  if (!caseItem) return <Navigate to="/cases" replace />;

  const related = cases
    .filter((c) => c.slug !== slug)
    .sort((a, b) => b.year - a.year)
    .slice(0, 2);

  const meta = [
    [language === "es" ? "Cliente" : "Client", caseItem.client[language]],
    [language === "es" ? "Sector" : "Sector", caseItem.sector[language]],
    [language === "es" ? "Ubicación" : "Location", caseItem.location],
    [language === "es" ? "Duración" : "Duration", caseItem.duration[language]],
    [language === "es" ? "Equipo" : "Team", caseItem.teamSize[language]],
    ["Stack", caseItem.stack.join(" · ")],
    [language === "es" ? "Año" : "Year", String(caseItem.year)],
  ];

  return (
    <>
      <SEO
        title={`${caseItem.title[language]} · ${caseItem.client[language]}`}
        description={caseItem.description[language]}
        keywords={`caso de éxito, case study, ${caseItem.sector[language]}, ${caseItem.client[language]}, ${caseItem.stack.join(", ")}`}
        schemaType="WebPage"
      />

      <article>
        {/* HERO */}
        <header
          className="px-6 sm:px-10 lg:px-16 pt-12 pb-12 tm:pt-20 tm:pb-16"
          style={{
            background: "var(--bg)",
            borderBottom: "1px solid var(--rule)",
          }}
        >
          <Reveal y={12}>
            <Link
              to="/cases"
              className="inline-flex items-center gap-2 mb-8 no-underline transition-colors duration-150"
              style={{
                color: "var(--muted)",
                fontFamily: FONT.mono,
                fontSize: 11.5,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.color = "var(--ink)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.color = "var(--muted)")
              }
            >
              <ArrowLeft size={14} />
              {language === "es" ? "Todos los casos" : "All cases"}
            </Link>
          </Reveal>

          <Reveal y={16}>
            <div
              className="flex flex-wrap items-baseline gap-x-5 gap-y-2 mb-6"
              style={tEyebrow("var(--muted)")}
            >
              <span style={{ color: "var(--accent)" }}>
                {caseItem.sector[language]}
              </span>
              <span>{caseItem.year}</span>
              <span>· {caseItem.location}</span>
            </div>
          </Reveal>

          <Reveal y={28} delay={120} dur={1100}>
            <h1
              className="m-0"
              style={{
                ...tDisplay("clamp(36px, 6vw, 80px)", 500),
                color: "var(--ink)",
                maxWidth: 1100,
              }}
            >
              {caseItem.title[language]}
            </h1>
          </Reveal>

          <Reveal y={20} delay={300}>
            <p
              className="mt-6 tm:mt-8 italic m-0"
              style={{
                ...tSerif("clamp(17px, 1.4vw, 20px)", 400),
                color: "var(--muted)",
                lineHeight: 1.5,
                maxWidth: 800,
              }}
            >
              {caseItem.description[language]}
            </p>
          </Reveal>
        </header>

        {/* COVER */}
        <Reveal y={24} dur={1100}>
          <div
            className="px-6 sm:px-10 lg:px-16 py-10 tm:py-14"
            style={{ background: "var(--bg)" }}
          >
            <div className="overflow-hidden" style={{ aspectRatio: "16/10" }}>
              <CaseStripe
                label={`${caseItem.client[language]} · ${language === "es" ? "captura del producto" : "product screenshot"}`}
                variant="navy"
                image={caseItem.image}
                alt={`${caseItem.client[language]} — ${caseItem.title[language]}`}
              />
            </div>
          </div>
        </Reveal>

        {/* CONTENT GRID */}
        <section
          className="px-6 sm:px-10 lg:px-16 py-10 tm:py-20"
          style={{ background: "var(--bg)" }}
        >
          <div className="grid grid-cols-1 tm:grid-cols-[1fr_2fr] gap-10 tm:gap-24 items-start">
            <aside
              className="tm:sticky tm:top-24 self-start"
            >
              {meta.map(([k, v]) => (
                <div
                  key={k}
                  className="py-4"
                  style={{ borderBottom: "1px solid var(--rule)" }}
                >
                  <div
                    className="mb-[6px]"
                    style={tEyebrow("var(--muted)")}
                  >
                    {k}
                  </div>
                  <div
                    style={{
                      fontSize: 15.5,
                      color: "var(--ink)",
                      lineHeight: 1.5,
                    }}
                  >
                    {v}
                  </div>
                </div>
              ))}
              {caseItem.liveUrl && (
                <div
                  className="py-4"
                  style={{ borderBottom: "1px solid var(--rule)" }}
                >
                  <div
                    className="mb-[6px]"
                    style={tEyebrow("var(--muted)")}
                  >
                    {language === "es" ? "Web" : "Live site"}
                  </div>
                  <a
                    href={caseItem.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-baseline gap-2 transition-colors duration-150"
                    style={{
                      fontSize: 15.5,
                      color: "var(--ink)",
                      lineHeight: 1.5,
                      textDecoration: "underline",
                      textUnderlineOffset: 4,
                      wordBreak: "break-all",
                    }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.color = "var(--accent)")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.color = "var(--ink)")
                    }
                  >
                    {caseItem.liveUrl.replace(/^https?:\/\/(www\.)?/, "")}{" "}
                    <span aria-hidden style={{ fontSize: 12 }}>
                      ↗
                    </span>
                  </a>
                </div>
              )}
            </aside>

            <div>
              {/* Challenge */}
              <Reveal y={20}>
                <h2
                  className="mb-5"
                  style={{
                    ...tDisplay("clamp(26px, 3vw, 40px)", 500),
                    color: "var(--ink)",
                    margin: "0 0 20px",
                  }}
                >
                  {language === "es" ? "El reto" : "The challenge"}
                </h2>
                <p
                  className="m-0 mb-12 tm:mb-16"
                  style={{
                    ...tSerif("clamp(16px, 1.2vw, 18px)", 400),
                    color: "var(--ink)",
                    lineHeight: 1.7,
                  }}
                >
                  {caseItem.challenge[language]}
                </p>
              </Reveal>

              {/* Solution */}
              <Reveal y={20}>
                <h2
                  className="mb-5"
                  style={{
                    ...tDisplay("clamp(26px, 3vw, 40px)", 500),
                    color: "var(--ink)",
                    margin: "0 0 20px",
                  }}
                >
                  {language === "es" ? "Lo que construimos" : "What we built"}
                </h2>
                <p
                  className="m-0 mb-12"
                  style={{
                    ...tSerif("clamp(16px, 1.2vw, 18px)", 400),
                    color: "var(--ink)",
                    lineHeight: 1.7,
                  }}
                >
                  {caseItem.solution[language]}
                </p>
              </Reveal>

              {/* Results */}
              {caseItem.results && caseItem.results.length > 0 && (
                <Reveal y={24}>
                  <div
                    className="grid grid-cols-1 tm:grid-cols-3 gap-8 tm:gap-10 my-10 tm:my-12 p-8 tm:p-12"
                    style={{ background: "var(--bg-surface)" }}
                  >
                    {caseItem.results.map((r, i) => (
                      <Reveal key={r.label[language]} delay={i * 120} y={16}>
                        <div>
                          <div
                            style={{
                              ...tDisplay("clamp(40px, 5vw, 64px)", 500),
                              color: "var(--ink)",
                              lineHeight: 1,
                            }}
                          >
                            <CountingNumber value={r.value} dur={1600} />
                          </div>
                          <div
                            className="mt-3 text-[13.5px]"
                            style={{
                              color: "var(--muted)",
                              lineHeight: 1.45,
                            }}
                          >
                            {r.label[language]}
                          </div>
                        </div>
                      </Reveal>
                    ))}
                  </div>
                </Reveal>
              )}

              {/* Quote (optional) */}
              {caseItem.quote && (
                <Reveal y={28}>
                  <blockquote
                    className="m-0 my-12 tm:my-16 p-6 tm:p-10"
                    style={{
                      borderLeft: "3px solid var(--accent)",
                      ...tDisplay("clamp(20px, 2.2vw, 28px)", 500),
                      color: "var(--ink)",
                      fontStyle: "italic",
                      lineHeight: 1.35,
                    }}
                  >
                    «{caseItem.quote[language]}»
                    {caseItem.quoteAuthor && (
                      <div
                        className="mt-5 not-italic"
                        style={{
                          fontSize: 14,
                          color: "var(--muted)",
                          fontStyle: "normal",
                        }}
                      >
                        — {caseItem.quoteAuthor}
                      </div>
                    )}
                  </blockquote>
                </Reveal>
              )}

              {/* Metric highlight */}
              <Reveal y={20}>
                <div
                  className="mt-12 mb-10 py-8 tm:py-10 flex flex-col tm:flex-row items-baseline gap-3 tm:gap-8"
                  style={{
                    borderTop: "1px solid var(--navy)",
                    borderBottom: "1px solid var(--navy)",
                  }}
                >
                  <div
                    style={{
                      ...tDisplay("clamp(48px, 6vw, 80px)", 500),
                      color: "var(--accent)",
                      lineHeight: 1,
                    }}
                  >
                    {caseItem.metric.value}
                  </div>
                  <div
                    className="italic"
                    style={{
                      ...tSerif("clamp(17px, 1.4vw, 22px)", 400),
                      color: "var(--ink)",
                      lineHeight: 1.4,
                    }}
                  >
                    {caseItem.metric.label[language]}
                  </div>
                </div>
              </Reveal>

              {/* CTAs */}
              <div className="mt-10 flex flex-wrap gap-3">
                <Link
                  to="/contact"
                  className="inline-block px-6 py-[14px] text-[13.5px] font-medium tracking-[0.02em] no-underline transition-all duration-150 hover:-translate-y-[1px]"
                  style={{
                    background: "var(--navy)",
                    color: "var(--bg)",
                  }}
                >
                  {language === "es"
                    ? "Hablar de un proyecto similar"
                    : "Discuss a similar project"}{" "}
                  →
                </Link>
                <Link
                  to="/cases"
                  className="inline-block px-6 py-[14px] text-[13.5px] font-medium tracking-[0.02em] no-underline transition-colors duration-150"
                  style={{
                    background: "transparent",
                    color: "var(--ink)",
                    border: "1px solid var(--ink)",
                  }}
                >
                  {language === "es" ? "Ver todos los casos" : "View all cases"}
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* RELATED */}
        {related.length > 0 && (
          <section
            className="px-6 sm:px-10 lg:px-16 py-16 tm:py-24"
            style={{ background: "var(--bg-surface)" }}
          >
            <Reveal y={20}>
              <div
                className="mb-8 tm:mb-10"
                style={tEyebrow("var(--muted)")}
              >
                — {language === "es" ? "Otros casos" : "Other cases"}
              </div>
            </Reveal>
            <RevealStagger
              stagger={120}
              base={100}
              y={20}
              className="grid grid-cols-1 tm:grid-cols-2 gap-6 tm:gap-8"
            >
              {related.map((rc, i) => (
                <CaseCard
                  key={rc.slug}
                  caseItem={rc}
                  variant={i % 2 === 0 ? "navy" : "cream"}
                />
              ))}
            </RevealStagger>
          </section>
        )}
      </article>
    </>
  );
};
