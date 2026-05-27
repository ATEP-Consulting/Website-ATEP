import { useParams, Navigate, Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { useLanguage } from "../../context/LanguageContext";
import { SEO } from "../../components/SEO";
import { BlogCard } from "../../components/BlogCard";
import { Reveal, RevealStagger } from "../../components/Reveal";
import { blogPosts } from "../../data/blogData";
import { tDisplay, tSerif, tEyebrow, FONT } from "../../lib/typography";

export const BlogPost = () => {
  const { slug } = useParams();
  const { t, language } = useLanguage();

  const post = blogPosts.find((p) => p.slug === slug);
  if (!post) return <Navigate to="/blog" replace />;

  const related = blogPosts.filter((p) => p.slug !== slug).slice(0, 2);

  const dateStr = post.date
    ? new Date(post.date).toLocaleDateString(
        language === "es" ? "es-ES" : "en-US",
        { year: "numeric", month: "long", day: "numeric" }
      )
    : post.date;

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
          author: { "@type": "Person", name: post.author },
          publisher: {
            "@type": "Organization",
            name: "ATEP Consulting",
            logo: {
              "@type": "ImageObject",
              url: "https://www.atepconsulting.com/new-logo-atep.png",
            },
          },
        }}
      />

      <article>
        {/* HERO */}
        <header
          className="px-6 sm:px-10 lg:px-16 pt-12 pb-12 tm:pt-20 tm:pb-16"
          style={{
            background: "var(--bg)",
            borderBottom: "1px solid var(--rule)",
          }}
        >
          <Reveal y={12}>
            <Link
              to="/blog"
              className="inline-flex items-center gap-2 mb-8 no-underline transition-colors duration-150"
              style={{
                color: "var(--muted)",
                fontFamily: FONT.mono,
                fontSize: 11.5,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.color = "var(--ink)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.color = "var(--muted)")
              }
            >
              <ArrowLeft size={14} />
              {t("blog.back")}
            </Link>
          </Reveal>

          <Reveal y={16}>
            <div
              className="flex flex-wrap items-baseline gap-x-5 gap-y-2 mb-6"
              style={tEyebrow("var(--muted)")}
            >
              <span style={{ color: "var(--accent)" }}>
                {post.category[language]}
              </span>
              <span>{dateStr}</span>
              {post.author && <span>· {post.author}</span>}
            </div>
          </Reveal>

          <Reveal y={28} delay={120} dur={1100}>
            <h1
              style={{
                ...tDisplay("clamp(36px, 6vw, 80px)", 500),
                color: "var(--ink)",
                margin: 0,
                maxWidth: 1100,
              }}
            >
              {post.title[language]}
            </h1>
          </Reveal>

          {post.excerpt && (
            <Reveal y={20} delay={300}>
              <p
                className="mt-6 tm:mt-8 italic"
                style={{
                  ...tSerif("clamp(17px, 1.4vw, 20px)", 400),
                  color: "var(--muted)",
                  lineHeight: 1.5,
                  maxWidth: 800,
                  margin: 0,
                }}
              >
                {post.excerpt[language]}
              </p>
            </Reveal>
          )}
        </header>

        {/* COVER */}
        {post.image && (
          <Reveal y={24} dur={1100}>
            <div
              className="px-6 sm:px-10 lg:px-16 py-10 tm:py-14"
              style={{ background: "var(--bg)" }}
            >
              <div
                className="overflow-hidden"
                style={{ aspectRatio: "16/9" }}
              >
                <img
                  src={post.image}
                  alt={post.title[language]}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
            </div>
          </Reveal>
        )}

        {/* CONTENT */}
        <section
          className="px-6 sm:px-10 lg:px-16 py-12 tm:py-20"
          style={{ background: "var(--bg)" }}
        >
          <div className="max-w-3xl mx-auto">
            {post.content[language]
              .split("\n\n")
              .map((paragraph, idx) => {
                if (paragraph.startsWith("## ")) {
                  return (
                    <h2
                      key={idx}
                      className="mt-12 mb-5"
                      style={{
                        ...tDisplay("clamp(24px, 2.8vw, 36px)", 500),
                        color: "var(--ink)",
                        margin: "48px 0 20px",
                      }}
                    >
                      {paragraph.replace("## ", "")}
                    </h2>
                  );
                }
                if (paragraph.match(/^\d+\. /m)) {
                  const items = paragraph.split("\n").filter(Boolean);
                  return (
                    <ol
                      key={idx}
                      className="mb-6 pl-6 space-y-3"
                      style={{
                        listStyle: "decimal",
                        ...tSerif("clamp(16px, 1.2vw, 18px)", 400),
                        color: "var(--ink)",
                        lineHeight: 1.65,
                      }}
                    >
                      {items.map((item, i) => (
                        <li key={i}>
                          {item
                            .replace(/^\d+\.\s\*\*/, "")
                            .replace(/\*\*:/, ":")
                            .replace(/^\d+\.\s/, "")}
                        </li>
                      ))}
                    </ol>
                  );
                }
                return (
                  <p
                    key={idx}
                    className="mb-6"
                    style={{
                      ...tSerif("clamp(16px, 1.2vw, 18px)", 400),
                      color: "var(--ink)",
                      lineHeight: 1.7,
                    }}
                  >
                    {paragraph}
                  </p>
                );
              })}
          </div>
        </section>

        {/* RELATED */}
        {related.length > 0 && (
          <section
            className="px-6 sm:px-10 lg:px-16 py-16 tm:py-24"
            style={{ background: "var(--bg-surface)" }}
          >
            <Reveal y={20}>
              <div
                className="mb-8 tm:mb-10"
                style={tEyebrow("var(--muted)")}
              >
                — {t("blog.relatedPosts")}
              </div>
            </Reveal>
            <RevealStagger
              stagger={120}
              base={100}
              y={20}
              className="grid grid-cols-1 tm:grid-cols-2 gap-8"
              itemClassName="h-full"
            >
              {related.map((rp) => (
                <BlogCard
                  key={rp.slug}
                  slug={rp.slug}
                  title={rp.title[language]}
                  excerpt={rp.excerpt[language]}
                  image={rp.image}
                  author={rp.author}
                  date={rp.date}
                  category={rp.category[language]}
                />
              ))}
            </RevealStagger>
          </section>
        )}
      </article>
    </>
  );
};
