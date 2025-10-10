import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";

export const ServiceCard = ({ icon: Icon, name, description, path, image }) => {
  const { t } = useLanguage();
  return (
    <div className="group relative bg-white rounded-lg overflow-hidden border border-neutral-200 h-full flex flex-col">
      <div className="relative h-64 flex-shrink-0">
        <img src={image} alt={name} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
      </div>

      <div className="absolute top-56 left-8 w-16 h-16 bg-primary-600 rounded-full flex items-center justify-center shadow-lg z-10">
        <Icon className="w-8 h-8 text-white" />
      </div>

      <div className="relative p-8 pt-12 flex flex-col flex-grow">
        <h3 className="text-xl lg:text-2xl font-bold text-neutral-900 mb-4">
          {name}
        </h3>

        <p className="text-base text-neutral-600 leading-relaxed mb-6 flex-grow">
          {description}
        </p>

        <Link
          to={path}
          className="inline-flex items-center gap-2 text-primary-600 font-semibold transition-colors duration-300 group-hover:text-primary-700"
        >
          <span>{t("services.readMore")}</span>
          <ArrowRight className="w-5 h-5 transform transition-transform duration-300 group-hover:translate-x-1" />
        </Link>
      </div>
    </div>
  );
};
