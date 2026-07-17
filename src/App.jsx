import { useRef } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { DemoForm } from "@/components/demo-form"
import { ImageSlot } from "@/components/image-slot"
import { useLandingAnimations } from "@/hooks/use-landing-animations"

import HeroDashboard from "../public/images/Hero-dashboard.png"
import Group20728 from "../public/images/Group 20728.png"
import Group20730 from "../public/images/Group 20730.png"
import Group20731 from "../public/images/Group 20731.png"
import Group20732 from "../public/images/Group 20732.png"
import Group20733 from "../public/images/Group 20733.png"
import MaskGroup72 from "../public/images/Mask Group 72.png"
import MaskGroup70 from "../public/images/Mask Group 70.png"


const features = [
  { title: <>Presupuesto <span>claro desde el día uno,<br />cada ahorro, cada sobrecosto.</span></>, image:Group20728 , large: true },
  { title: <>Programa <span>con seguimiento<br />puntual, partida por partida.</span></>, image: Group20730, large: true },
  { title: <>Control <span>para terminar<br />dentro del presupuesto,<br />antes de que termines.</span></>, image: Group20731 },
  { title: <>Requisiciones <span>que no<br />exceden tu presupuesto.</span></>, image: Group20732 },
  { title: <>Bitácora <span>que registra<br />realmente lo que pasó.</span></>, image: Group20733 },
]

const plans = [
  { name: "Starter", price: "$4,500", range: "1-3 proyectos", bullets: ["Presupuesto, Programa, Control", "Requisiciones y Bitácora", "Onboarding guiado · 4 horas", "Soporte general"] },
  { name: "Growth", price: "$6,800", range: "4-10 proyectos", bullets: ["Presupuesto, Programa, Control", "Requisiciones y Bitácora", "Onboarding guiado · 8 horas", "Control Empresarial", "Soporte general"] },
  { name: "Scale", price: "$17,500", range: "11+ proyectos", bullets: ["Presupuesto, Programa, Control", "Requisiciones y Bitácora", "Migración de datos existentes", "Onboarding guiado · ilimitado", "Control Empresarial", "SLA de incidencias críticas <4h"] },
]

function Logo() {
  return <a href="#inicio" className="text-[2rem] font-black leading-none tracking-[-0.08em]" aria-label="Brick, inicio">brick</a>
}

function Header() {
  return (
    <header className="absolute inset-x-0 top-0 z-10">
      <div className="mx-auto flex h-24 w-[calc(100%-2rem)] max-w-[1180px] items-center justify-between md:h-28 md:w-[calc(100%-4rem)]">
        <Logo />
        <div className="flex items-center gap-2.5">
          <Button variant="outline" className="hidden sm:inline-flex" asChild><a href="mailto:hola@brickcontrol.mx">Iniciar sesión</a></Button>
          <DemoForm buttonText="Agendar demo" source="Encabezado" />
        </div>
      </div>
    </header>
  )
}

function Hero() {
  return (
    <section id="inicio" className="overflow-hidden pt-40 md:pt-56">
      <div className="mx-auto w-[calc(100%-2rem)] max-w-[1180px] md:w-[calc(100%-4rem)]">
        <div className="max-w-4xl">
          <h1 data-hero-title className="text-5xl font-medium leading-[0.98] tracking-[-0.065em] sm:text-6xl lg:text-5xl">
            <span className="block overflow-hidden"><span data-title-line className="block">Excel aguanta mucho.</span></span>
            <span className="block overflow-hidden"><span data-title-line className="block text-muted">Menos de lo que crees.</span></span>
          </h1>
          <p data-hero-support className="mt-5 max-w-2xl text-base font-medium text-[#696765]">Presupuesto, programa y control de obra. Todo en un solo lugar.</p>
          <div data-hero-support className="mt-9"><DemoForm source="Sección principal" /></div>
        </div> 
        <Card data-hero-card className="mt-14 border-0 bg-[#F4F2F0] p-3 shadow-none md:mt-14 md:p-14">
          <ImageSlot browser className="aspect-[16/10] min-h-72 md:aspect-[16/8] bg-[#F4F2F0]">
            <img src={HeroDashboard} alt="dashboard principal de Brick" className="w-full h-full object-cover pt-12" />
          </ImageSlot>
        </Card>
      </div>
    </section>
  )
}

