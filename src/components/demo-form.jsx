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

      <DialogContent className="max-h-[calc(100dvh-2rem)] max-w-[35rem] overflow-y-auto p-0">
        <div aria-hidden="true" className="h-1.5 bg-accent" />
        <div className="px-5 pb-7 pt-5 sm:px-10 sm:pb-10 sm:pt-8">
          <div className="mb-8 flex items-center justify-between pr-8">
            <span className="text-[1.75rem] font-black leading-none tracking-[-0.08em]">brick</span>
            <span className="text-[9px] font-semibold tracking-[0.2em] text-muted">CONTROL DE OBRA</span>
          </div>

          <p className="mb-5 text-center text-[10px] font-bold uppercase tracking-[0.2em] text-muted">
            <span aria-hidden="true" className="tracking-[-0.2em] text-ink">——</span> Demo de producto
          </p>

          <DialogHeader>
            <DialogTitle>
              Descubre <span className="text-[#8A8783]">brick en acción.</span>
            </DialogTitle>
            <DialogDescription className="mx-auto max-w-[27rem]">
              Registra tu correo de trabajo para explorar cómo Brick te ayuda a controlar presupuesto, programa y avance de obra.
            </DialogDescription>
          </DialogHeader>

          <form className="relative mt-7 space-y-3" onSubmit={handleSubmit}>
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
              placeholder="Correo de trabajo*"
              className="h-14 rounded-none border-[#DAD7D3] bg-[#F7F7F5] px-4 text-base placeholder:text-[#8A8783] focus-visible:ring-1 sm:text-base"
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
              className="h-14 w-full rounded-none text-base"
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

          <p className="mt-5 text-center text-[11px] leading-4 text-[#8A8783]">
            Al continuar aceptas que Brick use tu correo para dar seguimiento a tu solicitud.
          </p>
        </div>
      </DialogContent>
    </Dialog>
  )
}
