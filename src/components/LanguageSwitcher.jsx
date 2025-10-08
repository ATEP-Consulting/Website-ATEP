import { Globe } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export const LanguageSwitcher = () => {
  const { language, toggleLanguage } = useLanguage();

  return (
    <button
      onClick={toggleLanguage}
      className="flex items-center gap-2 px-3 py-2 rounded-lg text-neutral-700 hover:bg-neutral-100 transition-colors duration-200"
      aria-label="Toggle language"
    >
      <Globe className="w-5 h-5" />
      <span className="font-medium uppercase">{language}</span>
    </button>
  );
};
