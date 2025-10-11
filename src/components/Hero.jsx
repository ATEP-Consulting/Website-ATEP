import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Pause,
  Play,
  ArrowRight,
} from "lucide-react";
import { Stats } from "./Stats";
import { getHeroStats } from "../config/heroStats";
import { useLanguage } from "../context/LanguageContext";
import { getServicesData } from "../data/servicesData";

const Hero = () => {
  const { t } = useLanguage();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const slides = getServicesData(t);

  // Auto-play carousel
  useEffect(() => {
    if (!isPlaying) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isPlaying, slides.length]);

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const currentSlideData = slides[currentSlide];

  return (
    <>
      <section className="relative min-h-[600px] md:min-h-[700px] flex flex-col overflow-hidden bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-900">
        {/* Background Image con overlay oscuro */}
        <div className="absolute inset-0">
          {slides.map((slide, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-1000 ${
                index === currentSlide ? "opacity-100" : "opacity-0"
              }`}
            >
              <img
                src={slide.image}
                alt={slide.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-neutral-900/95 via-neutral-900/75 to-neutral-900/40"></div>
            </div>
          ))}
        </div>

        {/* Grid pattern sutil */}
        <div
          className="absolute inset-0 opacity-5 pointer-events-none z-10"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
            backgroundSize: "50px 50px",
          }}
        ></div>

        {/* Contenido principal */}
        <div className="relative z-10 flex-1 flex items-center max-w-7xl mx-auto px-6 py-20 md:py-32">
          <div className="max-w-3xl space-y-8">
            {/* Badge superior con animación */}
            <div
              key={`title-${currentSlide}`}
              className="inline-flex items-center gap-2 px-4 py-2 bg-primary-600/20 backdrop-blur-sm rounded-full border border-primary-500/30 animate-fade-in"
            >
              <span className="w-2 h-2 bg-primary-500 rounded-full animate-pulse"></span>
              <span className="text-sm font-medium text-primary-200">
                {currentSlideData.badge}
              </span>
            </div>

            {/* Título con animación */}
            <h1
              key={`name-${currentSlide}`}
              className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white leading-tight animate-fade-in-up"
            >
              {currentSlideData.name}
            </h1>

            {/* Subtítulo */}
            <p
              key={`description-${currentSlide}`}
              className="text-lg md:text-xl text-neutral-300 leading-relaxed max-w-2xl animate-fade-in-up"
              style={{ animationDelay: "0.1s" }}
            >
              {currentSlideData.description}
            </p>

            <div className="flex flex-col gap-4 sm:flex-row animate-fade-in-up">
              <Link
                to="/contact"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-primary-600 text-neutral-50 font-semibold rounded-lg hover:bg-primary-700 transition-all duration-300 group shadow-xl hover:shadow-2xl"
              >
                {t("CTA.primaryButton")}
                <ArrowRight className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                to="/services"
                className="px-8 py-4 text-center text-white font-semibold rounded-lg border-2 border-white/30 hover:bg-white/10 hover:border-white transition-all duration-300"
              >
                {t("CTA.secondaryButton")}
              </Link>
            </div>
          </div>
        </div>

        {/* Controles del carousel */}
        <div className="absolute bottom-8 left-0 right-0 z-20 hidden md:block">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <button
                  onClick={prevSlide}
                  className="w-11 h-11 flex items-center justify-center bg-white/10 backdrop-blur-sm hover:bg-white/20 rounded-full transition-all duration-300"
                  aria-label="Slide anterior"
                >
                  <ChevronLeft className="w-5 h-5 text-white" />
                </button>

                <button
                  onClick={nextSlide}
                  className="w-11 h-11 flex items-center justify-center bg-white/10 backdrop-blur-sm hover:bg-white/20 rounded-full transition-all duration-300"
                  aria-label="Siguiente slide"
                >
                  <ChevronRight className="w-5 h-5 text-white" />
                </button>
              </div>

              <div className="flex items-center gap-2">
                {slides.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => goToSlide(index)}
                    className="group relative"
                    aria-label={`Ir al slide ${index + 1}`}
                  >
                    <div
                      className={`h-1 rounded-full transition-all duration-300 ${
                        index === currentSlide
                          ? "w-14 bg-primary-500"
                          : "w-9 bg-white/40 hover:bg-white/60"
                      }`}
                    />
                  </button>
                ))}
              </div>

              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="w-11 h-11 flex items-center justify-center bg-white/10 backdrop-blur-sm hover:bg-white/20 rounded-full transition-all duration-300"
                aria-label={
                  isPlaying ? "Pausar carousel" : "Reproducir carousel"
                }
              >
                {isPlaying ? (
                  <Pause className="w-5 h-5 text-white fill-white" />
                ) : (
                  <Play className="w-5 h-5 text-white fill-white ml-0.5" />
                )}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats debajo del Hero */}
      <Stats stats={getHeroStats(t)} />
    </>
  );
};

export default Hero;
