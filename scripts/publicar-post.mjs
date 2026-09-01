// Publica un artículo en el blog a partir de un borrador en JSON.
//
//   node scripts/publicar-post.mjs borrador.json            (solo escribe)
//   node scripts/publicar-post.mjs borrador.json --desplegar (escribe, commitea y sube)
//
// El artículo se inserta al principio de blogData.js. Después el fichero se
// vuelve a importar: si el resultado no es JavaScript válido, se restaura la
// copia de seguridad y no se publica nada. Es la red que evita que un
// borrador mal formado tumbe la web, que es el riesgo real de publicar sin
// que nadie lo mire.
//
// El sitemap y el prerender no hay que tocarlos: generate-seo-files.mjs
// descubre la ruta nueva sola en el postbuild.

import { readFileSync, writeFileSync, copyFileSync, existsSync, unlinkSync } from "node:fs";
import { execSync } from "node:child_process";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const DATA = join(root, "src/data/blogData.js");
const BACKUP = `${DATA}.backup`;

const [, , borradorPath, ...flags] = process.argv;
const desplegar = flags.includes("--desplegar");

if (!borradorPath) {
  console.error("Uso: node scripts/publicar-post.mjs <borrador.json> [--desplegar]");
  process.exit(1);
}

const fallar = (msg) => {
  console.error(`✗ ${msg}`);
  process.exit(1);
};

// ---------- 1. leer y validar el borrador ----------
let post;
try {
  post = JSON.parse(readFileSync(borradorPath, "utf8"));
} catch (e) {
  fallar(`El borrador no es JSON válido: ${e.message}`);
}

const bilingues = ["title", "excerpt", "content", "category"];
const planos = ["slug", "author", "date"];

for (const campo of planos) {
  if (typeof post[campo] !== "string" || !post[campo].trim()) {
    fallar(`Falta el campo "${campo}" o está vacío.`);
  }
}
for (const campo of bilingues) {
  if (!post[campo]?.es?.trim() || !post[campo]?.en?.trim()) {
    fallar(`El campo "${campo}" necesita texto en "es" y en "en".`);
  }
}
if (!/^[a-z0-9-]+$/.test(post.slug)) {
  fallar(`El slug "${post.slug}" solo admite minúsculas, números y guiones.`);
}
if (!/^\d{4}-\d{2}-\d{2}$/.test(post.date)) {
  fallar(`La fecha "${post.date}" debe tener el formato AAAA-MM-DD.`);
}

// El excerpt alimenta la meta description: por encima de 160 caracteres
// Google la recorta y queda una frase a medias en los resultados.
for (const idioma of ["es", "en"]) {
  if (post.excerpt[idioma].length > 160) {
    fallar(
      `El excerpt en "${idioma}" tiene ${post.excerpt[idioma].length} caracteres; el máximo son 160 porque se usa como meta description.`
    );
  }
}

const original = readFileSync(DATA, "utf8");

if (original.includes(`slug: "${post.slug}"`)) {
  fallar(`Ya existe un artículo con el slug "${post.slug}".`);
}

// ---------- 2. componer la entrada ----------
// El contenido se guarda en plantillas de texto, así que hay que neutralizar
// las comillas invertidas y las interpolaciones que pudiera traer el markdown.
const paraPlantilla = (s) => s.replace(/\\/g, "\\\\").replace(/`/g, "\\`").replace(/\$\{/g, "\\${");
const paraCadena = (s) => JSON.stringify(s);

const opcional = (clave) =>
  post[clave] ? `    ${clave}: ${paraCadena(post[clave])},\n` : "";

const entrada =
  `  {\n` +
  `    slug: ${paraCadena(post.slug)},\n` +
  opcional("relatedService") +
  opcional("relatedCase") +
  `    title: {\n      es: ${paraCadena(post.title.es)},\n      en: ${paraCadena(post.title.en)},\n    },\n` +
  `    excerpt: {\n      es: ${paraCadena(post.excerpt.es)},\n      en: ${paraCadena(post.excerpt.en)},\n    },\n` +
  `    content: {\n      es: \`${paraPlantilla(post.content.es)}\`,\n      en: \`${paraPlantilla(post.content.en)}\`,\n    },\n` +
  opcional("image") +
  `    author: ${paraCadena(post.author)},\n` +
  `    date: ${paraCadena(post.date)},\n` +
  `    category: {\n      es: ${paraCadena(post.category.es)},\n      en: ${paraCadena(post.category.en)},\n    },\n` +
  `  },\n`;

const ANCLA = "export const blogPosts = [\n";
if (!original.includes(ANCLA)) {
  fallar("No encuentro el inicio del array en blogData.js; el formato ha cambiado.");
}

// ---------- 3. escribir con red de seguridad ----------
copyFileSync(DATA, BACKUP);
writeFileSync(DATA, original.replace(ANCLA, ANCLA + entrada));

const restaurar = (motivo) => {
  copyFileSync(BACKUP, DATA);
  unlinkSync(BACKUP);
  fallar(`${motivo}\n  Se ha restaurado blogData.js. No se ha publicado nada.`);
};

try {
  const { blogPosts } = await import(`${DATA}?v=${Date.now()}`);
  const nuevo = blogPosts.find((p) => p.slug === post.slug);
  if (!nuevo) restaurar("El artículo no aparece tras insertarlo.");
  if (nuevo.content.es !== post.content.es) {
    restaurar("El contenido en español no ha sobrevivido intacto al escapado.");
  }
  if (nuevo.content.en !== post.content.en) {
    restaurar("El contenido en inglés no ha sobrevivido intacto al escapado.");
  }
  console.log(`✓ Insertado. El blog pasa de ${blogPosts.length - 1} a ${blogPosts.length} artículos.`);
} catch (e) {
  restaurar(`blogData.js ha dejado de ser válido: ${e.message}`);
}

// ---------- 4. comprobar que el proyecto sigue compilando ----------
try {
  execSync("npx vite build", { cwd: root, stdio: "pipe" });
  console.log("✓ La build pasa.");
} catch (e) {
  restaurar(`La build falla con el artículo nuevo: ${e.stderr?.toString().slice(-400) ?? e.message}`);
}

if (existsSync(BACKUP)) unlinkSync(BACKUP);

console.log(`\n  Ruta: /blog/${post.slug}`);
console.log(`  Título: ${post.title.es}`);

// ---------- 5. publicar ----------
if (!desplegar) {
  console.log("\n(Sin --desplegar: los cambios quedan en local, sin commit.)");
  process.exit(0);
}

try {
  const rama = execSync("git rev-parse --abbrev-ref HEAD", { cwd: root }).toString().trim();
  if (rama !== "main") fallar(`Estás en la rama "${rama}"; la publicación solo se hace desde main.`);

  execSync(`git add src/data/blogData.js`, { cwd: root });
  const mensaje = `blog: ${post.title.es}\n\nArtículo publicado automáticamente.\nRuta: /blog/${post.slug}\n\nCo-Authored-By: Claude Fable 5 <noreply@anthropic.com>`;
  execSync(`git commit -F -`, { cwd: root, input: mensaje });
  execSync("git push origin main", { cwd: root, stdio: "pipe" });
  console.log("\n✓ Publicado y subido. Vercel desplegará en un par de minutos.");
} catch (e) {
  console.error(`\n✗ El artículo está escrito en local pero no se ha podido subir: ${e.message}`);
  console.error("  Revisa el estado de git; el contenido no se ha perdido.");
  process.exit(1);
}
