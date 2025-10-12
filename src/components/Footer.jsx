import { Link } from "react-router-dom";
import { Mail, Phone, Linkedin, Instagram } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
import CTA from "./CTA";
import logo from "../assets/logos/new-logo-atep.svg";

export const Footer = () => {
  const { t } = useLanguage();

  const quickLinks = [
    { path: "/", label: t("nav.home") },
    { path: "/company", label: t("nav.about") },
    { path: "/services", label: t("nav.services") },
    { path: "/blog", label: t("nav.blog") },
    { path: "/contact", label: t("nav.contact") },
  ];

  const legalLinks = [
    { path: "/privacy-policy", label: t("privacy.title") },
    { path: "/cookies-policy", label: t("cookies.title") },
    { path: "/legal-notice", label: t("legal.title") },
  ];

  const socialLinks = [
    { icon: Linkedin, url: "https://linkedin.com", label: "LinkedIn" },
    { icon: Instagram, url: "https://facebook.com", label: "Instagram" },
  ];

  return (
    <footer className="bg-neutral-900 text-neutral-300">
      <CTA
        badge={t("CTA.badge")}
        title={t("CTA.title")}
        subtitle={t("CTA.subtitle")}
        primaryButton={{
          text: t("CTA.primaryButton"),
          to: "/contact",
        }}
        secondaryButton={{
          text: t("CTA.secondaryButton"),
          to: "/services",
        }}
        trustIndicators={[t("CTA.trust1"), t("CTA.trust2"), t("CTA.trust3")]}
      />
      <div className="section-container py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          <div>
            <Link to="/" className="flex items-center gap-2">
              <img
                src={logo}
                alt="ATEP Consulting Logo"
                className="h-10 w-10 object-contain"
                loading="lazy"
              />
              <div className="flex items-center">
                <span className="text-2xl font-bold text-primary-500">
                  ATEP
                </span>
                <span className="text-2xl font-light text-white ml-1">
                  Consulting
                </span>
              </div>
            </Link>
            <p className="text-sm leading-relaxed mb-6">
              {t("footer.tagline")}
            </p>
            <div className="flex gap-4">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.label}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 bg-neutral-800 rounded-full flex items-center justify-center hover:bg-primary-600 transition-colors duration-200"
                    aria-label={social.label}
                  >
                    <Icon className="w-5 h-5" />
                  </a>
                );
              })}
            </div>
          </div>

          <div>
            <h3 className="text-white font-semibold text-lg mb-4">
              {t("footer.quickLinks")}
            </h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-sm hover:text-primary-500 transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold text-lg mb-4">
              {t("contact.badge")}
            </h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-3 text-sm">
                <Mail className="w-5 h-5 text-primary-500 flex-shrink-0" />
                <a
                  href="mailto:info@atepconsulting.com"
                  className="hover:text-primary-500 transition-colors"
                >
                  info@atepconsulting.com
                </a>
              </li>
              <li className="flex items-center gap-3 text-sm">
                <Phone className="w-5 h-5 text-primary-500 flex-shrink-0" />
                <a
                  href="tel:+34647748705"
                  className="hover:text-primary-500 transition-colors"
                >
                  +34 647 748 705
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold text-lg mb-4">
              {t("footer.readyToStart")}
            </h3>
            <p className="text-sm mb-4 text-neutral-300">
              {t("footer.readyToStartText")}
            </p>
            <Link
              to="/contact"
              className="btn-primary text-sm inline-block text-center"
            >
              {t("footer.contactButton")}
            </Link>
          </div>
        </div>

        <div className="border-t border-neutral-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm">{t("footer.copyright")}</p>
          <div className="flex gap-6">
            {legalLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className="text-sm hover:text-primary-600 transition-colors duration-200"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};
