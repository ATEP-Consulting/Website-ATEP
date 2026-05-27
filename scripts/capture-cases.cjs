/* eslint-disable */
// Captura screenshots de las webs públicas de cada caso y las guarda como webp
// en public/images/cases/{slug}.webp para usarlas en CaseCard y CasePost.
//
// Uso: node scripts/capture-cases.cjs
//
// Solo procesa los casos que tienen `liveUrl`. Para añadir/quitar casos,
// edita src/data/casesData.js (campo liveUrl) — este script no necesita
// cambios.

const path = require("path");
const fs = require("fs");
const puppeteer = require("puppeteer");
const sharp = require("sharp");

const SITES = [
  { slug: "lnh-partner", url: "https://www.lnhpartner.com" },
  { slug: "tibis-market", url: "https://www.tibismarket.com" },
  { slug: "turnos", url: "https://www.goturnos.com" },
  { slug: "luis-royuela-nutricionistas", url: "https://www.luisroyuelanutricionistas.com" },
];

const OUT_DIR = path.join(__dirname, "..", "public", "images", "cases");
const VIEWPORT = { width: 1440, height: 900, deviceScaleFactor: 2 };

async function capture(browser, { slug, url }) {
  const page = await browser.newPage();
  await page.setViewport(VIEWPORT);
  // User-agent realista para evitar variantes "bot" del sitio
  await page.setUserAgent(
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
  );
  process.stdout.write(`→ ${slug}  ${url} ... `);
  try {
    await page.goto(url, { waitUntil: "networkidle0", timeout: 45000 });
    // Scroll suave hasta arriba (por si el sitio tiene scroll restoration) y
    // un pequeño scroll hacia abajo y vuelta, para disparar lazy-loading.
    await page.evaluate(async () => {
      window.scrollTo(0, document.documentElement.scrollHeight / 2);
      await new Promise((r) => setTimeout(r, 800));
      window.scrollTo(0, 0);
    });
    // Tiempo extra para fonts, imágenes lazy y animaciones de entrada.
    await new Promise((r) => setTimeout(r, 4000));
    const png = await page.screenshot({ type: "png", fullPage: false });
    const outPath = path.join(OUT_DIR, `${slug}.webp`);
    await sharp(png)
      .resize({ width: 1600, withoutEnlargement: true })
      .webp({ quality: 82 })
      .toFile(outPath);
    const stat = fs.statSync(outPath);
    console.log(`OK (${Math.round(stat.size / 1024)} KB)`);
  } catch (err) {
    console.log(`FAIL — ${err.message}`);
  } finally {
    await page.close();
  }
}

(async () => {
  if (!fs.existsSync(OUT_DIR)) fs.mkdirSync(OUT_DIR, { recursive: true });
  const browser = await puppeteer.launch({
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });
  for (const site of SITES) {
    await capture(browser, site);
  }
  await browser.close();
  console.log(`\nHecho. Imágenes en ${OUT_DIR}`);
})();
