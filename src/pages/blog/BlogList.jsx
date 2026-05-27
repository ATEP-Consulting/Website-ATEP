import { useState } from "react";
import { Search } from "lucide-react";
import { useLanguage } from "../../context/LanguageContext";
import { SEO } from "../../components/SEO";
import { BlogCard } from "../../components/BlogCard";
import { Reveal, RevealStagger } from "../../components/Reveal";
import ImageHero from "../../components/ImageHero";
import { blogPosts } from "../../data/blogData";
import { tEyebrow, FONT } from "../../lib/typography";

export const BlogList = () => {
  const { t, language } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  const categories = [
    "all",
    ...new Set(blogPosts.map((p) => p.category[language])),
  ];

  const sortedPosts = [...blogPosts].sort(
    (a, b) => new Date(b.date) - new Date(a.date)
  );

  const filtered = sortedPosts.filter((post) => {
    const matchesCategory =
      selectedCategory === "all" ||
      post.category[language] === selectedCategory;
    const matchesSearch =
      searchTerm === "" ||
      post.title[language].toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.excerpt[language].toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <>
      <SEO
        title="Blog - Artículos sobre Desarrollo y Tecnología"
        description="Artículos, guías y casos de éxito sobre desarrollo web, migración de sistemas, automatización y tecnologías modernas. Consejos prácticos para empresas."
        keywords="blog desarrollo web, artículos tecnología, guías programación, casos de éxito IT, tutoriales desarrollo"
        schemaType="WebPage"
      />

      <ImageHero
        eyebrow="Blog"
        title={t("blog.title")}
        description={t("blog.subtitle")}
      />

      {/* Filters */}
      <section
        className="px-6 sm:px-10 lg:px-16 pt-12 tm:pt-16 pb-8"
        style={{ background: "var(--bg)" }}
      >
        <Reveal y={16}>
          <div className="flex flex-col tm:flex-row gap-4 tm:items-end tm:justify-between">
            <div className="w-full tm:max-w-md">
              <div style={tEyebrow("var(--muted)")} className="mb-3">
                {language === "es" ? "Buscar" : "Search"}
              </div>
              <div className="relative">
                <Search
                  size={16}
                  className="absolute left-3 top-1/2 -translate-y-1/2"
                  style={{ color: "var(--muted)" }}
                />
                <input
                  type="text"
                  placeholder={
                    t("blog.searchPlaceholder") ||
                    (language === "es"
                      ? "Buscar artículos..."
                      : "Search articles...")
                  }
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-3 py-3 outline-none transition-colors duration-150"
                  style={{
                    background: "transparent",
                    border: "1px solid var(--rule-strong)",
                    color: "var(--ink)",
                    fontSize: 14,
                  }}
                  onFocus={(e) =>
                    (e.target.style.borderColor = "var(--accent)")
                  }
                  onBlur={(e) =>
                    (e.target.style.borderColor = "var(--rule-strong)")
                  }
                />
              </div>
            </div>

            <div>
              <div
                style={tEyebrow("var(--muted)")}
                className="mb-3 tm:text-right"
              >
                {language === "es" ? "Categorías" : "Categories"}
              </div>
              <div className="flex flex-wrap gap-2 tm:justify-end">
                {categories.map((cat) => {
                  const active = selectedCategory === cat;
                  return (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => setSelectedCategory(cat)}
                      className="px-3 py-[7px] text-[11px] uppercase tracking-[0.1em] transition-colors duration-150 cursor-pointer"
                      style={{
                        background: active ? "var(--navy)" : "transparent",
                        color: active ? "var(--bg)" : "var(--ink)",
                        border: "1px solid var(--navy)",
                        fontFamily: FONT.mono,
                      }}
                    >
                      {cat === "all"
                        ? t("blog.allCategories") ||
                          (language === "es" ? "Todas" : "All")
                        : cat}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          <div
            className="mt-6 pt-4 text-[13px]"
            style={{
              borderTop: "1px solid var(--rule)",
              color: "var(--muted)",
            }}
          >
            {filtered.length}{" "}
            {filtered.length === 1
              ? t("blog.articleFound") ||
                (language === "es" ? "artículo" : "article")
              : t("blog.articlesFound") ||
                (language === "es" ? "artículos" : "articles")}
          </div>
        </Reveal>
      </section>

      {/* Posts grid */}
      <section
        className="px-6 sm:px-10 lg:px-16 pb-20 tm:pb-28"
        style={{ background: "var(--bg)" }}
      >
        {filtered.length > 0 ? (
          <RevealStagger
            stagger={100}
            base={80}
            y={20}
            className="grid grid-cols-1 tm:grid-cols-2 lg:grid-cols-3 gap-8"
            itemClassName="h-full"
          >
            {filtered.map((post) => (
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
          </RevealStagger>
        ) : (
          <div
            className="py-20 text-center"
            style={{
              fontSize: 16,
              color: "var(--muted)",
              fontFamily: FONT.serif,
              fontStyle: "italic",
            }}
          >
            {t("blog.noResults") ||
              (language === "es"
                ? "No se encontraron artículos. Prueba con otros filtros."
                : "No articles found. Try adjusting your filters.")}
          </div>
        )}
      </section>
    </>
  );
};
