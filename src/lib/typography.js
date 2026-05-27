export const FONT = {
  serif: '"Newsreader", "Source Serif Pro", Georgia, serif',
  sans: '"IBM Plex Sans", -apple-system, system-ui, sans-serif',
  mono: '"IBM Plex Mono", ui-monospace, Menlo, monospace',
};

export const tDisplay = (size, weight = 500) => ({
  fontFamily: FONT.serif,
  fontSize: typeof size === "number" ? `${size}px` : size,
  fontWeight: weight,
  letterSpacing: "-0.02em",
  lineHeight: 1.05,
});

export const tSerif = (size, weight = 400) => ({
  fontFamily: FONT.serif,
  fontSize: typeof size === "number" ? `${size}px` : size,
  fontWeight: weight,
  letterSpacing: "-0.005em",
});

export const tEyebrow = (color) => ({
  fontFamily: FONT.mono,
  fontSize: "11px",
  letterSpacing: "0.18em",
  textTransform: "uppercase",
  fontWeight: 400,
  color: color || "var(--muted)",
});
