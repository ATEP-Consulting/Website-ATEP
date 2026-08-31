// Notificación a WhatsApp de cada envío del formulario de contacto.
//
// Vercel despliega este archivo como Serverless Function en /api/contact.
// El front (src/components/ContactForm.jsx) la llama DESPUÉS de enviar el
// email por EmailJS: si esto falla, el lead ya está a salvo en el correo,
// así que nunca bloquea al usuario.
//
// Proveedores soportados (se elige por las variables de entorno que haya
// configuradas en Vercel → Project Settings → Environment Variables):
//
//   A) CallMeBot — el más rápido de poner en marcha para avisarte a TI
//      mismo. Alta en 2 minutos desde el móvil, gratis.
//        CALLMEBOT_PHONE   número destino con prefijo, ej. +34647748705
//        CALLMEBOT_APIKEY  la apikey que te devuelve el bot
//
//   B) WhatsApp Cloud API (Meta) — la oficial.
//        WHATSAPP_TOKEN     token permanente de la app de Meta
//        WHATSAPP_PHONE_ID  ID del número emisor
//        WHATSAPP_TO        número destino, ej. 34647748705
//      OJO: fuera de una ventana de conversación de 24h Meta solo permite
//      plantillas aprobadas. Si defines WHATSAPP_TEMPLATE (nombre de la
//      plantilla, con un parámetro de texto) se envía como plantilla.
//
// Sin ninguna de las dos configuradas, responde ok con whatsapp:"disabled"
// y el formulario sigue funcionando solo con email.
//
// Anti-spam: el endpoint es público, así que valida honeypot, campos y
// longitudes, y si defines RECAPTCHA_SECRET verifica también el token de
// reCAPTCHA v3 que envía el front.

const MAX = { name: 120, email: 160, company: 160, service: 120, message: 4000 };

const clean = (value = "", max) => String(value).slice(0, max).trim();

const isEmail = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value);

async function verifyRecaptcha(token) {
  const secret = process.env.RECAPTCHA_SECRET;
  if (!secret) return true; // sin secret configurada no bloqueamos
  if (!token) return false;
  try {
    const res = await fetch("https://www.google.com/recaptcha/api/siteverify", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({ secret, response: token }),
    });
    const data = await res.json();
    return data.success === true && (data.score === undefined || data.score >= 0.5);
  } catch {
    return true; // si Google no responde, no penalizamos al usuario
  }
}

async function sendViaCallMeBot(text) {
  const phone = process.env.CALLMEBOT_PHONE;
  const apikey = process.env.CALLMEBOT_APIKEY;
  if (!phone || !apikey) return null;

  const url =
    "https://api.callmebot.com/whatsapp.php?" +
    new URLSearchParams({ phone, apikey, text });
  const res = await fetch(url);
  if (!res.ok) throw new Error(`CallMeBot ${res.status}`);
  return "callmebot";
}

async function sendViaCloudApi(text, lead) {
  const token = process.env.WHATSAPP_TOKEN;
  const phoneId = process.env.WHATSAPP_PHONE_ID;
  const to = process.env.WHATSAPP_TO;
  if (!token || !phoneId || !to) return null;

  const template = process.env.WHATSAPP_TEMPLATE;
  const payload = template
    ? {
        messaging_product: "whatsapp",
        to,
        type: "template",
        template: {
          name: template,
          language: { code: process.env.WHATSAPP_TEMPLATE_LANG || "es" },
          components: [
            {
              type: "body",
              parameters: [
                { type: "text", text: lead.name },
                { type: "text", text: lead.service },
              ],
            },
          ],
        },
      }
    : { messaging_product: "whatsapp", to, type: "text", text: { body: text } };

  const res = await fetch(`https://graph.facebook.com/v21.0/${phoneId}/messages`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error(`Cloud API ${res.status}`);
  return template ? "cloud-api-template" : "cloud-api";
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ ok: false, error: "method_not_allowed" });
  }

  const body = typeof req.body === "string" ? JSON.parse(req.body || "{}") : req.body || {};

  // Trampa para bots: el campo va oculto, si viene relleno se descarta en
  // silencio (200 para no darle pistas al bot).
  if (body.honeypot) return res.status(200).json({ ok: true, whatsapp: "skipped" });

  const lead = {
    name: clean(body.name, MAX.name),
    email: clean(body.email, MAX.email),
    company: clean(body.company, MAX.company),
    service: clean(body.service, MAX.service),
    message: clean(body.message, MAX.message),
  };

  if (!lead.name || !isEmail(lead.email) || !lead.message) {
    return res.status(400).json({ ok: false, error: "invalid_payload" });
  }

  if (!(await verifyRecaptcha(body.recaptchaToken))) {
    return res.status(403).json({ ok: false, error: "recaptcha_failed" });
  }

  const text = [
    "🔔 Nuevo contacto desde atepconsulting.com",
    "",
    `👤 ${lead.name}`,
    lead.company ? `🏢 ${lead.company}` : null,
    `✉️ ${lead.email}`,
    lead.service ? `🛠️ ${lead.service}` : null,
    "",
    lead.message,
  ]
    .filter((line) => line !== null)
    .join("\n");

  try {
    const sent = (await sendViaCloudApi(text, lead)) || (await sendViaCallMeBot(text));
    return res.status(200).json({ ok: true, whatsapp: sent || "disabled" });
  } catch (error) {
    // El email ya salió por EmailJS: registramos y devolvemos ok para no
    // mostrarle un error al usuario por un fallo del canal secundario.
    console.error("WhatsApp notify failed:", error.message);
    return res.status(200).json({ ok: true, whatsapp: "failed" });
  }
}
