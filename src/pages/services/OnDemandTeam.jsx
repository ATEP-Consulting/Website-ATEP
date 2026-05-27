import { ServiceDetailTemplate } from "../../components/ServiceDetailTemplate";
import { SEO } from "../../components/SEO";

export const OnDemandTeam = () => {
  return (
    <>
      <SEO
        title="Equipos IT On-Demand - Staff Augmentation"
        description="Amplía tu equipo técnico con desarrolladores senior disponibles en 48h. Contratación flexible, sin costes fijos. Especialistas en React, TypeScript, Node.js y tecnologías cloud."
        keywords="staff augmentation, equipos on-demand, desarrolladores externos, contratación flexible, outsourcing IT, equipos técnicos, Valencia"
        schemaType="Service"
        schemaData={{
          serviceType: "Staff Augmentation",
        }}
      />
      <ServiceDetailTemplate
        serviceKey="onDemandTeam"
        heroImage="/images/services/OnDemandTeam-service.webp"
      />
    </>
  );
};
