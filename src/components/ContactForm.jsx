import { useEffect, useState } from "react";
import { Send } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
import { Link } from "react-router-dom";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";
import emailjs from "emailjs-com";
import { Snackbar } from "./Snackbar";
import { useSnackbar } from "../context/SnackBarContext";

export const ContactForm = () => {
  const { t } = useLanguage();
  const { showSnackbar } = useSnackbar();
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
  const [snackbar, setSnackbar] = useState(null);

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
      showSnackbar(t("contact.tooManyAttempts"), "error");
      return;
    }

    setSubmitAttempts((prev) => prev + 1);

    if (formData.honeypot !== "") {
      console.log("Bot detected");
      return;
    }

    if (!formData.gdprConsent) {
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      // Ejecutar reCAPTCHA v3 si está activo
      let token = null;
      if (executeRecaptcha) {
        token = await executeRecaptcha("contact_form");
      }

      // 1️⃣ ENVIAR EMAIL AL ADMINISTRADOR (tú)
      const adminTemplateParams = {
        from_name: formData.name,
        from_email: formData.email,
        subject: formData.subject,
        message: formData.message,
        "g-recaptcha-response": token, // opcional
      };

      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        adminTemplateParams,
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      );

      // 2️⃣ ENVIAR EMAIL DE CONFIRMACIÓN AL USUARIO
      const userTemplateParams = {
        to_name: formData.name,
        to_email: formData.email,
        subject: formData.subject,
      };

      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_AUTORESPONDER_TEMPLATE_ID, // ← NUEVA VARIABLE DE ENTORNO
        userTemplateParams,
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      );

      setSubmitStatus("success");

      showSnackbar(t("contact.successMessage"), "success");

      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
        gdprConsent: false,
        honeypot: "",
      });

      setSubmitAttempts(0); // Resetear intentos después del éxito
    } catch (error) {
      console.error("EmailJS error:", error);
      showSnackbar(t("contact.errorMessage"), "error");
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Habilitar el botón después de 3 segundos
  useEffect(() => {
    const timer = setTimeout(() => setCanSubmit(true), 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
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
            disabled={isSubmitting}
            className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all disabled:bg-neutral-100"
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
            disabled={isSubmitting}
            className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all disabled:bg-neutral-100"
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
            disabled={isSubmitting}
            className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all disabled:bg-neutral-100"
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
            disabled={isSubmitting}
            className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all resize-none disabled:bg-neutral-100"
          />
        </div>

        <div className="flex items-start gap-3">
          <input
            type="text"
            name="honeypot"
            value={formData.honeypot}
            onChange={handleChange}
            autoComplete="off"
            tabIndex="-1"
            className="absolute opacity-0 pointer-events-none"
            style={{ position: "absolute", left: "-9999px" }}
            aria-hidden="true"
          />
          <input
            type="checkbox"
            id="gdprConsent"
            name="gdprConsent"
            checked={formData.gdprConsent}
            onChange={handleChange}
            required
            disabled={isSubmitting}
            className="mt-1 w-4 h-4 text-primary-600 border-neutral-300 rounded focus:ring-2 focus:ring-primary-500"
          />
          <label htmlFor="gdprConsent" className="text-sm text-neutral-600">
            {t("contact.gdprText1") || "He leído y acepto la"}{" "}
            <Link
              to="/privacy-policy"
              className="text-primary-600 hover:text-primary-700 underline font-medium"
            >
              {t("contact.privacyPolicy")}
            </Link>{" "}
            {t("contact.gdprText2")}*
          </label>
        </div>

        {/* Nota legal pequeña */}
        <p className="text-xs text-neutral-500 leading-relaxed">
          {t("contact.gdprNote")}
        </p>

        <button
          type="submit"
          disabled={isSubmitting || !isFormValid || !canSubmit}
          className="btn-primary w-full flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Send className={`w-5 h-5 ${isSubmitting ? "animate-pulse" : ""}`} />
          {isSubmitting
            ? t("contact.sending") || "Enviando..."
            : !canSubmit
            ? t("contact.loading") || "Cargando..."
            : t("contact.formButton")}
        </button>
      </form>

      {/* Snackbar */}
      {snackbar && (
        <Snackbar
          message={snackbar.message}
          type={snackbar.type}
          onClose={() => setSnackbar(null)}
        />
      )}
    </>
  );
};
