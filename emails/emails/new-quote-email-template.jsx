import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Text,
} from "react-email"

const siteUrl = import.meta.env?.VITE_SITE_URL || "https://brickcontrol.mx"

export function NewQuoteEmailTemplate({
  name = "Cliente",
  email = "cliente@ejemplo.com",
  companyName = "Brick Control",
  logoUrl = "",
  contactUrl = siteUrl,
} = {}) {
  return (
    <Html lang="es">
      <Head />
      <Preview>Recibimos tu solicitud en {companyName}</Preview>
      <Body style={styles.body}>
        <Container style={styles.container}>
          <Section style={styles.logoSection}>
            {logoUrl ? (
              <Img
                src={logoUrl}
                width="40"
                height="40"
                alt={companyName}
                style={styles.logo}
              />
            ) : (
              <Text style={styles.wordmark}>brick</Text>
            )}
          </Section>

          <Heading style={styles.heading}>
            Gracias por ponerte en contacto
          </Heading>

          <Text style={styles.text}>Hola, {name}.</Text>
          <Text style={styles.text}>
            Recibimos tu solicitud con el correo{" "}
            <Link href={`mailto:${email}`} style={styles.link}>
              {email}
            </Link>
            . Muy pronto alguien de nuestro equipo se pondrá en contacto contigo.
          </Text>

          <Section style={styles.buttonSection}>
            <Button href={contactUrl} style={styles.button}>
              Conocer Brick
            </Button>
          </Section>

          <Hr style={styles.divider} />
          <Text style={styles.footer}>
            Si no realizaste esta solicitud, puedes ignorar este correo.
          </Text>
        </Container>
      </Body>
    </Html>
  )
}

export default NewQuoteEmailTemplate

NewQuoteEmailTemplate.PreviewProps = {
  name: "Mariana",
  email: "mariana@ejemplo.com",
}

const styles = {
  body: {
    margin: 0,
    backgroundColor: "#F4F2F0",
    color: "#0B0A08",
    fontFamily: "Inter, Arial, sans-serif",
  },
  container: {
    width: "100%",
    maxWidth: "520px",
    margin: "40px auto",
    padding: "32px",
    borderRadius: "20px",
    backgroundColor: "#ffffff",
  },
  logoSection: { marginBottom: "28px" },
  logo: { display: "block" },
  wordmark: { margin: 0, fontSize: "28px", fontWeight: "700" },
  heading: {
    margin: "0 0 24px",
    fontSize: "28px",
    fontWeight: "600",
    lineHeight: "1.15",
  },
  text: { margin: "0 0 16px", fontSize: "15px", lineHeight: "24px" },
  link: { color: "#0B0A08", textDecoration: "underline" },
  buttonSection: { margin: "28px 0", textAlign: "center" },
  button: {
    padding: "12px 20px",
    borderRadius: "999px",
    backgroundColor: "#E7F256",
    color: "#0B0A08",
    fontSize: "14px",
    fontWeight: "600",
    textDecoration: "none",
  },
  divider: { margin: "28px 0", borderColor: "#E5E2DF" },
  footer: { margin: 0, color: "#696765", fontSize: "12px", lineHeight: "20px" },
}
