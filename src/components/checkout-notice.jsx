import { useEffect, useState } from "react"
import { X } from "lucide-react"

import { Button } from "@/components/ui/button"

const notices = {
  success: {
    title: "Recibimos tu suscripción.",
    message: "Stripe está confirmando el pago. Te enviaremos los siguientes pasos por correo.",
  },
  canceled: {
    title: "El pago fue cancelado.",
    message: "No se realizó ningún cargo. Puedes intentarlo nuevamente cuando quieras.",
  },
}

export function CheckoutNotice() {
  const [notice, setNotice] = useState(null)

  useEffect(() => {
    const checkoutStatus = new URLSearchParams(window.location.search).get("checkout")
    setNotice(notices[checkoutStatus] || null)
  }, [])

  if (!notice) return null

  function dismiss() {
    const url = new URL(window.location.href)
    url.searchParams.delete("checkout")
    url.searchParams.delete("session_id")
    window.history.replaceState({}, "", `${url.pathname}${url.search}${url.hash}`)
    setNotice(null)
  }

  return (
    <div
      role="status"
      className="mb-10 flex max-w-2xl items-start justify-between gap-4 rounded-lg border border-border bg-soft px-5 py-4"
    >
      <div>
        <p className="font-semibold">{notice.title}</p>
        <p className="mt-1 text-sm text-muted">{notice.message}</p>
      </div>
      <Button
        type="button"
        variant="ghost"
        size="icon"
        className="-mr-2 -mt-2 shrink-0"
        onClick={dismiss}
        aria-label="Cerrar aviso"
      >
        <X aria-hidden="true" />
      </Button>
    </div>
  )
}
