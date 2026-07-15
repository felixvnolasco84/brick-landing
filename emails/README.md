# Plantillas de correo

Estas plantillas son componentes React compatibles con el proyecto Vite y no
dependen de rutas, esquemas ni variables de entorno de Next.js.

## Previsualización

```bash
npm run email:dev
```

La galería se abre en `http://localhost:3001`. Para comprobar el build de la
galería sin iniciar el servidor:

```bash
npm run email:build
```

## Uso

Las plantillas se pueden importar desde `emails/index.js`. Los componentes
incluyen datos de ejemplo mediante `PreviewProps`, pero al enviarlos se deben
pasar los datos reales como props.

`VITE_SITE_URL` permite reemplazar la URL predeterminada
`https://brickcontrol.mx`. Si se pasa `logoUrl`, debe ser una URL pública y
absoluta para que el logotipo cargue en el cliente de correo.

El envío debe hacerse desde un backend o una función serverless; una clave de
un proveedor de correo nunca debe incluirse en el bundle del navegador.
