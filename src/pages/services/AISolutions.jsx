import { ServiceDetailTemplate } from "../../components/ServiceDetailTemplate";
import { SEO } from "../../components/SEO";

export const AISolutions = () => {
  return (
    <>
      <SEO
        title="Inteligencia Artificial Aplicada - Chatbots, Asistentes y Agentes"
        description="Diseñamos asistentes y chatbots con IA que entienden tu negocio y trabajan con tu información real. RAG, agentes autónomos, análisis automático. OpenAI, Anthropic, modelos abiertos."
        keywords="inteligencia artificial, IA aplicada, chatbot empresarial, asistente IA, RAG, agentes IA, OpenAI, Anthropic, automatización inteligente, Valencia"
        schemaType="Service"
        schemaData={{
          serviceType: "Inteligencia Artificial Aplicada",
          offers: {
            "@type": "Offer",
            availability: "https://schema.org/InStock",
            priceCurrency: "EUR",
          },
        }}
      />
      <ServiceDetailTemplate serviceKey="aiSolutions" />
    </>
  );
};
