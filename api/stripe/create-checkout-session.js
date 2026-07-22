import { randomUUID } from "node:crypto"
import Stripe from "stripe"

const requestIdPattern = /^[a-zA-Z0-9_-]{8,128}$/
const planPriceVariables = {
  starter: "STRIPE_PRICE_STARTER",
  growth: "STRIPE_PRICE_GROWTH",
  scale: "STRIPE_PRICE_SCALE",
}

let stripeClient

export async function POST(request) {
  if (!request.headers.get("content-type")?.includes("application/json")) {
    return json({ error: "El contenido debe enviarse como JSON." }, 415)
  }

  const contentLength = Number(request.headers.get("content-length") || 0)
  if (contentLength > 5_000) {
    return json({ error: "La solicitud es demasiado grande." }, 413)
  }

  const requestOrigin = new URL(request.url).origin
  const origin = request.headers.get("origin")
  if (origin && origin !== requestOrigin) {
    return json({ error: "Origen no permitido." }, 403)
  }

  let payload
  try {
    payload = await request.json()
  } catch {
    return json({ error: "No se pudo leer la solicitud." }, 400)
  }

  const plan = typeof payload?.plan === "string" ? payload.plan.toLowerCase() : ""
  const priceVariable = planPriceVariables[plan]
  if (!priceVariable) {
    return json({ error: "El plan seleccionado no existe." }, 400)
  }

  const priceConfigurationError = validatePriceConfiguration()
  if (priceConfigurationError) {
    console.error(priceConfigurationError)
    return json({ error: "La configuración de precios requiere atención." }, 503)
  }

  const secretKey = process.env.STRIPE_SECRET_KEY
  const priceId = process.env[priceVariable]
  if (!secretKey || !priceId) {
    console.error(`Falta configurar STRIPE_SECRET_KEY o ${priceVariable}.`)
    return json({ error: "Este plan aún no está disponible para compra en línea." }, 503)
  }

  const requestIdHeader = request.headers.get("x-idempotency-key") || ""
  const requestId = requestIdPattern.test(requestIdHeader)
    ? requestIdHeader
    : randomUUID()

  try {
    const stripe = getStripe(secretKey)
    const price = await stripe.prices.retrieve(priceId)

    if (!price.active || !price.recurring) {
      console.error(`El precio configurado para ${plan} no es recurrente o está inactivo.`)
      return json({ error: "Este plan no está disponible para suscripción." }, 503)
    }

    const siteUrl = getSiteUrl(process.env.PUBLIC_SITE_URL || requestOrigin)
    const session = await stripe.checkout.sessions.create(
      {
        mode: "subscription",
        locale: "es",
        line_items: [{ price: price.id, quantity: 1 }],
        success_url: `${siteUrl}/?checkout=success&session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${siteUrl}/?checkout=canceled#planes`,
        submit_type: "subscribe",
        allow_promotion_codes: process.env.STRIPE_ALLOW_PROMOTION_CODES === "true",
        client_reference_id: requestId,
        metadata: {
          plan,
          source: "brick-landing",
        },
        subscription_data: {
          metadata: {
            plan,
            source: "brick-landing",
          },
        },
      },
      { idempotencyKey: `checkout/${requestId}` },
    )

    if (!session.url) {
      throw new Error("Stripe no devolvió una URL de Checkout.")
    }

    return json({ url: session.url })
  } catch (error) {
    console.error("No se pudo crear la sesión de Stripe Checkout:", error)
    return json({ error: "No pudimos abrir el pago. Inténtalo nuevamente." }, 502)
  }
}

function getStripe(secretKey) {
  stripeClient ||= new Stripe(secretKey, {
    appInfo: { name: "Brick Landing", version: "0.1.0" },
    maxNetworkRetries: 2,
    timeout: 10_000,
  })
  return stripeClient
}

function validatePriceConfiguration() {
  const configuredPrices = Object.entries(planPriceVariables)
    .map(([plan, variable]) => ({ plan, variable, priceId: process.env[variable] }))
    .filter(({ priceId }) => Boolean(priceId))

  for (const { variable, priceId } of configuredPrices) {
    if (!/^price_[a-zA-Z0-9]+$/.test(priceId)) {
      return `${variable} no contiene un ID de precio válido.`
    }
  }

  const pricesById = new Map()
  for (const { plan, priceId } of configuredPrices) {
    const previousPlan = pricesById.get(priceId)
    if (previousPlan) {
      return `Los planes ${previousPlan} y ${plan} usan el mismo Price ID.`
    }
    pricesById.set(priceId, plan)
  }

  return ""
}

function getSiteUrl(value) {
  const url = new URL(value)
  if (!/^https?:$/.test(url.protocol)) {
    throw new Error("PUBLIC_SITE_URL debe usar HTTP o HTTPS.")
  }
  return url.origin
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
