// Stats que se muestran en Home y AboutUs.
//
// Tres de los cuatro valores se calculan dinámicamente:
//   - Años de experiencia: año actual - COMPANY_FOUNDED_YEAR
//   - Proyectos completados: longitud del array de casos
//   - Clientes satisfechos: longitud del array de clientes
// El cuarto (soluciones personalizadas %) sigue como valor en i18n porque
// es cualitativo, no un contador.

import { cases } from "../data/casesData";
import { clients } from "../data/clientsData";
import { getYearsActive } from "./company";

export const getHeroStats = (t) => [
  {
    number: `${getYearsActive()}+`,
    label: t("stats.stat1.label"),
  },
  {
    number: `${cases.length}+`,
    label: t("stats.stat2.label"),
  },
  {
    number: `${clients.length}+`,
    label: t("stats.stat3.label"),
  },
  {
    number: t("stats.stat4.number"),
    label: t("stats.stat4.label"),
  },
];
