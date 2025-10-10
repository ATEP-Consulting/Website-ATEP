import { RefreshCw } from "lucide-react";
import { ServiceDetailTemplate } from "../../components/ServiceDetailTemplate";

export const LegacyMigration = () => {
  return (
    <ServiceDetailTemplate
      serviceKey="legacyMigration"
      heroIcon={RefreshCw}
      heroImage="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1920&h=1080&fit=crop&q=80"
    />
  );
};
