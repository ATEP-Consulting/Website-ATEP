import { useParams, Navigate } from "react-router-dom";
import { Calendar, User, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { useLanguage } from "../../context/LanguageContext";
import { SEO } from "../../components/SEO";
import { BlogCard } from "../../components/BlogCard";
import { blogPosts } from "../../data/blogData";

export const BlogPost = () => {
  const { slug } = useParams();
  const { t, language } = useLanguage();

  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) {
    return <Navigate to="/blog" replace />;
  }

  const relatedPosts = blogPosts.filter((p) => p.slug !== slug).slice(0, 2);

  return (
    <>
      <SEO
        title={post.title[language]}
        description={post.excerpt[language]}
        keywords={post.keywords}
        image={post.image}
        schemaType="BlogPosting"
        schemaData={{
          "@type": "BlogPosting",
          headline: post.title[language],
          datePublished: post.publishedDate,
          dateModified: post.modifiedDate,
          author: {
            "@type": "Person",
            name: post.author,
          },
          publisher: {
            "@type": "Organization",
            name: "ATEP Consulting",
            logo: {
              "@type": "ImageObject",
              url: "https://atepconsulting.com/logo-atep.png",
            },
          },
        }}
      />

      <article>
        <div className="relative min-h-[600px] md:min-h-[700px] flex items-center bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-900 overflow-hidden">
          {/* Imagen de fondo con overlay */}
          <div className="absolute inset-0">
            <img
              src={post.image}
              alt={post.title[language]}
              className="w-full h-full object-cover"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-br from-neutral-900/95 via-neutral-900/85 to-primary-900/80"></div>
          </div>

          {/* Grid pattern sutil */}
          <div
            className="absolute inset-0 opacity-5 pointer-events-none z-10"
            style={{
              backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
              backgroundSize: "50px 50px",
            }}
          ></div>

          {/* Contenido */}
          <div className="section-container w-full relative z-10 py-20 md:py-32">
            <div className="max-w-4xl mx-auto text-white">
              <Link
                to="/blog"
                className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-6 transition-colors fade-in"
              >
                <ArrowLeft className="w-5 h-5" />
                {t("blog.back")}
              </Link>
              <h1 className="heading-xl text-white mb-6 fade-in stagger-1">
                {post.title[language]}
              </h1>
              <div className="flex items-center gap-6 text-white/90 fade-in stagger-2">
                <div className="flex items-center gap-2">
                  <User className="w-5 h-5" />
                  <span>{post.author}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-5 h-5" />
                  <span>{post.date}</span>
                </div>
                <span className="bg-primary-600 px-3 py-1 rounded-full text-sm">
                  {post.category[language]}
                </span>
              </div>
            </div>
          </div>
        </div>

        <section className="section-padding bg-white">
          <div className="section-container">
            <div className="max-w-4xl mx-auto">
              <div className="prose prose-lg max-w-none">
                {post.content[language]
                  .split("\n\n")
                  .map((paragraph, index) => {
                    if (paragraph.startsWith("## ")) {
                      return (
                        <h2 key={index} className="heading-md mt-12 mb-6">
                          {paragraph.replace("## ", "")}
                        </h2>
                      );
                    }
                    if (
                      paragraph.startsWith("1. ") ||
                      paragraph.match(/^\d+\. /)
                    ) {
                      const items = paragraph.split("\n");
                      return (
                        <ol
                          key={index}
                          className="list-decimal list-inside space-y-2 text-body mb-6"
                        >
                          {items.map((item, i) => (
                            <li key={i}>
                              {item
                                .replace(/^\d+\.\s\*\*/, "")
                                .replace(/\*\*:/, ":")}
                            </li>
                          ))}
                        </ol>
                      );
                    }
                    return (
                      <p key={index} className="text-body mb-6 leading-relaxed">
                        {paragraph}
                      </p>
                    );
                  })}
              </div>
            </div>
          </div>
        </section>

        {relatedPosts.length > 0 && (
          <section className="section-padding bg-neutral-50">
            <div className="section-container">
              <h2 className="heading-md mb-8 text-center">
                {t("blog.relatedPosts")}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                {relatedPosts.map((relatedPost) => (
                  <BlogCard
                    key={relatedPost.slug}
                    slug={relatedPost.slug}
                    title={relatedPost.title[language]}
                    excerpt={relatedPost.excerpt[language]}
                    image={relatedPost.image}
                    author={relatedPost.author}
                    date={relatedPost.date}
                    category={relatedPost.category[language]}
                  />
                ))}
              </div>
            </div>
          </section>
        )}
      </article>
    </>
  );
};
