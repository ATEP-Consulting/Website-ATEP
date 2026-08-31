import { FONT } from "../lib/typography";

// Panel de cabecera de un caso. NO usa capturas a propósito: parte de los
// proyectos son sistemas internos de clientes y nunca podrán mostrarse, así
// que en una rejilla donde las tarjetas se comparan entre sí lo coherente
// es que todas reciban el mismo tratamiento. En vez de una imagen se
// muestra el dato que de verdad vende: la métrica del proyecto.
//
// Las capturas que sí existen se siguen usando dentro de la ficha del caso,
// donde cada proyecto se ve solo y no hay comparación posible.
export const CaseStripe = ({
  metric,
  metricLabel = "",
  sector = "",
  variant = "navy",
}) => {
  const onNavy = variant === "navy";
  const bg = onNavy ? "var(--navy)" : "var(--bg-surface)";
  const metricColor = onNavy ? "var(--bg)" : "var(--ink)";
  const captionColor = onNavy ? "rgba(245,241,232,0.7)" : "var(--muted)";
  const ruleColor = onNavy ? "rgba(245,241,232,0.18)" : "var(--rule)";

  return (
    <div
      className="relative w-full h-full overflow-hidden flex flex-col justify-between"
      style={{ background: bg, padding: "clamp(20px, 3vw, 32px)" }}
    >
      {sector && (
        <div
          style={{
            fontFamily: FONT.mono,
            fontSize: 10.5,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            color: captionColor,
          }}
        >
          {sector}
        </div>
      )}

      {metric && (
        <div>
          <div
            style={{
              fontFamily: FONT.serif,
              fontSize: "clamp(40px, 5.5vw, 68px)",
              fontWeight: 500,
              lineHeight: 1,
              letterSpacing: "-0.02em",
              color: metricColor,
            }}
          >
            {metric}
          </div>
          {metricLabel && (
            <div
              className="mt-3 pt-3"
              style={{
                borderTop: `1px solid ${ruleColor}`,
                fontSize: 13.5,
                lineHeight: 1.45,
                color: captionColor,
                maxWidth: "34ch",
              }}
            >
              {metricLabel}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
