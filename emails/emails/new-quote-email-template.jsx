import { Button, Heading, Link, Section, Text } from "react-email"

import { EmailLayout, emailStyles } from "./_components/email-layout.jsx"

const defaultSiteUrl = import.meta.env?.VITE_SITE_URL || "https://brickcontrol.mx"

export function NewQuoteEmailTemplate({
  name = "Cliente",
  email = "cliente@ejemplo.com",
  companyName = "Brick Control",
  contactUrl = defaultSiteUrl,
} = {}) {
  return (
    <EmailLayout
      preview={`Recibimos tu solicitud en ${companyName}`}
      eyebrow="Solicitud de cotización"
    >
      <Heading style={emailStyles.heading}>
        Tu solicitud ya está <span style={emailStyles.mutedHeading}>sobre la mesa.</span>
      </Heading>

      <Text style={emailStyles.text}>Hola, {name}.</Text>
      <Text style={emailStyles.text}>
        Recibimos tu solicitud con el correo{" "}
        <Link href={`mailto:${email}`} style={emailStyles.link}>
          {email}
        </Link>
        . Revisaremos la información y te contactaremos para preparar el siguiente paso.
      </Text>

      <Section style={emailStyles.buttonSection}>
        <Button href={contactUrl} style={emailStyles.button}>
          Conocer Brick →
        </Button>
      </Section>
    </EmailLayout>
  )
}

export default NewQuoteEmailTemplate

NewQuoteEmailTemplate.PreviewProps = {
  name: "Mariana",
  email: "mariana@ejemplo.com",
}
