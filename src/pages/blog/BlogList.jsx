import { useEffect, useState } from "react";
import { Search } from "lucide-react";
import { useLanguage } from "../../context/LanguageContext";
import { SEO } from "../../components/SEO";
import { useSearchTracking } from "../../lib/useSearchTracking";
import { BlogCard } from "../../components/BlogCard";
import { Image } from "../../components/Image";
import { blogPosts } from "../../data/blogData";

// Índice del blog, rediseño 2026.
//
// La lógica de búsqueda, filtro y paginación se conserva TAL CUAL: es lo que
// alimenta el evento `blog_search` y lo que hace que react-snap descubra los
// artículos de la primera página. Sólo cambia la piel.

export const BlogList = () => {
  const { t, language } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  useSearchTracking(searchTerm, "blog_search");

  // al cambiar el filtro o la búsqueda se vuelve a la primera página
  useEffect(() => setPage(1), [searchTerm, selectedCategory]);

  const categories = ["all", ...new Set(blogPosts.map((p) => p.category[language]))];

  const sortedPosts = [...blogPosts].sort((a, b) => new Date(b.date) - new Date(a.date));

  const filtered = sortedPosts.filter((post) => {
    const matchesCategory =
      selectedCategory === "all" || post.category[language] === selectedCategory;
    const matchesSearch =
      searchTerm === "" ||
      post.title[language].toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.excerpt[language].toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // 3 = una fila completa de la rejilla en escritorio. Con más artículos
  // publicados se puede subir a 6 (dos filas) sin tocar nada más.
  const PAGE_SIZE = 3;
  const pages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const current = Math.min(page, pages);
  const pageItems = filtered.slice((current - 1) * PAGE_SIZE, current * PAGE_SIZE);
  const goTo = (n) => {
    setPage(n);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <SEO
        title="Blog - Artículos sobre Desarrollo y Tecnología"
        description="Artículos, guías y casos de éxito sobre desarrollo web, migración de sistemas, automatización y tecnologías modernas. Consejos prácticos para empresas."
        keywords="blog desarrollo web, artículos tecnología, guías programación, casos de éxito IT, tutoriales desarrollo"
        schemaType="WebPage"
      />

      <section className="rd-hero rd-hero--page">
        <div className="rd-shot rd-shot--cover">
          <Image src="/images/blog/Blog-page.webp" alt="" sizes="100vw" priority width={1600} height={1000} />
          <span className="rd-shot-grade" aria-hidden="true" />
        </div>
        <div className="rd-hero-body">
          <div className="rd-hero-copy">
            <div className="rd-eyebrow">
              <i aria-hidden="true" />
              {t("nav.blog")}
            </div>
            <h1 className="rd-h1">{t("blog.title")}</h1>
            <p className="rd-hero-sub">{t("blog.subtitle")}</p>
          </div>
        </div>
      </section>

      <section className="rd-sec">
        {/* Buscador y filtros */}
        <div className="rd-filters" data-reveal>
          <label className="rd-search">
            <Search size={16} strokeWidth={2} aria-hidden="true" />
            <input
              type="search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder={t("blog.searchPlaceholder")}
              aria-label={t("blog.searchPlaceholder")}
            />
          </label>
          <div className="rd-chips-row">
            {categories.map((c) => (
              <button
                key={c}
                type="button"
                className={`rd-chip-btn${selectedCategory === c ? " is-on" : ""}`}
                onClick={() => setSelectedCategory(c)}
                aria-pressed={selectedCategory === c}
              >
                {c === "all" ? t("blog.allCategories") : c}
              </button>
            ))}
          </div>
        </div>

        <div className="rd-grid3" data-stagger>
          {pageItems.map((post) => (
            <BlogCard
              key={post.slug}
              slug={post.slug}
              title={post.title[language]}
              excerpt={post.excerpt[language]}
              image={post.image}
              author={post.author}
              date={post.date}
              category={post.category[language]}
            />
          ))}
        </div>

        {pages > 1 && (
          <nav className="rd-pager" aria-label="Paginación">
            {Array.from({ length: pages }, (_, i) => i + 1).map((n) => (
              <button
                key={n}
                type="button"
                className={`rd-pager-btn${n === current ? " is-on" : ""}`}
                onClick={() => goTo(n)}
                aria-current={n === current ? "page" : undefined}
              >
                {String(n).padStart(2, "0")}
              </button>
            ))}
          </nav>
        )}
      </section>
    </>
  );
};
