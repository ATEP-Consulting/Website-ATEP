import { ServiceDetailTemplate } from "../../components/ServiceDetailTemplate";
import { SEO } from "../../components/SEO";

export const MobileApps = () => {
  return (
    <>
      <SEO
        title="Desarrollo de Apps Móviles - iOS, Android y Multiplataforma"
        description="Apps móviles nativas (Swift, Kotlin) y multiplataforma (React Native) a medida. Diseñadas para escalar, mantenibles a largo plazo y publicadas en App Store y Play Store. Equipo técnico senior."
        keywords="apps móviles, desarrollo iOS, desarrollo Android, React Native, Swift, Kotlin, app a medida, aplicación móvil, Valencia"
        schemaType="Service"
        schemaData={{
          serviceType: "Desarrollo de Apps Móviles",
          offers: {
            "@type": "Offer",
            availability: "https://schema.org/InStock",
            priceCurrency: "EUR",
          },
        }}
      />
      <ServiceDetailTemplate serviceKey="mobileApps" />
    </>
  );
};
