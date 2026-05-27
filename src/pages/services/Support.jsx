import { ServiceDetailTemplate } from "../../components/ServiceDetailTemplate";
import { SEO } from "../../components/SEO";

export const Support = () => {
  return (
    <>
      <SEO
        title="Soporte y Mantenimiento Continuo - Squad Dedicado con SLA"
        description="Mantenemos vivos los productos que entregamos. Squad dedicado con SLA, monitorización proactiva, hotfixes y roadmap evolutivo trimestral. Tu equipo técnico de confianza con compromiso real."
        keywords="mantenimiento software, soporte técnico, SLA, equipo dedicado, evolución producto, monitorización, observabilidad, hotfix, Valencia"
        schemaType="Service"
        schemaData={{
          serviceType: "Soporte y Mantenimiento Continuo",
          offers: {
            "@type": "Offer",
            availability: "https://schema.org/InStock",
            priceCurrency: "EUR",
          },
        }}
      />
      <ServiceDetailTemplate serviceKey="support" />
    </>
  );
};
