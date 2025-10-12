/**
 * Componente Hero para páginas de servicios individuales
 */
const ImageHero = ({ icon: Icon, title, description, backgroundImage }) => {
  const scrollToContent = () => {
    const heroHeight = document.querySelector("section").offsetHeight;
    const headerHeight = 80;
    window.scrollTo({
      top: heroHeight + headerHeight,
      behavior: "smooth",
    });
  };

  return (
    <section className="relative min-h-[600px] md:min-h-[700px] flex items-center justify-center overflow-hidden bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-900">
      {/* Imagen de fondo con overlay oscuro IGUAL que Hero.jsx */}
      <div className="absolute inset-0">
        <img
          src={backgroundImage}
          alt={title}
          className="w-full h-full object-cover"
          loading="lazy"
        />
        {/* ✅ MISMO gradient que Hero.jsx */}
        <div className="absolute inset-0 bg-gradient-to-br from-neutral-900/95 via-neutral-900/85 to-primary-900/80"></div>
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
      <div className="section-container relative z-10 text-center py-20 md:py-32">
        <div className="max-w-4xl mx-auto">
          {/* Icono */}
          <div className="inline-flex items-center justify-center w-20 h-20 lg:w-24 lg:h-24 bg-white/10 backdrop-blur-md rounded-2xl mb-8 fade-in border border-white/20">
            <Icon className="w-10 h-10 lg:w-12 lg:h-12 text-primary-500" />
          </div>

          {/* Título */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 fade-in stagger-1 leading-tight">
            {title}
          </h1>

          {/* Descripción */}
          <p className="text-xl lg:text-2xl text-neutral-300 leading-relaxed fade-in stagger-2 max-w-3xl mx-auto">
            {description}
          </p>

          {/* Línea decorativa */}
          <div className="flex justify-center mt-8 fade-in stagger-3">
            <div className="h-1 w-24 bg-gradient-to-r from-transparent via-primary-500 to-transparent rounded-full"></div>
          </div>
        </div>
      </div>

      {/* Scroll indicator animado */}
      <button
        onClick={scrollToContent}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-2 text-white/80 hover:text-white transition-colors duration-300 group cursor-pointer"
        aria-label="Scroll to content"
      >
        <span className="text-sm font-medium tracking-wider uppercase">
          Scroll
        </span>
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex items-start justify-center p-2 group-hover:border-white/50 transition-colors">
          <div className="w-1.5 h-3 bg-white/60 rounded-full animate-scroll"></div>
        </div>
      </button>
    </section>
  );
};

export default ImageHero;
