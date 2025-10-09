import { Globe } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";

export const LanguageSwitcher = () => {
  const { language, toggleLanguage } = useLanguage();

  return (
    <button
      onClick={toggleLanguage}
      className="flex items-center gap-2 px-4 py-2 rounded-lg font-medium text-neutral-700 hover:text-primary-800 hover:bg-primary-100 transition-all duration-300"
      aria-label="Toggle language"
    >
      <Globe className="w-5 h-5" />
      <span className="uppercase">{language}</span>
    </button>
  );
};
