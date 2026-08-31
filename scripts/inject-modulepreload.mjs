// Inyecta <link rel="modulepreload"> del chunk de cada ruta lazy en su HTML
// de dist/, usando el manifest de Vite. Sin esto, el chunk de la ruta se
// descubre tarde (main.js → import() → red) y el LCP de las páginas
// interiores se va al repintado tardío. Se ejecuta en el postbuild tras
// react-snap (local) o tras la inyección de metas (CI).

import { readFileSync, writeFileSync, existsSync, readdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const dist = join(root, "dist");
const manifestPath = join(dist, ".vite", "manifest.json");

if (!existsSync(manifestPath)) {
  console.log("⏭  sin manifest de Vite — se omite modulepreload");
  process.exit(0);
}
const manifest = JSON.parse(readFileSync(manifestPath, "utf8"));

const chunkFor = (source) => manifest[source]?.file;

// ruta (dir bajo dist) → componente fuente que carga esa ruta
const ROUTE_SOURCES = [
  ["services", "src/pages/services/ServicesOverview.jsx", false],
  ["cases", "src/pages/cases/CasesList.jsx", false],
  ["cases", "src/pages/cases/CasePost.jsx", true],
  ["blog", "src/pages/blog/BlogList.jsx", false],
  ["blog", "src/pages/blog/BlogPost.jsx", true],
  ["contact", "src/pages/Contact.jsx", false],
  ["company", "src/pages/AboutUs.jsx", false],
  ["privacy-policy", "src/pages/PrivacyPolicy.jsx", false],
  ["cookies-policy", "src/pages/CookiesPolicy.jsx", false],
  ["legal-notice", "src/pages/LegalNotice.jsx", false],
];

const inject = (htmlPath, files) => {
  if (!existsSync(htmlPath)) return;
  let html = readFileSync(htmlPath, "utf8");
  const links = files
    .filter(Boolean)
    .filter((f) => !html.includes(f))
    .map((f) => `<link rel="modulepreload" crossorigin href="/${f}">`)
    .join("");
  if (!links) return;
  html = html.replace("</head>", `${links}</head>`);
  writeFileSync(htmlPath, html);
};

let count = 0;
for (const [dir, source, isDetail] of ROUTE_SOURCES) {
  const chunk = chunkFor(source);
  if (!chunk) continue;
  if (!isDetail) {
    inject(join(dist, dir, "index.html"), [chunk]);
    count++;
  } else {
    const base = join(dist, dir);
    if (!existsSync(base)) continue;
    for (const sub of readdirSync(base, { withFileTypes: true })) {
      if (sub.isDirectory()) {
        inject(join(base, sub.name, "index.html"), [chunk]);
        count++;
      }
    }
  }
}
console.log(`✓ modulepreload inyectado en ${count} páginas`);
