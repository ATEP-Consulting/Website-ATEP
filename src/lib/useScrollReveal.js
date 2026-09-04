import { useLayoutEffect } from "react";

/**
 * Revelado por scroll para todo el documento con UN SOLO IntersectionObserver.
 *
 * Marca los elementos en el JSX con `data-reveal` (entra él) o `data-stagger`
 * (entran sus hijos en cascada) y el hook les pone la clase `is-in` cuando
 * asoman. El resto lo hace el CSS.
 *
 * Tres decisiones que importan:
 *   - Un observador para toda la página, no uno por elemento. Con treinta
 *     secciones, treinta observadores es trabajo tirado a la basura.
 *   - Se deja de observar en cuanto un elemento entra: el revelado ocurre una
 *     vez. Volver a animar al subir marea y hace la página lenta de leer.
 *   - Con `prefers-reduced-motion` no se observa nada: se marca todo visible
 *     al montar y no se anima. No es un adorno accesible, es que sin esto la
 *     página resulta inusable para quien tiene sensibilidad al movimiento.
 *   - Hay que RE-ARMARLO en cada cambio de ruta. El layout no se vuelve a
 *     montar al navegar, así que si sólo se observa al montar, las secciones
 *     de la página nueva no se observan nunca y se quedan en opacity 0. Con
 *     F5 funcionaba y navegando no: ese era el síntoma.
 *   - El estado oculto lo activa la clase `reveal-ready`, que pone este hook.
 *     Si el JavaScript falla o no llega a ejecutarse, la clase no aparece y
 *     el contenido se ve entero. Sin esa salvaguarda, un error de JS deja la
 *     página en blanco de la primera sección hacia abajo.
 *   - Durante el prerender de react-snap no se arma nada y se marca todo
 *     visible: si no, el HTML generado saldría con medio contenido a
 *     opacity 0 y eso es lo que vería Google.
 *   - `useLayoutEffect` y no `useEffect`: la clase tiene que estar puesta
 *     ANTES del primer pintado, o se ve un parpadeo del contenido visible
 *     justo antes de esconderse.
 */
export const useScrollReveal = (rootRef, deps = []) => {
  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return undefined;

    // react-snap ejecuta el JavaScript antes de guardar el HTML. Si armamos
    // el observador durante el prerender, la página se congela con todo lo
    // que está bajo el pliegue en opacity: 0 y eso es lo que acabaría en el
    // HTML servido y en lo que ve un crawler. Mismo criterio que main.jsx
    // con Analytics.
    const isPrerender =
      typeof navigator !== "undefined" && /ReactSnap/i.test(navigator.userAgent);

    // Sólo lo que aún no se ha revelado: al re-armar en cada navegación no
    // tiene sentido volver a observar lo que ya está visible.
    const items = root.querySelectorAll(
      "[data-reveal]:not(.is-in), [data-stagger]:not(.is-in)",
    );

    if (isPrerender) {
      items.forEach((el) => el.classList.add("is-in"));
      return undefined;
    }
    const reduce =
      typeof window.matchMedia === "function" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduce) {
      items.forEach((el) => el.classList.add("is-in"));
      return undefined;
    }

    // A partir de aquí sabemos que el observador va a funcionar, así que ya
    // se puede esconder el contenido.
    root.classList.add("reveal-ready");

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-in");
          io.unobserve(entry.target);
        });
      },
      // El margen negativo abajo hace que el elemento entre cuando ya se ve
      // de verdad, no al asomar un pixel.
      { rootMargin: "0px 0px -12% 0px", threshold: 0.05 },
    );

    items.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, deps);
};
