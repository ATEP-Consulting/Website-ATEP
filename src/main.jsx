import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Analytics } from "@vercel/analytics/react";

import "@fontsource/newsreader/400.css";
import "@fontsource/newsreader/500.css";
import "@fontsource/newsreader/600.css";
import "@fontsource/ibm-plex-sans/300.css";
import "@fontsource/ibm-plex-sans/400.css";
import "@fontsource/ibm-plex-sans/500.css";
import "@fontsource/ibm-plex-sans/600.css";
import "@fontsource/ibm-plex-mono/400.css";

import App from "./App.jsx";
import "./styles/tokens.css";
import "./styles/global.css";

// react-snap usa Puppeteer con un user-agent que contiene "ReactSnap".
// Omitimos analytics durante el prerender para evitar que se inyecte el
// script /_vercel/insights/script.js (no existe en el filesystem local y
// Puppeteer rompe con SyntaxError al recibir HTML 404 como JS).
const isPrerender =
  typeof navigator !== "undefined" && /ReactSnap/i.test(navigator.userAgent);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
    {!isPrerender && <Analytics />}
  </StrictMode>
);
