// Plantilla de las páginas legales, rediseño 2026.
//
// La API se conserva exacta (LegalPage, LegalSection, LegalP, LegalUl) para
// que las tres páginas que la usan no necesiten cambios: sólo cambia la piel.

export const LegalPage = ({
  eyebrow,
  title,
  lastUpdatedLabel,
  lastUpdatedDate,
  intro,
  children,
}) => (
  <>
    <section className="rd-hero rd-hero--legal">
      <div className="rd-hero-body">
        <div className="rd-hero-copy">
          <div className="rd-eyebrow">
            <i aria-hidden="true" />
            {eyebrow}
          </div>
          <h1 className="rd-h1">{title}</h1>
          {(lastUpdatedLabel || lastUpdatedDate) && (
            <div className="rd-legal-date">
              {lastUpdatedLabel}
              {lastUpdatedDate ? `: ${lastUpdatedDate}` : null}
            </div>
          )}
        </div>
      </div>
    </section>

    <section className="rd-sec">
      <div className="rd-prose rd-legal">
        {intro && <p className="rd-legal-intro">{intro}</p>}
        {children}
      </div>
    </section>
  </>
);

export const LegalSection = ({ title, children }) => (
  <section className="rd-legal-section" data-reveal>
    <h2>{title}</h2>
    {children}
  </section>
);

export const LegalP = ({ children, muted = false }) => (
  <p className={muted ? "rd-legal-muted" : undefined}>{children}</p>
);

export const LegalUl = ({ items }) => (
  <ul>
    {items.map((item, i) => (
      <li key={i}>{item}</li>
    ))}
  </ul>
);
