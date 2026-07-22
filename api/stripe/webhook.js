export function POST() {
  return Response.json(
    {
      error: "El webhook de Stripe fue trasladado al backend de la aplicación.",
      code: "WEBHOOK_MOVED",
    },
    {
      status: 410,
      headers: {
        "Cache-Control": "no-store",
        "Content-Type": "application/json; charset=utf-8",
      },
    },
  )
}
