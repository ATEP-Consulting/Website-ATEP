// Genera artefactos SEO en dist/ a partir de las rutas reales del sitio:
//
//   - dist/sitemap.xml (siempre), con todas las rutas y su lastmod.
//   - reactSnap.include se completa solo con lo que falte (react-snap solo
//     descubre lo enlazado: un post que cae a la página 2 del blog dejaba
//     de prerenderizarse en silencio).
//   - con --inject (CI/Vercel, donde react-snap no puede abrir Chromium):
//     un index.html por ruta con title/description/canonical/OG únicos
//     inyectados en el shell, más un 404.html con noindex. Así los crawlers
//     y los scrapers de LinkedIn/WhatsApp ven metas correctas por URL
//     aunque el cuerpo lo pinte el navegador.
//
// Los títulos y descripciones se leen de los propios componentes (la etiqueta
// <SEO> de cada página) para no duplicar textos; si alguno no se puede
// extraer, se usa el respaldo de FALLBACK_META y se avisa por consola.

import { readFileSync, writeFileSync, mkdirSync, existsSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { cases } from "../src/data/casesData.js";
import { blogPosts } from "../src/data/blogData.js";

const BASE_URL = "https://www.atepconsulting.com";
const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const dist = join(root, "dist");
const buildDate = new Date().toISOString().slice(0, 10);

// ruta → componente del que se leen sus metadatos
const PAGE_SOURCES = {
  "/": "src/pages/Home.jsx",
  "/company": "src/pages/AboutUs.jsx",
  "/services": "src/pages/services/ServicesOverview.jsx",
  "/blog": "src/pages/blog/BlogList.jsx",
  "/cases": "src/pages/cases/CasesList.jsx",
  "/contact": "src/pages/Contact.jsx",
  "/privacy-policy": "src/pages/PrivacyPolicy.jsx",
  "/cookies-policy": "src/pages/CookiesPolicy.jsx",
  "/legal-notice": "src/pages/LegalNotice.jsx",
  "/services/professional-websites": "src/pages/services/ProfessionalWebsites.jsx",
  "/services/full-stack-development": "src/pages/services/FullStackDevelopment.jsx",
  "/services/on-demand-team": "src/pages/services/OnDemandTeam.jsx",
  "/services/legacy-migration": "src/pages/services/LegacyMigration.jsx",
  "/services/automation": "src/pages/services/Automation.jsx",
  "/services/ai-solutions": "src/pages/services/AISolutions.jsx",
  "/services/mobile-apps": "src/pages/services/MobileApps.jsx",
  "/services/ecommerce": "src/pages/services/Ecommerce.jsx",
  "/services/support": "src/pages/services/Support.jsx",
};

// Para las páginas cuyo <SEO> usa expresiones en vez de literales
const FALLBACK_META = {
  "/cases": {
    title: "Casos de Éxito - Proyectos Reales de ATEP Consulting",
    description:
      "Plataformas SaaS, e-commerce, sistemas de gestión y dashboards de business intelligence. Casos reales entregados por ATEP Consulting en Valencia y España.",
  },
  "/privacy-policy": { title: "Política de Privacidad", description: "Política de privacidad de ATEP Consulting." },
  "/cookies-policy": { title: "Política de Cookies", description: "Política de cookies de ATEP Consulting." },
  "/legal-notice": { title: "Aviso Legal", description: "Aviso legal de ATEP Consulting." },
};

const readMeta = (route) => {
  const file = PAGE_SOURCES[route];
  const full = file && join(root, file);
  if (full && existsSync(full)) {
    const src = readFileSync(full, "utf8");
    const m = src.match(/<SEO\s+title="([^"]+)"[\s\S]{0,500}?description="([^"]+)"/);
    if (m) return { title: m[1], description: m[2] };
  }
  const fb = FALLBACK_META[route];
  if (!fb) console.warn(`⚠ sin metadatos para ${route} (se usa el título genérico)`);
  return fb || { title: null, description: "" };
};

const trim = (text = "") => {
  if (text.length <= 160) return text;
  const cut = text.slice(0, 157);
  return `${cut.slice(0, cut.lastIndexOf(" "))}…`;
};

const esc = (s = "") =>
  s.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;");

const resolveImage = (image) => {
  if (!image || image.endsWith(".webp")) return `${BASE_URL}/og-image.png`;
  return image.startsWith("http") ? image : `${BASE_URL}${image}`;
};

// Mismo criterio que SEO.jsx: las medidas solo se anuncian para la imagen por
// defecto, que es la única cuyo tamaño conocemos (1200×630).
const OG_DEFAULT_IMAGE = `${BASE_URL}/og-image.png`;
const OG_IMAGE_ALT =
  "ATEP Consulting — consultoría IT y desarrollo de software a medida";

const routes = [
  ...Object.keys(PAGE_SOURCES).map((path) => ({ path, ...readMeta(path) })),
  ...cases.map((c) => ({
    path: `/cases/${c.slug}`,
    title: c.seoTitle?.es || c.title.es,
    description: c.description.es,
    image: c.image,
  })),
  ...blogPosts.map((p) => ({
    path: `/blog/${p.slug}`,
    title: p.title.es,
    description: p.excerpt.es,
    image: p.image,
    type: "article",
    lastmod: p.date,
  })),
];

// ---------- sitemap.xml ----------
const urlEntries = routes
  .map((r) => {
    const loc = r.path === "/" ? `${BASE_URL}/` : `${BASE_URL}${r.path}`;
    return `  <url>\n    <loc>${loc}</loc>\n    <lastmod>${r.lastmod || buildDate}</lastmod>\n  </url>`;
  })
  .join("\n");

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urlEntries}\n</urlset>\n`;
mkdirSync(dist, { recursive: true });
writeFileSync(join(dist, "sitemap.xml"), sitemap);
console.log(`✓ sitemap.xml generado con ${routes.length} rutas`);

// ---------- reactSnap.include siempre sincronizado ----------
const pkgPath = join(root, "package.json");
const pkg = JSON.parse(readFileSync(pkgPath, "utf8"));
if (pkg.reactSnap) {
  const include = pkg.reactSnap.include ?? [];
  const missing = routes.map((r) => r.path).filter((p) => !include.includes(p));
  if (missing.length) {
    pkg.reactSnap.include = [...include, ...missing];
    writeFileSync(pkgPath, `${JSON.stringify(pkg, null, 2)}\n`);
    console.log(`✓ reactSnap.include completado con ${missing.length} ruta(s): ${missing.join(", ")}`);
  }
}

// ---------- inyección de metas por ruta (solo CI) ----------
if (process.argv.includes("--inject")) {
  const shell = readFileSync(join(dist, "index.html"), "utf8");

  const buildHead = (r) => {
    const fullTitle = r.title ? `${r.title} | ATEP Consulting` : "ATEP Consulting | Consultoría IT y Desarrollo de Software";
    const desc = trim(r.description);
    const url = r.path === "/" ? `${BASE_URL}/` : `${BASE_URL}${r.path}`;
    const img = resolveImage(r.image);
    return [
      `<meta name="description" content="${esc(desc)}"/>`,
      `<link rel="canonical" href="${url}"/>`,
      `<meta property="og:title" content="${esc(fullTitle)}"/>`,
      `<meta property="og:description" content="${esc(desc)}"/>`,
      `<meta property="og:image" content="${img}"/>`,
      `<meta property="og:image:alt" content="${esc(OG_IMAGE_ALT)}"/>`,
      ...(img === OG_DEFAULT_IMAGE
        ? [
            `<meta property="og:image:width" content="1200"/>`,
            `<meta property="og:image:height" content="630"/>`,
          ]
        : []),
      `<meta property="og:url" content="${url}"/>`,
      `<meta property="og:type" content="${r.type || "website"}"/>`,
      `<meta property="og:locale" content="es_ES"/>`,
      `<meta property="og:site_name" content="ATEP Consulting"/>`,
      `<meta name="twitter:card" content="summary_large_image"/>`,
      `<meta name="twitter:title" content="${esc(fullTitle)}"/>`,
      `<meta name="twitter:description" content="${esc(desc)}"/>`,
      `<meta name="twitter:image" content="${img}"/>`,
      `<meta name="twitter:image:alt" content="${esc(OG_IMAGE_ALT)}"/>`,
    ].join("\n    ");
  };

  const pageHtml = (r) => {
    const fullTitle = r.title ? `${r.title} | ATEP Consulting` : "ATEP Consulting | Consultoría IT y Desarrollo de Software";
    return shell
      .replace(/<title>[^<]*<\/title>/, `<title>${esc(fullTitle)}</title>`)
      .replace("</head>", `    ${buildHead(r)}\n  </head>`);
  };

  for (const r of routes) {
    const target = r.path === "/" ? join(dist, "index.html") : join(dist, r.path.slice(1), "index.html");
    mkdirSync(dirname(target), { recursive: true });
    writeFileSync(target, pageHtml(r));
  }

  const notFound = shell
    .replace(/<title>[^<]*<\/title>/, "<title>Página No Encontrada - Error 404 | ATEP Consulting</title>")
    .replace("</head>", '    <meta name="robots" content="noindex"/>\n  </head>');
  writeFileSync(join(dist, "404.html"), notFound);
  console.log(`✓ metas por ruta inyectadas en ${routes.length} páginas + 404.html`);
}
