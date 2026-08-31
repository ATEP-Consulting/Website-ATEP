/* eslint-disable */
// Wrapper para el postbuild de Vite.
//
// Siempre: genera dist/sitemap.xml desde los datos reales de rutas
// (scripts/generate-seo-files.mjs), para que nunca se desincronice.
//
// En local además ejecuta react-snap (prerender completo por ruta).
// En CI/Vercel/Netlify el Chromium de react-snap no puede arrancar (faltan
// libs del sistema como libnss3.so), así que en su lugar se inyectan
// title/description/canonical/OG únicos por ruta en el shell del SPA
// (--inject): los crawlers y scrapers ven metas correctas por URL aunque el
// body dependa de JS. Para desplegar el prerender completo, generar dist en
// local (npm run build) y publicarlo prebuilt.

const { execSync } = require("child_process");

const CI_ENV_VARS = [
  "VERCEL",
  "NETLIFY",
  "CI",
  "GITHUB_ACTIONS",
  "GITLAB_CI",
  "CIRCLECI",
];

const inCI = CI_ENV_VARS.some((k) => process.env[k]);

try {
  execSync(`node scripts/generate-seo-files.mjs${inCI ? " --inject" : ""}`, {
    stdio: "inherit",
  });
} catch (err) {
  console.error("generate-seo-files falló:", err.message);
  process.exit(1);
}

if (inCI) {
  const detected = CI_ENV_VARS.filter((k) => process.env[k]).join(", ");
  console.log(`⏭  Skipping react-snap (detected: ${detected}).`);
  console.log("   Metas por ruta inyectadas en el shell; para HTML completo,");
  console.log("   ejecuta `npm run build` en local y despliega dist prebuilt.");
} else {
  try {
    execSync("react-snap", { stdio: "inherit" });
  } catch (err) {
    // El Chromium que trae react-snap se desconecta de vez en cuando y deja
    // el crawl a medias: rutas sin generar que en producción darían 404.
    // Caemos al modo de CI para que TODAS las rutas existan con sus metas.
    console.error("react-snap falló:", err.message);
    console.log("↩  Generando páginas con metas inyectadas como respaldo…");
    execSync("node scripts/generate-seo-files.mjs --inject", { stdio: "inherit" });
  }
}

// precarga del chunk de cada ruta lazy (local y CI)
try {
  execSync("node scripts/inject-modulepreload.mjs", { stdio: "inherit" });
} catch (err) {
  console.error("inject-modulepreload falló:", err.message);
}
