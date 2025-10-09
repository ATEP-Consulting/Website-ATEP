import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

export const ServiceCard = ({ icon: Icon, title, description, link, image, index = 0 }) => {
  const cardRef = useRef(null);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!cardRef.current) return;

      const rect = cardRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const cardCenter = rect.top + rect.height / 2;
      const scrollProgress = (windowHeight - cardCenter) / windowHeight;

      setOffset(scrollProgress * 30);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div
      ref={cardRef}
      className="group relative bg-white rounded-2xl overflow-hidden transition-all duration-500 hover:shadow-2xl"
      style={{
        transform: `translateY(${index * 20}px)`,
        zIndex: 10 - index
      }}
    >
      <div className="flex flex-col md:flex-row">
        <div className="relative w-full md:w-2/5 h-64 md:h-auto overflow-hidden bg-gradient-to-br from-primary-100 to-primary-50">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110"
            style={{
              transform: `translateY(${offset}px)`
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-transparent to-black/10"></div>

          <div className="absolute top-6 left-6 w-14 h-14 bg-white/95 backdrop-blur-sm rounded-xl flex items-center justify-center shadow-lg transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6">
            <Icon className="w-7 h-7 text-primary-600" />
          </div>
        </div>

        <div className="flex-1 p-8 md:p-10 flex flex-col justify-center">
          <h3 className="text-2xl md:text-3xl font-bold mb-4 transition-colors duration-300 group-hover:text-primary-600">
            {title}
          </h3>
          <p className="text-neutral-600 leading-relaxed mb-6 text-base md:text-lg">
            {description}
          </p>
          <Link
            to={link}
            className="inline-flex items-center gap-2 text-primary-600 font-semibold hover:gap-4 transition-all duration-300 group/link"
          >
            <span>Learn More</span>
            <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover/link:translate-x-1" />
          </Link>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-primary-500 via-primary-600 to-primary-700 transform scale-x-0 origin-left transition-transform duration-500 group-hover:scale-x-100"></div>
    </div>
  );
};
