import { Heading, Link, Section, Text } from "react-email"

import { EmailLayout, emailStyles } from "./_components/email-layout.jsx"

export function ContactFormEmail({
  name = "",
  email = "cliente@ejemplo.com",
  phoneNumber = "",
  service = "",
  project = "",
  budget = "",
  interest = [],
  source = "Landing page",
  submittedAt = "",
} = {}) {
  const interests = Array.isArray(interest) ? interest : [interest].filter(Boolean)

  return (
    <EmailLayout
      preview={`Nueva solicitud de contacto: ${email}`}
      eyebrow="Nuevo prospecto"
      footer="Notificación interna"
    >
      <Heading style={emailStyles.heading}>
        Hay una nueva obra <span style={emailStyles.mutedHeading}>por conocer.</span>
      </Heading>

      <Text style={emailStyles.text}>
        Se registró una solicitud desde la landing de Brick. Responde directamente
        a este correo para contactar al prospecto.
      </Text>

      <Section style={emailStyles.detailCard}>
        {name ? <Detail label="Nombre" value={name} /> : null}
        <Detail
          label="Correo"
          value={
            <Link href={`mailto:${email}`} style={emailStyles.link}>
              {email}
            </Link>
          }
        />
        {phoneNumber ? <Detail label="Teléfono" value={phoneNumber} /> : null}
        {service ? <Detail label="Servicio" value={service} /> : null}
        {project ? <Detail label="Proyecto" value={project} /> : null}
        {budget ? <Detail label="Presupuesto" value={budget} /> : null}
        {interests.length > 0 ? (
          <Detail label="Intereses" value={interests.join(", ")} />
        ) : null}
        <Detail label="Origen" value={source} last={!submittedAt} />
        {submittedAt ? <Detail label="Fecha" value={submittedAt} last /> : null}
      </Section>
    </EmailLayout>
  )
}

function Detail({ label, value, last = false }) {
  return (
    <Section style={last ? undefined : emailStyles.detailRow}>
      <Text style={emailStyles.detailLabel}>{label}</Text>
      <Text style={emailStyles.detailValue}>{value}</Text>
    </Section>
  )
}

export default ContactFormEmail

ContactFormEmail.PreviewProps = {
  name: "Mariana López",
  email: "mariana@ejemplo.com",
  phoneNumber: "+52 55 1234 5678",
  service: "Control de obra",
  project: "Desarrollo residencial",
  budget: "$10–20 M MXN",
  interest: ["Presupuesto", "Programa", "Requisiciones"],
  source: "Sección principal",
  submittedAt: "15 de julio de 2026, 10:30",
}
