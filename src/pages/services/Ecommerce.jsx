import { ServiceDetailTemplate } from "../../components/ServiceDetailTemplate";
import { SEO } from "../../components/SEO";

export const Ecommerce = () => {
  return (
    <>
      <SEO
        title="E-commerce a Medida - Tiendas Online Rápidas y Optimizadas"
        description="Tiendas online rápidas, mobile-first y optimizadas para conversión. Desde checkout por WhatsApp sin comisiones hasta plataformas headless con Stripe, Shopify o WooCommerce. Diseñadas para vender."
        keywords="ecommerce, tienda online, ventas online, Stripe, Shopify, headless commerce, pasarela de pago, WooCommerce, Valencia"
        schemaType="Service"
        schemaData={{
          serviceType: "E-commerce a Medida",
          offers: {
            "@type": "Offer",
            availability: "https://schema.org/InStock",
            priceCurrency: "EUR",
          },
        }}
      />
      <ServiceDetailTemplate serviceKey="ecommerce" />
    </>
  );
};
