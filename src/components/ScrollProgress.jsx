import { useEffect, useState } from "react";

export const ScrollProgress = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const el = document.documentElement;
      const max = el.scrollHeight - el.clientHeight || 1;
      setProgress(Math.min(1, Math.max(0, el.scrollTop / max)));
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <div
      aria-hidden
      className="fixed top-0 left-0 right-0 h-[2px] z-40 pointer-events-none"
    >
      <div
        className="h-full transition-[width] duration-75 ease-linear"
        style={{
          width: `${progress * 100}%`,
          background: "var(--accent)",
        }}
      />
    </div>
  );
};
