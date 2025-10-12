import { RefreshCw } from "lucide-react";
import { ServiceDetailTemplate } from "../../components/ServiceDetailTemplate";
import { SEO } from "../../components/SEO";

export const LegacyMigration = () => {
  return (
    <>
      <SEO
        title="Migración de Sistemas Legacy - Modernización IT"
        description="Migramos sistemas antiguos (COBOL, mainframes, VB6) a tecnologías modernas. Proceso seguro, sin downtime, manteniendo la integridad de tus datos. Más de 10 años de experiencia."
        keywords="migración legacy, modernización sistemas, COBOL, mainframes, migración datos, refactoring, actualización software, Valencia"
        schemaType="Service"
        schemaData={{
          serviceType: "Migración de Sistemas Legacy",
        }}
      />
      <ServiceDetailTemplate
        serviceKey="legacyMigration"
        heroIcon={RefreshCw}
        heroImage="/images/services/LegacyMigration-service.webp"
      />
    </>
  );
};
