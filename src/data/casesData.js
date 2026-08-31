export const cases = [
  {
    slug: "nilyan-herrera",
    relatedService: "/services/full-stack-development",
    seoTitle: {
      es: "Portal inmobiliario con MLS en vivo · Miami",
      en: "Real estate portal with live MLS · Miami",
    },
    client: {
      es: "Nilyan Herrera · Agente inmobiliaria",
      en: "Nilyan Herrera · Licensed realtor",
    },
    sector: {
      es: "Real estate · Miami, Florida",
      en: "Real estate · Miami, Florida",
    },
    location: "Miami, Florida · EE. UU.",
    year: 2026,
    duration: {
      es: "2 meses hasta la v1.0.0",
      en: "2 months to v1.0.0",
    },
    teamSize: {
      es: "Producto, desarrollo y operación",
      en: "Product, development and operations",
    },
    title: {
      es: "Portal inmobiliario con el MLS de Miami en vivo, mapa y CRM propio",
      en: "Real estate portal with the Miami MLS live, maps and its own CRM",
    },
    description: {
      es: "Portal a medida para una agente licenciada en Florida, conectado en vivo al MLS de Miami: más de 46.000 propiedades sincronizadas cada 4 horas, búsqueda con mapa y zonas dibujadas a mano, y un panel de coste real de propiedad que ninguna web de la competencia ofrece. Detrás, un CRM completo y bilingüe.",
      en: "Custom portal for a licensed Florida realtor, wired live to the Miami MLS: over 46,000 listings synced every 4 hours, map search with hand-drawn areas, and a real cost-of-ownership panel no competitor offers. Behind it, a complete bilingual CRM.",
    },
    metric: {
      value: "46.078",
      label: {
        es: "propiedades reales sincronizadas cada 4 h",
        en: "real listings synced every 4 hours",
      },
    },
    challenge: {
      es: "Una agente independiente compite contra portales con presupuestos millonarios y contra las webs plantilla que su propio sector le vende, todas idénticas entre sí.\n\nEl encargo no era una web bonita: era un motor de captación de clientes que diera dos cosas que las plantillas no dan. Primero, inventario real: acceso en vivo al MLS de Miami, con decenas de miles de propiedades actualizadas de forma continua y sin muro de pago ni registro obligatorio, porque las reglas IDX del sector lo prohíben. Segundo, una razón para elegirla a ella.\n\nEn Florida el precio de una casa dice muy poco: el seguro de inundación, el seguro de hogar, las cuotas de HOA/CDD y los impuestos pueden duplicar la cuota mensual real, y ese dato no se lo da ningún portal al comprador. Convertirlo en producto era la diferencia entre otra web más y una herramienta que la gente usa y por la que deja su contacto.\n\nTodo ello dentro de un marco normativo estrecho: reglas de exhibición IDX del MLS, Fair Housing federal con su prohibición absoluta de steering, consentimiento por canal en cada formulario y la obligación de etiquetar como estimación cualquier cifra de coste.",
      en: "An independent agent competes against portals with multimillion budgets and against the template websites her own industry sells her, all identical to each other.\n\nThe brief wasn't a pretty website: it was a lead engine that delivered two things templates can't. First, real inventory: live access to the Miami MLS, with tens of thousands of continuously updated listings and no paywall or forced sign-up, because the industry's IDX rules forbid it. Second, a reason to choose her.\n\nIn Florida the price of a house says very little: flood insurance, home insurance, HOA/CDD dues and taxes can double the real monthly payment, and no portal gives buyers that figure. Turning it into a product was the difference between one more website and a tool people actually use and hand over their contact details for.\n\nAll of it inside a tight regulatory frame: MLS IDX display rules, federal Fair Housing with its absolute ban on steering, per-channel consent on every form, and the duty to label any cost figure as an estimate.",
    },
    solution: {
      es: "Una aplicación completa —web pública y CRM propio— sobre una arquitectura pensada para durar más que su primera versión.\n\nUna sola fuente de verdad: la web nunca consulta el MLS, lee siempre nuestra base PostgreSQL. Lo único intercambiable es quién la puebla. Eso permitió construir y validar el producto entero contra datos de prueba meses antes de tener acceso al MLS, y cambiar después al feed real sin reescribir una sola pantalla; añadir un segundo MLS es hoy trabajo de días, no un rediseño.\n\nIntegración MLS RESO: un worker independiente en Node consume la API RESO Web de Bridge Interactive (MIAMI REALTORS), normaliza el feed a nuestro esquema y hace upsert sobre la misma tabla. Carga inicial completa más incrementales cada 4 horas con GitHub Actions, por debajo del refresco máximo de 12 horas que exige la licencia del MLS.\n\nBúsqueda con mapa: lista y mapa MapLibre sincronizados en ambos sentidos, agrupación de marcadores calculada en servidor y dibujo de zonas a mano alzada resuelto con consultas geoespaciales ST_Intersects en PostGIS. Todo el estado vive en la URL, así que cualquier búsqueda es un enlace que se puede compartir. Sobre el mapa, cuatro capas de contexto: colegios, transporte público (GTFS), transitabilidad e índice EPA y comercios.\n\nEl panel de coste de propiedad en Florida es el diferenciador: cruza la zona de inundación FEMA de cada propiedad con estimaciones de seguro de inundación, seguro de hogar, cuotas de HOA/CDD e impuestos hasta llegar a una cuota mensual realista. Es el argumento de captación más fuerte de la web, y toda cifra aparece etiquetada como estimación, nunca como presupuesto ni asesoramiento.\n\nCaptación y CRM: formulario multi-paso de una pregunta por pantalla, configurable por la propia agente sin tocar código, con teléfono o email —nunca ambos obligatorios— y consentimiento registrado por canal. Cada contacto dispara alerta instantánea, entra en el resumen diario y recibe respuesta automática bilingüe. En el CRM: bandeja con lista y kanban, pipeline, ficha con las propiedades que visitó cada contacto, actividades, recordatorios, campañas segmentadas, analítica de origen y conversión, editor de contenidos bilingüe y exportación CSV.\n\nSEO programático: cerca de 150.000 páginas con regeneración incremental, sitemaps bilingües, hreflang y datos estructurados, más un informe semanal automatizado que mide posiciones reales en Search Console y señala dónde actuar. Y cumplimiento desde el diseño: exhibición IDX conforme, Fair Housing aplicado en todo el producto, consentimiento y lista de supresión en el modelo de datos desde el primer día, y tres rondas completas de auditoría cerradas.\n\nUn producto en producción también se juzga por lo que cuesta mantenerlo vivo. Tres intervenciones quitaron dinero de la factura sin quitar funcionalidad: servir las fotos de las 46.000 fichas directamente desde el CDN de origen (coste de imágenes cero, de forma estructural), agrupar los despliegues para no regenerar y pagar las 150.000 páginas en cada mejora (−90% de coste, sin afectar al contenido ni al SEO) y bloquear en el firewall un rastreador que se hacía pasar por navegador y generaba la mayoría del tráfico facturado.\n\nCada decisión de arquitectura se escribió en un ADR antes que el código, con un roadmap vivo como único registro de estado, una funcionalidad en vuelo cada vez, tests junto al código y revisión con checklist antes de cada integración. Cada versión entrega su changelog en lenguaje de cliente.",
      en: "A complete application —public site and its own CRM— on an architecture built to outlive its first version.\n\nA single source of truth: the site never queries the MLS, it always reads our PostgreSQL database. The only swappable part is who fills it. That let us build and validate the entire product against test data months before MLS access, then switch to the real feed without rewriting a single screen; adding a second MLS is now days of work, not a redesign.\n\nRESO MLS integration: a standalone Node worker consumes the Bridge Interactive (MIAMI REALTORS) RESO Web API, normalizes the feed to our schema and upserts into the same table. Full initial load plus incrementals every 4 hours via GitHub Actions, well under the 12-hour maximum refresh the MLS licence requires.\n\nMap search: list and MapLibre map synced both ways, server-side marker clustering, and freehand area drawing solved with ST_Intersects geospatial queries in PostGIS. All state lives in the URL, so any search is a shareable link. On the map, four context layers: schools, public transit (GTFS), walkability (EPA index) and retail.\n\nThe Florida cost-of-ownership panel is the differentiator: it crosses each property's FEMA flood zone with estimates for flood insurance, home insurance, HOA/CDD dues and taxes to reach a realistic monthly payment. It's the site's strongest lead argument, and every figure is labelled an estimate, never a quote or advice.\n\nLead capture and CRM: a multi-step form, one question per screen, configurable by the agent herself without touching code, with phone or email —never both required— and consent recorded per channel. Every lead fires an instant alert, joins the daily digest and gets a bilingual auto-reply. In the CRM: inbox with list and kanban views, pipeline, contact record with the properties they viewed, activities, reminders, segmented campaigns, source and conversion analytics, bilingual content editor and CSV export.\n\nProgrammatic SEO: around 150,000 pages with incremental regeneration, bilingual sitemaps, hreflang and structured data, plus an automated weekly report measuring real Search Console positions and pointing at where to act. And compliance by design: conforming IDX display, Fair Housing applied across the product, consent and suppression list in the data model from day one, and three full audit rounds closed.\n\nA product in production is also judged by what it costs to keep alive. Three interventions took money off the bill without taking away features: serving the photos of 46,000 listings straight from the origin CDN (image cost structurally zero), batching deploys so the 150,000 pages aren't regenerated —and paid for— on every improvement (−90% cost, with no impact on content or SEO), and firewall-blocking a crawler that posed as a browser and generated most of the billed traffic.\n\nEvery architecture decision was written as an ADR before the code, with a living roadmap as the single record of status, one feature in flight at a time, tests alongside the code and a checklist review before each merge. Every release ships its changelog in client language.",
    },
    results: [
      {
        value: "~150.000",
        label: {
          es: "páginas indexables bilingües",
          en: "bilingual indexable pages",
        },
      },
      {
        value: "3.070",
        label: {
          es: "tests automatizados en 363 ficheros",
          en: "automated tests across 363 files",
        },
      },
      {
        value: "2 meses",
        label: {
          es: "de cero a v1.0.0 en producción",
          en: "from zero to v1.0.0 in production",
        },
      },
    ],
    stack: [
      "Next.js 15",
      "React 19",
      "TypeScript strict",
      "PostgreSQL + PostGIS",
      "Drizzle ORM",
      "MapLibre GL",
      "Auth.js",
      "Vercel · Neon · Cloudflare",
    ],
    liveUrl: "https://nilyanherrera.com",
  },
  {
    slug: "sentra",
    relatedService: "/services/full-stack-development",
    // título corto para el <title>/SERP (el title largo supera 100c)
    seoTitle: {
      es: "BI para grupos de restauración · Caso Sentra",
      en: "BI for restaurant groups · Sentra case",
    },
    client: {
      es: "Grupo de restauración · 7 locales",
      en: "Restaurant group · 7 locations",
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
    quoteAuthor: "Equipo de dirección · Grupo de restauración",
  },
  {
    slug: "atep-inventory",
    relatedService: "/services/automation",
    // título corto para el <title>/SERP (el title largo supera 100c)
    seoTitle: {
      es: "Inventario RFID con Odoo para ópticas",
      en: "RFID inventory with Odoo for opticians",
    },
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
    relatedService: "/services/full-stack-development",
    // título corto para el <title>/SERP (el title largo supera 100c)
    seoTitle: {
      es: "SaaS de turnos para hostelería · turnOS",
      en: "Shift-planning SaaS for hospitality · turnOS",
    },
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
    liveUrl: "https://www.goturnos.com",
    image: "/images/cases/turnos.webp",
  },
  {
    slug: "lnh-partner",
    relatedService: "/services/professional-websites",
    // título corto para el <title>/SERP (el title largo supera 100c)
    seoTitle: {
      es: "Web corporativa ultra rápida · LNH & Partner",
      en: "Ultra-fast corporate website · LNH & Partner",
    },
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
    liveUrl: "https://www.lnhpartner.com",
    image: "/images/cases/lnh-partner.webp",
  },
  {
    slug: "tibis-market",
    relatedService: "/services/ecommerce",
    // título corto para el <title>/SERP (el title largo supera 100c)
    seoTitle: {
      es: "E-commerce con pedido por WhatsApp · Tibis Market",
      en: "WhatsApp-checkout e-commerce · Tibis Market",
    },
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
    liveUrl: "https://www.tibismarket.com",
    image: "/images/cases/tibis-market.webp",
  },
  {
    slug: "hampton-textile-printing",
    relatedService: "/services/legacy-migration",
    // título corto para el <title>/SERP (el title largo supera 100c)
    seoTitle: {
      es: "Migración ERP sin downtime · Hampton Textile",
      en: "Zero-downtime ERP migration · Hampton Textile",
    },
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
    relatedService: "/services/professional-websites",
    // título corto para el <title>/SERP (el title largo supera 100c)
    seoTitle: {
      es: "Web para clínica de nutrición · Luis Royuela",
      en: "Nutrition clinic website · Luis Royuela",
    },
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
    liveUrl: "https://www.luisroyuelanutricionistas.com",
    image: "/images/cases/luis-royuela-nutricionistas.webp",
  },
];

export const getCases = () => cases;

export const getCaseBySlug = (slug) => cases.find((c) => c.slug === slug);
