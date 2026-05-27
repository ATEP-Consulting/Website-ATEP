// Wrapper alrededor de gtag (GA4) para tracking de eventos custom y gestión
// del consentimiento (Google Consent Mode v2). gtag está cargado en index.html.
//
// El flag analytics_storage arranca en "denied" desde index.html. El banner
// llama a grantConsent() / denyConsent() y la elección se persiste en
// localStorage bajo la key CONSENT_STORAGE_KEY.

const CONSENT_STORAGE_KEY = "atep_cookie_consent_v1";

const gtag = (...args) => {
  if (typeof window === "undefined") return;
  if (typeof window.gtag === "function") {
    window.gtag(...args);
  } else if (Array.isArray(window.dataLayer)) {
    window.dataLayer.push(args);
  }
};

export const trackEvent = (eventName, params = {}) => {
  gtag("event", eventName, params);
};

export const getStoredConsent = () => {
  if (typeof window === "undefined") return null;
  try {
    return localStorage.getItem(CONSENT_STORAGE_KEY);
  } catch {
    return null;
  }
};

export const grantConsent = () => {
  gtag("consent", "update", {
    ad_storage: "granted",
    ad_user_data: "granted",
    ad_personalization: "granted",
    analytics_storage: "granted",
  });
  try {
    localStorage.setItem(CONSENT_STORAGE_KEY, "granted");
  } catch {
    /* localStorage indisponible: ignoramos, el consent vive solo en sesión */
  }
};

export const denyConsent = () => {
  gtag("consent", "update", {
    ad_storage: "denied",
    ad_user_data: "denied",
    ad_personalization: "denied",
    analytics_storage: "denied",
  });
  try {
    localStorage.setItem(CONSENT_STORAGE_KEY, "denied");
  } catch {
    /* idem */
  }
};

// Si en un momento dado se quiere re-aplicar el estado almacenado (p.ej. al
// arrancar la app), basta con leerlo y llamar al update correspondiente. Lo
// hacemos para que GA respete inmediatamente la decisión previa del usuario
// sin esperar a una nueva interacción con el banner.
export const reapplyStoredConsent = () => {
  const stored = getStoredConsent();
  if (stored === "granted") grantConsent();
  else if (stored === "denied") denyConsent();
};
