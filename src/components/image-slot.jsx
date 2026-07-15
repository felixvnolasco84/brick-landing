import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

export function ImageSlot({ label, className, browser = false, children }) {
  return (
    <div
      className={cn(
        "relative flex min-h-52 w-full items-center justify-center overflow-hidden rounded-lg border border-dashed border-[#d8d5d1] bg-white/55",
        className,
      )}
      data-image-slot={label}
      role="img"
      aria-label={`Espacio reservado para ${label}`}
    >
      {browser && (
        <div className="absolute inset-x-0 top-0 flex h-11 items-center gap-1.5 border-b border-border/80 px-4">
          <span className="size-2.5 rounded-full bg-[#dedbd7]" />
          <span className="size-2.5 rounded-full bg-[#dedbd7]" />
          <span className="size-2.5 rounded-full bg-[#dedbd7]" />
        </div>
      )}
      <div className={cn("flex flex-col items-center gap-3 px-6 text-center", browser && "pt-11")}>
        {/* <Badge variant="outline">Imagen</Badge> */}
        <p className="max-w-xs text-sm text-muted">{label}</p>
        {children}
      </div>
    </div>
  )
}
