import { Globe } from "lucide-react";
import { ServiceDetailTemplate } from "../../components/ServiceDetailTemplate";
import { SEO } from "../../components/SEO";

export const ProfessionalWebsites = () => {
  return (
    <>
      <SEO
        title="Desarrollo Web Profesional"
        description="Creamos páginas webs modernas, rápidos y optimizados para SEO. Diseño responsive, tecnologías modernas (React, TypeScript) y enfoque en conversión. Disponibles en 48h."
        keywords="desarrollo web, páginas web profesionales, diseño web responsive, React, TypeScript, sitios web modernos, desarrollo frontend, Valencia"
        schemaType="Service"
        schemaData={{
          serviceType: "Desarrollo Web Profesional",
          audience: {
            "@type": "Audience",
            audienceType: "Empresas y emprendedores",
          },
          offers: {
            "@type": "Offer",
            availability: "https://schema.org/InStock",
            priceCurrency: "EUR",
          },
        }}
      />
      <ServiceDetailTemplate
        serviceKey="professionalWebsites"
        heroIcon={Globe}
        heroImage="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1920&h=1080&fit=crop&q=80"
      />
    </>
  );
};
