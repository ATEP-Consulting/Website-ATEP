import { useRef } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { ScrollProgress } from "../components/ScrollProgress";
import { WhatsAppButton } from "../components/WhatsAppButton";
import { CookieBanner } from "../components/CookieBanner";
import { useScrollReveal } from "../lib/useScrollReveal";

export const MainLayout = () => {
  const rootRef = useRef(null);
  const { pathname } = useLocation();

  // Un solo observador para toda la web, RE-ARMADO en cada cambio de ruta:
  // este layout no se vuelve a montar al navegar, así que sin la dependencia
  // las secciones de la página nueva nunca se observarían y se quedarían
  // invisibles. Ver src/lib/useScrollReveal.js.
  useScrollReveal(rootRef, [pathname]);

  return (
    // `rd` acota toda la piel del rediseño: nada del CSS nuevo se aplica
    // fuera de este árbol.
    <div className="rd min-h-screen flex flex-col" ref={rootRef}>
      <ScrollProgress />
      <Header />
      {/* Sin `max-w` aquí: el hero va a sangre y cada sección pone su propia
          anchura máxima con --maxw. */}
      <main className="flex-grow w-full">
        <Outlet />
      </main>
      <Footer />
      {/* Dentro del ámbito `rd`: fuera de él no ven las variables de la
          piel y se quedan sin fondo ni color. */}
      <WhatsAppButton />
      <CookieBanner />
    </div>
  );
};
