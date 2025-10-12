import {
  Mail,
  Phone,
  Globe,
  Clock,
  Send,
  Linkedin,
  Instagram,
} from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
import { SEO } from "../components/SEO";
import { ContactForm } from "../components/ContactForm";
import ImageHero from "../components/ImageHero";
import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";

export const Contact = () => {
  const { t } = useLanguage();

  const contactMethods = [
    {
      icon: Mail,
      title: t("contact.emailTitle") || "Email Us",
      value: "info@atepconsulting.com",
      link: "mailto:info@atepconsulting.com",
      description: t("contact.emailDesc") || "We reply within 24 hours",
    },
    {
      icon: Phone,
      title: t("contact.phoneTitle") || "Call Us",
      value: "+34 647 748 705",
      link: "tel:+34647748705",
      description: t("contact.phoneDesc") || "Available 24/7 for you",
    },
    {
      icon: Globe,
      title: t("contact.remoteTitle") || "Remote Services",
      value: t("contact.remoteValue") || "Worldwide",
      link: null,
      description: t("contact.remoteDesc") || "We work with clients globally",
    },
  ];

  const socialLinks = [
    {
      icon: Linkedin,
      url: "https://linkedin.com/company/atepconsulting",
      label: "LinkedIn",
      color: "hover:bg-[#0A66C2]",
    },
    {
      icon: Instagram,
      url: "https://instagram.com/atepconsulting",
      label: "Instagram",
      color:
        "hover:bg-gradient-to-br hover:from-[#F58529] hover:via-[#DD2A7B] hover:to-[#515BD4]",
    },
  ];

  return (
    <>
      <GoogleReCaptchaProvider
        reCaptchaKey={import.meta.env.VITE_RECAPTCHA_SITE_KEY}
        language="es"
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
          icon={Send}
          title={t("contact.title")}
          description={t("contact.subtitle")}
          backgroundImage="images/contact/ContactUs.webp"
        />

        {/* Contact Methods - Cards destacadas */}
        <section className="section-padding bg-white">
          <div className="section-container">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-16">
              {contactMethods.map((method, index) => {
                const Icon = method.icon;
                return (
                  <div
                    key={method.title}
                    className={`group text-center p-8 rounded-2xl bg-gradient-to-br from-neutral-50 to-white border-2 border-neutral-100 transition-all duration-300 slide-up stagger-${
                      index + 1
                    }`}
                  >
                    <div className="w-16 h-16 bg-gradient-to-br from-primary-100 to-primary-50 rounded-2xl flex items-center justify-center mx-auto mb-4 transform transition-transform duration-500 group-hover:scale-110">
                      <Icon className="w-8 h-8 text-primary-600" />
                    </div>

                    <h3 className="text-lg font-bold text-neutral-900 mb-2">
                      {method.title}
                    </h3>

                    <p className="text-sm text-neutral-500 mb-3">
                      {method.description}
                    </p>

                    {method.link ? (
                      <a
                        href={method.link}
                        className="inline-block text-primary-600 font-semibold hover:text-primary-700 transition-colors"
                      >
                        {method.value}
                      </a>
                    ) : (
                      <p className="text-neutral-700 font-semibold">
                        {method.value}
                      </p>
                    )}
                    <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-1 bg-gradient-to-r from-primary-500 to-primary-600 rounded-full transition-all duration-300 group-hover:w-20"></div>
                  </div>
                );
              })}
            </div>

            {/* Form y sidebar */}
            <div className="max-w-6xl mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
                {/* Formulario - Ocupa más espacio (3 columnas) */}
                <div className="lg:col-span-3 slide-up">
                  <div className="bg-white rounded-2xl border-2 border-neutral-100 p-8 lg:p-10">
                    <div className="mb-8">
                      <h2 className="text-2xl lg:text-3xl font-bold text-neutral-900 mb-3">
                        {t("contact.formTitle") || "Send us a message"}
                      </h2>
                      <p className="text-neutral-600">
                        {t("contact.formSubtitle") ||
                          "Fill out the form below and we'll get back to you within 24 hours"}
                      </p>
                    </div>
                    <ContactForm />
                  </div>
                </div>

                {/* Info adicional - Sidebar (2 columnas) */}
                <div className="lg:col-span-2 space-y-6 slide-up stagger-1">
                  {/* Disponibilidad 24/7 */}
                  <div className="bg-gradient-to-br from-primary-50 to-white rounded-2xl border-2 border-primary-100 p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center">
                        <Clock className="w-6 h-6 text-primary-600" />
                      </div>
                      <h3 className="text-lg font-bold text-neutral-900">
                        {t("contact.availabilityTitle") || "24/7 Availability"}
                      </h3>
                    </div>
                    <p className="text-neutral-700 text-sm leading-relaxed mb-4">
                      {t("contact.availabilityText") ||
                        "We're available around the clock to assist you. Reach out anytime, and we'll respond as quickly as possible."}
                    </p>
                    <div className="flex items-center gap-2 text-sm">
                      <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                      <span className="font-semibold text-green-700">
                        {t("contact.onlineNow") || "Online Now"}
                      </span>
                    </div>
                  </div>

                  {/* Redes Sociales */}
                  <div className="bg-gradient-to-br from-neutral-50 to-white rounded-2xl border-2 border-neutral-100 p-6">
                    <h3 className="text-lg font-bold text-neutral-900 mb-4">
                      {t("contact.followTitle") || "Follow Us"}
                    </h3>
                    <p className="text-neutral-600 text-sm mb-6">
                      {t("contact.followText") ||
                        "Stay updated with our latest news and insights"}
                    </p>
                    <div className="grid grid-cols-2 gap-3">
                      {socialLinks.map((social) => {
                        const Icon = social.icon;
                        return (
                          <a
                            key={social.label}
                            href={social.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`flex items-center gap-3 p-4 bg-white rounded-xl border-2 border-neutral-100 transition-all duration-300 hover:border-transparent hover:text-white ${social.color} group`}
                            aria-label={social.label}
                          >
                            <Icon className="w-5 h-5" />
                            <span className="text-sm font-semibold">
                              {social.label}
                            </span>
                          </a>
                        );
                      })}
                    </div>
                  </div>

                  {/* CTA de urgencia */}
                  <div className="bg-gradient-to-br from-neutral-900 to-neutral-800 rounded-2xl p-6 text-white">
                    <h3 className="text-lg font-bold mb-2">
                      {t("contact.urgentTitle") || "Need immediate help?"}
                    </h3>
                    <p className="text-neutral-300 text-sm mb-4">
                      {t("contact.urgentText") ||
                        "Call us directly for instant support"}
                    </p>
                    <a
                      href="tel:+1234567890"
                      className="inline-flex items-center gap-2 px-6 py-3 bg-white text-neutral-900 font-semibold rounded-lg hover:bg-neutral-100 transition-colors w-full justify-center"
                    >
                      <Phone className="w-5 h-5" />
                      +34 647 748 705
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </GoogleReCaptchaProvider>
    </>
  );
};
