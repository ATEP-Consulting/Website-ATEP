import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext";
import { grantConsent, denyConsent, getStoredConsent } from "../lib/analytics";
import { tEyebrow } from "../lib/typography";

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
      className="fixed left-4 right-4 bottom-4 sm:left-6 sm:bottom-6 sm:right-auto sm:max-w-[440px] z-50 p-5 sm:p-6"
      style={{
        background: "var(--bg)",
        border: "1px solid var(--navy)",
        boxShadow: "0 18px 48px -18px rgba(10,22,38,0.35)",
      }}
    >
      <div className="mb-3" style={tEyebrow("var(--accent)")}>
        — {t("cookieBanner.title")}
      </div>
      <p
        className="m-0 mb-4"
        style={{
          fontSize: 14,
          lineHeight: 1.55,
          color: "var(--ink)",
        }}
      >
        {t("cookieBanner.body")}{" "}
        <Link
          to="/cookies-policy"
          className="underline"
          style={{ color: "var(--ink)", textUnderlineOffset: 3 }}
        >
          {t("cookieBanner.moreInfo")}
        </Link>
        .
      </p>
      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          onClick={handleAccept}
          className="px-5 py-[10px] text-[13px] font-medium tracking-[0.02em] transition-all duration-150 hover:-translate-y-[1px]"
          style={{
            background: "var(--navy)",
            color: "var(--bg)",
            border: "none",
            cursor: "pointer",
          }}
        >
          {t("cookieBanner.accept")}
        </button>
        <button
          type="button"
          onClick={handleReject}
          className="px-5 py-[10px] text-[13px] font-medium tracking-[0.02em] transition-colors duration-150"
          style={{
            background: "transparent",
            color: "var(--ink)",
            border: "1px solid var(--ink)",
            cursor: "pointer",
          }}
        >
          {t("cookieBanner.reject")}
        </button>
      </div>
    </div>
  );
};
