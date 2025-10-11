import { Code2 } from "lucide-react";
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
          "@type": "Service",
          serviceType: "Desarrollo Full-Stack",
          provider: {
            "@type": "Organization",
            name: "ATEP Consulting",
            url: "https://atepconsulting.com",
          },
        }}
      />
      <ServiceDetailTemplate
        serviceKey="fullStackDevelopment"
        heroIcon={Code2}
        heroImage="https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=1920&h=1080&fit=crop&q=80"
      />
    </>
  );
};
