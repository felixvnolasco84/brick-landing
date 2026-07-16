import { jsx, jsxs } from "react/jsx-runtime";
import { Button, Heading, Section, Text } from "react-email";
import { EmailLayout, emailStyles } from "./_components/email-layout.js";
const defaultSiteUrl = import.meta.env?.VITE_SITE_URL || "https://brickcontrol.mx";
function SimpleContactOnlyEmail({
  email = "cliente@ejemplo.com",
  siteUrl = defaultSiteUrl
} = {}) {
  return /* @__PURE__ */ jsxs(
    EmailLayout,
    {
      preview: "Recibimos tu solicitud de demo en Brick",
      eyebrow: "Solicitud recibida",
      children: [
        /* @__PURE__ */ jsxs(Heading, { style: emailStyles.heading, children: [
          "Tu demo ya est\xE1 ",
          /* @__PURE__ */ jsx("span", { style: emailStyles.mutedHeading, children: "en el plano." })
        ] }),
        /* @__PURE__ */ jsx(Text, { style: emailStyles.text, children: "Gracias por contactarnos. Ya tenemos tus datos y alguien de nuestro equipo te escribir\xE1 para conocer tu operaci\xF3n y coordinar la demo." }),
        /* @__PURE__ */ jsxs(Section, { style: emailStyles.detailCard, children: [
          /* @__PURE__ */ jsx(Text, { style: emailStyles.detailLabel, children: "Correo registrado" }),
          /* @__PURE__ */ jsx(Text, { style: emailStyles.detailValue, children: email }),
          /* @__PURE__ */ jsxs(Section, { style: emailStyles.statusRow, children: [
            /* @__PURE__ */ jsx("span", { style: emailStyles.statusBarMuted }),
            /* @__PURE__ */ jsx("span", { style: emailStyles.statusBarActive }),
            /* @__PURE__ */ jsx("span", { style: emailStyles.statusBarLast })
          ] })
        ] }),
        /* @__PURE__ */ jsx(Section, { style: emailStyles.buttonSection, children: /* @__PURE__ */ jsx(Button, { href: siteUrl, style: emailStyles.button, children: "Volver a Brick \u2192" }) }),
        /* @__PURE__ */ jsx(Text, { style: emailStyles.note, children: "Si no realizaste esta solicitud, puedes ignorar este correo." })
      ]
    }
  );
}
var simple_contact_only_email_default = SimpleContactOnlyEmail;
SimpleContactOnlyEmail.PreviewProps = {
  email: "mariana@ejemplo.com"
};
export {
  SimpleContactOnlyEmail,
  simple_contact_only_email_default as default
};
