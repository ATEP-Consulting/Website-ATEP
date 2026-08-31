# ATEP Consulting — Web

Diseño actual: el de `main` (el rediseño de la maqueta se descartó; queda guardado en la rama `redesign` por si algún día se retoma, junto con su guía en `design-ref/`).

## SEO (auditoría multi-agente ago 2026 — arreglos aplicados)

- **Idioma por defecto ES** (`LanguageContext`). Antes era `'en'`: Googlebot veía `lang="en"` y contenido inglés con títulos españoles, y los resultados salían mezclados en Google. Tras desplegar, pedir reindexación en Search Console.
- **`SEO.jsx` es el único dueño de metas, OG y JSON-LD.** El `index.html` solo lleva un `<title>` de respaldo: no volver a añadir metas estáticas ahí, porque se duplican y los crawlers leen la primera (que sería la genérica). Recorta descripciones a 160 caracteres, resuelve `og:image` a URL absoluta (nunca WebP: LinkedIn no lo acepta) y soporta `extraSchemas` y el tipo `LocalBusiness`.
- **`scripts/generate-seo-files.mjs`** (desde el postbuild): genera `dist/sitemap.xml` con todas las rutas reales, completa solo `reactSnap.include` con lo que falte (react-snap solo descubre lo enlazado: un post que cae a la página 2 del blog dejaba de prerenderizarse en silencio) y, en CI/Vercel, inyecta título, descripción, canonical y OG únicos por ruta en el shell. Lee los metadatos de la etiqueta `<SEO>` de cada página; si añades una ruta nueva, añádela a `PAGE_SOURCES`.
- Si react-snap falla a medias, el postbuild cae a ese modo para que **ninguna ruta quede sin generar** (con el 404 real de `vercel.json`, una ruta sin archivo daría error).
- `inlineCss` de react-snap está **desactivado a propósito**: con el CSS de este diseño hace que su Chromium se desconecte y el prerender muere a mitad. `concurrency: 1` por el mismo motivo de estabilidad.
- Rutas desconocidas devuelven 404 real con `noindex` (antes 200, un soft-404 masivo).

## Medición (GA4)

GA4 `G-GDE5LM5ND1` con Consent Mode v2. El script se carga tras la primera interacción **o a los 5 segundos**, lo que ocurra antes: no compite con el contenido (son 170KB) pero no se pierden las visitas que rebotan sin tocar nada.

Eventos (`src/lib/analytics.js` → `trackEvent`): `generate_lead`, `whatsapp_click`, `schedule_call_click` (con `location`), `view_case`, `view_post` y `blog_search`.

Pendiente en los paneles: marcar `generate_lead` y `whatsapp_click` como conversiones en GA4, vincular GA4 ↔ Search Console y enviar el sitemap tras desplegar.

## Formulario de contacto

Envía por EmailJS (aviso + autoresponder) y además llama a `POST /api/contact`, una Serverless Function que avisa al WhatsApp de ATEP. **El canal de WhatsApp es secundario**: si falla o no está configurado, el usuario ve el éxito igual porque el lead ya viajó por email. Para activarlo, variables en Vercel (ninguna va en el cliente):

- **CallMeBot**: `CALLMEBOT_PHONE`, `CALLMEBOT_APIKEY`.
- **WhatsApp Cloud API**: `WHATSAPP_TOKEN`, `WHATSAPP_PHONE_ID`, `WHATSAPP_TO` (+ `WHATSAPP_TEMPLATE` si se envía fuera de la ventana de 24h).
- Opcional: `RECAPTCHA_SECRET` para validar el token de reCAPTCHA en servidor.

Si se cambia el proveedor, hay que reflejarlo en la política de privacidad (encargados del tratamiento).

## Estado y pendientes

- **Rendimiento**: 78-82 en móvil. El cuello está en el arranque de React (~600ms de bloqueo) y en el CSS bloqueante, no en el contenido. Mejorable, pero exige tocar componentes.
- **Bilingüe**: el inglés no tiene URLs propias, así que Google solo indexa el español. Resolverlo bien exige rutas `/es/` y `/en/` con hreflang.
- **DNS**: el apex `atepconsulting.com` tiene registros A del reenvío de GoDaddy junto al de Vercel; hay que dejar solo el de Vercel y pasar `www` a CNAME.
- Pendiente de Pablo: URL del perfil de Google Business, testimonio de Nilyan Herrera.
