import { useRef, useState } from "react"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

function createRequestId() {
  return globalThis.crypto?.randomUUID?.() ||
    `${Date.now()}_${Math.random().toString(36).slice(2)}`
}

export function SubscriptionButton({ plan, className }) {
  const requestIdRef = useRef("")
  const [status, setStatus] = useState("idle")
  const [error, setError] = useState("")

  async function startCheckout() {
    if (status === "loading") return

    const requestId = requestIdRef.current || createRequestId()
    requestIdRef.current = requestId
    setStatus("loading")
    setError("")

    try {
      const response = await fetch("/api/stripe/create-checkout-session", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Idempotency-Key": requestId,
        },
        body: JSON.stringify({ plan }),
      })
      const payload = await response.json().catch(() => ({}))

      if (!response.ok || typeof payload.url !== "string") {
        throw new Error(payload.error || "No se pudo abrir el pago.")
      }

      window.location.assign(payload.url)
    } catch (checkoutError) {
      setStatus("error")
      setError(checkoutError instanceof Error
        ? checkoutError.message
        : "No se pudo abrir el pago.")
    }
  }

  return (
    <div className={cn("w-full", className)}>
      <Button
        type="button"
        variant="outline"
        className="w-full"
        disabled={status === "loading"}
        onClick={startCheckout}
      >
        {status === "loading" ? "Abriendo pago…" : "Comenzar"}
      </Button>
      {status === "error" && (
        <p role="alert" className="mt-2 text-center text-xs text-destructive">
          {error}
        </p>
      )}
    </div>
  )
}
