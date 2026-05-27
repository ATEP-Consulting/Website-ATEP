import { useEffect, useState } from "react";
import { CheckCircle, XCircle, X } from "lucide-react";
import { FONT } from "../lib/typography";

export const Snackbar = ({
  message,
  type = "success",
  onClose,
  duration = 5000,
}) => {
  const [progress, setProgress] = useState(100);

  useEffect(() => {
    const timer = setTimeout(onClose, duration);
    const interval = setInterval(() => {
      setProgress((prev) => {
        const next = prev - 100 / (duration / 50);
        return next <= 0 ? 0 : next;
      });
    }, 50);
    return () => {
      clearTimeout(timer);
      clearInterval(interval);
    };
  }, [duration, onClose]);

  const isSuccess = type === "success";
  const Icon = isSuccess ? CheckCircle : XCircle;
  const accentColor = isSuccess ? "var(--accent)" : "#c53030";

  return (
    <div className="fixed top-5 right-5 z-50 animate-slide-up">
      <div
        className="relative flex items-start gap-3 px-5 py-4 min-w-[320px] max-w-md overflow-hidden"
        style={{
          background: "var(--bg-panel)",
          color: "var(--ink)",
          borderLeft: `3px solid ${accentColor}`,
          boxShadow: "0 18px 48px -18px rgba(10,22,38,0.35)",
          fontFamily: FONT.sans,
        }}
      >
        <Icon size={20} className="mt-[2px] flex-shrink-0" style={{ color: accentColor }} />
        <p className="flex-1 text-[14px] leading-snug m-0">{message}</p>
        <button
          type="button"
          onClick={onClose}
          aria-label="Cerrar"
          className="flex-shrink-0 p-1 transition-colors"
          style={{
            background: "transparent",
            color: "var(--muted)",
            border: "none",
            cursor: "pointer",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.color = "var(--ink)")}
          onMouseLeave={(e) => (e.currentTarget.style.color = "var(--muted)")}
        >
          <X size={16} />
        </button>

        <div
          className="absolute bottom-0 left-0 h-[2px] w-full"
          style={{ background: "var(--rule)" }}
        >
          <div
            className="h-full transition-[width] duration-75 ease-linear"
            style={{ width: `${progress}%`, background: accentColor }}
          />
        </div>
      </div>
    </div>
  );
};
