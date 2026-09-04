import { useEffect } from "react";
import { useParams, Navigate, Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { useLanguage } from "../../context/LanguageContext";
import { SEO } from "../../components/SEO";
import { Btn } from "../../components/Btn";
import { BlogCard } from "../../components/BlogCard";
import { Image } from "../../components/Image";
import { blogPosts } from "../../data/blogData";
import { trackEvent } from "../../lib/analytics";

// Artículo del blog, rediseño 2026.
//
// El renderizador del cuerpo se conserva TAL CUAL: negritas en markdown,
// titulares con "## " y listas con guion o numeradas. Es lo que hace que los
// artículos que publica el agente semanal se vean bien sin tocar nada.

const conNegritas = (texto) =>
  String(texto)
    .split(/(\*\*[^*]+\*\*)/g)
    .map((trozo, i) =>
      trozo.startsWith("**") && trozo.endsWith("**") ? (
        <strong key={i}>{trozo.slice(2, -2)}</strong>
      ) : (
        trozo
      ),
    );

export const BlogPost = () => {
  const { slug } = useParams();
  const { t, language } = useLanguage();

  const post = blogPosts.find((p) => p.slug === slug);

  useEffect(() => {
    if (post) trackEvent("view_post", { post: slug });
  }, [slug, post]);

  if (!post) return <Navigate to="/404" replace />;

  const related = blogPosts.filter((p) => p.slug !== slug).slice(0, 2);
  const fecha = new Date(post.date).toLocaleDateString(
    language === "es" ? "es-ES" : "en-US",
    { year: "numeric", month: "long", day: "numeric" },
  );

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

      <section className="rd-hero rd-hero--page">
        <div className="rd-shot rd-shot--cover">
          <Image
            src={post.image || "/images/blog/Blog-page.webp"}
            alt=""
            sizes="100vw"
            priority
            width={1600}
            height={1000}
          />
          <span className="rd-shot-grade" aria-hidden="true" />
        </div>
        <div className="rd-hero-body">
          <div className="rd-hero-copy">
            <Link className="rd-back" to="/blog">
              <ArrowLeft size={15} strokeWidth={2} />
              {t("blog.viewAll")}
            </Link>
            <div className="rd-eyebrow">
              <i aria-hidden="true" />
              {post.category[language]}
            </div>
            <h1 className="rd-h1">{post.title[language]}</h1>
            <p className="rd-hero-sub">{post.excerpt[language]}</p>
            <div className="rd-post-meta">
              <span>{post.author}</span>
              <i aria-hidden="true">·</i>
              <time dateTime={post.date}>{fecha}</time>
            </div>
          </div>
        </div>
      </section>

      <section className="rd-sec">
        <div className="rd-prose" data-reveal>
          {post.content[language].split("\n\n").map((paragraph, idx) => {
            if (paragraph.startsWith("## ")) {
              return <h2 key={idx}>{conNegritas(paragraph.replace("## ", ""))}</h2>;
            }

            const numerada = paragraph.match(/^\d+\. /m);
            const conGuiones = /^[-*] /m.test(paragraph);

            if (numerada || conGuiones) {
              const Lista = numerada ? "ol" : "ul";
              const items = paragraph
                .split("\n")
                .filter(Boolean)
                .map((linea) => linea.replace(/^\d+\.\s+/, "").replace(/^[-*]\s+/, ""));
              return (
                <Lista key={idx}>
                  {items.map((item, i) => (
                    <li key={i}>{conNegritas(item)}</li>
                  ))}
                </Lista>
              );
            }

            return <p key={idx}>{conNegritas(paragraph)}</p>;
          })}
        </div>
      </section>

      {related.length > 0 && (
        <section className="rd-sec">
          <div className="rd-eyebrow" data-reveal>
            <i aria-hidden="true" />
            {t("nav.blog")}
          </div>
          <div className="rd-grid3" data-stagger>
            {related.map((p) => (
              <BlogCard
                key={p.slug}
                slug={p.slug}
                title={p.title[language]}
                excerpt={p.excerpt[language]}
                image={p.image}
                author={p.author}
                date={p.date}
                category={p.category[language]}
              />
            ))}
          </div>
        </section>
      )}

      <section className="rd-sec rd-cta-sec">
        <div className="rd-cta">
          <div className="rd-shot rd-shot--cover">
            <Image src="/images/company/Mission.webp" alt="" sizes="100vw" width={1600} height={1000} />
            <span className="rd-shot-grade" aria-hidden="true" />
          </div>
          <div className="rd-cta-inner" data-stagger>
            <div className="rd-eyebrow is-center">
              <i aria-hidden="true" />
              {t("CTA.badge")}
            </div>
            <h2 className="rd-h2 rd-cta-title">{t("CTA.title")}</h2>
            <p className="rd-cta-sub">{t("CTA.subtitle")}</p>
            <div className="rd-cta-btns">
              <Btn
                as={Link}
                to="/contact"
                onClick={() =>
                  trackEvent("cta_click", {
                    location: "post_footer",
                    cta_type: "primary",
                    cta_text: t("CTA.primaryButton"),
                  })
                }
              >
                {t("CTA.primaryButton")}
              </Btn>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
