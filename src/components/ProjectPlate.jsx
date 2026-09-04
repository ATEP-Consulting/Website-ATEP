import { ArrowUpRight } from "lucide-react";

/**
 * Placa de proyecto — sustituye a la captura de pantalla.
 *
 * Estrictamente MONOCROMA: el único acento es la luz. Si cada proyecto
 * trajera su color, la rejilla dejaría de leerse como un sistema y pasaría a
 * leerse como cuatro tarjetas sueltas — que es justo lo que había que evitar.
 * Lo que distingue a un proyecto de otro es el número, el nombre y la cifra,
 * no el color.
 *
 * Igual que el mega menú: el aspecto lo pone el CSS (`.mo .pl-*`), nunca el
 * componente.
 */
export const ProjectPlate = ({
  index,
  name,
  sector,
  metric,
  metricLabel,
  size = "md",
  as: As = "a",
  ...rest
}) => (
  // `as` permite que la placa SEA el enlace en vez de ir dentro de uno:
  // anidar dos <a> es HTML inválido y rompe la navegación por teclado.
  // Sin aria-label: la placa ya contiene el sector, el nombre y la cifra como
  // texto visible, y un aria-label más pobre que ese contenido sustituía al
  // nombre accesible en vez de mejorarlo (incumplía "Label in Name").
  <As className={`rd-plate rd-plate--${size}`} {...rest}>
    <span className="rd-plate-grid" aria-hidden="true" />
    <span className="rd-plate-glow" aria-hidden="true" />

    <span className="rd-plate-top">
      <span className="rd-plate-num">{String(index + 1).padStart(2, "0")}</span>
      <span className="rd-plate-go" aria-hidden="true">
        <ArrowUpRight size={16} strokeWidth={2} />
      </span>
    </span>

    <span className="rd-plate-body">
      <span className="rd-plate-sector">{sector}</span>
      <span className="rd-plate-name">{name}</span>
      <span className="rd-plate-rule" aria-hidden="true" />
      <span className="rd-plate-metric">
        <strong>{metric}</strong>
        <span>{metricLabel}</span>
      </span>
    </span>
  </As>
);
