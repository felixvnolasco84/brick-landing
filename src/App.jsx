import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { DemoForm } from "@/components/demo-form"
import { ImageSlot } from "@/components/image-slot"

const features = [
  { title: <>Presupuesto <span>claro desde el día uno,<br />cada ahorro, cada sobrecosto.</span></>, image: "captura del módulo de presupuesto", large: true },
  { title: <>Programa <span>con seguimiento<br />puntual, partida por partida.</span></>, image: "captura del programa de obra", large: true },
  { title: <>Control <span>para terminar<br />dentro del presupuesto,<br />antes de que termines.</span></>, image: "captura del tablero de control" },
  { title: <>Requisiciones <span>que no<br />exceden tu presupuesto.</span></>, image: "captura del módulo de requisiciones" },
  { title: <>Bitácora <span>que registra<br />realmente lo que pasó.</span></>, image: "captura de la bitácora de obra" },
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
      <div className="page-container flex h-24 items-center justify-between md:h-28">
        <Logo />
        <div className="flex items-center gap-2.5">
          <Button variant="outline" className="hidden sm:inline-flex" asChild><a href="mailto:hola@brickcontrol.mx">Iniciar sesión</a></Button>
          <Button asChild><a href="#contacto">Agendar demo</a></Button>
        </div>
      </div>
    </header>
  )
}

function Hero() {
  return (
    <section id="inicio" className="overflow-hidden pt-40 md:pt-56">
      <div className="page-container">
        <div className="max-w-4xl">
          <Badge className="mb-5">Control de obra</Badge>
          <h1 className="display-title">Excel aguanta mucho.<br /><span>Menos de lo que crees.</span></h1>
          <p className="mt-5 max-w-2xl text-base text-muted md:text-xl">Presupuesto, programa y control de obra. Todo en un solo lugar.</p>
          <DemoForm className="mt-9" />
        </div>
        <Card className="mt-20 border-0 bg-soft p-3 shadow-none md:mt-24 md:p-14">
          <ImageSlot label="dashboard principal de Brick" browser className="aspect-[16/10] min-h-72 md:aspect-[16/8]" />
        </Card>
      </div>
    </section>
  )
}

function FeatureGrid() {
  return (
    <section id="producto" className="section-space">
      <div className="page-container">
        <div className="max-w-4xl">
          <h2 className="section-heading">Saber el estado real de tu obra —presupuesto, incidencias, avance real— depende de que alguien te lo comunique.</h2>
          <p className="section-heading text-muted">Y depender de la memoria de alguien no es un sistema.</p>
          <DemoForm className="mt-8" />
        </div>
        <div className="mt-20 grid grid-cols-1 gap-5 md:grid-cols-6">
          {features.map((feature, index) => (
            <Card key={index} className={`overflow-hidden bg-soft ${feature.large ? "md:col-span-3" : "md:col-span-2"}`}>
              <CardHeader className="pb-6 md:p-8 md:pb-7">
                <CardTitle className="feature-title">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent className="p-3 pt-0 md:px-7 md:pb-0">
                <ImageSlot label={feature.image} browser className={feature.large ? "aspect-[5/3]" : "aspect-[4/3]"} />
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
    <section className="page-container pb-8 md:pb-16">
      <ImageSlot label="fotografía de Brick en acción" className="aspect-[4/3] min-h-80 bg-[#dedbd7] md:aspect-[16/8] md:min-h-0">
        <p className="text-2xl font-medium tracking-tight md:text-4xl">Así se ve <strong>brick</strong><br />en acción.</p>
      </ImageSlot>
    </section>
  )
}

function Pricing() {
  return (
    <section id="planes" className="section-space">
      <div className="page-container">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="section-heading"><strong>brick</strong>, construido por quien construye.</h2>
          <p className="section-heading text-muted">Nace dentro de una constructora real, controlando obras de más de $100 M.</p>
        </div>
        <div className="mt-16 grid gap-5 lg:grid-cols-3">
          {plans.map((plan) => (
            <Card key={plan.name} className="flex min-h-[27rem] flex-col bg-soft">
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
    <section className="page-container pb-24 md:pb-36">
      <div className="grid gap-5 lg:grid-cols-5">
        <Card className="flex min-h-80 flex-col items-center justify-center bg-soft p-7 text-center lg:col-span-2">
          <h2 className="text-2xl font-medium tracking-tight md:text-3xl">Deja de adivinar cómo va tu obra.</h2>
          <p className="mt-2 text-muted">Comienza con un mes de prueba</p>
          <DemoForm className="mt-8" />
        </Card>
        <Card className="grid min-h-80 overflow-hidden bg-soft sm:grid-cols-2 lg:col-span-3">
          <ImageSlot label="demo interactiva de Brick" className="min-h-64 rounded-none border-y-0 border-l-0" />
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
      <div className="page-container flex min-h-[32rem] flex-col py-16 md:min-h-[36rem] md:py-20">
        <div>
          <h2 className="max-w-4xl text-4xl font-medium leading-[1.03] tracking-[-0.055em] md:text-6xl">Deja de adivinar cómo va tu obra.</h2>
          <DemoForm className="mt-8" />
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
  return (
    <div className="min-h-screen bg-white text-ink">
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
