import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

export const ServiceCard = ({
  icon: Icon,
  title,
  description,
  link,
  image,
}) => {
  return (
    <div className="group relative bg-white rounded-lg overflow-hidden border border-neutral-200">
      {/* Imagen con overlay */}
      <div className="relative h-64">
        <img src={image} alt={title} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
      </div>

      {/* Icono circular superpuesto - FUERA del contenedor de imagen */}
      <div className="absolute top-56 left-8 w-16 h-16 bg-primary-600 rounded-full flex items-center justify-center shadow-lg z-10">
        <Icon className="w-8 h-8 text-white" />
      </div>

      {/* Contenido */}
      <div className="relative p-8 pt-12">
        {/* Título */}
        <h3 className="text-xl lg:text-2xl font-bold text-neutral-900 mb-4">
          {title}
        </h3>

        {/* Descripción */}
        <p className="text-base text-neutral-600 leading-relaxed mb-6">
          {description}
        </p>

        {/* Link */}
        <Link
          to={link}
          className="inline-flex items-center gap-2 text-primary-600 font-semibold transition-colors duration-300 group-hover:text-primary-700"
        >
          <span>Read More</span>
          <ArrowRight className="w-5 h-5 transform transition-transform duration-300 group-hover:translate-x-1" />
        </Link>
      </div>
    </div>
  );
};
