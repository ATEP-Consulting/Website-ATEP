import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

export const ServiceCard = ({ icon: Icon, title, description, link }) => {
  return (
    <div className="card group">
      <div className="w-16 h-16 bg-primary-50 rounded-xl flex items-center justify-center mb-6 transition-colors duration-300">
        <Icon className="w-8 h-8 text-primary-600" />
      </div>
      <h3 className="heading-sm mb-4">{title}</h3>
      <p className="text-body mb-6">{description}</p>
      <Link
        to={link}
        className="inline-flex items-center gap-2 text-primary-600 font-semibold hover:gap-3 transition-all duration-200"
      >
        Learn More
        <ArrowRight className="w-5 h-5" />
      </Link>
    </div>
  );
};
