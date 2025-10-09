import { useLanguage } from "../context/LanguageContext";

export const ClientLogos = ({ logos }) => {
  const { t } = useLanguage();
  return (
    <section className="py-12 bg-white border-t border-neutral-100">
      <div className="section-container text-center">
        {/* Subtítulo o tagline */}
        <p className="text-sm uppercase tracking-wider text-primary-600 mb-8 slide-up">
          {t("logo.title")}
        </p>

        {/* Contenedor de logos */}
        <div className="flex flex-wrap items-center justify-center gap-10 md:gap-16">
          {logos.map((logo, index) => (
            <img
              key={index}
              src={logo.src}
              alt={logo.alt}
              className="h-12 w-auto grayscale opacity-70 hover:opacity-100 hover:grayscale-0 transition-all duration-300 slide-up stagger-1"
            />
          ))}
        </div>
      </div>
    </section>
  );
};
