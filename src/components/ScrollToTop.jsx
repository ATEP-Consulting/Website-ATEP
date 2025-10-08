import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth", // o "auto" si prefieres sin animación
    });
  }, [pathname]);

  return null; // no renderiza nada
}
