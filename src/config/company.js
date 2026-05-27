// Constantes globales del negocio.
//
// El año fundacional se usa para calcular dinámicamente "años de experiencia"
// en los stats. Cuando llegue el 1 de enero del próximo año, el stat se
// incrementa solo sin tener que tocar nada.

export const COMPANY_FOUNDED_YEAR = 2023;

export const getYearsActive = () => {
  const current = new Date().getFullYear();
  return Math.max(1, current - COMPANY_FOUNDED_YEAR);
};
