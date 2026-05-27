import { Link } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext";
import { tDisplay, tEyebrow, FONT } from "../lib/typography";

export const ServiceCard = ({
  name,
  description,
  badge,
  path,
  index = 0,
}) => {
  const { language } = useLanguage();
  return (
    <Link
      to={path}
      className="block no-underline p-6 tm:p-7 h-full tm:min-h-[260px] transition-colors duration-150"
      style={{
        color: "inherit",
        background: "transparent",
        border: "1px solid var(--navy)",
      }}
      onMouseEnter={(e) =>
        (e.currentTarget.style.background = "var(--bg-surface)")
      }
      onMouseLeave={(e) =>
        (e.currentTarget.style.background = "transparent")
      }
    >
      <div style={tEyebrow("var(--accent)")}>
        {String(index + 1).padStart(2, "0")}
      </div>
      <h3
        style={{
          ...tDisplay("clamp(22px, 2.4vw, 28px)", 500),
          color: "var(--ink)",
          margin: "14px 0 12px",
        }}
      >
        {name}
      </h3>
      <p
        className="m-0"
        style={{
          fontSize: 14.5,
          lineHeight: 1.55,
          color: "var(--muted)",
        }}
      >
        {description}
      </p>
      {badge && (
        <div
          className="mt-4"
          style={{
            fontFamily: FONT.mono,
            fontSize: 10.5,
            color: "var(--dim)",
            letterSpacing: "0.06em",
            textTransform: "uppercase",
          }}
        >
          {badge}
        </div>
      )}
      <div
        className="mt-5 text-[13px]"
        style={{ color: "var(--ink)" }}
      >
        {language === "es" ? "Leer más" : "Read more"} →
      </div>
    </Link>
  );
};
