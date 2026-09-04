import { ArrowRight } from "lucide-react";

/**
 * Botón del sistema.
 *
 * Dos cosas al pasar por encima, a la vez y con la misma curva:
 *   - La etiqueta rueda: la copia visible sube y sale, y una copia idéntica
 *     entra desde abajo. Por eso el texto va DUPLICADO en el marcado; la
 *     segunda copia es decorativa y va oculta a lectores de pantalla.
 *   - La flecha gira -45°, de → a ↗.
 *
 * El componente no sabe de color: todo lo pone la piel (`.rd .rd-btn-*`). Así
 * un cambio de paleta no obliga a tocar el marcado.
 */
export const Btn = ({
  children,
  tone = "solid",
  size = "md",
  as: As = "button",
  ...rest
}) => (
  <As
    className={`rd-btn rd-btn--${tone} rd-btn--${size}`}
    {...(As === "button" ? { type: "button" } : {})}
    {...rest}
  >
    <span className="rd-btn-label">
      <span>{children}</span>
      <span aria-hidden="true">{children}</span>
    </span>
    <span className="rd-btn-arrow" aria-hidden="true">
      <ArrowRight size={size === "sm" ? 14 : 16} strokeWidth={2.2} />
    </span>
  </As>
);
