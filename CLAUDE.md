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

## Automatización de contenido y SEO

Dos ciclos programados con `launchd` (los `.plist` están en `scripts/`, se
instalan copiándolos a `~/Library/LaunchAgents`):

- **Martes, `ciclo-semanal.sh`**: coge el siguiente tema pendiente de
  `.claude/plan-editorial.json`, lo escribe con el agente `blog-writer`, lo
  publica con `scripts/publicar-post.mjs` y deja **tres borradores de LinkedIn**
  en `~/.atep-analytics/linkedin/` (martes, jueves y lunes siguiente; primera
  persona, para el perfil de Pablo, no para la página de empresa). Pablo eligió
  publicación sin revisión previa; el riesgo se acota por otro lado: el
  redactor **no escribe si no puede anclarse en un caso real de `casesData.js`
  con cifras reales**, que es lo que separa un artículo que posiciona de uno
  genérico. Verificado en el primero: once afirmaciones concretas, cero
  inventadas.

  Las **firmas van por tema**, en el campo `autor` del plan: Pablo firma lo
  técnico y de arquitectura, Gabriela lo de decisión de negocio, coste y
  contrato. Nunca "Equipo ATEP".
- **Día 2 de cada mes, `ciclo-mensual-seo.sh`**: el agente `seo-analyst` lee
  los datos reales y cambia cosas. **Mensual y no semanal a propósito**: un
  cambio necesita semanas para que Google lo evalúe, y retocar títulos cada
  semana no optimiza, oscila.

`publicar-post.mjs` reimporta `blogData.js` y ejecuta la build después de
insertar; si algo falla restaura la copia y no publica. Es la red que hace
viable publicar sin que nadie mire.

El `seo-analyst` tiene umbrales escritos en su definición: mínimo 30
impresiones en 28 días, nada que se tocara hace menos de 8 semanas, máximo tres
cambios por ejecución. Cada cambio queda en `.claude/seo-decisiones.json` con
su métrica de partida y una fecha de revisión, para poder comprobar al mes
siguiente si funcionó y revertirlo si no.

## Acceso a Search Console y GA4

Cuenta de servicio de solo lectura `claude-lector@atep-seo-96115` (proyecto de
Google Cloud `atep-seo-96115`), dada de alta como usuario en la propiedad de
dominio `sc-domain:atepconsulting.com` y en la propiedad GA4 `508169673`.

La clave vive en `~/.atep-analytics/clave.json`, **fuera del repositorio y con
permisos 600**: nunca debe acabar en un commit. Ahí mismo están los scripts de
consulta (`informe-seo.mjs` es el que usan los agentes) y las instantáneas
mensuales.

Para revocar el acceso basta con eliminar ese usuario en Search Console y en
GA4; no hace falta tocar nada del código.

## Estado y pendientes

Desplegado a producción el **1 de septiembre de 2026**. Lo que estaba pendiente y ya está hecho: el 404 real, los títulos por ruta, el sitemap con 31 URLs, `lang="es"`, el apex del dominio y la medición.

- **Rendimiento**: 78-82 en móvil. El cuello está en el arranque de React (~600ms de bloqueo) y en el CSS bloqueante, no en el contenido. Mejorable, pero exige tocar componentes.
- **Bilingüe**: el inglés no tiene URLs propias, así que Google solo indexa el español. **Aplazado a propósito**: el CTR en España es del 30,1 % y en EE. UU. del 0,3 %, así que competir en inglés es pelear donde ya se pierde. Resolverlo exigiría rutas `/es/` y `/en/` con hreflang.
- **Migas de pan**: no hay `BreadcrumbList` en ninguna página. Mejora cómo se ve el resultado en Google, no si te encuentran.
- **Fichas de caso**: usan schema `WebPage`; encajaría mejor uno de artículo.
- **`www` a CNAME**: Vercel lo recomienda pero no lo exige; hoy apunta por registro A y funciona.
- **Indexación de artículos nuevos**: llega sola por el sitemap y por el enlace desde `/blog`, pero tarda días. Pedirla a mano en Search Console la acelera a horas. **No se puede automatizar**: la API de indexación de Google solo admite ofertas de empleo y retransmisiones.
- Pendiente de Pablo: URL del perfil de Google Business, testimonio de Nilyan Herrera, y decidir si existe cuenta de X para el `twitter:site`.

## Formulario de contacto: decisión final

Se planteó desviar los leads a WhatsApp y **Pablo decidió el 2 de septiembre de 2026 dejarlo por correo**. No hay que configurar las variables de CallMeBot ni de WhatsApp Cloud API en Vercel; el canal de WhatsApp queda como código sin activar.
