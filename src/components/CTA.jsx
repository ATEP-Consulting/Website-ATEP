// src/components/CTA.jsx
import { Link } from "react-router-dom";

/**
 * Componente CTA reutilizable con diseño moderno
 *
 * @param {string} badge - Texto del badge superior (opcional)
 * @param {string} title - Título principal (requerido)
 * @param {string} subtitle - Subtítulo descriptivo (requerido)
 * @param {Object} primaryButton - { text: string, to: string }
 * @param {Object} secondaryButton - { text: string, to: string } (opcional)
 * @param {Array} trustIndicators - Array de strings con los textos (opcional)
 * @param {string} bgGradient - Clases Tailwind para gradiente (default: from-primary-600...)
 * @param {boolean} showDecorations - Mostrar decoraciones (default: true)
 */
const CTA = ({
  badge,
  title,
  subtitle,
  primaryButton,
  secondaryButton,
  trustIndicators = [],
  bgGradient = "from-primary-600 via-primary-700 to-primary-800",
  showDecorations = true,
}) => {
  return (
    <section
      className={`relative section-padding overflow-hidden bg-gradient-to-br ${bgGradient}`}
    >
      {/* Elementos decorativos de fondo */}
      {showDecorations && (
        <>
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2"></div>
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl transform -translate-x-1/2 translate-y-1/2"></div>
          </div>

          {/* Grid pattern sutil */}
          <div
            className="absolute inset-0 opacity-5"
            style={{
              backgroundImage: `radial-gradient(circle, white 1px, transparent 1px)`,
              backgroundSize: "30px 30px",
            }}
          />
        </>
      )}

      <div className="section-container relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          {/* Badge opcional */}
          {badge && (
            <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 bg-white/10 backdrop-blur-sm rounded-full border border-white/20 slide-up">
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
              <span className="text-sm font-medium text-white">{badge}</span>
            </div>
          )}

          {/* Título */}
          <h2 className="text-4xl lg:text-5xl font-bold mb-6 slide-up text-white leading-tight">
            {title}
          </h2>

          {/* Subtítulo */}
          <p className="text-xl lg:text-2xl mb-10 text-primary-100 slide-up stagger-1 leading-relaxed">
            {subtitle}
          </p>

          {/* Botones */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center slide-up stagger-2">
            {/* Botón principal */}
            {primaryButton && (
              <Link
                to={primaryButton.to}
                className="group relative px-8 py-4 bg-white text-primary-600 font-semibold rounded-lg overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-2xl"
              >
                <span className="relative z-10 flex items-center gap-2">
                  {primaryButton.text}
                  <svg
                    className="w-5 h-5 transform group-hover:translate-x-1 transition-transform"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 7l5 5m0 0l-5 5m5-5H6"
                    />
                  </svg>
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-primary-100 to-white opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </Link>
            )}

            {/* Botón secundario opcional */}
            {secondaryButton && (
              <Link
                to={secondaryButton.to}
                className="px-8 py-4 text-white font-semibold rounded-lg border-2 border-white/30 hover:bg-white/10 hover:border-white transition-all duration-300"
              >
                {secondaryButton.text}
              </Link>
            )}
          </div>

          {/* Indicadores de confianza */}
          {trustIndicators.length > 0 && (
            <div className="mt-12 flex flex-wrap justify-center gap-8 text-white/80 text-sm slide-up stagger-3">
              {trustIndicators.map((text, index) => (
                <div key={index} className="flex items-center gap-2">
                  <svg
                    className="w-5 h-5 text-green-400 flex-shrink-0"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span>{text}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default CTA;
