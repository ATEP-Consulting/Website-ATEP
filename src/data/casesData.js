export const cases = [
  {
    slug: "sentra",
    client: {
      es: "Grupo Gastroadictos",
      en: "Gastroadictos Group",
    },
    sector: {
      es: "Hostelería · Restauración",
      en: "Hospitality · Restaurants",
    },
    location: "Valencia · España",
    year: 2026,
    duration: {
      es: "En desarrollo",
      en: "In progress",
    },
    teamSize: {
      es: "4 personas",
      en: "4 people",
    },
    title: {
      es: "Plataforma BI que unifica 7 herramientas en un solo dashboard",
      en: "BI platform that unifies 7 tools in a single dashboard",
    },
    description: {
      es: "Inteligencia de negocio para grupos de restauración. Centraliza datos operativos, marketing y reputación en un único panel con alertas automáticas.",
      en: "Business intelligence for restaurant groups. Centralizes operations, marketing and reputation data in a single panel with automated alerts.",
    },
    metric: {
      value: "8h",
      label: {
        es: "ahorradas por semana en reporting",
        en: "saved per week on reporting",
      },
    },
    challenge: {
      es: "Los grupos de restauración con 3 o más locales tienen los datos críticos del negocio repartidos entre 6 y 8 herramientas distintas — Instagram, Meta Ads, Google Analytics, Google Ads, Google Business, Cover Manager, el TPV. Cada mañana hay que abrir cada plataforma por separado para entender qué pasa. La dirección toma decisiones a ciegas o con un día de retraso, los managers de local no comparten métricas entre sí, y el informe mensual para consejo consume días de trabajo manual.",
      en: "Restaurant groups with 3+ locations have their critical business data scattered across 6 to 8 different tools — Instagram, Meta Ads, Google Analytics, Google Ads, Google Business, Cover Manager, the POS. Every morning means opening each platform separately to understand what's happening. Leadership makes decisions blind or with a day's delay, location managers don't share metrics with each other, and the monthly board report takes days of manual work.",
    },
    solution: {
      es: "Diseñamos Sentra, una plataforma SaaS que cruza datos entre las 7 fuentes y los presenta como una sola narrativa. El dashboard principal muestra al grupo de un vistazo: facturación, reservas, sentiment de reseñas, performance de campañas. Cada fuente tiene un adapter con modos MOCK/REAL/DISABLED que permite arrancar con datos sintéticos y conectar las APIs reales por fases. Sistema de roles granular (CEO, Admin, Marketing, Manager de local) y export PDF mensual con un click.",
      en: "We designed Sentra, a SaaS platform that cross-references data from all 7 sources and presents it as a single narrative. The main dashboard shows the group at a glance: revenue, bookings, review sentiment, campaign performance. Each source has an adapter with MOCK/REAL/DISABLED modes that allows starting with synthetic data and connecting real APIs in phases. Granular role system (CEO, Admin, Marketing, Location Manager) and one-click monthly PDF export.",
    },
    results: [
      {
        value: "13",
        label: {
          es: "páginas operativas",
          en: "operational pages",
        },
      },
      {
        value: "7",
        label: {
          es: "locales monitorizados",
          en: "locations monitored",
        },
      },
      {
        value: "1",
        label: {
          es: "click para informe mensual",
          en: "click for monthly report",
        },
      },
    ],
    stack: [
      "React 18",
      "Node.js",
      "PostgreSQL",
      "REST adapters",
      "PDF export",
    ],
    quote: {
      es: "Ver el grupo entero en un único panel cambió cómo dirigimos la semana — pasamos de reaccionar a anticipar.",
      en: "Seeing the whole group in a single panel changed how we run the week — we went from reacting to anticipating.",
    },
    quoteAuthor: "Equipo de dirección · Grupo Gastroadictos",
  },
  {
    slug: "atep-inventory",
    client: {
      es: "Cliente piloto sector óptico",
      en: "Optical retail pilot client",
    },
    sector: {
      es: "Retail · Óptica",
      en: "Retail · Optical",
    },
    location: "España",
    year: 2025,
    duration: {
      es: "4 meses",
      en: "4 months",
    },
    teamSize: {
      es: "3 personas",
      en: "3 people",
    },
    title: {
      es: "Inventario inteligente sincronizado con Odoo y RFID en tiempo real",
      en: "Smart inventory synchronized with Odoo and real-time RFID",
    },
    description: {
      es: "Plataforma de inventario para ópticas con sincronización Odoo, lectura RFID, alertas automáticas de stock y panel multi-rol.",
      en: "Inventory platform for optical retail with Odoo sync, RFID reading, automated stock alerts and multi-role panel.",
    },
    metric: {
      value: "100%",
      label: {
        es: "trazabilidad por producto",
        en: "per-product traceability",
      },
    },
    challenge: {
      es: "Las ópticas del cliente gestionaban el inventario manualmente con hojas de cálculo y un ERP Odoo desactualizado a mano. Sin alertas de stock bajo, sin trazabilidad por unidad, sin separación de permisos entre empleados, manager y admin. Las decisiones de reposición se tomaban tarde, las roturas de stock eran frecuentes y las auditorías mensuales consumían dos días por local.",
      en: "Our client's optical stores managed inventory manually with spreadsheets and a manually-updated Odoo ERP. No low-stock alerts, no per-unit traceability, no permission separation between staff, manager and admin. Restocking decisions came too late, stockouts were frequent, and monthly audits consumed two days per location.",
    },
    solution: {
      es: "Construimos un monorepo Turbo con backend NestJS + PostgreSQL y frontend React + Vite. Implementamos un simulador RFID que registra movimientos reales en la base de datos, dashboard con KPIs y gráficos de 30 días, alertas autogeneradas cuando el stock cae bajo el mínimo, y un panel de sincronización con Odoo con log paginado. Auth JWT + refresh con guards por rol (Admin, Manager, Employee).",
      en: "We built a Turbo monorepo with a NestJS + PostgreSQL backend and React + Vite frontend. Implemented an RFID simulator that records real movements in the database, a dashboard with KPIs and 30-day charts, auto-generated alerts when stock falls below minimum, and an Odoo sync panel with paginated log. JWT + refresh auth with role-based guards (Admin, Manager, Employee).",
    },
    results: [
      {
        value: "3",
        label: {
          es: "roles con permisos granulares",
          en: "roles with granular permissions",
        },
      },
      {
        value: "0",
        label: {
          es: "roturas de stock no anticipadas",
          en: "unanticipated stockouts",
        },
      },
      {
        value: "30",
        label: {
          es: "días de histórico en dashboard",
          en: "days of dashboard history",
        },
      },
    ],
    stack: [
      "NestJS",
      "PostgreSQL",
      "Prisma",
      "React 18",
      "Vite",
      "Turbo",
      "Docker",
    ],
  },
  {
    slug: "turnos",
    client: {
      es: "Producto propio · Hostelería ES",
      en: "Own product · Spanish hospitality",
    },
    sector: {
      es: "SaaS · Gestión de turnos",
      en: "SaaS · Shift management",
    },
    location: "España",
    year: 2025,
    duration: {
      es: "9 meses · en producción",
      en: "9 months · live",
    },
    teamSize: {
      es: "5 personas",
      en: "5 people",
    },
    title: {
      es: "De 2 horas a 10 minutos creando cuadrantes semanales con IA",
      en: "From 2 hours to 10 minutes creating weekly shift schedules with AI",
    },
    description: {
      es: "SaaS de gestión de turnos para hostelería. Generación automática del cuadrante con IA respetando contratos, normativa y disponibilidad.",
      en: "Shift management SaaS for hospitality. AI-powered weekly schedule generation respecting contracts, regulations and availability.",
    },
    metric: {
      value: "–92%",
      label: {
        es: "tiempo de creación de cuadrantes",
        en: "shift schedule creation time",
      },
    },
    challenge: {
      es: "Los gerentes de bares y restaurantes en España dedican 2 horas semanales a montar el cuadrante manualmente en Excel: cuadrar contratos, disponibilidad, descansos legales y mínimos por franja. El cumplimiento del registro de jornada (RD 8/2019) se gestiona aparte, con hojas firmadas en papel. Los cambios de turno se piden por WhatsApp y se pierden.",
      en: "Bar and restaurant managers in Spain spend 2 hours each week building the schedule manually in Excel: matching contracts, availability, legal breaks and per-shift minimums. Compliance with the working time record (Spanish RD 8/2019) is handled separately, with signed paper sheets. Shift swaps are requested over WhatsApp and get lost.",
    },
    solution: {
      es: "Diseñamos turnOS, un SaaS con cuadrante drag & drop y un motor de IA que genera el cuadrante semanal completo respetando contratos, horas máximas, disponibilidad y mínimos legales. Fichaje móvil PWA con geolocalización para cumplir el RD 8/2019. Sistema de solicitudes (cambios, vacaciones, días libres) con flujo de aprobación. Tres planes (Básico, Pro, Business) escalando funciones de IA según volumen de negocio.",
      en: "We designed turnOS, a SaaS with drag & drop schedule editing and an AI engine that generates the full weekly schedule respecting contracts, max hours, availability and legal minimums. Mobile PWA time clock with geolocation to comply with Spanish RD 8/2019. Request system (swaps, vacations, days off) with approval flow. Three plans (Basic, Pro, Business) scaling AI features by business volume.",
    },
    results: [
      {
        value: "10",
        label: {
          es: "minutos para el cuadrante semanal",
          en: "minutes for the weekly schedule",
        },
      },
      {
        value: "3",
        label: {
          es: "planes con IA escalada",
          en: "tiered AI plans",
        },
      },
      {
        value: "100%",
        label: {
          es: "cumplimiento RD 8/2019",
          en: "RD 8/2019 compliance",
        },
      },
    ],
    stack: [
      "React 18",
      "Node.js",
      "PostgreSQL",
      "PWA",
      "IA generativa",
      "Stripe",
    ],
  },
  {
    slug: "lnh-partner",
    client: {
      es: "LNH & Partner",
      en: "LNH & Partner",
    },
    sector: {
      es: "Servicios profesionales · Web institucional",
      en: "Professional services · Corporate website",
    },
    location: "Miami · Florida",
    year: 2024,
    duration: {
      es: "6 semanas",
      en: "6 weeks",
    },
    teamSize: {
      es: "2 personas",
      en: "2 people",
    },
    title: {
      es: "Web estática ultra rápida con CMS editable por el cliente",
      en: "Ultra-fast static website with client-editable CMS",
    },
    description: {
      es: "Sitio institucional con Astro y Sanity CMS. El cliente edita textos, imágenes y secciones desde un panel web y la web se rebuild sola en 90 segundos.",
      en: "Corporate website with Astro and Sanity CMS. The client edits texts, images and sections from a web panel and the site rebuilds itself in 90 seconds.",
    },
    metric: {
      value: "0 KB",
      label: {
        es: "JS por defecto en el cliente",
        en: "JS shipped by default",
      },
    },
    challenge: {
      es: "El cliente quería poder editar el contenido del sitio sin depender del equipo técnico para cada cambio menor — textos, fotos, equipo, testimoniales. Pero exigía también una performance impecable para SEO local en Miami y la posibilidad de previsualizar los cambios antes de publicarlos.",
      en: "The client wanted to edit the website content without relying on the technical team for every minor change — texts, photos, team, testimonials. But they also demanded impeccable performance for local SEO in Miami and the ability to preview changes before publishing.",
    },
    solution: {
      es: "Construimos el sitio con Astro 5 (zero JS por defecto) y Sanity como CMS headless. Diseñamos 11 bloques editables que el cliente combina como bloques de Lego desde el Studio. Configuramos Presentation mode para edición visual y un webhook que dispara un rebuild en Vercel cada vez que el cliente guarda. El resultado: sitio publicado, edición sin código, performance Lighthouse 100/100.",
      en: "We built the site with Astro 5 (zero JS by default) and Sanity as a headless CMS. We designed 11 editable blocks that the client combines like Lego pieces from the Studio. We configured Presentation mode for visual editing and a webhook that triggers a Vercel rebuild every time the client saves. Result: live site, code-free editing, Lighthouse 100/100 performance.",
    },
    results: [
      {
        value: "100",
        label: {
          es: "Lighthouse performance",
          en: "Lighthouse performance",
        },
      },
      {
        value: "90s",
        label: {
          es: "para rebuild tras edición",
          en: "to rebuild after edit",
        },
      },
      {
        value: "11",
        label: {
          es: "bloques editables",
          en: "editable blocks",
        },
      },
    ],
    stack: [
      "Astro 5",
      "React 18",
      "Tailwind CSS",
      "Sanity CMS",
      "TypeScript",
      "Vercel",
    ],
  },
  {
    slug: "tibis-market",
    client: {
      es: "Tibi's Market",
      en: "Tibi's Market",
    },
    sector: {
      es: "E-commerce · Alimentación artesanal",
      en: "E-commerce · Artisan food",
    },
    location: "Miami · Florida",
    year: 2024,
    duration: {
      es: "4 semanas",
      en: "4 weeks",
    },
    teamSize: {
      es: "2 personas",
      en: "2 people",
    },
    title: {
      es: "E-commerce bilingüe con checkout directo por WhatsApp",
      en: "Bilingual e-commerce with direct WhatsApp checkout",
    },
    description: {
      es: "Tienda online de arepas artesanales con catálogo, carrito y envío de pedido pre-formateado por WhatsApp o email. Sin coste de pasarela de pago.",
      en: "Artisan arepa online store with catalog, cart and pre-formatted order delivery via WhatsApp or email. No payment gateway fees.",
    },
    metric: {
      value: "0€",
      label: {
        es: "comisiones de pasarela",
        en: "in gateway fees",
      },
    },
    challenge: {
      es: "Un negocio pequeño de arepas artesanales en Miami quería vender online sin asumir el coste y la complejidad de una pasarela de pago tradicional (Stripe, PayPal, comisiones por venta, KYC). Pero necesitaba un flujo de pedido profesional, bilingüe (ES/EN para su base de clientes mixta) y 100% optimizado para móvil — donde compran sus clientes.",
      en: "A small artisan arepa business in Miami wanted to sell online without taking on the cost and complexity of a traditional payment gateway (Stripe, PayPal, per-sale fees, KYC). But they needed a professional ordering flow, bilingual (ES/EN for their mixed customer base) and 100% mobile-optimized — where their customers buy.",
    },
    solution: {
      es: "Diseñamos un e-commerce mobile-first con catálogo de productos, carrito con cálculo de totales en tiempo real, y un formulario de checkout que pre-formatea el pedido y lo envía por WhatsApp Web o por email del cliente. Toda la lógica vive en frontend, sin backend ni base de datos. Bilingüe completo ES/EN con persistencia de idioma. Despliegue estático en hosting económico.",
      en: "We designed a mobile-first e-commerce with product catalog, real-time cart totals, and a checkout form that pre-formats the order and sends it via WhatsApp Web or the customer's email. All logic lives on the frontend, with no backend or database. Full ES/EN bilingual support with language persistence. Static deployment on low-cost hosting.",
    },
    results: [
      {
        value: "2",
        label: {
          es: "idiomas con persistencia",
          en: "languages with persistence",
        },
      },
      {
        value: "100%",
        label: {
          es: "mobile-first responsive",
          en: "mobile-first responsive",
        },
      },
      {
        value: "0",
        label: {
          es: "backend a mantener",
          en: "backend to maintain",
        },
      },
    ],
    stack: [
      "Vite",
      "React 18",
      "Tailwind CSS",
      "React Router",
      "React Icons",
    ],
  },
  {
    slug: "hampton-textile-printing",
    client: {
      es: "Hampton Textile Printing",
      en: "Hampton Textile Printing",
    },
    sector: {
      es: "Industria · Migración ERP empresarial",
      en: "Industry · Enterprise ERP migration",
    },
    location: "Tennessee · USA",
    year: 2026,
    duration: {
      es: "Multi-fase · cutover sin downtime",
      en: "Multi-phase · zero-downtime cutover",
    },
    teamSize: {
      es: "Squad dedicado + auditor externo (BC&S)",
      en: "Dedicated squad + external auditor (BC&S)",
    },
    title: {
      es: "De BBx/UniBasic a ERPNext 15 con IA corporativa, sin downtime ni pérdida contable",
      en: "From BBx/UniBasic to ERPNext 15 with corporate AI, zero downtime, zero accounting loss",
    },
    description: {
      es: "Migración auditada del ERP de una empresa familiar de impresión textil 24/7 con 20+ años de lógica acumulada. Arquitectura IaC, IA corporativa con aislamiento real, validación con framework propio de Parallel Testing y plan de salida garantizado.",
      en: "Audited ERP migration for a 24/7 family-owned textile printing company with 20+ years of accumulated business logic. IaC architecture, corporate AI with real isolation, validation via in-house Parallel Testing framework and guaranteed exit plan.",
    },
    metric: {
      value: "99%+",
      label: {
        es: "paridad contable con el balance histórico",
        en: "accounting parity with historical ledger",
      },
    },
    challenge: {
      es: "Hampton operaba sobre un ERP escrito en BBx/UniBasic — tecnología de los años 80 con proveedores en extinción, sin ecosistema de integraciones moderno y un coste de mantenimiento creciente. Cero margen para perder datos contables, cero tolerancia a downtime en una operación 24/7, y décadas de conocimiento de negocio enterrado en miles de programas heredados. El mandato: modernizar el ERP sin que el cliente lo notase, preservar al céntimo la contabilidad histórica, dejar la operación auditable de extremo a extremo y entregar un sistema del que el cliente pudiera salir sin depender del proveedor.",
      en: "Hampton was running on an ERP written in BBx/UniBasic — '80s technology with vanishing vendors, no modern integration ecosystem and ever-growing maintenance cost. Zero margin to lose accounting data, zero downtime tolerance in 24/7 operations, and decades of business knowledge buried in thousands of legacy programs. The mandate: modernize the ERP without the client noticing, preserve historical accounting down to the cent, leave operations auditable end-to-end, and deliver a system the client could exit without provider lock-in.",
    },
    solution: {
      es: "Implementamos una plataforma completa sobre ERPNext 15 con una app Frappe a medida (htp_textile) en arquitectura monorepo — toda la customización vive como hook, sin forks del core. Infraestructura como código con Pulumi + Ansible (reproducible desde cero en menos de un día). Seguridad de grado empresarial: Vault HA con Shamir 5/3, MinIO con Object Lock COMPLIANCE, SOPS-age para secretos, commits firmados obligatorios. SSO único con Authentik OIDC sobre ERP, RAG, docs y observabilidad. IA corporativa con Anthropic Contextual Retrieval, recuperación híbrida RRF + reranker BGE-v2-m3, Qdrant multi-vector, GraphRAG sobre Kuzu y aislamiento por tenant. Contrato Anthropic enterprise + ZDR + BAA asignado al cliente. Validación con Parallel Testing Framework propietario: 160 escenarios en 8 módulos ejecutados contra legacy y ERPNext con comparación campo a campo.",
      en: "We implemented a full platform on ERPNext 15 with a custom Frappe app (htp_textile) in a monorepo architecture — all customization lives as hooks, no core forks. Infrastructure as code with Pulumi + Ansible (reproducible from scratch in under a day). Enterprise-grade security: Vault HA with Shamir 5/3, MinIO with Object Lock COMPLIANCE, SOPS-age for secrets, mandatory signed commits. Single SSO with Authentik OIDC across ERP, RAG, docs and observability. Corporate AI with Anthropic Contextual Retrieval, hybrid RRF retrieval + BGE-v2-m3 reranker, Qdrant multi-vector, GraphRAG over Kuzu and per-tenant isolation. Anthropic enterprise contract + ZDR + BAA assigned to the client. Validation with proprietary Parallel Testing Framework: 160 scenarios across 8 modules executed against legacy and ERPNext with field-by-field comparison.",
    },
    results: [
      {
        value: "160",
        label: {
          es: "escenarios paralelos en verde 4 semanas",
          en: "parallel scenarios green for 4 weeks",
        },
      },
      {
        value: "0",
        label: {
          es: "downtime perceptible en el cutover",
          en: "perceptible cutover downtime",
        },
      },
      {
        value: "100/100",
        label: {
          es: "facturas con match exacto campo a campo",
          en: "invoices with exact field-by-field match",
        },
      },
    ],
    stack: [
      "ERPNext 15",
      "Frappe",
      "Python",
      "TypeScript",
      "Pulumi",
      "Ansible",
      "Vault HA",
      "MinIO",
      "Authentik OIDC",
      "Qdrant",
      "Kuzu",
      "Anthropic Claude (Sonnet + Haiku)",
      "GraphRAG",
      "Graphiti",
      "OpenTelemetry",
      "Grafana",
      "Hetzner",
      "Tailscale",
      "Cloudflare",
    ],
    quote: {
      es: "Cutover basado en evidencia, no en fe. El cliente tomó la decisión de migrar con datos campo a campo — no con confianza.",
      en: "An evidence-based cutover, not a leap of faith. The client made the migration call with field-by-field data — not with trust.",
    },
    quoteAuthor: "Sponsor ejecutivo · Hampton Textile Printing",
  },
  {
    slug: "luis-royuela-nutricionistas",
    client: {
      es: "Luis Royuela Nutricionistas",
      en: "Luis Royuela Nutritionists",
    },
    sector: {
      es: "Salud · Nutrición clínica",
      en: "Health · Clinical nutrition",
    },
    location: "España",
    year: 2025,
    duration: {
      es: "4 semanas",
      en: "4 weeks",
    },
    teamSize: {
      es: "2 personas",
      en: "2 people",
    },
    title: {
      es: "Web institucional para un nutricionista clínico, optimizada para captar pacientes locales",
      en: "Corporate website for a clinical nutritionist, optimized to attract local patients",
    },
    description: {
      es: "Sitio web profesional para una consulta de nutrición clínica con presencia en SEO local, servicios diferenciados y formulario de captación de pacientes integrado con la agenda del profesional.",
      en: "Professional website for a clinical nutrition practice with local SEO presence, differentiated services and a patient acquisition form integrated with the practitioner's calendar.",
    },
    metric: {
      value: "1.2s",
      label: {
        es: "tiempo de carga en móvil 4G",
        en: "load time on mobile 4G",
      },
    },
    challenge: {
      es: "Luis Royuela necesitaba una web profesional que reflejara la seriedad de una consulta sanitaria, posicionara para búsquedas locales (nutricionista + ciudad) y convirtiera visitantes en consultas concertadas. El sitio anterior era una plantilla genérica sin diferenciación de servicios (nutrición deportiva, clínica, pediátrica) ni canales claros de contacto. Las consultas llegaban por canales dispersos sin trazabilidad.",
      en: "Luis Royuela needed a professional website reflecting the seriousness of a clinical practice, ranking for local searches (nutritionist + city), and converting visitors into booked consultations. The previous site was a generic template with no service differentiation (sports, clinical, pediatric nutrition) and no clear contact channels. Inquiries arrived through scattered channels with no traceability.",
    },
    solution: {
      es: "Diseñamos un sitio limpio, profesional y mobile-first con páginas individuales por especialidad (deportiva, clínica, pediátrica, oncológica), bio profesional con credenciales auditables, blog para captar tráfico orgánico de búsquedas relacionadas con nutrición, y formulario de contacto que envía los datos al canal preferido del nutricionista. SEO técnico desde el día uno: schema.org Person + MedicalBusiness, sitemap, robots, Open Graph y meta tags localizados.",
      en: "We designed a clean, professional and mobile-first site with individual pages per specialty (sports, clinical, pediatric, oncology), professional bio with auditable credentials, a blog to capture organic traffic from nutrition-related searches, and a contact form delivering inquiries to the practitioner's preferred channel. Technical SEO from day one: schema.org Person + MedicalBusiness, sitemap, robots, Open Graph and localized meta tags.",
    },
    results: [
      {
        value: "100",
        label: {
          es: "Lighthouse performance",
          en: "Lighthouse performance",
        },
      },
      {
        value: "4",
        label: {
          es: "especialidades diferenciadas",
          en: "differentiated specialties",
        },
      },
      {
        value: "0",
        label: {
          es: "mantenimiento técnico para el cliente",
          en: "technical maintenance on the client",
        },
      },
    ],
    stack: [
      "React 18",
      "Vite",
      "Tailwind CSS",
      "SEO técnico (schema.org MedicalBusiness)",
      "Vercel",
    ],
  },
];

export const getCases = () => cases;

export const getCaseBySlug = (slug) => cases.find((c) => c.slug === slug);
