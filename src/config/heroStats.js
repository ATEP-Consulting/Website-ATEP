// Stats que se muestran en Home y AboutUs.
//
// Ahora son métricas de outcome extraídas de proyectos reales (ver casesData.js).
// Antes mostraban volumen (años, nº proyectos, nº clientes), que con números
// pequeños generaba desconfianza en lugar de credibilidad.

export const getHeroStats = (t) => [
  {
    number: t("stats.stat1.number"),
    label: t("stats.stat1.label"),
  },
  {
    number: t("stats.stat2.number"),
    label: t("stats.stat2.label"),
  },
  {
    number: t("stats.stat3.number"),
    label: t("stats.stat3.label"),
  },
  {
    number: t("stats.stat4.number"),
    label: t("stats.stat4.label"),
  },
];
