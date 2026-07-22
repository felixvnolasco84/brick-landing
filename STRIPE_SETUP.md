# Handoff de suscripciones al dashboard

La landing no crea sesiones ni procesa webhooks de Stripe. Su única responsabilidad es presentar los planes y enviar al usuario al dashboard autenticado:

```text
${VITE_APP_URL}/start?plan=starter
${VITE_APP_URL}/start?plan=growth
${VITE_APP_URL}/start?plan=scale
```

## Variable requerida

Configura en la landing:

```text
VITE_APP_URL=https://www.brick.lat/
```

Es una URL pública de frontend. La landing no debe contener `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET`, Price IDs ni el SDK de Stripe.

## Retiro del flujo anterior

Las rutas antiguas permanecen como tombstones y responden `HTTP 410 Gone`:

```text
/api/stripe/create-checkout-session
/api/stripe/webhook
```

Esto impide que un bundle anterior cree Checkout anónimo durante la transición. Antes de desplegar la landing:

1. Despliega el dashboard y su endpoint Convex `/stripe/webhook`.
2. Registra y verifica el destino nuevo en Stripe Sandbox.
3. Elimina o desactiva en Stripe el destino anterior de `brickcontrol.mx`.
4. Despliega esta landing y confirma que cada plan abre el dashboard con el parámetro correcto.

La activación, el trial de 30 días, la asociación con Clerk, los límites por organización, la gracia de pago y el Customer Portal viven exclusivamente en el proyecto del dashboard.

## Archivos para trasladar al repositorio original

Copia o sobrescribe:

```text
.env.example
STRIPE_SETUP.md
api/stripe/create-checkout-session.js
api/stripe/webhook.js
package.json
package-lock.json
scripts/test-subscription-handoff.mjs
src/App.jsx
src/components/subscription-button.jsx
src/lib/app-url.js
vite.config.js
```

Elimina en el repositorio original:

```text
src/components/checkout-notice.jsx
```

No traslades `.env.local`, `.git`, `node_modules` ni `dist`. Después de copiar:

```bash
npm install
npm run test:handoff
npm run build
```
