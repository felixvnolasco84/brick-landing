# Plantillas de correo

Estas plantillas son componentes React compatibles con el proyecto Vite y no
dependen de rutas, esquemas ni variables de entorno de Next.js.

## Previsualización

```bash
npm run email:dev
```

La galería se abre en `http://localhost:3001`. Para comprobar el build sin
iniciar el servidor:

```bash
npm run email:build
```

Las plantillas se pueden importar desde `emails/index.js`. Incluyen datos de
ejemplo mediante `PreviewProps`, pero al enviarlas se deben pasar los datos
reales como props.

## Resend y Vercel

El endpoint `api/contact.js` funciona como Vercel Function. Valida el formulario
y utiliza Resend para enviar en un solo lote:

1. Una notificación interna a `CONTACT_TO_EMAIL`.
2. Una confirmación al correo ingresado por el prospecto.

Copia `.env.example` como `.env.local` para desarrollo y configura las mismas
variables en **Vercel → Project Settings → Environment Variables** para
producción. `RESEND_FROM_EMAIL` debe usar un dominio verificado en Resend.

Para probar la aplicación y la función juntas localmente, usa Vercel CLI:

```bash
npx vercel dev
```

El servidor normal de Vite (`npm run dev`) solo levanta el frontend y no ejecuta
la carpeta `api`. Nunca incluyas la clave de Resend en una variable `VITE_*`,
porque Vite expone esas variables en el navegador.
