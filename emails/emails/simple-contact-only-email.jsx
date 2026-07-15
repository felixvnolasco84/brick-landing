import {
  Body,
  Button,
  Container,
  Head,
  Html,
  Img,
  Preview,
  Section,
  Text,
} from "react-email"

const siteUrl = import.meta.env?.VITE_SITE_URL || "https://brickcontrol.mx"

export function SimpleContactOnlyEmail({
  email = "cliente@ejemplo.com",
  logoUrl = "",
} = {}) {
  return (
    <Html lang="es">
      <Head />
      <Preview>Recibimos tu solicitud de contacto</Preview>
      <Body style={main}>
        <Container style={container}>
          {logoUrl ? (
            <Img src={logoUrl} width="40" height="40" alt="Brick Control" />
          ) : (
            <Text style={wordmark}>brick</Text>
          )}

          <Text style={title}>
            <strong>Confirmación de contacto</strong>
          </Text>

          <Section style={section}>
            <Text style={text}>Hola.</Text>
            <Text style={text}>
              Recibimos tu solicitud y nos pondremos en contacto contigo pronto.
            </Text>
            <Text style={text}>Correo: {email}</Text>

            <Button href={siteUrl} style={button}>
              Visitar Brick
            </Button>
          </Section>

          <Text style={footer}>Brick Control</Text>
        </Container>
      </Body>
    </Html>
  )
}

export default SimpleContactOnlyEmail

SimpleContactOnlyEmail.PreviewProps = {
  email: "mariana@ejemplo.com",
}

const main = {
  backgroundColor: "#F4F2F0",
  color: "#0B0A08",
  fontFamily: "Inter, Arial, sans-serif",
}

const container = {
  maxWidth: "480px",
  margin: "0 auto",
  padding: "40px 24px 48px",
}

const title = { fontSize: "24px", lineHeight: 1.25 }

const wordmark = { margin: "0 0 24px", fontSize: "28px", fontWeight: "700" }

const section = {
  padding: "24px",
  border: "solid 1px #E5E2DF",
  borderRadius: "16px",
  backgroundColor: "#ffffff",
  textAlign: "center",
}

const text = { margin: "0 0 12px", textAlign: "left", lineHeight: "22px" }

const button = {
  marginTop: "12px",
  padding: "12px 18px",
  borderRadius: "999px",
  backgroundColor: "#E7F256",
  color: "#0B0A08",
  fontSize: "14px",
  fontWeight: "600",
  textDecoration: "none",
}

const footer = {
  marginTop: "40px",
  color: "#696765",
  fontSize: "12px",
  textAlign: "center",
}
