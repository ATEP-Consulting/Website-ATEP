/* eslint-disable */
// Wrapper para el postbuild de Vite. Ejecuta react-snap en local pero lo
// salta en CI/Vercel/Netlify donde el Chromium que trae react-snap no puede
// arrancar (faltan libs del sistema como libnss3.so).
//
// Si quieres regenerar el output prerenderizado, ejecuta localmente:
//   npm run prerender
//
// En producción el sitio funciona como SPA puro (React monta en cliente);
// los meta tags por defecto del index.html cubren las cards OG genéricas.

const CI_ENV_VARS = [
  "VERCEL",
  "NETLIFY",
  "CI",
  "GITHUB_ACTIONS",
  "GITLAB_CI",
  "CIRCLECI",
];

const inCI = CI_ENV_VARS.some((k) => process.env[k]);

if (inCI) {
  const detected = CI_ENV_VARS.filter((k) => process.env[k]).join(", ");
  console.log(`⏭  Skipping react-snap (detected: ${detected}).`);
  console.log(
    "   El SPA se servirá tal cual sin pre-render. Para generar HTML estático,"
  );
  console.log("   ejecuta `npm run prerender` localmente.");
  process.exit(0);
}

const { execSync } = require("child_process");
try {
  execSync("react-snap", { stdio: "inherit" });
} catch (err) {
  console.error("react-snap falló:", err.message);
  // No bloqueamos el build si react-snap peta en local — el dist/ ya
  // tiene los HTML del SPA y son válidos.
  process.exit(0);
}
