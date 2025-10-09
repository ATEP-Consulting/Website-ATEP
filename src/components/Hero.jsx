// src/components/Hero.jsx
import { Link } from "react-router-dom";
import { useState, useEffect, useRef } from "react";

/**
 * Componente Hero principal con contador animado
 */
const Hero = ({
  badge,
  title,
  subtitle,
  primaryButton,
  secondaryButton,
  image,
  stats = [],
}) => {
  return (
    <section className="relative min-h-[calc(100vh-64px)] md:min-h-[calc(100vh-80px)] flex flex-col overflow-hidden bg-white">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute w-[600px] h-[600px] bg-primary-100 rounded-full filter blur-3xl opacity-20"
          style={{
            top: "-10rem",
            right: "-10rem",
          }}
        ></div>
      </div>{" "}
      {/* Grid pattern sutil */}
      <div
        className="absolute inset-0 opacity-5 pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.05) 1px, transparent 1px)`,
          backgroundSize: "50px 50px",
        }}
      ></div>
      {/* Contenido principal - Hero */}
      <div className="flex items-center section-container relative z-10 pt-12 md:pt-32 pb-8 md:pb-12">
        <div className="grid lg:grid-cols-2 gap-12 items-center w-full">
          {/* Contenido izquierdo */}
          <div className="space-y-8">
            {/* Badge superior */}
            {badge && (
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary-100/50 backdrop-blur-sm rounded-full border border-primary-200/50 fade-in">
                <span className="w-2 h-2 bg-primary-600 rounded-full animate-pulse"></span>
                <span className="text-sm font-medium text-primary-700">
                  {badge}
                </span>
              </div>
            )}

            {/* Título */}
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-neutral-900 leading-tight fade-in stagger-1">
              {title}
            </h1>

            {/* Subtítulo */}
            <p className="text-xl lg:text-2xl text-neutral-600 leading-relaxed fade-in stagger-2">
              {subtitle}
            </p>

            {/* Botones */}
            <div className="flex flex-col sm:flex-row gap-4 fade-in stagger-3">
              {primaryButton && (
                <Link to={primaryButton.to} className="btn-primary">
                  <span className="relative z-10 flex items-center justify-center gap-2">
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
                </Link>
              )}

              {secondaryButton && (
                <Link to={secondaryButton.to} className="btn-outline">
                  {secondaryButton.text}
                </Link>
              )}
            </div>
          </div>

          {/* Imagen derecha */}
          <div className="relative fade-in stagger-2">
            {/* Decoración detrás de la imagen */}
            <div className="absolute -inset-4 bg-gradient-to-br from-primary-200 to-primary-300 rounded-3xl blur-2xl opacity-30 animate-pulse"></div>

            {/* Imagen principal */}
            <div className="relative rounded-3xl overflow-hidden shadow-2xl">
              <img
                src={image}
                alt={title}
                className="w-full h-full object-cover"
              />

              {/* Overlay sutil */}
              <div className="absolute inset-0 bg-gradient-to-tr from-primary-600/10 to-transparent"></div>
            </div>
          </div>
        </div>
      </div>
      {/* Stats en grande abajo */}
      {stats.length > 0 && (
        <div className="section-container relative z-10 py-16 md:pb-20">
          <div className="max-w-6xl mx-auto">
            {/* Grid de stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
              {stats.map((stat, index) => (
                <StatCounter key={index} stat={stat} delay={index * 100} />
              ))}
            </div>
          </div>
        </div>
      )}
      {/* Scroll indicator - oculto en móvil con más espacio arriba */}
      <div className="hidden md:block absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <svg
          className="w-6 h-6 text-neutral-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 14l-7 7m0 0l-7-7m7 7V3"
          />
        </svg>
      </div>
    </section>
  );
};

// Componente contador animado - MEJORADO Y MÁS GRANDE
const StatCounter = ({ stat, delay }) => {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    const numberMatch = stat.number.match(/\d+/);
    if (!numberMatch) return;

    const target = parseInt(numberMatch[0]);
    const duration = 2000;
    const steps = 60;
    const increment = target / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [isVisible, stat.number, delay]);

  const getSuffix = () => {
    if (stat.number.includes("+")) return "+";
    if (stat.number.includes("%")) return "%";
    return "";
  };

  return (
    <div ref={ref} className="text-center fade-in stagger-4">
      <div className="text-5xl md:text-6xl lg:text-7xl font-bold text-primary-600 tabular-nums mb-3">
        {count}
        {getSuffix()}
      </div>
      <div className="text-base md:text-lg text-neutral-600 font-medium">
        {stat.label}
      </div>
    </div>
  );
};

export default Hero;
