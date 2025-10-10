import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import "./styles/global.css";
import ReactGA from "react-gtag";

ReactGA.initialize("G-GDE5LM5ND1");
ReactGA.pageview(window.location.pathname + window.location.search);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
);
