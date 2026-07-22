import assert from "node:assert/strict"
import fs from "node:fs"

import { POST as retiredCheckout } from "../api/stripe/create-checkout-session.js"
import { POST as retiredWebhook } from "../api/stripe/webhook.js"

const read = (path) => fs.readFileSync(new URL(`../${path}`, import.meta.url), "utf8")
const packageJson = JSON.parse(read("package.json"))
const subscriptionButton = read("src/components/subscription-button.jsx")
const app = read("src/App.jsx")
const envExample = read(".env.example")

assert.equal(packageJson.dependencies?.stripe, undefined)
assert.match(subscriptionButton, /createAppUrl\("\/start", \{ plan \}\)/)
assert.doesNotMatch(subscriptionButton, /fetch\(|create-checkout-session/)
assert.match(app, /createAppUrl\("\/sign-in"\)/)
assert.match(app, /11-20 proyectos/)
assert.match(app, /30 días de prueba gratuita/)
assert.match(envExample, /VITE_APP_URL=https:\/\/www\.brick\.lat\//)
assert.doesNotMatch(envExample, /STRIPE_/)
assert.equal(retiredCheckout().status, 410)
assert.equal(retiredWebhook().status, 410)

console.log("Subscription handoff passed: dashboard links, plan copy, retired endpoints, and no Stripe SDK.")
