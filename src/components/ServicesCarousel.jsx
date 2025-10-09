import { useState, useEffect } from "react";
import { ServiceCard } from "./ServiceCard";

export const ServicesCarousel = ({ services }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const getVisibleCount = () => {
    if (typeof window === "undefined") return 3;
    if (window.innerWidth >= 1024) return 3;
    if (window.innerWidth >= 768) return 2;
    return 1;
  };

  const [visibleCount, setVisibleCount] = useState(getVisibleCount());

  useEffect(() => {
    const handleResize = () => {
      setVisibleCount(getVisibleCount());
      setCurrentIndex(0);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => {
        const maxIndex = services.length - visibleCount;
        return prev >= maxIndex ? 0 : prev + 1;
      });
    }, 4000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, services.length, visibleCount]);

  const goToSlide = (index) => {
    setIsAutoPlaying(false);
    setCurrentIndex(index);
  };

  return (
    <div className="relative">
      <div className="overflow-hidden">
        <div
          className="grid transition-all duration-500 ease-out"
          style={{
            gridTemplateColumns: `repeat(${services.length}, ${
              100 / visibleCount
            }%)`,
            gap: visibleCount === 1 ? "0" : "2rem",
            transform: `translateX(calc(-${
              currentIndex * (100 / visibleCount)
            }% - ${currentIndex * 2}rem))`,
          }}
        >
          {services.map((service, index) => (
            <div key={`${service.link}-${index}`}>
              <ServiceCard {...service} />
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-center gap-2 mt-8">
        {Array.from({ length: services.length - visibleCount + 1 }).map(
          (_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`h-2 rounded-full transition-all duration-300 ${
                currentIndex === index
                  ? "bg-primary-600 w-8"
                  : "bg-neutral-300 w-2"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          )
        )}
      </div>
    </div>
  );
};
