import { Button, Heading, Section, Text } from "react-email"

import { EmailLayout, emailStyles } from "./_components/email-layout.jsx"

const defaultSiteUrl = import.meta.env?.VITE_SITE_URL || "https://brickcontrol.mx"

export function SimpleContactOnlyEmail({
  email = "cliente@ejemplo.com",
  siteUrl = defaultSiteUrl,
} = {}) {
  return (
    <EmailLayout
      preview="Recibimos tu solicitud de demo en Brick"
      eyebrow="Solicitud recibida"
    >
      <Heading style={emailStyles.heading}>
        Tu demo ya está <span style={emailStyles.mutedHeading}>en el plano.</span>
      </Heading>

      <Text style={emailStyles.text}>
        Gracias por contactarnos. Ya tenemos tus datos y alguien de nuestro
        equipo te escribirá para conocer tu operación y coordinar la demo.
      </Text>

      <Section style={emailStyles.detailCard}>
        <Text style={emailStyles.detailLabel}>Correo registrado</Text>
        <Text style={emailStyles.detailValue}>{email}</Text>
        <Section style={emailStyles.statusRow}>
          <span style={emailStyles.statusBarMuted} />
          <span style={emailStyles.statusBarActive} />
          <span style={emailStyles.statusBarLast} />
        </Section>
      </Section>

      <Section style={emailStyles.buttonSection}>
        <Button href={siteUrl} style={emailStyles.button}>
          Volver a Brick →
        </Button>
      </Section>

      <Text style={emailStyles.note}>
        Si no realizaste esta solicitud, puedes ignorar este correo.
      </Text>
    </EmailLayout>
  )
}

export default SimpleContactOnlyEmail

SimpleContactOnlyEmail.PreviewProps = {
  email: "mariana@ejemplo.com",
}
