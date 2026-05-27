import { Moon, Sun } from "lucide-react";
import { useTheme } from "../context/ThemeContext";
import { useLanguage } from "../context/LanguageContext";

export const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();
  const { t } = useLanguage();
  const isDark = theme === "dark";
  const label = isDark ? t("theme.toLight") : t("theme.toDark");

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={label}
      className="relative w-16 h-[30px] p-[3px] bg-transparent cursor-pointer flex items-center focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
      style={{ border: "1px solid var(--rule-strong)" }}
    >
      <span
        aria-hidden
        className="absolute top-[3px] w-[26px] h-[22px] flex items-center justify-center transition-all duration-200"
        style={{
          left: isDark ? "33px" : "3px",
          background: "var(--navy)",
          color: "var(--bg)",
        }}
      >
        {isDark ? <Moon size={12} /> : <Sun size={12} />}
      </span>
    </button>
  );
};
