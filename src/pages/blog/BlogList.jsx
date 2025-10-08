import { useLanguage } from '../../context/LanguageContext';
import { SEO } from '../../components/SEO';
import { BlogCard } from '../../components/BlogCard';
import { blogPosts } from '../../utils/blogData';

export const BlogList = () => {
  const { t, language } = useLanguage();

  return (
    <>
      <SEO
        title={t('blog.title')}
        description={t('blog.subtitle')}
        keywords="blog, insights, digital transformation, consulting tips"
      />

      <section className="section-padding bg-gradient-to-br from-primary-50 to-white">
        <div className="section-container">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="heading-xl mb-6 fade-in">{t('blog.title')}</h1>
            <p className="text-xl text-neutral-600 fade-in stagger-1">
              {t('blog.subtitle')}
            </p>
          </div>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="section-container">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post, index) => (
              <div key={post.slug} className={`slide-up stagger-${(index % 3) + 1}`}>
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
        </div>
      </section>
    </>
  );
};
