import { useId, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

export function DemoForm({ className, buttonText = "Ver cómo funciona" }) {
  const emailId = useId()
  const [email, setEmail] = useState("")
  const [status, setStatus] = useState("idle")

  function handleSubmit(event) {
    event.preventDefault()
    setStatus("sent")
  }

  return (
    <div className={cn("w-full max-w-md", className)}>
      <form className="flex flex-col gap-2 sm:flex-row sm:gap-0" onSubmit={handleSubmit}>
        <label className="sr-only" htmlFor={emailId}>Correo electrónico</label>
        <Input
          id={emailId}
          type="email"
          required
          value={email}
          onChange={(event) => {
            setEmail(event.target.value)
            setStatus("idle")
          }}
          placeholder="ejemplo@gmail.com"
          className="sm:rounded-r-none sm:border-r-0"
        />
        <Button type="submit" className="sm:rounded-l-none">{status === "sent" ? "¡Listo!" : buttonText}</Button>
      </form>
      <p aria-live="polite" className={cn("mt-2 text-xs text-muted", status !== "sent" && "sr-only")}>
        Gracias. Nos pondremos en contacto contigo pronto.
      </p>
    </div>
  )
}
