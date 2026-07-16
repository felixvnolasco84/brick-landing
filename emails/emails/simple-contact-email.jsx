import { Button, Heading, Section, Text } from "react-email"

import { EmailLayout, emailStyles } from "./_components/email-layout.jsx"

const defaultSiteUrl = import.meta.env?.VITE_SITE_URL || "https://brickcontrol.mx"

export function SimpleContactEmail({
  email = "cliente@ejemplo.com",
  name = "Cliente",
  siteUrl = defaultSiteUrl,
} = {}) {
  return (
    <EmailLayout
      preview={`${name}, recibimos tu solicitud de contacto`}
      eyebrow="Solicitud recibida"
    >
      <Heading style={emailStyles.heading}>
        Hola, {name}. <span style={emailStyles.mutedHeading}>Ya lo tenemos.</span>
      </Heading>

      <Text style={emailStyles.text}>
        Recibimos tu solicitud. Nuestro equipo revisará tus datos y se pondrá
        en contacto contigo para definir el siguiente paso.
      </Text>

      <Section style={emailStyles.detailCard}>
        <Text style={emailStyles.detailLabel}>Correo registrado</Text>
        <Text style={emailStyles.detailValue}>{email}</Text>
      </Section>

      <Section style={emailStyles.buttonSection}>
        <Button href={siteUrl} style={emailStyles.button}>
          Conocer Brick →
        </Button>
      </Section>
    </EmailLayout>
  )
}

// Alias conservado para no romper imports existentes del proyecto anterior.
export const EmailTemplateResend = SimpleContactEmail

export default SimpleContactEmail

SimpleContactEmail.PreviewProps = {
  name: "Mariana",
  email: "mariana@ejemplo.com",
}
