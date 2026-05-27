import { MessageCircle } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";

export const WhatsAppButton = () => {
  const { t } = useLanguage();
  const phoneNumber = "34647748705";
  const message = encodeURIComponent(t("whatsapp.defaultMessage"));

  return (
    <a
      href={`https://wa.me/${phoneNumber}?text=${message}`}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-40 group flex items-center gap-3 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
      aria-label="WhatsApp"
    >
      <span
        className="hidden sm:inline-block px-3 py-2 text-[11px] font-medium uppercase tracking-[0.12em] opacity-0 -translate-x-2 transition-all duration-200 group-hover:opacity-100 group-hover:translate-x-0 pointer-events-none"
        style={{
          background: "var(--bg-panel)",
          color: "var(--ink)",
          border: "1px solid var(--rule)",
          fontFamily:
            '"IBM Plex Mono", ui-monospace, Menlo, monospace',
        }}
      >
        {t("whatsapp.tooltip")}
      </span>
      <span
        className="w-14 h-14 flex items-center justify-center transition-transform duration-200 group-hover:-translate-y-[2px]"
        style={{
          background: "var(--accent)",
          color: "var(--bg)",
          boxShadow: "0 10px 30px -10px rgba(10,22,38,0.35)",
        }}
      >
        <MessageCircle size={22} strokeWidth={1.8} />
      </span>
    </a>
  );
};
