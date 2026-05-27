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
];

export const getCases = () => cases;

export const getCaseBySlug = (slug) => cases.find((c) => c.slug === slug);
