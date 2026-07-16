import { randomUUID } from "node:crypto"
import { jsx } from "react/jsx-runtime"
import { Resend } from "resend"

import ContactFormEmail from "../emails/emails/contact-form-email.jsx"
import SimpleContactOnlyEmail from "../emails/emails/simple-contact-only-email.jsx"

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const requestIdPattern = /^[a-zA-Z0-9_-]{8,128}$/

export async function POST(request) {
  if (!request.headers.get("content-type")?.includes("application/json")) {
    return json({ error: "El contenido debe enviarse como JSON." }, 415)
  }

  const contentLength = Number(request.headers.get("content-length") || 0)
  if (contentLength > 10_000) {
    return json({ error: "La solicitud es demasiado grande." }, 413)
  }

  const origin = request.headers.get("origin")
  const requestOrigin = new URL(request.url).origin
  if (origin && origin !== requestOrigin) {
    return json({ error: "Origen no permitido." }, 403)
  }

  let payload
  try {
    payload = await request.json()
  } catch {
    return json({ error: "No se pudo leer la solicitud." }, 400)
  }

  if (!payload || typeof payload !== "object" || Array.isArray(payload)) {
    return json({ error: "La solicitud no tiene el formato esperado." }, 400)
  }

  // Honeypot: los navegadores no muestran este campo, pero muchos bots lo llenan.
  if (typeof payload.company === "string" && payload.company.trim()) {
    return json({ ok: true })
  }

  const email = normalizeText(payload.email, 254).toLowerCase()
  const source = normalizeText(payload.source, 120) || "Landing page"

  if (!emailPattern.test(email)) {
    return json({ error: "Ingresa un correo electrónico válido." }, 400)
  }

  const { RESEND_API_KEY, RESEND_FROM_EMAIL, CONTACT_TO_EMAIL } = process.env
  if (!RESEND_API_KEY || !RESEND_FROM_EMAIL || !CONTACT_TO_EMAIL) {
    console.error("Faltan variables de entorno para el envío de correo.")
    return json({ error: "El servicio de correo no está configurado." }, 503)
  }

  const resend = new Resend(RESEND_API_KEY)
  const siteUrl = process.env.PUBLIC_SITE_URL || requestOrigin
  const submittedAt = new Intl.DateTimeFormat("es-MX", {
    dateStyle: "long",
    timeStyle: "short",
    timeZone: "America/Mexico_City",
  }).format(new Date())

  const requestIdHeader = request.headers.get("x-idempotency-key") || ""
  const requestId = requestIdPattern.test(requestIdHeader)
    ? requestIdHeader
    : randomUUID()

  try {
    const { error } = await resend.batch.send(
      [
        {
          from: RESEND_FROM_EMAIL,
          to: [CONTACT_TO_EMAIL],
          replyTo: email,
          subject: `Nueva solicitud de demo · ${email}`,
          react: jsx(ContactFormEmail, {
            email,
            source,
            submittedAt,
          }),
        },
        {
          from: RESEND_FROM_EMAIL,
          to: [email],
          replyTo: CONTACT_TO_EMAIL,
          subject: "Recibimos tu solicitud · Brick",
          react: jsx(SimpleContactOnlyEmail, {
            email,
            siteUrl,
          }),
        },
      ],
      { idempotencyKey: `contact/${requestId}` },
    )

    if (error) {
      console.error("Resend rechazó el envío:", error.name, error.message)
      return json({ error: "No pudimos enviar tu solicitud." }, 502)
    }

    return json({ ok: true })
  } catch (error) {
    console.error("Error inesperado al enviar con Resend:", error)
    return json({ error: "No pudimos enviar tu solicitud." }, 500)
  }
}

function normalizeText(value, maxLength) {
  return typeof value === "string" ? value.trim().slice(0, maxLength) : ""
}

function json(body, status = 200) {
  return Response.json(body, {
    status,
    headers: {
      "Cache-Control": "no-store",
      "Content-Type": "application/json; charset=utf-8",
    },
  })
}
