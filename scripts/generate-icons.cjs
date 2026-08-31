// Genera los iconos rasterizados del sitio a partir de public/new-logo-atep.svg.
//
// Hace falta porque el favicon era solo SVG: dejar además un .ico y unos .png
// quita cualquier duda sobre si Google puede mostrarlo en resultados, y el
// <link rel="apple-touch-icon"> apuntaba a un fichero que nunca existió.
//
// El icono de Apple lleva fondo crema en vez de transparencia: iOS lo pinta
// sobre una baldosa y la transparencia se le vuelve negra.
//
//   node scripts/generate-icons.cjs

const fs = require("fs");
const path = require("path");
const sharp = require("sharp");

const root = path.join(__dirname, "..");
const publicDir = path.join(root, "public");
const source = path.join(publicDir, "new-logo-atep.svg");
const CREAM = { r: 245, g: 241, b: 232, alpha: 1 };

// Envuelve un PNG en un contenedor .ico. El formato admite PNG dentro desde
// Vista, y es lo que entienden tanto los navegadores actuales como Google.
const wrapPngInIco = (png, size) => {
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0); // reservado
  header.writeUInt16LE(1, 2); // tipo: 1 = icono
  header.writeUInt16LE(1, 4); // número de imágenes

  const entry = Buffer.alloc(16);
  entry.writeUInt8(size === 256 ? 0 : size, 0); // ancho (0 significa 256)
  entry.writeUInt8(size === 256 ? 0 : size, 1); // alto
  entry.writeUInt8(0, 2); // colores de paleta
  entry.writeUInt8(0, 3); // reservado
  entry.writeUInt16LE(1, 4); // planos
  entry.writeUInt16LE(32, 6); // bits por píxel
  entry.writeUInt32LE(png.length, 8);
  entry.writeUInt32LE(header.length + entry.length, 12); // desplazamiento

  return Buffer.concat([header, entry, png]);
};

(async () => {
  if (!fs.existsSync(source)) {
    console.error(`✗ no encuentro ${source}`);
    process.exit(1);
  }
  const svg = fs.readFileSync(source);

  // Favicons: fondo transparente, el navegador los pinta sobre su propia pestaña
  for (const size of [16, 32]) {
    await sharp(svg, { density: 384 })
      .resize(size, size)
      .png()
      .toFile(path.join(publicDir, `favicon-${size}x${size}.png`));
    console.log(`✓ favicon-${size}x${size}.png`);
  }

  // Google recomienda 48 o un múltiplo para el icono de resultados
  const ico48 = await sharp(svg, { density: 384 }).resize(48, 48).png().toBuffer();
  fs.writeFileSync(path.join(publicDir, "favicon.ico"), wrapPngInIco(ico48, 48));
  console.log("✓ favicon.ico (48×48)");

  // iOS: fondo sólido y un poco de aire, porque recorta las esquinas
  await sharp(svg, { density: 512 })
    .resize(152, 152)
    .extend({ top: 14, bottom: 14, left: 14, right: 14, background: CREAM })
    .flatten({ background: CREAM })
    .png()
    .toFile(path.join(publicDir, "apple-touch-icon.png"));
  console.log("✓ apple-touch-icon.png (180×180 con fondo)");
})();
