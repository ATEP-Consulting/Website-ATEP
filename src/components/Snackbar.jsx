// src/components/Snackbar.jsx
import { useEffect, useState } from "react";
import { CheckCircle, XCircle, X } from "lucide-react";

export const Snackbar = ({
  message,
  type = "success",
  onClose,
  duration = 5000,
}) => {
  const [progress, setProgress] = useState(100);

  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, duration);

    // Animación de la barra de progreso
    const interval = setInterval(() => {
      setProgress((prev) => {
        const newProgress = prev - 100 / (duration / 50);
        return newProgress <= 0 ? 0 : newProgress;
      });
    }, 50);

    return () => {
      clearTimeout(timer);
      clearInterval(interval);
    };
  }, [duration, onClose]);

  const styles = {
    success: {
      bg: "bg-green-50",
      border: "border-green-500",
      text: "text-green-800",
      icon: CheckCircle,
      progressBg: "bg-green-500",
    },
    error: {
      bg: "bg-red-50",
      border: "border-red-500",
      text: "text-red-800",
      icon: XCircle,
      progressBg: "bg-red-500",
    },
  };

  const style = styles[type];
  const Icon = style.icon;

  return (
    <div className="fixed top-4 right-4 z-50 animate-slide-up">
      <div
        className={`relative flex items-center gap-3 ${style.bg} ${style.text} border-l-4 ${style.border} rounded-lg shadow-2xl px-6 py-4 min-w-[320px] max-w-md overflow-hidden`}
      >
        <Icon className="w-6 h-6 flex-shrink-0" />
        <p className="flex-1 font-medium">{message}</p>
        <button
          onClick={onClose}
          className="p-1 hover:bg-black/10 rounded transition-colors"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Barra de progreso */}
        <div className="absolute bottom-0 left-0 h-1 w-full bg-black/10">
          <div
            className={`h-full ${style.progressBg} transition-all duration-50 ease-linear`}
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  );
};
