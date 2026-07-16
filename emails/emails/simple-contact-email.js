import { jsx, jsxs } from "react/jsx-runtime";
import { Button, Heading, Section, Text } from "react-email";
import { EmailLayout, emailStyles } from "./_components/email-layout.js";
const defaultSiteUrl = import.meta.env?.VITE_SITE_URL || "https://brickcontrol.mx";
function SimpleContactEmail({
  email = "cliente@ejemplo.com",
  name = "Cliente",
  siteUrl = defaultSiteUrl
} = {}) {
  return /* @__PURE__ */ jsxs(
    EmailLayout,
    {
      preview: `${name}, recibimos tu solicitud de contacto`,
      eyebrow: "Solicitud recibida",
      children: [
        /* @__PURE__ */ jsxs(Heading, { style: emailStyles.heading, children: [
          "Hola, ",
          name,
          ". ",
          /* @__PURE__ */ jsx("span", { style: emailStyles.mutedHeading, children: "Ya lo tenemos." })
        ] }),
        /* @__PURE__ */ jsx(Text, { style: emailStyles.text, children: "Recibimos tu solicitud. Nuestro equipo revisar\xE1 tus datos y se pondr\xE1 en contacto contigo para definir el siguiente paso." }),
        /* @__PURE__ */ jsxs(Section, { style: emailStyles.detailCard, children: [
          /* @__PURE__ */ jsx(Text, { style: emailStyles.detailLabel, children: "Correo registrado" }),
          /* @__PURE__ */ jsx(Text, { style: emailStyles.detailValue, children: email })
        ] }),
        /* @__PURE__ */ jsx(Section, { style: emailStyles.buttonSection, children: /* @__PURE__ */ jsx(Button, { href: siteUrl, style: emailStyles.button, children: "Conocer Brick \u2192" }) })
      ]
    }
  );
}
const EmailTemplateResend = SimpleContactEmail;
var simple_contact_email_default = SimpleContactEmail;
SimpleContactEmail.PreviewProps = {
  name: "Mariana",
  email: "mariana@ejemplo.com"
};
export {
  EmailTemplateResend,
  SimpleContactEmail,
  simple_contact_email_default as default
};
