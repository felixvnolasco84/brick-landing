const message =
  "Checkout se gestiona desde la aplicación autenticada. Abre /start?plan=starter, growth o scale en el dashboard."

export function POST() {
  return Response.json(
    { error: message, code: "CHECKOUT_MOVED" },
    {
      status: 410,
      headers: {
        "Cache-Control": "no-store",
        "Content-Type": "application/json; charset=utf-8",
      },
    },
  )
}
