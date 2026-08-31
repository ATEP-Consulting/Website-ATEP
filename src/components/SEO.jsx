import { Helmet } from "react-helmet-async";
import { useLocation } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext";

const BASE_URL = "https://www.atepconsulting.com";

// Varias páginas reutilizan copy de UI como description (>160c): recorte
// limpio en límite de palabra para que Google no trunque a mitad de frase.
const trimDescription = (text = "") => {
  if (text.length <= 160) return text;
  const cut = text.slice(0, 157);
  return `${cut.slice(0, cut.lastIndexOf(" "))}…`;
};

// og:image exige URL absoluta y los scrapers de LinkedIn no aceptan WebP.
const resolveImage = (image) => {
  if (!image || image.endsWith(".webp")) return `${BASE_URL}/og-image.png`;
  return image.startsWith("http") ? image : `${BASE_URL}${image}`;
};

export const SEO = ({
  title,
  description,
  keywords,
  image,
  type = "website",
  schemaType = "Organization",
  schemaData = {},
  extraSchemas = [],
}) => {
  const { language } = useLanguage();
  const seoLanguage = language === "es" ? "es_ES" : "en_US";
  const baseUrl = BASE_URL;
  const { pathname } = useLocation();
  const currentUrl = `${baseUrl}${pathname}`;
  const metaDescription = trimDescription(description);
  const ogImage = resolveImage(image);

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
        image: ogImage,
        description: metaDescription,
        address: {
          "@type": "PostalAddress",
          addressLocality: "Paterna",
          addressRegion: "Valencia",
          addressCountry: "ES",
        },
        geo: {
          "@type": "GeoCoordinates",
          latitude: "39.5028",
          longitude: "-0.4403",
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

    // Ficha de negocio local (home y contacto): añade a Organization los
    // datos que Google usa para búsquedas locales y para casar la web con
    // el perfil de Google Business.
    case "LocalBusiness":
      schema = {
        ...baseSchema,
        "@type": "ProfessionalService",
        name: "ATEP Consulting",
        alternateName: "ATEP",
        url: baseUrl,
        logo: `${baseUrl}/new-logo-atep.png`,
        image: ogImage,
        description: metaDescription,
        telephone: "+34647748705",
        email: "info@atepconsulting.com",
        address: {
          "@type": "PostalAddress",
          addressLocality: "Paterna",
          addressRegion: "Valencia",
          postalCode: "46980",
          addressCountry: "ES",
        },
        geo: {
          "@type": "GeoCoordinates",
          latitude: "39.5028",
          longitude: "-0.4403",
        },
        areaServed: { "@type": "Country", name: "España" },
        openingHoursSpecification: [
          {
            "@type": "OpeningHoursSpecification",
            dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
            opens: "09:00",
            closes: "18:00",
          },
        ],
        founder: [
          { "@type": "Person", name: "Gabriela Albertini" },
          { "@type": "Person", name: "Pablo Teijeiro" },
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
        description: metaDescription,
        url: currentUrl,
        image: ogImage,
        ...schemaData,
      };
      break;

    case "WebPage":
      schema = {
        ...baseSchema,
        "@type": "WebPage",
        name: fullTitle,
        description: metaDescription,
        url: currentUrl,
        inLanguage: language === "es" ? "es-ES" : "en-US",
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
        description: metaDescription,
        image: ogImage,
        url: currentUrl,
        // solo fechas reales: un dateModified inventado en cada render es
        // una señal de frescura falsa
        ...(schemaData.datePublished && { datePublished: schemaData.datePublished }),
        ...(schemaData.dateModified && { dateModified: schemaData.dateModified }),
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
        description: metaDescription,
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
      <meta name="description" content={metaDescription} />
      <meta
        name="keywords"
        content={
          keywords ||
          "consultoría IT, desarrollo web, React, TypeScript, Node.js, migración legacy, automatización, staff augmentation, Valencia, España"
        }
      />

      {/* Open Graph */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={metaDescription} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:url" content={currentUrl} />
      <meta property="og:type" content={type} />
      <meta property="og:locale" content={seoLanguage} />
      <meta property="og:site_name" content="ATEP Consulting" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={metaDescription} />
      <meta name="twitter:image" content={ogImage} />

      {/* Canonical */}
      <link rel="canonical" href={currentUrl} />

      {/* Schema.org JSON-LD */}
      <script type="application/ld+json">{JSON.stringify(schema)}</script>
      {extraSchemas.map((extra, i) => (
        <script type="application/ld+json" key={i}>
          {JSON.stringify({ "@context": "https://schema.org", ...extra })}
        </script>
      ))}
    </Helmet>
  );
};
