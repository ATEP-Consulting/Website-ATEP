import { ServiceDetailTemplate } from "../../components/ServiceDetailTemplate";
import { SEO } from "../../components/SEO";

export const FullStackDevelopment = () => {
  return (
    <>
      <SEO
        title="Desarrollo Full-Stack - Aplicaciones Completas"
        description="Desarrollamos aplicaciones web y móviles completas end-to-end. Frontend moderno con React, backend robusto con Node.js, bases de datos escalables y arquitectura cloud."
        keywords="desarrollo full-stack, aplicaciones web, React, Node.js, desarrollo backend, desarrollo frontend, API REST, bases de datos, Valencia"
        schemaType="Service"
        schemaData={{
          serviceType: "Desarrollo Full-Stack",
          offers: {
            "@type": "Offer",
            availability: "https://schema.org/InStock",
            priceCurrency: "EUR",
          },
        }}
      />
      <ServiceDetailTemplate serviceKey="fullStackDevelopment" />
    </>
  );
};