function FeatureGrid() {
  return (
    <section id="producto" className="py-14">
      <div className="mx-auto w-[calc(100%-2rem)] max-w-[1180px] md:w-[calc(100%-4rem)]">
        <div data-title-group className="max-w-6xl">
          <h2 data-title-reveal className="text-3xl font-medium leading-[1.08] tracking-[-0.055em] md:text-4xl lg:text-5xl">Saber el estado real de tu obra —presupuesto, incidencias, avance real— depende de que alguien te lo comunique.</h2>
          <p data-title-reveal className="text-3xl font-medium leading-[1.08] tracking-[-0.055em] text-muted md:text-4xl lg:text-5xl">Y depender de la memoria de alguien no es un sistema.</p>
          <DemoForm className="mt-8" source="Sección de producto" />
        </div>
        <div data-card-group="features" className="mt-14 grid grid-cols-1 gap-5 md:grid-cols-6">
          {features.map((feature, index) => (
            <Card data-animate-card key={index} className={`overflow-hidden border border-[#E4E4E4] shadow-sm  bg-soft ${feature.large ? "md:col-span-3" : "md:col-span-2"}`}>
              <CardHeader className="pb-6 md:p-8 md:pb-7">
                <CardTitle className="text-xl sm:text-2xl  [&_span]:font-[450] [&_span]:text-muted">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent className="p-3 pt-0 md:px-7 md:pb-0">
                <img data-card-media src={feature.image} alt={feature.image} />
                {/* <ImageSlot label={feature.image} browser className={feature.large ? "aspect-[5/3]" : "aspect-[4/3]"} /> */}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

function ActionVisual() {
  return (
    <section className="mx-auto w-[calc(100%-2rem)] max-w-[1180px] md:w-[calc(100%-4rem)]">
      <img src={MaskGroup72} alt="Brick en acción" className="w-full h-full object-cover aspect-[4/3] min-h-80 bg-[#dedbd7] md:aspect-[16/8] md:min-h-0 rounded-2xl" />
    </section>
  )
}

function Pricing() {
  return (
    <section id="planes" className="py-14">
      <div className="mx-auto w-[calc(100%-2rem)] max-w-[1180px] md:w-[calc(100%-4rem)]">
        <div data-title-group className="mx-auto max-w-4xl text-center">
          <h2 data-title-reveal className="text-3xl font-medium leading-[1.08] tracking-[-0.055em] md:text-2xl"><strong>brick</strong>, construido por quien construye.</h2>
          <p data-title-reveal className="text-3xl font-medium leading-[1.08] tracking-[-0.055em] text-muted md:text-2xl">Nace dentro de una constructora real, controlando obras de más de $100 M.</p>
        </div>
        <div data-card-group="pricing" className="mt-16 grid gap-5 lg:grid-cols-3">
          {plans.map((plan) => (
            <Card data-animate-card key={plan.name} className="flex min-h-[27rem] flex-col bg-soft border border-[#dedbd7] shadow-sm">
              <CardHeader className="flex-row items-baseline justify-between space-y-0 p-7">
                <CardTitle className="text-2xl">{plan.name}</CardTitle>
                <p className="text-xl font-medium tracking-tight">{plan.price} <span className="text-xs font-normal text-muted">MXN/mes</span></p>
              </CardHeader>
              <Separator />
              <CardContent className="flex-1 p-7">
                <p className="mb-5 text-lg text-muted">{plan.range}</p>
                <ul className="space-y-3 text-sm text-muted">
                  {plan.bullets.map((bullet) => <li key={bullet} className="flex gap-2.5"><span aria-hidden="true" className="mt-2 size-1.5 shrink-0 rounded-full bg-[#dedbd7]" />{bullet}</li>)}
                </ul>
              </CardContent>
              <CardFooter className="p-7 pt-0"><Button variant="outline" className="w-full" asChild><a href="#contacto">Comenzar</a></Button></CardFooter>
            </Card>
          ))}
        </div>
        <p className="mt-5 text-center text-sm text-muted">Si el primer mes no te funciona, te lo regresamos.</p>
      </div>
    </section>
  )
}

function ClosingCards() {
  return (
    <section className="mx-auto w-[calc(100%-2rem)] max-w-[1180px] pb-24 md:w-[calc(100%-4rem)] md:pb-36">
      <div data-card-group="closing" className="grid gap-5 lg:grid-cols-5">
        <Card data-animate-card className="flex min-h-80 flex-col items-center justify-center bg-soft p-7 text-center lg:col-span-2 border border-[#dedbd7] shadow-sm">
          <h2 className="text-2xl font-medium tracking-tight md:text-3xl">Deja de adivinar cómo va tu obra.</h2>
          <p className="mt-2 text-muted">Comienza con un mes de prueba</p>
          <DemoForm className="mt-8" source="Tarjeta de cierre" />
        </Card>
        <Card data-animate-card className="grid min-h-80 overflow-hidden bg-soft sm:grid-cols-2 lg:col-span-3 border border-[#dedbd7] shadow-sm">
          <ImageSlot className="min-h-64 rounded-none border-y-0 border-l-0">
            <img data-card-media src={MaskGroup70} alt="Brick en acción" className="w-full h-full object-cover" />
          </ImageSlot>
          <div className="flex flex-col justify-end p-8 md:p-10">
            <h2 className="text-2xl font-medium tracking-tight md:text-3xl">Así se ve <strong>brick</strong> en acción.</h2>
            <p className="mt-2 text-lg text-muted">Dale clic a lo que quieras.</p>
          </div>
        </Card>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer id="contacto" className="bg-soft">
      <div className="mx-auto flex min-h-[32rem] w-[calc(100%-2rem)] max-w-[1180px] flex-col py-16 md:min-h-[36rem] md:w-[calc(100%-4rem)] md:py-20">
        <div data-title-group>
          <h2 data-title-reveal className="max-w-4xl text-4xl font-medium leading-[1.03] tracking-[-0.055em] md:text-6xl">Deja de adivinar cómo va tu obra.</h2>
          <DemoForm className="mt-8" source="Pie de página" />
          <a href="mailto:hola@brickcontrol.mx" className="mt-5 inline-block text-sm hover:underline">hola@brickcontrol.mx</a>
        </div>
        <div className="mt-auto flex items-end gap-4 pt-20">
          <Logo />
          <p className="pb-0.5 text-sm">Brick Control © 2026</p>
        </div>
      </div>
    </footer>
  )
}

export function App() {
  const root = useRef(null)
  useLandingAnimations(root)

  return (
    <div ref={root} className="min-h-screen min-w-80 bg-white font-sans text-ink antialiased selection:bg-accent selection:text-ink">
      <Header />
      <main>
        <Hero />
        <FeatureGrid />
        <ActionVisual />
        <Pricing />
        <ClosingCards />
      </main>
      <Footer />
    </div>
  )
}
