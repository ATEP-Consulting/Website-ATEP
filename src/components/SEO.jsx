import { useEffect } from "react";

export const SEO = ({
  title,
  description,
  keywords,
  image = "https://atepconsulting.com/og-image.png",
  type = "website",
  schemaType = "Organization", // ✅ Parámetro para tipo de Schema
  schemaData = {}, // ✅ Datos adicionales específicos de cada página
}) => {
  const seoLanguage = "es_ES";
  const baseUrl = "https://atepconsulting.com";
  const currentUrl = window.location.href;

  const fullTitle = title
    ? `${title} | ATEP Consulting`
    : "ATEP Consulting | Consultoría IT y Desarrollo de Software";

  useEffect(() => {
    document.title = fullTitle;

    const metaTags = [
      { name: "description", content: description },
      {
        name: "keywords",
        content:
          keywords ||
          "consultoría IT, desarrollo web, React, TypeScript, Node.js, migración legacy, automatización, staff augmentation, Valencia, España",
      },
      { property: "og:title", content: fullTitle },
      { property: "og:description", content: description },
      { property: "og:image", content: image },
      { property: "og:url", content: currentUrl },
      { property: "og:type", content: type },
      { property: "og:locale", content: seoLanguage },
      { property: "og:site_name", content: "ATEP Consulting" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: fullTitle },
      { name: "twitter:description", content: description },
      { name: "twitter:image", content: image },
    ];

    metaTags.forEach(({ name, property, content }) => {
      const attr = name ? "name" : "property";
      const value = name || property;
      let element = document.querySelector(`meta[${attr}="${value}"]`);

      if (!element) {
        element = document.createElement("meta");
        element.setAttribute(attr, value);
        document.head.appendChild(element);
      }

      element.setAttribute("content", content);
    });

    // Canonical URL
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.setAttribute("rel", "canonical");
      document.head.appendChild(canonical);
    }
    canonical.setAttribute("href", currentUrl);

    // ✅ Schema.org DINÁMICO según tipo de página
    let structuredData = document.querySelector(
      'script[type="application/ld+json"]#seo-schema'
    );
    if (!structuredData) {
      structuredData = document.createElement("script");
      structuredData.setAttribute("type", "application/ld+json");
      structuredData.setAttribute("id", "seo-schema");
      document.head.appendChild(structuredData);
    }

    // Schema base común
    const baseSchema = {
      "@context": "https://schema.org",
    };

    // ✅ Schema específico según tipo de página
    let schema = {};

    console.log("🔍 SEO Debug:", {
      schemaType,
      schemaTypeFromProps: schemaType, // Ver qué llega
      defaultUsed: schemaType === "Organization",
      title,
      currentUrl,
    });

    switch (schemaType) {
      case "Organization":
        // Para Home, About, Contact
        schema = {
          ...baseSchema,
          "@type": "Organization",
          name: "ATEP Consulting",
          alternateName: "ATEP",
          url: baseUrl,
          logo: `${baseUrl}/logo-atep.png`,
          image: image,
          description: description,
          address: {
            "@type": "PostalAddress",
            addressLocality: "Paterna",
            addressRegion: "Valencia",
            addressCountry: "ES",
          },
          geo: {
            "@type": "GeoCoordinates",
            latitude: "39.5",
            longitude: "-0.4",
          },
          areaServed: {
            "@type": "Country",
            name: "España",
          },
          contactPoint: {
            "@type": "ContactPoint",
            email: "info@atepconsulting.com",
            contactType: "Customer Service",
            availableLanguage: ["Spanish", "English"],
          },
          founder: [
            {
              "@type": "Person",
              name: "Gabriela Albertini",
            },
            {
              "@type": "Person",
              name: "Pablo Teijeiro",
            },
          ],
          sameAs: ["https://www.linkedin.com/company/atepconsulting"],
          ...schemaData, // ✅ Datos adicionales específicos
        };
        break;

      case "Service":
        schema = {
          ...baseSchema,
          "@type": "Service",
          name: title || "Servicio de ATEP Consulting",
          serviceType: title || schemaData.serviceType || "Consultoría IT",
          provider: {
            "@type": "Organization",
            name: "ATEP Consulting",
            url: baseUrl,
            logo: `${baseUrl}/logo-atep.png`,
          },
          areaServed: {
            "@type": "Country",
            name: "España",
          },
          description: description,
          url: currentUrl,
          image: image,
          ...schemaData,
        };
        break;

      case "WebPage":
        // Para páginas genéricas (About, Legal, etc.)
        schema = {
          ...baseSchema,
          "@type": "WebPage",
          name: fullTitle,
          description: description,
          url: currentUrl,
          inLanguage: "es-ES",
          isPartOf: {
            "@type": "WebSite",
            name: "ATEP Consulting",
            url: baseUrl,
          },
          ...schemaData,
        };
        break;

      case "BlogPosting":
        // Para artículos de blog
        schema = {
          ...baseSchema,
          "@type": "BlogPosting",
          headline: fullTitle,
          description: description,
          image: image,
          url: currentUrl,
          datePublished: schemaData.datePublished || new Date().toISOString(),
          dateModified: schemaData.dateModified || new Date().toISOString(),
          author: schemaData.author || {
            "@type": "Organization",
            name: "ATEP Consulting",
          },
          publisher: {
            "@type": "Organization",
            name: "ATEP Consulting",
            logo: {
              "@type": "ImageObject",
              url: `${baseUrl}/logo-atep.png`,
            },
          },
          ...schemaData,
        };
        break;

      default:
        // Por defecto: Organization
        schema = {
          ...baseSchema,
          "@type": "Organization",
          name: "ATEP Consulting",
          url: baseUrl,
          description: description,
          logo: `${baseUrl}/logo-atep.png`,
          address: {
            "@type": "PostalAddress",
            addressLocality: "Paterna",
            addressRegion: "Valencia",
            addressCountry: "ES",
          },
          ...schemaData,
        };
    }

    structuredData.textContent = JSON.stringify(schema);
  }, [
    fullTitle,
    description,
    keywords,
    image,
    currentUrl,
    type,
    baseUrl,
    seoLanguage,
    schemaType,
    schemaData,
  ]);

  return null;
};
