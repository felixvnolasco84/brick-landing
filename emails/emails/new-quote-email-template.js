import { jsx, jsxs } from "react/jsx-runtime";
import { Button, Heading, Link, Section, Text } from "react-email";
import { EmailLayout, emailStyles } from "./_components/email-layout.js";
const defaultSiteUrl = import.meta.env?.VITE_SITE_URL || "https://brickcontrol.mx";
function NewQuoteEmailTemplate({
  name = "Cliente",
  email = "cliente@ejemplo.com",
  companyName = "Brick Control",
  contactUrl = defaultSiteUrl
} = {}) {
  return /* @__PURE__ */ jsxs(
    EmailLayout,
    {
      preview: `Recibimos tu solicitud en ${companyName}`,
      eyebrow: "Solicitud de cotizaci\xF3n",
      children: [
        /* @__PURE__ */ jsxs(Heading, { style: emailStyles.heading, children: [
          "Tu solicitud ya est\xE1 ",
          /* @__PURE__ */ jsx("span", { style: emailStyles.mutedHeading, children: "sobre la mesa." })
        ] }),
        /* @__PURE__ */ jsxs(Text, { style: emailStyles.text, children: [
          "Hola, ",
          name,
          "."
        ] }),
        /* @__PURE__ */ jsxs(Text, { style: emailStyles.text, children: [
          "Recibimos tu solicitud con el correo",
          " ",
          /* @__PURE__ */ jsx(Link, { href: `mailto:${email}`, style: emailStyles.link, children: email }),
          ". Revisaremos la informaci\xF3n y te contactaremos para preparar el siguiente paso."
        ] }),
        /* @__PURE__ */ jsx(Section, { style: emailStyles.buttonSection, children: /* @__PURE__ */ jsx(Button, { href: contactUrl, style: emailStyles.button, children: "Conocer Brick \u2192" }) })
      ]
    }
  );
}
var new_quote_email_template_default = NewQuoteEmailTemplate;
NewQuoteEmailTemplate.PreviewProps = {
  name: "Mariana",
  email: "mariana@ejemplo.com"
};
export {
  NewQuoteEmailTemplate,
  new_quote_email_template_default as default
};
