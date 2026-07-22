# Configuración de suscripciones con Stripe

La landing usa Stripe Checkout alojado. El cliente envía únicamente el identificador interno del plan (`starter`, `growth` o `scale`); el servidor elige el Price de Stripe y valida que sea recurrente y esté activo.

## Seguridad primero

1. Revoca cualquier clave secreta que se haya compartido por chat, correo o captura.
2. Crea una clave de **prueba** nueva y configura primero el flujo en modo test.
3. Guarda las claves solo como variables de entorno del proveedor de hosting. No las agregues al repositorio ni uses el prefijo `VITE_` para secretos.
4. La clave publicable no es necesaria para este flujo porque Stripe hospeda la pantalla de Checkout.

## Variables requeridas

Copia los nombres documentados en `.env.example` a tu entorno local o al hosting:

- `STRIPE_SECRET_KEY`
- `STRIPE_WEBHOOK_SECRET`
- `STRIPE_PRICE_STARTER`
- `STRIPE_PRICE_GROWTH`
- `STRIPE_PRICE_SCALE`
- `PUBLIC_SITE_URL`

Los tres valores `STRIPE_PRICE_*` deben ser IDs `price_...` recurrentes. Los importes mostrados en la landing deben coincidir con esos Prices.

## Endpoint de webhook

Registra esta URL en Stripe Workbench:

```text
https://brickcontrol.mx/api/stripe/webhook
```

Suscribe el endpoint a estos eventos:

- `checkout.session.completed`
- `customer.subscription.created`
- `customer.subscription.updated`
- `customer.subscription.deleted`
- `invoice.paid`
- `invoice.payment_failed`

Stripe entrega un secreto `whsec_...` específico para ese endpoint. No reutilices el secreto generado por Stripe CLI en producción.

## Siguiente integración de producto

El webhook ya verifica la firma y clasifica los eventos, pero todavía no persiste el estado de la suscripción porque este repositorio no incluye una base de datos ni autenticación. Antes de conceder acceso al producto, conecta los eventos a una tabla de clientes/suscripciones y usa `invoice.paid` o un estado `active`/`trialing` como fuente de verdad. La página de éxito no debe conceder permisos por sí sola.
