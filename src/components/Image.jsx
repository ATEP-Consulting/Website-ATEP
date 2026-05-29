/**
 * Componente <Image /> que sirve variantes AVIF + WebP responsive a partir
 * del path original. Las variantes las produce scripts/optimize-images.cjs
 * y el listado de anchos disponibles por imagen vive en imageManifest.json
 * (también generado por el script).
 *
 *   src="/images/home/ExpertTeam.webp"
 *      → /images/home/ExpertTeam-480.avif (+ 768, 1200, 1600 según manifest)
 *      → /images/home/ExpertTeam-480.webp (idem)
 *      + fallback al original.
 *
 * Si la imagen no figura en el manifest (ej. añadida después del último
 * build), renderizamos un <img> plano sin srcset para evitar 404s.
 */

import manifest from "../lib/imageManifest.json";

function buildSrcset(basePath, ext, widths) {
  return widths.map((w) => `${basePath}-${w}.${ext} ${w}w`).join(", ");
}

export const Image = ({
  src,
  alt,
  sizes = "100vw",
  priority = false,
  className = "",
  style,
  width,
  height,
  ...rest
}) => {
  // Soporta solo paths locales que tienen variantes generadas (consulta
  // el manifest). Para URLs externas o imágenes no procesadas, renderiza
  // un <img> plano sin srcset.
  const widths =
    typeof src === "string" && manifest[src] && manifest[src].length > 0
      ? manifest[src]
      : null;
  const dotIdx = widths ? src.lastIndexOf(".") : -1;
  const basePath = widths && dotIdx > 0 ? src.slice(0, dotIdx) : null;

  const loading = priority ? "eager" : "lazy";
  const decoding = priority ? "sync" : "async";
  const fetchPriority = priority ? "high" : "auto";

  if (!basePath) {
    return (
      <img
        src={src}
        alt={alt}
        className={className}
        style={style}
        width={width}
        height={height}
        loading={loading}
        decoding={decoding}
        fetchpriority={fetchPriority}
        {...rest}
      />
    );
  }

  // display:contents hace que el <picture> no genere su propia caja, así que
  // el <img> sigue posicionándose como hijo directo del contenedor padre
  // (necesario cuando el padre usa position:relative + img position:absolute).
  return (
    <picture style={{ display: "contents" }}>
      <source
        type="image/avif"
        srcSet={buildSrcset(basePath, "avif", widths)}
        sizes={sizes}
      />
      <source
        type="image/webp"
        srcSet={buildSrcset(basePath, "webp", widths)}
        sizes={sizes}
      />
      <img
        src={src}
        alt={alt}
        className={className}
        style={style}
        width={width}
        height={height}
        loading={loading}
        decoding={decoding}
        fetchpriority={fetchPriority}
        {...rest}
      />
    </picture>
  );
};

export default Image;
