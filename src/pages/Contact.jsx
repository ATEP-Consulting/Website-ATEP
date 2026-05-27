import { Linkedin, Instagram } from "lucide-react";
import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";
import { useLanguage } from "../context/LanguageContext";
import { SEO } from "../components/SEO";
import { ContactForm } from "../components/ContactForm";
import ImageHero from "../components/ImageHero";
import { Reveal, RevealStagger } from "../components/Reveal";
import { tEyebrow, tSerif } from "../lib/typography";

export const Contact = () => {
  const { t, language } = useLanguage();

  const infoBlocks = [
    {
      label: t("contact.emailTitle") || (language === "es" ? "Email" : "Email"),
      value: "info@atepconsulting.com",
      href: "mailto:info@atepconsulting.com",
    },
    {
      label: t("contact.phoneTitle") || (language === "es" ? "Teléfono" : "Phone"),
      value: "+34 647 748 705",
      href: "tel:+34647748705",
    },
    {
      label: language === "es" ? "Oficina" : "Office",
      value: language === "es"
        ? "Paterna · Valencia\nEspaña"
        : "Paterna · Valencia\nSpain",
      href: null,
    },
    {
      label: language === "es" ? "Horario" : "Hours",
      value: language === "es"
        ? "Lun–Vie · 9:00–18:00 CET"
        : "Mon–Fri · 9:00–18:00 CET",
      href: null,
    },
  ];

  const socials = [
    {
      icon: Linkedin,
      url: "https://www.linkedin.com/company/atepconsulting",
      label: "LinkedIn",
    },
    {
      icon: Instagram,
      url: "https://www.instagram.com/atepconsulting",
      label: "Instagram",
    },
  ];

  return (
    <>
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

        <ImageHero
          eyebrow={language === "es" ? "Conversemos" : "Let's talk"}
          title={t("contact.title")}
          description={t("contact.subtitle")}
        />

        <section
          className="px-6 sm:px-10 lg:px-16 py-16 tm:py-24"
          style={{ background: "var(--bg)" }}
        >
          <div className="grid grid-cols-1 tm:grid-cols-[1.2fr_1fr] gap-12 tm:gap-24 items-start">
            {/* LEFT: info */}
            <div>
              <Reveal y={20}>
                <p
                  className="italic"
                  style={{
                    ...tSerif("clamp(17px, 1.4vw, 20px)", 400),
                    color: "var(--muted)",
                    maxWidth: 520,
                    lineHeight: 1.5,
                  }}
                >
                  {language === "es"
                    ? "Si nos cuentas un poco del contexto, te respondemos en menos de 24h con próximos pasos concretos — no con un comercial genérico."
                    : "Tell us a bit of context and we'll respond in under 24h with concrete next steps — not a generic sales pitch."}
                </p>
              </Reveal>

              <RevealStagger
                stagger={90}
                base={300}
                y={14}
                className="mt-10 tm:mt-14 grid gap-6 tm:gap-7"
              >
                {infoBlocks.map((b) => (
                  <div
                    key={b.label}
                    className="pb-5"
                    style={{ borderBottom: "1px solid var(--rule)" }}
                  >
                    <div
                      className="mb-[6px]"
                      style={tEyebrow("var(--muted)")}
                    >
                      {b.label}
                    </div>
                    {b.href ? (
                      <a
                        href={b.href}
                        className="no-underline transition-colors duration-150"
                        style={{
                          fontSize: 16,
                          color: "var(--ink)",
                          lineHeight: 1.5,
                          whiteSpace: "pre-line",
                        }}
                        onMouseEnter={(e) =>
                          (e.currentTarget.style.color = "var(--accent)")
                        }
                        onMouseLeave={(e) =>
                          (e.currentTarget.style.color = "var(--ink)")
                        }
                      >
                        {b.value}
                      </a>
                    ) : (
                      <div
                        style={{
                          fontSize: 16,
                          color: "var(--ink)",
                          lineHeight: 1.5,
                          whiteSpace: "pre-line",
                        }}
                      >
                        {b.value}
                      </div>
                    )}
                  </div>
                ))}
              </RevealStagger>

              <Reveal y={16} delay={600}>
                <div className="mt-8 flex gap-3">
                  {socials.map((s) => {
                    const Icon = s.icon;
                    return (
                      <a
                        key={s.label}
                        href={s.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={s.label}
                        className="w-10 h-10 flex items-center justify-center transition-colors duration-150"
                        style={{
                          border: "1px solid var(--rule-strong)",
                          color: "var(--ink)",
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.background = "var(--accent)";
                          e.currentTarget.style.color = "var(--bg)";
                          e.currentTarget.style.borderColor = "var(--accent)";
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.background = "transparent";
                          e.currentTarget.style.color = "var(--ink)";
                          e.currentTarget.style.borderColor =
                            "var(--rule-strong)";
                        }}
                      >
                        <Icon size={16} />
                      </a>
                    );
                  })}
                </div>
              </Reveal>
            </div>

            {/* RIGHT: form */}
            <Reveal y={32} delay={200} dur={1100}>
              <div
                className="p-6 tm:p-10"
                style={{ background: "var(--bg-surface)" }}
              >
                <div
                  className="mb-7 tm:mb-9"
                  style={tEyebrow("var(--muted)")}
                >
                  — {language === "es" ? "Formulario" : "Form"}
                </div>
                <ContactForm />
              </div>
            </Reveal>
          </div>
        </section>
      </GoogleReCaptchaProvider>
    </>
  );
};
