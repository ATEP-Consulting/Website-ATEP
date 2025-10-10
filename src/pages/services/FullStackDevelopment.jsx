import { Code2 } from "lucide-react";
import { ServiceDetailTemplate } from "../../components/ServiceDetailTemplate";

export const FullStackDevelopment = () => {
  return (
    <ServiceDetailTemplate
      serviceKey="fullStackDevelopment"
      heroIcon={Code2}
      heroImage="https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=1920&h=1080&fit=crop&q=80"
    />
  );
};
