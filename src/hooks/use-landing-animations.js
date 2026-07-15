import { useLayoutEffect } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

const cardOrders = {
  features: [0, 1, 0, 1, 2],
  pricing: [0, 1, 2],
  closing: [0, 1],
}

export function useLandingAnimations(scope) {
  useLayoutEffect(() => {
    const media = gsap.matchMedia()
    const context = gsap.context(() => {
      media.add(
        {
          desktop: "(min-width: 768px)",
          wideDesktop: "(min-width: 1024px)",
          mobile: "(max-width: 767px)",
          reduceMotion: "(prefers-reduced-motion: reduce)",
        },
        ({ conditions }) => {
          const { desktop, wideDesktop, reduceMotion } = conditions

          if (reduceMotion) return

          gsap.timeline({ defaults: { ease: "power3.out" } })
            .from("[data-hero-title] [data-title-line]", {
              yPercent: 110,
              autoAlpha: 0,
              duration: 0.85,
              stagger: 0.12,
            })
            .from("[data-hero-support]", {
              y: 18,
              autoAlpha: 0,
              duration: 0.55,
              stagger: 0.08,
            }, "-=0.38")

          const heroCard = document.querySelector("[data-hero-card]")
          if (heroCard) {
            gsap.from(heroCard, {
              y: 44,
              scale: 0.985,
              autoAlpha: 0,
              duration: 0.9,
              ease: "power3.out",
              scrollTrigger: {
                trigger: heroCard,
                start: "top 88%",
                once: true,
              },
            })
          }

          gsap.utils.toArray("[data-title-group]").forEach((group) => {
            const titles = group.querySelectorAll("[data-title-reveal]")

            gsap.from(titles, {
              y: 34,
              autoAlpha: 0,
              duration: 0.78,
              stagger: 0.1,
              ease: "power3.out",
              scrollTrigger: {
                trigger: group,
                start: "top 84%",
                once: true,
              },
            })
          })

          gsap.utils.toArray("[data-card-group]").forEach((group) => {
            const variant = group.dataset.cardGroup
            const cards = group.querySelectorAll("[data-animate-card]")

            cards.forEach((card, index) => {
              const order = cardOrders[variant]?.[index] ?? index
              const staggerRow = variant === "features" ? desktop : wideDesktop
              const mediaElement = card.querySelector("[data-card-media]")
              const timeline = gsap.timeline({
                scrollTrigger: {
                  trigger: card,
                  start: "top 88%",
                  once: true,
                },
              })

              timeline.from(card, {
                y: variant === "pricing" ? 48 : 38,
                scale: 0.985,
                autoAlpha: 0,
                duration: 0.72,
                delay: staggerRow ? order * 0.08 : 0,
                ease: "power3.out",
              })

              if (mediaElement) {
                timeline.from(mediaElement, {
                  y: 20,
                  scale: 1.025,
                  autoAlpha: 0,
                  duration: 0.65,
                  ease: "power2.out",
                }, "-=0.48")
              }
            })
          })
        },
      )
    }, scope)

    document.fonts?.ready.then(() => ScrollTrigger.refresh())

    return () => {
      media.revert()
      context.revert()
    }
  }, [scope])
}
