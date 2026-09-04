import { useEffect } from "react";
import { useParams, Navigate, Link } from "react-router-dom";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { useLanguage } from "../../context/LanguageContext";
import { SEO } from "../../components/SEO";
import { Btn } from "../../components/Btn";
import { ProjectPlate } from "../../components/ProjectPlate";
import { Image } from "../../components/Image";
import { cases as casesData } from "../../data/casesData";
import { trackEvent } from "../../lib/analytics";

// Ficha de caso, rediseño 2026.
//
// Se conservan TODOS los campos que mostraba la versión anterior (reto,
// solución, resultados, cita, stack, meta y casos relacionados), el evento
// `view_case` y el <SEO>.

// Los textos largos de casesData vienen como bloques separados por una línea
// en blanco: se pintan como párrafos en vez de como un muro de texto.
const Parrafos = ({ texto = "" }) => (
  <>
    {texto
      .split(/\n\s*\n/)
      .map((p) => p.trim())
      .filter(Boolean)
      .map((p, i) => (
        <p key={i}>{p}</p>
      ))}
  </>
);

export const CasePost = () => {
  const { slug } = useParams();
  const { t, language } = useLanguage();

  const caseItem = casesData.find((c) => c.slug === slug);

  useEffect(() => {
    if (caseItem) trackEvent("view_case", { case: slug });
  }, [slug, caseItem]);

  if (!caseItem) return <Navigate to="/404" replace />;

  const related = casesData.filter((c) => c.slug !== slug).slice(0, 3);

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
        title={caseItem.seoTitle?.[language] || caseItem.title[language]}
        description={caseItem.description[language]}
        keywords={`caso de éxito, case study, ${caseItem.sector[language]}, ${caseItem.client[language]}, ${caseItem.stack.join(", ")}`}
        schemaType="WebPage"
      />

      <section className="rd-hero rd-hero--page">
        <div className="rd-shot rd-shot--cover">
          <Image
            src={caseItem.image || "/images/company/Excellence.webp"}
            alt=""
            sizes="100vw"
            priority
            width={1600}
            height={1000}
          />
          <span className="rd-shot-grade" aria-hidden="true" />
        </div>
        <div className="rd-hero-body">
          <div className="rd-hero-copy">
            <Link className="rd-back" to="/cases">
              <ArrowLeft size={15} strokeWidth={2} />
              {t("megaNav.viewAllCases")}
            </Link>
            <div className="rd-eyebrow">
              <i aria-hidden="true" />
              {caseItem.sector[language]}
            </div>
            <h1 className="rd-h1">{caseItem.title[language]}</h1>
            <p className="rd-hero-sub">{caseItem.description[language]}</p>
            <div className="rd-hero-stat">
              <strong>{caseItem.metric.value}</strong> {caseItem.metric.label[language]}
            </div>
            {caseItem.liveUrl && (
              <div className="rd-ctas">
                <Btn
                  as="a"
                  href={caseItem.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  tone="invert"
                >
                  {language === "es" ? "Ver en producción" : "See it live"}
                </Btn>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Ficha técnica */}
      <section className="rd-sec">
        <dl className="rd-meta" data-stagger>
          {meta.map(([k, v]) => (
            <div key={k}>
              <dt>{k}</dt>
              <dd>{v}</dd>
            </div>
          ))}
        </dl>
      </section>

      {/* Reto y solución */}
      <section className="rd-sec">
        <div className="rd-eyebrow" data-reveal>
          <i aria-hidden="true" />
          {language === "es" ? "El reto" : "The challenge"}
        </div>
        <div className="rd-prose" data-reveal>
          <Parrafos texto={caseItem.challenge[language]} />
        </div>
      </section>

      <section className="rd-sec">
        <div className="rd-eyebrow" data-reveal>
          <i aria-hidden="true" />
          {language === "es" ? "La solución" : "The solution"}
        </div>
        <div className="rd-prose" data-reveal>
          <Parrafos texto={caseItem.solution[language]} />
        </div>
      </section>

      {/* Resultados */}
      {caseItem.results?.length > 0 && (
        <section className="rd-sec">
          <div className="rd-eyebrow" data-reveal>
            <i aria-hidden="true" />
            {t("home.resultsEyebrow")}
          </div>
          <div className="rd-stats" data-stagger>
            {caseItem.results.map((r) => (
              <div key={r.label[language]}>
                <strong>{r.value}</strong>
                <span>{r.label[language]}</span>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Cita del cliente, si la hay */}
      {caseItem.quote && (
        <section className="rd-sec">
          <figure className="rd-quote-big" data-reveal>
            <blockquote>{caseItem.quote[language]}</blockquote>
            {caseItem.quoteAuthor && <figcaption>{caseItem.quoteAuthor[language]}</figcaption>}
          </figure>
        </section>
      )}

      {/* Casos relacionados */}
      {related.length > 0 && (
        <section className="rd-sec">
          <div className="rd-eyebrow" data-reveal>
            <i aria-hidden="true" />
            {t("mega.ourCases")}
          </div>
          <div className="rd-grid3" data-stagger>
            {related.map((c, i) => (
              <ProjectPlate
                key={c.slug}
                as={Link}
                to={`/cases/${c.slug}`}
                index={i}
                name={c.client[language].split("·")[0].trim()}
                sector={c.sector[language]}
                metric={c.metric.value}
                metricLabel={c.metric.label[language]}
              />
            ))}
          </div>
        </section>
      )}

      <section className="rd-sec rd-cta-sec">
        <div className="rd-cta">
          <div className="rd-shot rd-shot--cover">
            <Image src="/images/company/Mission.webp" alt="" sizes="100vw" width={1600} height={1000} />
            <span className="rd-shot-grade" aria-hidden="true" />
          </div>
          <div className="rd-cta-inner" data-stagger>
            <div className="rd-eyebrow is-center">
              <i aria-hidden="true" />
              {t("mega.similarProject")}
            </div>
            <h2 className="rd-h2 rd-cta-title">{t("CTA.title")}</h2>
            <p className="rd-cta-sub">{t("mega.similarProjectText")}</p>
            <div className="rd-cta-btns">
              <Btn
                as={Link}
                to="/contact"
                onClick={() =>
                  trackEvent("cta_click", {
                    location: "case_footer",
                    cta_type: "primary",
                    cta_text: t("CTA.primaryButton"),
                  })
                }
              >
                {t("CTA.primaryButton")}
              </Btn>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
