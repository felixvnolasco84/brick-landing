import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { createAppUrl } from "@/lib/app-url"

export function SubscriptionButton({ plan, className }) {
  const subscriptionUrl = createAppUrl("/start", { plan })

  return (
    <div className={cn("w-full", className)}>
      <Button
        variant="outline"
        className="w-full"
        asChild
      >
        <a href={subscriptionUrl}>Comenzar prueba</a>
      </Button>
    </div>
  )
}
