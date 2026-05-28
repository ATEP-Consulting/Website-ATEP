/**
 * Componente <Image /> que sirve variantes AVIF + WebP responsive a partir
 * del path original. Asume el patrón que produce scripts/optimize-images.cjs:
 *
 *   src="/images/home/ExpertTeam.webp"
 *      → /images/home/ExpertTeam-480.avif (… 768, 1200, 1600)
 *      → /images/home/ExpertTeam-480.webp (… 768, 1200, 1600)
 *      + fallback al original.
 *
 * Si la variante no existe en disco, el navegador hará fallback automático
 * al siguiente <source> o al <img>, así que sirve también con imágenes
 * pequeñas para las que el script no genera todas las variantes.
 */

const RESPONSIVE_WIDTHS = [480, 768, 1200, 1600];

function buildSrcset(basePath, ext) {
  return RESPONSIVE_WIDTHS.map((w) => `${basePath}-${w}.${ext} ${w}w`).join(
    ", ",
  );
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
  // Soporta solo paths locales que vienen del pipeline de sharp. Si llega
  // una URL externa (ej. https://...) lo dejamos como <img> plano.
  const isLocal = typeof src === "string" && src.startsWith("/");
  const dotIdx = isLocal ? src.lastIndexOf(".") : -1;
  const basePath = isLocal && dotIdx > 0 ? src.slice(0, dotIdx) : null;

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
        srcSet={buildSrcset(basePath, "avif")}
        sizes={sizes}
      />
      <source
        type="image/webp"
        srcSet={buildSrcset(basePath, "webp")}
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
