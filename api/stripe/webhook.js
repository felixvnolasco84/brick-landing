import Stripe from "stripe"

const handledEvents = new Set([
  "checkout.session.completed",
  "customer.subscription.created",
  "customer.subscription.updated",
  "customer.subscription.deleted",
  "invoice.paid",
  "invoice.payment_failed",
])

let stripeClient

export async function POST(request) {
  const secretKey = process.env.STRIPE_SECRET_KEY
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET
  if (!secretKey || !webhookSecret) {
    console.error("Falta configurar STRIPE_SECRET_KEY o STRIPE_WEBHOOK_SECRET.")
    return json({ error: "Webhook no configurado." }, 503)
  }

  const signature = request.headers.get("stripe-signature")
  if (!signature) {
    return json({ error: "Falta la firma de Stripe." }, 400)
  }

  const contentLength = Number(request.headers.get("content-length") || 0)
  if (contentLength > 1_000_000) {
    return json({ error: "El evento es demasiado grande." }, 413)
  }

  const rawBody = await request.text()
  let event

  try {
    event = await getStripe(secretKey).webhooks.constructEventAsync(
      rawBody,
      signature,
      webhookSecret,
    )
  } catch (error) {
    console.warn("Stripe rechazó la firma del webhook:", error instanceof Error ? error.message : error)
    return json({ error: "Firma inválida." }, 400)
  }

  if (handledEvents.has(event.type)) {
    // Conecta aquí la persistencia de suscripciones cuando exista una base de datos.
    // Los webhooks son la fuente de verdad; no concedas acceso desde la página de éxito.
    console.info("Evento de suscripción recibido", summarizeEvent(event))
  }

  return json({ received: true })
}

function getStripe(secretKey) {
  stripeClient ||= new Stripe(secretKey, {
    appInfo: { name: "Brick Landing", version: "0.1.0" },
    maxNetworkRetries: 2,
    timeout: 10_000,
  })
  return stripeClient
}

function summarizeEvent(event) {
  const object = event.data.object
  return {
    eventId: event.id,
    type: event.type,
    objectId: object.id,
    status: "status" in object ? object.status : undefined,
  }
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
