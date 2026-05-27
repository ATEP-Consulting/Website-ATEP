import { FONT } from "../lib/typography";

export const CaseStripe = ({ label = "", variant = "navy", image, alt }) => {
  const slug = (label || "case")
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/gi, "")
    .toLowerCase();
  const onNavy = variant === "navy";

  // Si hay imagen real, la usamos como cover. Las rayas quedan como
  // fallback para los casos privados (Hampton, Sentra, ATEP Inventory).
  if (image) {
    return (
      <div
        className="relative w-full h-full overflow-hidden"
        style={{ background: onNavy ? "var(--navy)" : "var(--bg-surface)" }}
      >
        <img
          src={image}
          alt={alt || label}
          loading="lazy"
          className="absolute inset-0 w-full h-full object-cover"
          style={{ objectPosition: "center top" }}
        />
      </div>
    );
  }

  return (
    <div
      className="relative w-full h-full overflow-hidden"
      style={{ background: onNavy ? "var(--navy)" : "var(--bg-surface)" }}
    >
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        className="absolute inset-0"
        style={{ opacity: onNavy ? 0.22 : 0.18 }}
      >
        <defs>
          <pattern
            id={`cs-${slug}-${variant}`}
            patternUnits="userSpaceOnUse"
            width="6"
            height="6"
            patternTransform="rotate(45)"
          >
            <rect
              width="3"
              height="6"
              fill={onNavy ? "var(--accent)" : "var(--navy)"}
            />
          </pattern>
        </defs>
        <rect width="100" height="100" fill={`url(#cs-${slug}-${variant})`} />
      </svg>
      {label && (
        <div
          className="absolute inset-0 flex items-center justify-center"
          style={{
            color: onNavy ? "var(--accent)" : "var(--muted)",
            fontFamily: FONT.mono,
            fontSize: 11,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            textAlign: "center",
            padding: "0 16px",
          }}
        >
          {label}
        </div>
      )}
    </div>
  );
};
