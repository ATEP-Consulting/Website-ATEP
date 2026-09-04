import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
import { Image } from "./Image";

// Tarjeta de artículo, rediseño 2026. Mismos props que antes.

export const BlogCard = ({ slug, title, excerpt, image, author, date, category }) => {
  const { language } = useLanguage();
  const fecha = date
    ? new Date(date).toLocaleDateString(language === "es" ? "es-ES" : "en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      })
    : "";

  return (
    <Link to={`/blog/${slug}`} className="rd-post">
      {image && (
        <span className="rd-post-media">
          <Image src={image} alt="" sizes="(max-width: 900px) 100vw, 33vw" width={800} height={500} />
          <span className="rd-shot-grade" aria-hidden="true" />
        </span>
      )}
      <span className="rd-post-cat">{category}</span>
      <h3>{title}</h3>
      <p className="rd-card-text">{excerpt}</p>
      <span className="rd-post-foot">
        <span>
          {author}
          {fecha && ` · ${fecha}`}
        </span>
        <span className="rd-post-go" aria-hidden="true">
          <ArrowUpRight size={16} strokeWidth={2} />
        </span>
      </span>
    </Link>
  );
};
