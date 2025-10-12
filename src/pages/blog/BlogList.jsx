import { BookOpen, Search } from "lucide-react";
import { useState } from "react";
import { useLanguage } from "../../context/LanguageContext";
import { SEO } from "../../components/SEO";
import { BlogCard } from "../../components/BlogCard";
import { blogPosts } from "../../data/blogData";
import ImageHero from "../../components/ImageHero";

export const BlogList = () => {
  const { t, language } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  // Obtener categorías únicas
  const categories = [
    "all",
    ...new Set(blogPosts.map((post) => post.category[language])),
  ];

  // Ordenar por fecha más reciente
  const sortedPosts = [...blogPosts].sort(
    (a, b) => new Date(b.date) - new Date(a.date)
  );

  // Filtrar posts
  const filteredPosts = sortedPosts.filter((post) => {
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
        icon={BookOpen}
        title={t("blog.title")}
        description={t("blog.subtitle")}
        backgroundImage="images/blog/Blog-page.webp"
      />

      {/* Filtros */}
      <section className="section-padding bg-white">
        <div className="section-container">
          <div className="max-w-6xl mx-auto mb-12">
            <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
              {/* Búsqueda */}
              <div className="relative w-full lg:w-96">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-neutral-400" />
                <input
                  type="text"
                  placeholder={
                    t("blog.searchPlaceholder") || "Search articles..."
                  }
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 border-2 border-neutral-200 rounded-lg focus:outline-none focus:border-primary-500 transition-colors"
                />
              </div>

              {/* Filtros por categoría */}
              <div className="flex flex-wrap gap-2 justify-center lg:justify-end">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
                      selectedCategory === category
                        ? "bg-primary-600 text-white shadow-lg scale-105"
                        : "bg-neutral-100 text-neutral-700 hover:bg-neutral-200"
                    }`}
                  >
                    {category === "all"
                      ? t("blog.allCategories") || "All"
                      : category}
                  </button>
                ))}
              </div>
            </div>

            {/* Contador de resultados */}
            <div className="mt-6 text-center lg:text-left">
              <p className="text-neutral-600">
                {filteredPosts.length}{" "}
                {filteredPosts.length === 1
                  ? t("blog.articleFound") || "article found"
                  : t("blog.articlesFound") || "articles found"}
              </p>
            </div>
          </div>

          {/* Grid de posts */}
          {filteredPosts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {filteredPosts.map((post, index) => (
                <div
                  key={post.slug}
                  className={`slide-up stagger-${(index % 3) + 1}`}
                >
                  <BlogCard
                    slug={post.slug}
                    title={post.title[language]}
                    excerpt={post.excerpt[language]}
                    image={post.image}
                    author={post.author}
                    date={post.date}
                    category={post.category[language]}
                  />
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <p className="text-xl text-neutral-600">
                {t("blog.noResults") ||
                  "No articles found. Try adjusting your filters."}
              </p>
            </div>
          )}
        </div>
      </section>
    </>
  );
};
