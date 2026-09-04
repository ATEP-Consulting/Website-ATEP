import { useEffect, useRef, useState } from "react";

/**
 * Número que cuenta hasta su valor al entrar en pantalla.
 *
 * Acepta el valor tal cual está escrito en el contenido ("92%", "8h", "0",
 * "46.078", "–92%") y lo descompone en prefijo + número + sufijo, así que no
 * hay que duplicar el dato en ningún sitio ni tocar el i18n.
 *
 * Tres cosas que no son opcionales:
 *   - Cuenta UNA vez, al entrar. Volver a contar al subir marea.
 *   - Con `prefers-reduced-motion` y durante el prerender de react-snap se
 *     pinta el valor final directamente: un número que anima es inaccesible
 *     para quien tiene sensibilidad al movimiento, y en el HTML servido tiene
 *     que aparecer la cifra de verdad, no un cero.
 *   - Se respeta el formato original (separador de miles incluido).
 */
const trocear = (valor) => {
  const texto = String(valor);
  const m = texto.match(/^(\D*?)([\d.,]+)(.*)$/);
  if (!m) return null;
  const [, prefijo, numero, sufijo] = m;
  // "46.078" es cuarenta y seis mil, no 46,078: el punto es separador de miles.
  const limpio = numero.replace(/\./g, "").replace(",", ".");
  const destino = Number(limpio);
  if (!Number.isFinite(destino)) return null;
  return { prefijo, sufijo, destino, usaPuntos: numero.includes("."), decimales: (limpio.split(".")[1] || "").length };
};

export const CountUp = ({ value, duracion = 1400, className }) => {
  const partes = trocear(value);
  const ref = useRef(null);
  const [actual, setActual] = useState(() => (partes ? 0 : null));
  const [listo, setListo] = useState(false);

  useEffect(() => {
    if (!partes || listo) return undefined;
    const nodo = ref.current;
    if (!nodo) return undefined;

    const sinMovimiento =
      (typeof window.matchMedia === "function" &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches) ||
      (typeof navigator !== "undefined" && /ReactSnap/i.test(navigator.userAgent));

    if (sinMovimiento) {
      setActual(partes.destino);
      setListo(true);
      return undefined;
    }

    const io = new IntersectionObserver(
      (entradas) => {
        if (!entradas[0].isIntersecting) return;
        io.disconnect();
        setListo(true);
        const inicio = performance.now();
        const paso = (ahora) => {
          const t = Math.min(1, (ahora - inicio) / duracion);
          // Misma curva que el resto del sistema: rápida al principio y
          // frenando al final, que es como se lee "llega a su sitio".
          const suave = 1 - Math.pow(1 - t, 3);
          setActual(partes.destino * suave);
          if (t < 1) requestAnimationFrame(paso);
          else setActual(partes.destino);
        };
        requestAnimationFrame(paso);
      },
      { threshold: 0.4 },
    );
    io.observe(nodo);
    return () => io.disconnect();
  }, [partes, duracion, listo]);

  if (!partes) return <span className={className}>{value}</span>;

  const n = partes.decimales
    ? actual.toFixed(partes.decimales)
    : Math.round(actual).toString();
  const formateado = partes.usaPuntos && !partes.decimales
    ? Number(n).toLocaleString("es-ES")
    : n;

  return (
    <span ref={ref} className={className}>
      {partes.prefijo}
      {formateado}
      {partes.sufijo}
    </span>
  );
};
