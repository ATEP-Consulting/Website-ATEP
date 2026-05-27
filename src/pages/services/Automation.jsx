import { ServiceDetailTemplate } from "../../components/ServiceDetailTemplate";
import { SEO } from "../../components/SEO";

export const Automation = () => {
  return (
    <>
      <SEO
        title="Automatización de Procesos Empresariales"
        description="Automatizamos procesos repetitivos, integramos sistemas y optimizamos workflows. RPA, APIs, integraciones personalizadas. Ahorra tiempo y reduce errores humanos."
        keywords="automatización procesos, RPA, integraciones API, workflow automation, optimización procesos, eficiencia empresarial, Valencia"
        schemaType="Service"
        schemaData={{
          serviceType: "Automatización de Procesos",
        }}
      />
      <ServiceDetailTemplate
        serviceKey="automation"
        heroImage="/images/services/Automation-service.webp"
      />
    </>
  );
};
