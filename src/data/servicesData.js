import { Globe, Code2, Users, RefreshCw, Zap } from "lucide-react";

import { ProfessionalWebsites } from "../pages/services/ProfessionalWebsites";
import { FullStackDevelopment } from "../pages/services/FullStackDevelopment";
import { OnDemandTeam } from "../pages/services/OnDemandTeam";
import { LegacyMigration } from "../pages/services/LegacyMigration";
import { Automation } from "../pages/services/Automation";

export const getServicesData = (t) => [
  {
    id: "professional-websites",
    icon: Globe,
    name: t("services.professionalWebsites.name"),
    description: t("services.professionalWebsites.description"),
    path: "/services/professional-websites",
    component: ProfessionalWebsites,
    image:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop&q=80",
  },
  {
    id: "full-stack-development",
    icon: Code2,
    name: t("services.fullStackDevelopment.name"),
    description: t("services.fullStackDevelopment.description"),
    path: "/services/full-stack-development",
    component: FullStackDevelopment,
    image:
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&h=600&fit=crop&q=80",
    whatWeDo: t("services.fullStackDevelopment.whatWeDo"),
    whatWeDoText: t("services.fullStackDevelopment.whatWeDoText"),
    benefits: t("services.fullStackDevelopment.benefits"),
    benefit1: t("services.fullStackDevelopment.benefit1"),
    benefit2: t("services.fullStackDevelopment.benefit2"),
    benefit3: t("services.fullStackDevelopment.benefit3"),
    benefit4: t("services.fullStackDevelopment.benefit4"),
    whyChoose: t("services.fullStackDevelopment.whyChoose"),
    whyChooseText: t("services.fullStackDevelopment.whyChooseText"),
  },
  {
    id: "on-demand-team",
    icon: Users,
    name: t("services.onDemandTeam.name"),
    description: t("services.onDemandTeam.description"),
    path: "/services/on-demand-team",
    component: OnDemandTeam,
    image:
      "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&h=600&fit=crop&q=80",
  },
  {
    id: "legacy-migration",
    icon: RefreshCw,
    name: t("services.legacyMigration.name"),
    description: t("services.legacyMigration.description"),
    path: "/services/legacy-migration",
    component: LegacyMigration,
    image:
      "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&h=600&fit=crop&q=80",
    whatWeDo: t("services.legacyMigration.whatWeDo"),
    whatWeDoText: t("services.legacyMigration.whatWeDoText"),
    benefits: t("services.legacyMigration.benefits"),
    benefit1: t("services.legacyMigration.benefit1"),
    benefit2: t("services.legacyMigration.benefit2"),
    benefit3: t("services.legacyMigration.benefit3"),
    benefit4: t("services.legacyMigration.benefit4"),
    whyChoose: t("services.legacyMigration.whyChoose"),
    whyChooseText: t("services.legacyMigration.whyChooseText"),
  },
  {
    id: "automation",
    icon: Zap,
    name: t("services.automation.name"),
    description: t("services.automation.description"),
    path: "/services/automation",
    component: Automation,
    image:
      "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&h=600&fit=crop&q=80",
    whatWeDo: t("services.automation.whatWeDo"),
    whatWeDoText: t("services.automation.whatWeDoText"),
    benefits: t("services.automation.benefits"),
    benefit1: t("services.automation.benefit1"),
    benefit2: t("services.automation.benefit2"),
    benefit3: t("services.automation.benefit3"),
    benefit4: t("services.automation.benefit4"),
    whyChoose: t("services.automation.whyChoose"),
    whyChooseText: t("services.automation.whyChooseText"),
  },
];
