import { useEffect } from "react";
import { trackEvent } from "./analytics";

// Qué busca la gente en el blog y en los casos es la mejor pista para saber
// qué contenido falta por escribir. Se envía con retardo para registrar la
// búsqueda terminada, no cada tecla.
export const useSearchTracking = (query, eventName) => {
  useEffect(() => {
    const term = query.trim();
    if (term.length < 3) return undefined;
    const timer = setTimeout(() => {
      trackEvent(eventName, { search_term: term.toLowerCase() });
    }, 900);
    return () => clearTimeout(timer);
  }, [query, eventName]);
};
