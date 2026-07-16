import { useId, useRef, useState } from "react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

function createRequestId() {
  return globalThis.crypto?.randomUUID?.() ||
    `${Date.now()}_${Math.random().toString(36).slice(2)}`
}

export function DemoForm({
  className,
  buttonText = "Ver cómo funciona",
  source = "Landing page",
}) {
  const emailId = useId()
  const honeypotId = useId()
  const requestIdRef = useRef("")
  const [email, setEmail] = useState("")
  const [status, setStatus] = useState("idle")

  async function handleSubmit(event) {
    event.preventDefault()
    if (status === "sending") return

    const formData = new FormData(event.currentTarget)
    const requestId = requestIdRef.current || createRequestId()
    requestIdRef.current = requestId
    setStatus("sending")

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Idempotency-Key": requestId,
        },
        body: JSON.stringify({
          email,
          source,
          company: formData.get("company"),
        }),
      })

      if (!response.ok) {
        throw new Error("No se pudo enviar la solicitud")
      }

      requestIdRef.current = ""
      setEmail("")
      setStatus("sent")
    } catch {
      setStatus("error")
    }
  }

  const feedback = status === "sent"
    ? "Gracias. Revisa tu correo; nos pondremos en contacto contigo pronto."
    : "No pudimos enviar tu solicitud. Inténtalo nuevamente o escríbenos a hola@brickcontrol.mx."

  return (
    <div className={cn("w-full max-w-md", className)}>
      <form className="relative flex flex-col gap-2 sm:flex-row sm:gap-0" onSubmit={handleSubmit}>
        <label className="sr-only" htmlFor={emailId}>Correo electrónico</label>
        <Input
          id={emailId}
          type="email"
          name="email"
          autoComplete="email"
          required
          disabled={status === "sending"}
          value={email}
          onChange={(event) => {
            setEmail(event.target.value)
            requestIdRef.current = ""
            setStatus("idle")
          }}
          placeholder="ejemplo@gmail.com"
          className="sm:rounded-r-none sm:border-r-0"
        />

        <div className="pointer-events-none absolute -left-[10000px] top-auto size-px overflow-hidden" aria-hidden="true">
          <label htmlFor={honeypotId}>Empresa</label>
          <input
            id={honeypotId}
            type="text"
            name="company"
            tabIndex={-1}
            autoComplete="off"
          />
        </div>

        <Button
          type="submit"
          disabled={status === "sending"}
          className="sm:rounded-l-none"
        >
          {status === "sending" ? "Enviando…" : status === "sent" ? "¡Listo!" : buttonText}
        </Button>
      </form>

      <p
        aria-live="polite"
        className={cn(
          "mt-2 text-xs",
          status === "error" ? "text-red-700" : "text-muted",
          status !== "sent" && status !== "error" && "sr-only",
        )}
      >
        {feedback}
      </p>
    </div>
  )
}
