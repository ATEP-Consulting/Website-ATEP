import { Link } from "react-router-dom";
import { tDisplay, tEyebrow } from "../lib/typography";
import { trackEvent } from "../lib/analytics";

const CTA = ({
  badge,
  title,
  subtitle,
  primaryButton,
  secondaryButton,
  trustIndicators = [],
  location = "global_footer",
}) => {
  return (
    <section
      className="relative px-6 sm:px-10 lg:px-16 py-20 lg:py-28"
      style={{ background: "var(--bg-surface)" }}
    >
      <div className="mx-auto max-w-4xl text-center">
        {badge && (
          <div
            className="mb-8 inline-block"
            style={tEyebrow("var(--accent)")}
          >
            — {badge}
          </div>
        )}

        <h2
          className="mb-8"
          style={{
            ...tDisplay("clamp(36px, 5vw, 64px)", 500),
            color: "var(--ink)",
          }}
        >
          {title}
        </h2>

        <p
          className="mx-auto mb-12 max-w-2xl"
          style={{
            fontSize: 18,
            lineHeight: 1.55,
            color: "var(--muted)",
          }}
        >
          {subtitle}
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          {primaryButton && (
            <Link
              to={primaryButton.to}
              onClick={() =>
                trackEvent("cta_click", {
                  location,
                  cta_type: "primary",
                  cta_text: primaryButton.text,
                })
              }
              className="inline-block px-8 py-4 text-[14px] font-medium tracking-[0.02em] no-underline transition-all duration-150 hover:-translate-y-[1px]"
              style={{ background: "var(--navy)", color: "var(--bg)" }}
            >
              {primaryButton.text} →
            </Link>
          )}

          {secondaryButton && (
            <Link
              to={secondaryButton.to}
              onClick={() =>
                trackEvent("cta_click", {
                  location,
                  cta_type: "secondary",
                  cta_text: secondaryButton.text,
                })
              }
              className="inline-block px-8 py-4 text-[14px] font-medium tracking-[0.02em] no-underline transition-colors duration-150"
              style={{
                color: "var(--ink)",
                border: "1px solid var(--ink)",
                background: "transparent",
              }}
            >
              {secondaryButton.text}
            </Link>
          )}
        </div>

        {trustIndicators.length > 0 && (
          <div
            className="mt-14 flex flex-wrap justify-center gap-x-8 gap-y-3"
            style={tEyebrow("var(--muted)")}
          >
            {trustIndicators.map((text, i) => (
              <span key={i} className="inline-flex items-center gap-2">
                {i > 0 && (
                  <span aria-hidden style={{ color: "var(--dim)" }}>
                    ·
                  </span>
                )}
                {text}
              </span>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default CTA;
