import { Link } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext";
import { Calendar, User, ArrowRight } from "lucide-react";

export const BlogCard = ({
  slug,
  title,
  excerpt,
  image,
  author,
  date,
  category,
}) => {
  const { t } = useLanguage();

  return (
    <article className="card group">
      <div className="relative overflow-hidden rounded-lg mb-6">
        <img
          src={image}
          alt={title}
          className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
          loading="lazy"
        />
        {category && (
          <span className="absolute top-4 left-4 bg-primary-600 text-white px-3 py-1 rounded-full text-sm font-medium">
            {category}
          </span>
        )}
      </div>

      <div className="flex items-center gap-4 text-sm text-neutral-500 mb-4">
        <div className="flex items-center gap-2">
          <User className="w-4 h-4" />
          <span>{author}</span>
        </div>
        <div className="flex items-center gap-2">
          <Calendar className="w-4 h-4" />
          <span>{date}</span>
        </div>
      </div>

      <h3 className="heading-sm mb-3 line-clamp-2">{title}</h3>
      <p className="text-body mb-6 line-clamp-3">{excerpt}</p>

      <Link
        to={`/blog/${slug}`}
        className="inline-flex items-center gap-2 text-primary-600 font-semibold hover:gap-3 transition-all duration-200"
      >
        {t("blog.readMore")}
        <ArrowRight className="w-5 h-5" />
      </Link>
    </article>
  );
};
