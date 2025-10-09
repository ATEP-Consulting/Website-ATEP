// src/components/HeroStats.jsx
import { useState, useEffect, useRef } from "react";

/**
 * Componente para mostrar las estadísticas (stats) del Hero con animación de contador
 */
export const Stats = ({ stats = [] }) => {
  if (!stats.length) return null;

  return (
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
  );
};

/**
 * Subcomponente interno que muestra el contador animado
 */
const StatCounter = ({ stat, delay }) => {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  // Detectar cuando el elemento es visible en pantalla
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.1 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  // Animar el contador una vez visible
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
