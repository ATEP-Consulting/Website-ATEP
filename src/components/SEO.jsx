import { Helmet } from "react-helmet-async";
import { useLocation } from "react-router-dom";

export const SEO = ({
  title,
  description,
  keywords,
  image = "https://www.atepconsulting.com/og-image.png",
  type = "website",
  schemaType = "Organization",
  schemaData = {},
}) => {
  const seoLanguage = "es_ES";
  const baseUrl = "https://www.atepconsulting.com";
  const { pathname } = useLocation();
  const currentUrl = `${baseUrl}${pathname}`;

  const fullTitle = title
    ? `${title} | ATEP Consulting`
    : "ATEP Consulting | Consultoría IT y Desarrollo de Software";

  // Schema base común
  const baseSchema = {
    "@context": "https://schema.org",
  };

  let schema = {};

  switch (schemaType) {
    case "Organization":
      schema = {
        ...baseSchema,
        "@type": "Organization",
        name: "ATEP Consulting",
        alternateName: "ATEP",
        url: baseUrl,
        logo: `${baseUrl}/new-logo-atep.png`,
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
        ...schemaData,
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
          logo: `${baseUrl}/new-logo-atep.png`,
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
            url: `${baseUrl}/new-logo-atep.png`,
          },
        },
        ...schemaData,
      };
      break;

    default:
      schema = {
        ...baseSchema,
        "@type": "Organization",
        name: "ATEP Consulting",
        url: baseUrl,
        description: description,
        logo: `${baseUrl}/new-logo-atep.png`,
        address: {
          "@type": "PostalAddress",
          addressLocality: "Paterna",
          addressRegion: "Valencia",
          addressCountry: "ES",
        },
        ...schemaData,
      };
  }

  return (
    <Helmet>
      {/* Title */}
      <title>{fullTitle}</title>

      {/* Meta Tags */}
      <meta name="description" content={description} />
      <meta
        name="keywords"
        content={
          keywords ||
          "consultoría IT, desarrollo web, React, TypeScript, Node.js, migración legacy, automatización, staff augmentation, Valencia, España"
        }
      />

      {/* Open Graph */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={currentUrl} />
      <meta property="og:type" content={type} />
      <meta property="og:locale" content={seoLanguage} />
      <meta property="og:site_name" content="ATEP Consulting" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {/* Canonical */}
      <link rel="canonical" href={currentUrl} />

      {/* Schema.org JSON-LD */}
      <script type="application/ld+json">{JSON.stringify(schema)}</script>
    </Helmet>
  );
};
