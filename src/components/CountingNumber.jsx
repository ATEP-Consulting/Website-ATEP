import { useEffect, useRef } from "react";

const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

export const CountingNumber = ({ value, dur = 1600, locale = "es-ES" }) => {
  const ref = useRef(null);
  const match = String(value).match(/^([^\d-]*)(-?[\d.,]+)(.*)$/);
  const prefix = match?.[1] ?? "";
  const numStr = match?.[2] ?? "0";
  const suffix = match?.[3] ?? "";
  const target = parseFloat(numStr.replace(",", ".")) || 0;
  const decimals = numStr.includes(".")
    ? numStr.split(".")[1]?.length ?? 0
    : 0;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const fmt = (n) =>
      decimals
        ? n.toFixed(decimals)
        : Math.round(n).toLocaleString(locale);
    if (prefersReducedMotion()) {
      el.textContent = `${prefix}${fmt(target)}${suffix}`;
      return;
    }
    const t0 = performance.now();
    let raf;
    const tick = (t) => {
      const p = Math.min(1, (t - t0) / dur);
      const eased = 1 - Math.pow(1 - p, 3);
      if (el.isConnected) el.textContent = `${prefix}${fmt(target * eased)}${suffix}`;
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, dur, prefix, suffix, decimals, locale]);

  return (
    <span ref={ref}>
      {prefix}
      {decimals ? target.toFixed(decimals) : Math.round(target).toLocaleString(locale)}
      {suffix}
    </span>
  );
};
