import { Link } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext";
import { tDisplay, tEyebrow } from "../lib/typography";

export const BlogCard = ({
  slug,
  title,
  excerpt,
  image,
  author,
  date,
  category,
}) => {
  const { language } = useLanguage();
  const dateStr = date
    ? new Date(date).toLocaleDateString(
        language === "es" ? "es-ES" : "en-US",
        { year: "numeric", month: "long", day: "numeric" }
      )
    : "";

  return (
    <Link
      to={`/blog/${slug}`}
      className="block no-underline group h-full"
      style={{ color: "inherit" }}
    >
      <article
        className="flex flex-col h-full"
        style={{ background: "var(--bg-panel)" }}
      >
        {image && (
          <div className="relative overflow-hidden aspect-[4/3]">
            <img
              src={image}
              alt={title}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              loading="lazy"
            />
          </div>
        )}
        <div
          className="p-5 tm:p-6 flex-1 flex flex-col"
          style={{ borderTop: "1px solid var(--rule)" }}
        >
          <div
            className="flex justify-between items-baseline mb-4"
            style={tEyebrow("var(--muted)")}
          >
            {category && <span style={{ color: "var(--accent)" }}>{category}</span>}
            {dateStr && <span>{dateStr}</span>}
          </div>
          <h3
            className="mb-3"
            style={{
              ...tDisplay("clamp(18px, 1.8vw, 22px)", 500),
              color: "var(--ink)",
              lineHeight: 1.25,
              margin: 0,
            }}
          >
            {title}
          </h3>
          {excerpt && (
            <p
              className="m-0 mt-3 line-clamp-3"
              style={{
                fontSize: 14,
                color: "var(--muted)",
                lineHeight: 1.55,
              }}
            >
              {excerpt}
            </p>
          )}
          <div
            className="mt-5 pt-4 flex justify-between items-baseline"
            style={{
              borderTop: "1px solid var(--rule)",
            }}
          >
            {author && (
              <span style={{ fontSize: 12.5, color: "var(--muted)" }}>
                {author}
              </span>
            )}
            <span
              className="text-[13px] transition-transform duration-200 group-hover:translate-x-1"
              style={{ color: "var(--ink)" }}
            >
              {language === "es" ? "Leer" : "Read"} →
            </span>
          </div>
        </div>
      </article>
    </Link>
  );
};
