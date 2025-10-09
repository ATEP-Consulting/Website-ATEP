import { useLanguage } from "../context/LanguageContext";
import { MessageCircle } from "lucide-react";

export const WhatsAppButton = () => {
  const { t } = useLanguage();
  const phoneNumber = "34647748705";
  const message = encodeURIComponent(t("whatsapp.defaultMessage"));

  return (
    <a
      href={`https://wa.me/${phoneNumber}?text=${message}`}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 group"
      aria-label="Contactar por WhatsApp"
    >
      <div className="relative">
        <div className="absolute inset-0 bg-green-500 rounded-full animate-ping opacity-75" />

        <div className="relative bg-green-500 hover:bg-green-600 text-white rounded-full p-4 shadow-2xl transition-all duration-300 group-hover:scale-110">
          <MessageCircle className="w-7 h-7" />
        </div>

        <div className="absolute right-full mr-3 top-1/2 -translate-y-1/2 bg-neutral-800 text-white px-4 py-2 rounded-lg text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
          {t("whatsapp.tooltip")}
          <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 rotate-45 w-2 h-2 bg-neutral-800" />
        </div>
      </div>
    </a>
  );
};
