import { useEffect } from "react";
import { useLocation } from "react-router-dom";

// Al cambiar de página se sube arriba SIN animación.
//
// Con animación se ve la página nueva desplazándose desde donde estabas en la
// anterior: pasa medio contenido volando por delante antes de parar. El
// scroll suave es para moverse DENTRO de una página, no entre páginas.
// (`scroll-behavior: smooth` está en el CSS; aquí se pisa a propósito.)
export function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [pathname]);

  return null;
}
