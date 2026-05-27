import { useState } from "react";
import { Link } from "react-router-dom";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";
import emailjs from "emailjs-com";
import { useLanguage } from "../context/LanguageContext";
import { useSnackbar } from "../context/SnackBarContext";
import { tEyebrow, FONT } from "../lib/typography";
import { trackEvent } from "../lib/analytics";

const UnderlineInput = ({
  id,
  name,
  type = "text",
  value,
  onChange,
  disabled,
  required = true,
  rows,
  label,
}) => {
  const baseStyle = {
    width: "100%",
    padding: "10px 0",
    background: "transparent",
    border: "none",
    borderBottom: "1px solid var(--navy)",
    color: "var(--ink)",
    fontFamily: FONT.serif,
    fontSize: 17,
    outline: "none",
    transition: "border-color .15s, border-bottom-width .15s",
  };
  const onFocus = (e) => {
    e.target.style.borderColor = "var(--accent)";
    e.target.style.borderBottomWidth = "2px";
  };
  const onBlur = (e) => {
    e.target.style.borderColor = "var(--navy)";
    e.target.style.borderBottomWidth = "1px";
  };

  return (
    <label htmlFor={id} className="block">
      <div style={tEyebrow("var(--muted)")} className="mb-[10px]">
        {label}
      </div>
      {rows ? (
        <textarea
          id={id}
          name={name}
          value={value}
          onChange={onChange}
          disabled={disabled}
          required={required}
          rows={rows}
          style={{ ...baseStyle, resize: "vertical" }}
          onFocus={onFocus}
          onBlur={onBlur}
        />
      ) : (
        <input
          id={id}
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          disabled={disabled}
          required={required}
          style={baseStyle}
          onFocus={onFocus}
          onBlur={onBlur}
        />
      )}
    </label>
  );
};

export const ContactForm = () => {
  const { t } = useLanguage();
  const { showSnackbar } = useSnackbar();
  const { executeRecaptcha } = useGoogleReCaptcha();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
    gdprConsent: false,
    honeypot: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitAttempts, setSubmitAttempts] = useState(0);

  const isFormValid =
    formData.name.trim() &&
    formData.email.trim() &&
    formData.subject.trim() &&
    formData.message.trim() &&
    formData.gdprConsent;

  const handleChange = (e) => {
    const value =
      e.target.type === "checkbox" ? e.target.checked : e.target.value;
    setFormData({ ...formData, [e.target.name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (submitAttempts >= 3) {
      showSnackbar(t("contact.tooManyAttempts"), "error");
      return;
    }
    setSubmitAttempts((prev) => prev + 1);
    if (formData.honeypot !== "") return;
    if (!formData.gdprConsent) return;

    setIsSubmitting(true);
    try {
      let token = null;
      if (executeRecaptcha) token = await executeRecaptcha("contact_form");

      const adminTemplateParams = {
        from_name: formData.name,
        from_email: formData.email,
        subject: formData.subject,
        message: formData.message,
        "g-recaptcha-response": token,
      };

      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        adminTemplateParams,
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      );

      const userTemplateParams = {
        to_name: formData.name,
        to_email: formData.email,
        subject: formData.subject,
      };

      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_AUTORESPONDER_TEMPLATE_ID,
        userTemplateParams,
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      );

      showSnackbar(t("contact.successMessage"), "success");
      trackEvent("generate_lead", {
        method: "contact_form",
        form_subject: formData.subject,
      });
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
        gdprConsent: false,
        honeypot: "",
      });
      setSubmitAttempts(0);
    } catch (error) {
      console.error("EmailJS error:", error);
      showSnackbar(t("contact.errorMessage"), "error");
      trackEvent("contact_form_error", {
        error_type: error?.text || error?.message || "unknown",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="grid gap-7">
      <UnderlineInput
        id="name"
        name="name"
        label={t("contact.formName")}
        value={formData.name}
        onChange={handleChange}
        disabled={isSubmitting}
      />
      <UnderlineInput
        id="email"
        name="email"
        type="email"
        label={t("contact.formEmail")}
        value={formData.email}
        onChange={handleChange}
        disabled={isSubmitting}
      />
      <UnderlineInput
        id="subject"
        name="subject"
        label={t("contact.formSubject")}
        value={formData.subject}
        onChange={handleChange}
        disabled={isSubmitting}
      />
      <UnderlineInput
        id="message"
        name="message"
        label={t("contact.formMessage")}
        value={formData.message}
        onChange={handleChange}
        disabled={isSubmitting}
        rows={5}
      />

      {/* Honeypot */}
      <input
        type="text"
        name="honeypot"
        value={formData.honeypot}
        onChange={handleChange}
        autoComplete="off"
        tabIndex="-1"
        aria-hidden="true"
        style={{ position: "absolute", left: "-9999px" }}
      />

      <div className="flex items-start gap-3 pt-2">
        <input
          type="checkbox"
          id="gdprConsent"
          name="gdprConsent"
          checked={formData.gdprConsent}
          onChange={handleChange}
          required
          disabled={isSubmitting}
          className="mt-1 w-4 h-4 cursor-pointer"
          style={{ accentColor: "var(--accent)" }}
        />
        <label
          htmlFor="gdprConsent"
          className="text-[13px] leading-relaxed cursor-pointer"
          style={{ color: "var(--muted)" }}
        >
          {t("contact.gdprText1")}{" "}
          <Link
            to="/privacy-policy"
            className="underline"
            style={{ color: "var(--ink)", textUnderlineOffset: 3 }}
          >
            {t("contact.privacyPolicy")}
          </Link>{" "}
          {t("contact.gdprText2")}*
        </label>
      </div>

      <p
        className="text-[11.5px] leading-relaxed"
        style={{ color: "var(--dim)" }}
      >
        {t("contact.gdprNote")}
      </p>

      <button
        type="submit"
        disabled={isSubmitting || !isFormValid}
        className="mt-2 inline-block w-full tm:w-auto px-7 py-[16px] text-[14px] font-medium tracking-[0.02em] transition-all duration-150 disabled:opacity-50 disabled:cursor-not-allowed hover:enabled:-translate-y-[1px]"
        style={{
          background: "var(--navy)",
          color: "var(--bg)",
          border: "none",
          cursor: isSubmitting || !isFormValid ? "not-allowed" : "pointer",
        }}
      >
        {isSubmitting
          ? t("contact.sending") || "Enviando..."
          : `${t("contact.formButton")} →`}
      </button>

      <p
        className="text-[11px] text-center -mt-1"
        style={{ color: "var(--dim)" }}
      >
        {t("contact.recaptchaNotice")}{" "}
        <a
          href="https://policies.google.com/privacy"
          target="_blank"
          rel="noopener noreferrer"
          className="underline"
          style={{ color: "var(--muted)" }}
        >
          {t("contact.recaptchaPrivacy")}
        </a>
        {" · "}
        <a
          href="https://policies.google.com/terms"
          target="_blank"
          rel="noopener noreferrer"
          className="underline"
          style={{ color: "var(--muted)" }}
        >
          {t("contact.recaptchaTerms")}
        </a>
      </p>
    </form>
  );
};
