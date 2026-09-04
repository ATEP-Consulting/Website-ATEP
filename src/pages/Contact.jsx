import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";
import { Instagram, Linkedin } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
import { SEO } from "../components/SEO";
import { ContactForm } from "../components/ContactForm";
import { Image } from "../components/Image";

// Contacto, rediseño 2026.
//
// El formulario y su proveedor de reCAPTCHA se conservan tal cual: la lógica
// de envío (EmailJS + /api/contact) no se toca. Sólo cambia la piel.

export const Contact = () => {
  const { t, language } = useLanguage();

  const infoBlocks = [
    {
      label: t("contact.emailTitle"),
      value: "info@atepconsulting.com",
      href: "mailto:info@atepconsulting.com",
    },
    {
      label: t("contact.phoneTitle"),
      value: "+34 647 748 705",
      href: "tel:+34647748705",
    },
    {
      label: language === "es" ? "Oficina" : "Office",
      value: language === "es" ? "Paterna · Valencia\nEspaña" : "Paterna · Valencia\nSpain",
      href: null,
    },
    {
      label: language === "es" ? "Horario" : "Hours",
      value:
        language === "es" ? "Lun–Vie · 9:00–18:00 CET" : "Mon–Fri · 9:00–18:00 CET",
      href: null,
    },
  ];

  const socials = [
    { icon: Linkedin, url: "https://www.linkedin.com/company/atepconsulting", label: "LinkedIn" },
    { icon: Instagram, url: "https://www.instagram.com/atepconsulting", label: "Instagram" },
  ];

  return (
    <GoogleReCaptchaProvider
      reCaptchaKey={import.meta.env.VITE_RECAPTCHA_SITE_KEY}
      language={language}
    >
      <SEO
        title="Contacto - Hablemos de tu Proyecto"
        description="Contáctanos para transformar tu negocio con tecnología. Respondemos en menos de 24 horas. Disponibles por email, teléfono o formulario web. Valencia, España."
        keywords="contacto, presupuesto desarrollo web, consultoría IT Valencia, contratar desarrolladores, solicitar información"
        schemaType="Organization"
        schemaData={{
          contactPoint: {
            "@type": "ContactPoint",
            email: "info@atepconsulting.com",
            contactType: "Customer Service",
            areaServed: "ES",
            availableLanguage: ["Spanish", "English"],
          },
        }}
      />

      <section className="rd-hero rd-hero--page">
        <div className="rd-shot rd-shot--cover">
          <Image src="/images/contact/ContactUs.webp" alt="" sizes="100vw" priority width={1600} height={1000} />
          <span className="rd-shot-grade" aria-hidden="true" />
        </div>
        <div className="rd-hero-body">
          <div className="rd-hero-copy">
            <div className="rd-eyebrow">
              <i aria-hidden="true" />
              {t("nav.contact")}
            </div>
            <h1 className="rd-h1">{t("contact.title")}</h1>
            <p className="rd-hero-sub">{t("contact.subtitle")}</p>
          </div>
        </div>
      </section>

      <section className="rd-sec">
        <div className="rd-contact">
          {/* Columna izquierda: datos directos y prueba social */}
          <div className="rd-contact-side" data-stagger>
            <dl className="rd-contact-info">
              {infoBlocks.map((b) => (
                <div key={b.label}>
                  <dt>{b.label}</dt>
                  <dd>
                    {b.href ? (
                      <a href={b.href}>{b.value}</a>
                    ) : (
                      b.value.split("\n").map((linea) => <span key={linea}>{linea}</span>)
                    )}
                  </dd>
                </div>
              ))}
            </dl>

            <div className="rd-socials">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                >
                  <s.icon size={16} strokeWidth={1.8} />
                </a>
              ))}
            </div>

            <figure className="rd-quote-side">
              <blockquote>
                {language === "es"
                  ? "“Ver el grupo entero en un único panel cambió cómo dirigimos la semana — pasamos de reaccionar a anticipar.”"
                  : "“Seeing the whole group in a single panel changed how we run the week — we went from reacting to anticipating.”"}
              </blockquote>
              <figcaption>
                {language === "es"
                  ? "Equipo de dirección · Grupo de restauración"
                  : "Management team · Hospitality group"}
              </figcaption>
            </figure>
          </div>

          {/* Columna derecha: el formulario */}
          <div className="rd-contact-form" data-reveal>
            <div className="rd-eyebrow">
              <i aria-hidden="true" />
              {t("contact.formTitle")}
            </div>
            <ContactForm />
          </div>
        </div>
      </section>
    </GoogleReCaptchaProvider>
  );
};
