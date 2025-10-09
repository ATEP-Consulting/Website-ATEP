// src/config/heroStats.js
export const getHeroStats = (t) => {
  const stats = t("stats", { returnObjects: true });
  return Object.values(stats);
};
