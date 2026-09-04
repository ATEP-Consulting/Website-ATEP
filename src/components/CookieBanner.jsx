import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext";
import { grantConsent, denyConsent, getStoredConsent } from "../lib/analytics";

export const CookieBanner = () => {
  const { t } = useLanguage();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (getStoredConsent() === null) setVisible(true);
  }, []);

  if (!visible) return null;

  const handleAccept = () => {
    grantConsent();
    setVisible(false);
  };

  const handleReject = () => {
    denyConsent();
    setVisible(false);
  };

  return (
    <div
      role="dialog"
      aria-label={t("cookieBanner.ariaLabel")}
      className="rd-cookies"
    >
      <div className="rd-eyebrow">
        <i aria-hidden="true" />
        {t("cookieBanner.title")}
      </div>
      <p className="rd-card-text">
        {t("cookieBanner.body")}{" "}
        <Link to="/cookies-policy">{t("cookieBanner.moreInfo")}</Link>.
      </p>
      <div className="rd-cookies-actions">
        <button type="button" onClick={handleAccept} className="rd-cookies-accept">
          {t("cookieBanner.accept")}
        </button>
        <button type="button" onClick={handleReject} className="rd-cookies-reject">
          {t("cookieBanner.reject")}
        </button>
      </div>
    </div>
  );
};
