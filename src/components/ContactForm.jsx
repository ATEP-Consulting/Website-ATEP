import { useEffect, useState } from "react";
import { Send } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
import { Link } from "react-router-dom";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";

export const ContactForm = () => {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
    gdprConsent: false,
    honeypot: "",
  });

  const isFormValid =
    formData.name.trim() &&
    formData.email.trim() &&
    formData.subject.trim() &&
    formData.message.trim() &&
    formData.gdprConsent;

  const { executeRecaptcha } = useGoogleReCaptcha();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [canSubmit, setCanSubmit] = useState(false);
  const [submitAttempts, setSubmitAttempts] = useState(0);

  const handleChange = (e) => {
    const value =
      e.target.type === "checkbox" ? e.target.checked : e.target.value;
    setFormData({
      ...formData,
      [e.target.name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (submitAttempts >= 3) {
      alert("Demasiados intentos. Espera un momento.");
      return;
    }

    setSubmitAttempts((prev) => prev + 1);

    if (formData.honeypot !== "") {
      console.log("Bot detected!");
      return;
    }

    if (!formData.gdprConsent) {
      alert(
        t("contact.gdprRequired") || "Debes aceptar la política de privacidad"
      );
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus(null);

    console.log("Form submitted:", formData);
    alert("Message sent successfully!");
    setFormData({ name: "", email: "", subject: "", message: "" });

    setIsSubmitting(false);
  };

  // Habilitar el botón después de 3 segundos
  useEffect(() => {
    const timer = setTimeout(() => setCanSubmit(true), 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label
          htmlFor="name"
          className="block text-sm font-medium text-neutral-700 mb-2"
        >
          {t("contact.formName")}
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
        />
      </div>

      <div>
        <label
          htmlFor="email"
          className="block text-sm font-medium text-neutral-700 mb-2"
        >
          {t("contact.formEmail")}
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
        />
      </div>

      <div>
        <label
          htmlFor="subject"
          className="block text-sm font-medium text-neutral-700 mb-2"
        >
          {t("contact.formSubject")}
        </label>
        <input
          type="text"
          id="subject"
          name="subject"
          value={formData.subject}
          onChange={handleChange}
          required
          className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
        />
      </div>

      <div>
        <label
          htmlFor="message"
          className="block text-sm font-medium text-neutral-700 mb-2"
        >
          {t("contact.formMessage")}
        </label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          required
          rows={6}
          className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all resize-none"
        />
      </div>

      <div className="flex items-center gap-3">
        <input
          type="text"
          name="honeypot"
          value={formData.honeypot}
          onChange={handleChange}
          autoComplete="off"
          tabIndex="-1"
          className="absolute opacity-0 pointer-events-none"
          style={{ position: "absolute", left: "-9999px" }}
        />
        <input
          type="checkbox"
          id="gdprConsent"
          name="gdprConsent"
          checked={formData.gdprConsent}
          onChange={handleChange}
          required
          className="w-4 h-4 text-primary-600 border-neutral-300 rounded focus:ring-2 focus:ring-primary-500"
        />
        <label htmlFor="gdprConsent" className="text-sm text-neutral-600">
          {t("contact.gdprText1") || "He leído y acepto la"}{" "}
          <Link
            to="/privacy-policy"
            className="text-primary-600 hover:text-primary-700 underline"
          >
            {t("contact.privacyPolicy") || "Política de Privacidad"}
          </Link>{" "}
          {t("contact.gdprText2") || "y el tratamiento de mis datos personales"}
          *
        </label>
      </div>

      {/* Nota legal pequeña */}
      <p className="text-xs text-neutral-500">
        {t("contact.gdprNote") ||
          "Tus datos serán tratados conforme a nuestra política de privacidad. Puedes ejercer tus derechos de acceso, rectificación y supresión contactándonos."}
      </p>

      <button
        type="submit"
        disabled={isSubmitting || !isFormValid}
        className="btn-primary w-full flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <Send className={`w-5 h-5 ${isSubmitting ? "animate-pulse" : ""}`} />
        {isSubmitting
          ? t("contact.sending") || "Enviando..."
          : t("contact.formButton")}
      </button>
    </form>
  );
};
