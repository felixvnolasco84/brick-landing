import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Section,
  Text,
} from "react-email"

export function ContactFormEmail({
  name = "",
  email = "",
  phoneNumber = "",
  service = "",
  project = "",
  budget = "",
  interest = [],
} = {}) {
  const interests = Array.isArray(interest) ? interest : [interest].filter(Boolean)

  return (
    <Html lang="es">
      <Head />
      <Preview>Nueva solicitud de contacto de {name}</Preview>
      <Body style={styles.body}>
        <Container style={styles.container}>
          <Text style={styles.wordmark}>brick</Text>
          <Heading style={styles.heading}>Nuevo contacto</Heading>

          <Section style={styles.section}>
            <Text style={styles.text}>
              <strong>Nombre:</strong> {name}
            </Text>
            <Text style={styles.text}>
              <strong>Correo:</strong> {email}
            </Text>
            <Text style={styles.text}>
              <strong>Teléfono:</strong> {phoneNumber}
            </Text>
            <Text style={styles.text}>
              <strong>Servicio:</strong> {service}
            </Text>
            <Text style={styles.text}>
              <strong>Proyecto:</strong> {project}
            </Text>
            <Text style={styles.text}>
              <strong>Presupuesto:</strong> {budget}
            </Text>
            <Text style={styles.text}>
              <strong>Intereses:</strong>{" "}
              {interests.length > 0 ? interests.join(", ") : "Sin especificar"}
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
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
}

const styles = {
  body: {
    margin: 0,
    backgroundColor: "#F4F2F0",
    color: "#0B0A08",
    fontFamily: "Inter, Arial, sans-serif",
  },
  container: { maxWidth: "520px", margin: "0 auto", padding: "40px 24px" },
  wordmark: { margin: "0 0 28px", fontSize: "28px", fontWeight: "700" },
  heading: { margin: "0 0 24px", fontSize: "28px", lineHeight: "1.15" },
  section: {
    padding: "24px",
    border: "1px solid #E5E2DF",
    borderRadius: "16px",
    backgroundColor: "#ffffff",
  },
  text: { margin: "0 0 12px", fontSize: "14px", lineHeight: "22px" },
}
