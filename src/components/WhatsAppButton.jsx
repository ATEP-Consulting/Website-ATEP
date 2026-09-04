import { MessageCircle } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
import { trackEvent } from "../lib/analytics";

export const WhatsAppButton = () => {
  const { t } = useLanguage();
  const phoneNumber = "34647748705";
  const message = encodeURIComponent(t("whatsapp.defaultMessage"));

  return (
    <a
      href={`https://wa.me/${phoneNumber}?text=${message}`}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => trackEvent("whatsapp_click", { location: "floating_button" })}
      className="rd-wa"
      aria-label="WhatsApp"
    >
      <span className="rd-wa-label">{t("whatsapp.tooltip")}</span>
      <span className="rd-wa-dot">
        <MessageCircle size={22} strokeWidth={1.8} />
      </span>
    </a>
  );
};
