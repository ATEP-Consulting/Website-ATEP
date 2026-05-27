import { useLanguage } from "../context/LanguageContext";

export const LanguageSwitcher = () => {
  const { language, setLanguage } = useLanguage();
  const langs = ["es", "en"];

  return (
    <div
      className="flex items-stretch font-mono"
      style={{ border: "1px solid var(--rule-strong)" }}
    >
      {langs.map((l) => {
        const active = language === l;
        return (
          <button
            key={l}
            type="button"
            onClick={() => setLanguage(l)}
            aria-label={l === "es" ? "Español" : "English"}
            aria-pressed={active}
            className="px-3 py-[5px] text-[11px] font-medium uppercase tracking-[0.12em] transition-colors duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
            style={{
              background: active ? "var(--navy)" : "transparent",
              color: active ? "var(--bg)" : "var(--muted)",
            }}
          >
            {l}
          </button>
        );
      })}
    </div>
  );
};
