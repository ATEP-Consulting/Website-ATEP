import { Users } from "lucide-react";
import { ServiceDetailTemplate } from "../../components/ServiceDetailTemplate";

export const OnDemandTeam = () => {
  return (
    <ServiceDetailTemplate
      serviceKey="onDemandTeam"
      heroIcon={Users}
      heroImage="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1920&h=1080&fit=crop&q=80"
    />
  );
};
