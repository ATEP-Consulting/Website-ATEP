import { Globe } from "lucide-react";
import { ServiceDetailTemplate } from "../../components/ServiceDetailTemplate";

export const ProfessionalWebsites = () => {
  return (
    <ServiceDetailTemplate
      serviceKey="professionalWebsites"
      heroIcon={Globe}
      heroImage="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1920&h=1080&fit=crop&q=80"
    />
  );
};
