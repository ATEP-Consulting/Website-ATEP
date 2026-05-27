import { Link } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext";
import { CaseStripe } from "./CaseStripe";
import { tDisplay, tEyebrow } from "../lib/typography";

export const CaseCard = ({ caseItem, variant = "navy" }) => {
  const { language } = useLanguage();
  const onNavy = variant === "navy";
  const eyebrowColor = onNavy
    ? "rgba(245,241,232,0.55)"
    : "var(--muted)";
  const titleColor = onNavy ? "var(--bg)" : "var(--ink)";
  const clientColor = onNavy ? "rgba(245,241,232,0.7)" : "var(--muted)";
  const ruleColor = onNavy ? "rgba(245,241,232,0.18)" : "var(--rule)";
  const linkColor = onNavy ? "var(--bg)" : "var(--ink)";

  return (
    <Link
      to={`/cases/${caseItem.slug}`}
      className="block no-underline group transition-colors duration-150"
      style={{
        color: "inherit",
        background: onNavy ? "rgba(245,241,232,0.04)" : "var(--bg-panel)",
        border: `1px solid ${ruleColor}`,
      }}
      onMouseEnter={(e) =>
        (e.currentTarget.style.borderColor = "var(--accent)")
      }
      onMouseLeave={(e) => (e.currentTarget.style.borderColor = ruleColor)}
    >
      <div className="relative w-full" style={{ aspectRatio: "16/10" }}>
        <CaseStripe
          label={`${caseItem.client[language]} · ${language === "es" ? "vista previa" : "preview"}`}
          variant={variant}
          image={caseItem.image}
          alt={`${caseItem.client[language]} — ${caseItem.title[language]}`}
        />
      </div>
      <div className="p-6 tm:p-7">
        <div
          className="flex justify-between items-baseline mb-3"
          style={tEyebrow(eyebrowColor)}
        >
          <span>{caseItem.sector[language]}</span>
          <span>{caseItem.year}</span>
        </div>
        <h3
          className="m-0 mb-2"
          style={{
            ...tDisplay("clamp(20px, 2.2vw, 28px)", 500),
            color: titleColor,
            lineHeight: 1.2,
          }}
        >
          {caseItem.title[language]}
        </h3>
        <div
          className="mb-5 text-[14.5px]"
          style={{ color: clientColor }}
        >
          {caseItem.client[language]}
        </div>
        <div
          className="pt-5 flex justify-between items-baseline"
          style={{ borderTop: `1px solid ${ruleColor}` }}
        >
          <div
            style={{
              ...tDisplay("clamp(24px, 2.4vw, 30px)", 500),
              color: "var(--accent)",
              lineHeight: 1,
            }}
          >
            {caseItem.metric.value}
          </div>
          <span
            className="text-[13px] underline transition-transform duration-200 group-hover:translate-x-1"
            style={{
              color: linkColor,
              textUnderlineOffset: 3,
            }}
          >
            {language === "es" ? "Leer caso" : "Read case"} →
          </span>
        </div>
      </div>
    </Link>
  );
};
