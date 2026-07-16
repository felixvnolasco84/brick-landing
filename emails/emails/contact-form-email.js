import { jsx, jsxs } from "react/jsx-runtime";
import { Heading, Link, Section, Text } from "react-email";
import { EmailLayout, emailStyles } from "./_components/email-layout.js";
function ContactFormEmail({
  name = "",
  email = "cliente@ejemplo.com",
  phoneNumber = "",
  service = "",
  project = "",
  budget = "",
  interest = [],
  source = "Landing page",
  submittedAt = ""
} = {}) {
  const interests = Array.isArray(interest) ? interest : [interest].filter(Boolean);
  return /* @__PURE__ */ jsxs(
    EmailLayout,
    {
      preview: `Nueva solicitud de contacto: ${email}`,
      eyebrow: "Nuevo prospecto",
      footer: "Notificaci\xF3n interna",
      children: [
        /* @__PURE__ */ jsxs(Heading, { style: emailStyles.heading, children: [
          "Hay una nueva obra ",
          /* @__PURE__ */ jsx("span", { style: emailStyles.mutedHeading, children: "por conocer." })
        ] }),
        /* @__PURE__ */ jsx(Text, { style: emailStyles.text, children: "Se registr\xF3 una solicitud desde la landing de Brick. Responde directamente a este correo para contactar al prospecto." }),
        /* @__PURE__ */ jsxs(Section, { style: emailStyles.detailCard, children: [
          name ? /* @__PURE__ */ jsx(Detail, { label: "Nombre", value: name }) : null,
          /* @__PURE__ */ jsx(
            Detail,
            {
              label: "Correo",
              value: /* @__PURE__ */ jsx(Link, { href: `mailto:${email}`, style: emailStyles.link, children: email })
            }
          ),
          phoneNumber ? /* @__PURE__ */ jsx(Detail, { label: "Tel\xE9fono", value: phoneNumber }) : null,
          service ? /* @__PURE__ */ jsx(Detail, { label: "Servicio", value: service }) : null,
          project ? /* @__PURE__ */ jsx(Detail, { label: "Proyecto", value: project }) : null,
          budget ? /* @__PURE__ */ jsx(Detail, { label: "Presupuesto", value: budget }) : null,
          interests.length > 0 ? /* @__PURE__ */ jsx(Detail, { label: "Intereses", value: interests.join(", ") }) : null,
          /* @__PURE__ */ jsx(Detail, { label: "Origen", value: source, last: !submittedAt }),
          submittedAt ? /* @__PURE__ */ jsx(Detail, { label: "Fecha", value: submittedAt, last: true }) : null
        ] })
      ]
    }
  );
}
function Detail({ label, value, last = false }) {
  return /* @__PURE__ */ jsxs(Section, { style: last ? void 0 : emailStyles.detailRow, children: [
    /* @__PURE__ */ jsx(Text, { style: emailStyles.detailLabel, children: label }),
    /* @__PURE__ */ jsx(Text, { style: emailStyles.detailValue, children: value })
  ] });
}
var contact_form_email_default = ContactFormEmail;
ContactFormEmail.PreviewProps = {
  name: "Mariana L\xF3pez",
  email: "mariana@ejemplo.com",
  phoneNumber: "+52 55 1234 5678",
  service: "Control de obra",
  project: "Desarrollo residencial",
  budget: "$10\u201320 M MXN",
  interest: ["Presupuesto", "Programa", "Requisiciones"],
  source: "Secci\xF3n principal",
  submittedAt: "15 de julio de 2026, 10:30"
};
export {
  ContactFormEmail,
  contact_form_email_default as default
};
