import { useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';

export const SEO = ({
  title,
  description,
  keywords,
  image = 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&h=630&fit=crop',
  type = 'website'
}) => {
  const { language } = useLanguage();
  const baseUrl = window.location.origin;
  const currentUrl = window.location.href;

  const fullTitle = title ? `${title} | ATEP Consulting` : 'ATEP Consulting - Digital Transformation Solutions';

  useEffect(() => {
    document.title = fullTitle;

    const metaTags = [
      { name: 'description', content: description },
      { name: 'keywords', content: keywords || 'consulting, digital transformation, web development, automation, legacy migration' },
      { property: 'og:title', content: fullTitle },
      { property: 'og:description', content: description },
      { property: 'og:image', content: image },
      { property: 'og:url', content: currentUrl },
      { property: 'og:type', content: type },
      { property: 'og:locale', content: language === 'en' ? 'en_US' : 'es_ES' },
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: fullTitle },
      { name: 'twitter:description', content: description },
      { name: 'twitter:image', content: image },
    ];

    metaTags.forEach(({ name, property, content }) => {
      const attr = name ? 'name' : 'property';
      const value = name || property;
      let element = document.querySelector(`meta[${attr}="${value}"]`);

      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attr, value);
        document.head.appendChild(element);
      }

      element.setAttribute('content', content);
    });

    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', currentUrl);

    let structuredData = document.querySelector('script[type="application/ld+json"]');
    if (!structuredData) {
      structuredData = document.createElement('script');
      structuredData.setAttribute('type', 'application/ld+json');
      document.head.appendChild(structuredData);
    }

    structuredData.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": "ATEP Consulting",
      "url": baseUrl,
      "logo": `${baseUrl}/logo.png`,
      "description": description,
      "contactPoint": {
        "@type": "ContactPoint",
        "email": "info@atepconsulting.com",
        "contactType": "Customer Service"
      },
      "founder": [
        {
          "@type": "Person",
          "name": "Gabriela Albertini"
        },
        {
          "@type": "Person",
          "name": "Pablo Teijeiro"
        }
      ]
    });
  }, [fullTitle, description, keywords, image, currentUrl, type, language, baseUrl]);

  return null;
};
