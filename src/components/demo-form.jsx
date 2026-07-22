import { useId, useRef, useState } from "react"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

const exploreProductUrl = "https://app.brick.lat/explore-product"

function createRequestId() {
  return globalThis.crypto?.randomUUID?.() ||
    `${Date.now()}_${Math.random().toString(36).slice(2)}`
}

export function DemoForm({
  className,
  triggerClassName,
  triggerVariant = "default",
  buttonText = "Ver cómo funciona",
  source = "Landing page",
}) {
  const emailId = useId()
  const honeypotId = useId()
  const requestIdRef = useRef("")
  const [open, setOpen] = useState(false)
  const [email, setEmail] = useState("")
  const [status, setStatus] = useState("idle")

  function handleOpenChange(nextOpen) {
    if (status === "sending") return

    setOpen(nextOpen)
    if (!nextOpen) {
      requestIdRef.current = ""
      setEmail("")
      setStatus("idle")
    }
  }

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
      setStatus("sent")
      window.location.assign(exploreProductUrl)
    } catch {
      setStatus("error")
    }
  }

  const feedback = status === "sent"
    ? "Registro completado. Abriendo el producto…"
    : "No pudimos completar tu registro. Inténtalo nuevamente o escríbenos a hola@brickcontrol.mx."

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <div className={cn("inline-flex", className)}>
        <DialogTrigger asChild>
          <Button variant={triggerVariant} className={triggerClassName}>{buttonText}</Button>
        </DialogTrigger>
      </div>

      <DialogContent className="max-h-[calc(100dvh-2rem)] max-w-[30rem] gap-0 overflow-y-auto rounded-lg border-border p-7 shadow-none sm:p-10">
          <DialogHeader>
            <DialogTitle className="text-[2rem] tracking-[-0.05em] text-muted sm:text-[2rem]">
              Descubre <span className="brand-word text-ink">brick.</span>
            </DialogTitle>
            <DialogDescription className="mx-auto max-w-[22rem] font-medium leading-[1.15] tracking-[-0.035em]">
              Explora la plataforma que conecta presupuesto,<br className="hidden sm:block" /> programa y control de obra.
            </DialogDescription>
          </DialogHeader>

          <form className="relative mt-10 space-y-3" onSubmit={handleSubmit}>
            <label className="sr-only" htmlFor={emailId}>Correo electrónico de trabajo</label>
            <Input
              id={emailId}
              type="email"
              name="email"
              autoComplete="email"
              required
              autoFocus
              aria-invalid={status === "error"}
              aria-describedby={`${emailId}-feedback`}
              disabled={status === "sending"}
              value={email}
              onChange={(event) => {
                setEmail(event.target.value)
                requestIdRef.current = ""
                setStatus("idle")
              }}
              placeholder="ejemplo@gmail.com"
              className="h-12 rounded-lg border-border bg-white px-5 text-base font-medium tracking-[-0.035em] placeholder:text-muted focus-visible:ring-1 sm:text-base"
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
              className="h-12 w-full rounded-sm text-base font-medium tracking-[-0.04em]"
            >
              {status === "sending" ? "Registrando…" : status === "sent" ? "Abriendo producto…" : "Explorar producto"}
            </Button>

            <p
              id={`${emailId}-feedback`}
              aria-live="polite"
              className={cn(
                "text-center text-xs",
                status === "error" ? "text-red-700" : "text-muted",
                status !== "sent" && status !== "error" && "sr-only",
              )}
            >
              {feedback}
            </p>
          </form>

      </DialogContent>
    </Dialog>
  )
}
