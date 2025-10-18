import { Globe } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";

export const LanguageSwitcher = ({ isScrolled = true }) => {
  const { language, toggleLanguage } = useLanguage();

  return (
    <button
      onClick={toggleLanguage}
      className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-500 ${
        isScrolled
          ? "text-neutral-700 hover:text-primary-800 hover:bg-primary-100"
          : "text-white hover:bg-white/10 drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]"
      }`}
      aria-label="Toggle language"
    >
      <Globe className="w-5 h-5" />
      <span className="uppercase">{language}</span>
    </button>
  );
};
