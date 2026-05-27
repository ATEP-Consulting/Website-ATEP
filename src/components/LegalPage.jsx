import ImageHero from "./ImageHero";
import { Reveal } from "./Reveal";
import { tDisplay, tSerif, tEyebrow } from "../lib/typography";

export const LegalPage = ({
  eyebrow,
  title,
  lastUpdatedLabel,
  lastUpdatedDate,
  intro,
  children,
}) => (
  <>
    <ImageHero eyebrow={eyebrow} title={title} />

    {(lastUpdatedLabel || lastUpdatedDate) && (
      <section
        className="px-6 sm:px-10 lg:px-16 pt-6 pb-2"
        style={{ background: "var(--bg)" }}
      >
        <div
          className="max-w-3xl"
          style={tEyebrow("var(--muted)")}
        >
          {lastUpdatedLabel}
          {lastUpdatedDate ? `: ${lastUpdatedDate}` : null}
        </div>
      </section>
    )}

    <section
      className="px-6 sm:px-10 lg:px-16 py-12 tm:py-20"
      style={{ background: "var(--bg)" }}
    >
      <div className="max-w-3xl">
        {intro && (
          <Reveal y={16}>
            <p
              className="mb-10 italic"
              style={{
                ...tSerif("clamp(17px, 1.4vw, 20px)", 400),
                color: "var(--muted)",
                lineHeight: 1.55,
                margin: 0,
              }}
            >
              {intro}
            </p>
          </Reveal>
        )}
        <div className="space-y-12 mt-10">{children}</div>
      </div>
    </section>
  </>
);

export const LegalSection = ({ title, children }) => (
  <Reveal y={20}>
    <section>
      <h2
        className="mb-5"
        style={{
          ...tDisplay("clamp(22px, 2.4vw, 30px)", 500),
          color: "var(--ink)",
          margin: "0 0 20px",
        }}
      >
        {title}
      </h2>
      <div
        style={{
          ...tSerif("clamp(15px, 1.1vw, 17px)", 400),
          color: "var(--ink)",
          lineHeight: 1.7,
        }}
      >
        {children}
      </div>
    </section>
  </Reveal>
);

export const LegalP = ({ children, muted = false }) => (
  <p
    className="mb-4"
    style={{
      color: muted ? "var(--muted)" : "inherit",
      lineHeight: "inherit",
    }}
  >
    {children}
  </p>
);

export const LegalUl = ({ items }) => (
  <ul className="list-disc pl-6 space-y-2 mb-4">
    {items.map((item, i) => (
      <li key={i}>{item}</li>
    ))}
  </ul>
);
