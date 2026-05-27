import { Children, useEffect, useRef, useState } from "react";

const useReducedMotion = () => {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const m = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(m.matches);
    const h = () => setReduced(m.matches);
    m.addEventListener?.("change", h) ?? m.addListener(h);
    return () => {
      m.removeEventListener?.("change", h) ?? m.removeListener(h);
    };
  }, []);
  return reduced;
};

export const Reveal = ({
  children,
  delay = 0,
  y = 28,
  dur = 900,
  as: As = "div",
  style = {},
  className,
  ...rest
}) => {
  const reduced = useReducedMotion();
  const ref = useRef(null);
  const [seen, setSeen] = useState(true);
  const [armed, setArmed] = useState(false);

  useEffect(() => {
    if (reduced || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    const vh = window.innerHeight || document.documentElement.clientHeight || 800;
    if (r.top >= vh) {
      setSeen(false);
      setArmed(true);
    }
  }, [reduced]);

  useEffect(() => {
    if (!armed || !ref.current) return;
    let done = false;
    const check = () => {
      if (done || !ref.current) return;
      const r = ref.current.getBoundingClientRect();
      const vh =
        window.innerHeight || document.documentElement.clientHeight || 800;
      if (r.top < vh * 0.92 && r.bottom > 0) {
        done = true;
        setSeen(true);
        window.removeEventListener("scroll", check);
      }
    };
    check();
    window.addEventListener("scroll", check, { passive: true });
    const safety = setTimeout(() => {
      if (!done) {
        done = true;
        setSeen(true);
      }
    }, 4000);
    return () => {
      done = true;
      clearTimeout(safety);
      window.removeEventListener("scroll", check);
    };
  }, [armed]);

  if (reduced) {
    return (
      <As ref={ref} style={style} className={className} {...rest}>
        {children}
      </As>
    );
  }

  return (
    <As
      ref={ref}
      className={className}
      style={{
        opacity: seen ? 1 : 0,
        transform: seen ? "translateY(0)" : `translateY(${y}px)`,
        transition: `opacity ${dur}ms cubic-bezier(.2,.7,.25,1) ${delay}ms, transform ${dur}ms cubic-bezier(.2,.7,.25,1) ${delay}ms`,
        ...style,
      }}
      {...rest}
    >
      {children}
    </As>
  );
};

export const RevealStagger = ({
  children,
  stagger = 90,
  base = 0,
  y = 24,
  dur = 900,
  className,
  style = {},
  itemClassName,
  itemStyle,
  ...rest
}) => {
  const arr = Children.toArray(children);
  return (
    <div className={className} style={style} {...rest}>
      {arr.map((c, i) => (
        <Reveal
          key={c.key ?? i}
          delay={base + i * stagger}
          y={y}
          dur={dur}
          className={itemClassName}
          style={itemStyle}
        >
          {c}
        </Reveal>
      ))}
    </div>
  );
};
