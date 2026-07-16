import { jsx, jsxs } from "react/jsx-runtime";
import {
  Body,
  Column,
  Container,
  Head,
  Hr,
  Html,
  Preview,
  Row,
  Section,
  Text
} from "react-email";
function EmailLayout({
  preview,
  eyebrow,
  children,
  footer = "Presupuesto, programa y control de obra."
}) {
  return /* @__PURE__ */ jsxs(Html, { lang: "es", children: [
    /* @__PURE__ */ jsx(Head, {}),
    /* @__PURE__ */ jsx(Preview, { children: preview }),
    /* @__PURE__ */ jsx(Body, { style: emailStyles.body, children: /* @__PURE__ */ jsxs(Container, { style: emailStyles.container, children: [
      /* @__PURE__ */ jsx(Section, { style: emailStyles.header, children: /* @__PURE__ */ jsxs(Row, { children: [
        /* @__PURE__ */ jsx(Column, { children: /* @__PURE__ */ jsx(Text, { style: emailStyles.wordmark, children: "brick" }) }),
        /* @__PURE__ */ jsx(Column, { align: "right", children: /* @__PURE__ */ jsx(Text, { style: emailStyles.brandDescriptor, children: "CONTROL DE OBRA" }) })
      ] }) }),
      /* @__PURE__ */ jsxs(Section, { style: emailStyles.card, children: [
        /* @__PURE__ */ jsx(Section, { style: emailStyles.accentLine }),
        /* @__PURE__ */ jsxs(Section, { style: emailStyles.cardContent, children: [
          /* @__PURE__ */ jsxs(Text, { style: emailStyles.eyebrow, children: [
            /* @__PURE__ */ jsx("span", { style: emailStyles.eyebrowRule, children: "\u2014\u2014" }),
            " ",
            eyebrow
          ] }),
          children
        ] })
      ] }),
      /* @__PURE__ */ jsx(Hr, { style: emailStyles.footerRule }),
      /* @__PURE__ */ jsxs(Row, { children: [
        /* @__PURE__ */ jsx(Column, { children: /* @__PURE__ */ jsx(Text, { style: emailStyles.footerText, children: "Brick Control \xA9 2026" }) }),
        /* @__PURE__ */ jsx(Column, { align: "right", children: /* @__PURE__ */ jsx(Text, { style: emailStyles.footerText, children: footer }) })
      ] })
    ] }) })
  ] });
}
const emailStyles = {
  body: {
    margin: 0,
    backgroundColor: "#F4F2F0",
    backgroundImage: "linear-gradient(rgba(11,10,8,0.035) 1px, transparent 1px), linear-gradient(90deg, rgba(11,10,8,0.035) 1px, transparent 1px)",
    backgroundSize: "32px 32px",
    color: "#0B0A08",
    fontFamily: "Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, sans-serif"
  },
  container: {
    width: "100%",
    maxWidth: "600px",
    margin: "0 auto",
    padding: "40px 20px 32px"
  },
  header: { padding: "0 4px 22px" },
  wordmark: {
    margin: 0,
    color: "#0B0A08",
    fontSize: "30px",
    fontWeight: "800",
    letterSpacing: "-2px",
    lineHeight: "32px"
  },
  brandDescriptor: {
    margin: 0,
    color: "#696765",
    fontSize: "10px",
    fontWeight: "600",
    letterSpacing: "2px",
    lineHeight: "32px"
  },
  card: {
    overflow: "hidden",
    border: "1px solid #DAD7D3",
    borderRadius: "18px",
    backgroundColor: "#FFFFFF",
    boxShadow: "8px 8px 0 rgba(11,10,8,0.05)"
  },
  accentLine: { height: "5px", backgroundColor: "#E7F256" },
  cardContent: { padding: "38px 40px 40px" },
  eyebrow: {
    margin: "0 0 24px",
    color: "#696765",
    fontSize: "10px",
    fontWeight: "700",
    letterSpacing: "2px",
    textTransform: "uppercase"
  },
  eyebrowRule: { color: "#0B0A08", letterSpacing: "-2px" },
  heading: {
    margin: "0 0 24px",
    color: "#0B0A08",
    fontSize: "38px",
    fontWeight: "500",
    letterSpacing: "-1.6px",
    lineHeight: "42px"
  },
  mutedHeading: { color: "#8A8783" },
  text: {
    margin: "0 0 16px",
    color: "#565350",
    fontSize: "15px",
    fontWeight: "400",
    lineHeight: "25px"
  },
  detailCard: {
    margin: "28px 0",
    padding: "22px 24px",
    border: "1px solid #E2DFDC",
    borderRadius: "12px",
    backgroundColor: "#F7F7F5"
  },
  detailLabel: {
    margin: "0 0 6px",
    color: "#8A8783",
    fontSize: "10px",
    fontWeight: "700",
    letterSpacing: "1.4px",
    textTransform: "uppercase"
  },
  detailValue: {
    margin: 0,
    color: "#0B0A08",
    fontSize: "15px",
    lineHeight: "22px"
  },
  detailRow: { marginBottom: "18px" },
  buttonSection: { margin: "30px 0 6px" },
  button: {
    display: "inline-block",
    padding: "13px 22px",
    borderRadius: "8px",
    backgroundColor: "#0B0A08",
    color: "#FFFFFF",
    fontSize: "14px",
    fontWeight: "600",
    textDecoration: "none"
  },
  statusRow: { marginTop: "22px" },
  statusBarMuted: {
    display: "inline-block",
    width: "30%",
    height: "4px",
    marginRight: "5%",
    backgroundColor: "#DEDCD8"
  },
  statusBarActive: {
    display: "inline-block",
    width: "30%",
    height: "4px",
    marginRight: "5%",
    backgroundColor: "#0B0A08"
  },
  statusBarLast: {
    display: "inline-block",
    width: "30%",
    height: "4px",
    backgroundColor: "#DEDCD8"
  },
  note: {
    margin: "24px 0 0",
    color: "#8A8783",
    fontSize: "12px",
    lineHeight: "19px"
  },
  link: { color: "#0B0A08", textDecoration: "underline" },
  footerRule: { margin: "30px 4px 16px", borderColor: "#DAD7D3" },
  footerText: {
    margin: 0,
    color: "#8A8783",
    fontSize: "10px",
    lineHeight: "16px"
  }
};
export {
  EmailLayout,
  emailStyles
};
