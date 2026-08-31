import { useEffect, useState } from "react";

// Indicador de scroll del hero: un ratón dibujado en CSS con un punto que
// baja en bucle. Se desvanece en cuanto el visitante empieza a bajar, y con
// prefers-reduced-motion el punto se queda quieto (ver global.css).
export const ScrollCue = ({ target = "#clientes", label = "Bajar" }) => {
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const onScroll = () => setHidden(window.scrollY > 80);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <a
      className={`scroll-cue${hidden ? " is-hidden" : ""}`}
      href={target}
      aria-label={label}
    >
      <span className="scroll-cue__mouse" aria-hidden="true" />
    </a>
  );
};
