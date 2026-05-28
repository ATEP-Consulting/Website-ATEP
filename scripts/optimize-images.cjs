/* eslint-disable */
/**
 * Genera variantes AVIF y WebP responsive para todas las imágenes de
 * public/images/. Pensado para correr antes del `vite build`, así el dist/
 * ya incluye las variantes.
 *
 * Convenciones:
 *  - Para una imagen `foo.webp` se generan `foo-480.avif`, `foo-768.avif`,
 *    `foo-1200.avif`, `foo-1600.avif` y sus equivalentes `.webp`.
 *  - Si la imagen fuente es más pequeña que un ancho objetivo, esa variante
 *    se omite (sharp con `withoutEnlargement: true`).
 *  - El archivo original se mantiene tal cual (sirve como fallback final).
 *  - El script es idempotente: si el output ya existe y es más nuevo que la
 *    fuente, se omite.
 */

const fs = require("fs");
const path = require("path");
const sharp = require("sharp");

const ROOT = path.resolve(__dirname, "..");
const IMAGES_DIR = path.join(ROOT, "public", "images");

// Anchos objetivo en píxeles. 480 cubre móvil 1x / 320–414 device width 2x.
// 768 cubre tablet y móvil 3x. 1200 cubre desktop estándar y móvil retina
// muy ancho. 1600 es para pantallas grandes/4K — solo se usa si la fuente
// es realmente grande.
const WIDTHS = [480, 768, 1200, 1600];

// Calidades — AVIF da resultados aceptables con menos calidad que WebP.
const AVIF_QUALITY = 55;
const WEBP_QUALITY = 78;

const SOURCE_EXTS = new Set([".webp", ".jpg", ".jpeg", ".png"]);

function walk(dir, acc = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      walk(full, acc);
    } else if (SOURCE_EXTS.has(path.extname(entry.name).toLowerCase())) {
      // Saltar archivos que ya son variantes generadas (foo-480.avif).
      const base = path.basename(entry.name, path.extname(entry.name));
      if (/-\d{3,4}$/.test(base)) continue;
      acc.push(full);
    }
  }
  return acc;
}

function outputNewer(src, out) {
  if (!fs.existsSync(out)) return false;
  return fs.statSync(out).mtimeMs >= fs.statSync(src).mtimeMs;
}

async function processOne(src) {
  const dir = path.dirname(src);
  const ext = path.extname(src);
  const base = path.basename(src, ext);

  const meta = await sharp(src).metadata();
  const sourceWidth = meta.width || 0;

  const jobs = [];
  for (const w of WIDTHS) {
    // No upscalear: si la fuente es 600 px, no generamos variante 1200.
    if (sourceWidth && w > sourceWidth * 1.05) continue;

    const avifOut = path.join(dir, `${base}-${w}.avif`);
    const webpOut = path.join(dir, `${base}-${w}.webp`);

    if (!outputNewer(src, avifOut)) {
      jobs.push(
        sharp(src)
          .resize({ width: w, withoutEnlargement: true })
          .avif({ quality: AVIF_QUALITY, effort: 4 })
          .toFile(avifOut),
      );
    }
    if (!outputNewer(src, webpOut)) {
      jobs.push(
        sharp(src)
          .resize({ width: w, withoutEnlargement: true })
          .webp({ quality: WEBP_QUALITY, effort: 4 })
          .toFile(webpOut),
      );
    }
  }
  await Promise.all(jobs);
}

async function main() {
  if (!fs.existsSync(IMAGES_DIR)) {
    console.log(`No existe ${IMAGES_DIR}, salto.`);
    return;
  }

  const sources = walk(IMAGES_DIR);
  if (sources.length === 0) {
    console.log("No hay imágenes que optimizar.");
    return;
  }

  console.log(`Optimizando ${sources.length} imágenes…`);
  const started = Date.now();

  // Limitamos la concurrencia para no saturar la RAM en builds con muchas
  // imágenes grandes (sharp es nativo y agresivo con la memoria).
  const CONCURRENCY = 4;
  let cursor = 0;
  async function worker() {
    while (cursor < sources.length) {
      const i = cursor++;
      try {
        await processOne(sources[i]);
      } catch (err) {
        console.error(`✗ ${sources[i]}: ${err.message}`);
      }
    }
  }
  await Promise.all(
    Array.from({ length: CONCURRENCY }, () => worker()),
  );

  console.log(`✓ Listo en ${((Date.now() - started) / 1000).toFixed(1)}s`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
