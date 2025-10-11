import { Zap } from "lucide-react";
import { ServiceDetailTemplate } from "../../components/ServiceDetailTemplate";
import { SEO } from "../../components/SEO";

export const Automation = () => {
  return (
    <>
      <SEO
        title="Automatización de Procesos Empresariales"
        description="Automatizamos procesos repetitivos con IA, integramos sistemas y optimizamos workflows. RPA, APIs, integraciones personalizadas. Ahorra tiempo y reduce errores humanos."
        keywords="automatización procesos, inteligencia artificial, RPA, integraciones API, workflow automation, optimización procesos, eficiencia empresarial, Valencia"
        schemaType="Service"
        schemaData={{
          "@type": "Service",
          serviceType: "Automatización de Procesos",
          provider: {
            "@type": "Organization",
            name: "ATEP Consulting",
            url: "https://atepconsulting.com",
          },
        }}
      />
      <ServiceDetailTemplate
        serviceKey="automation"
        heroIcon={Zap}
        heroImage="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1920&h=1080&fit=crop&q=80"
      />
    </>
  );
};
