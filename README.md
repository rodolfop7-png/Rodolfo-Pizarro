# Luz de Arica ✝️

Portal cristiano evangélico enfocado en la comunidad de Arica.

## Incluye

- Fecha y hora actual de Arica.
- Devocional diario rotativo.
- Versículo e imagen/mensaje del día.
- Espacio de preguntas bíblicas preparado para integración con IA.
- Google Maps centrado en iglesias evangélicas de Arica.
- Panel de administración para agregar iglesias, negocios y noticias.
- Huincha inferior de negocios y emprendimientos cristianos.
- Sección de noticias locales.
- Diseño responsive para computador y móvil.

## Importante

Esta primera versión es un prototipo funcional de frontend. Los registros de administrador se guardan en `localStorage`, por lo que todavía no existe una base de datos ni autenticación real. Para una versión pública de producción se recomienda conectar Supabase/Firebase (o un backend propio), proteger el panel de administración con autenticación y conectar una API de IA con una clave almacenada exclusivamente en servidor.

La generación verdaderamente automática de contenido diario y la actualización automática de noticias requieren un servicio backend/cron y sus respectivas APIs. La interfaz ya está preparada para esas integraciones.

## Desarrollo

```bash
npm install
npm run dev
```

## Producción

```bash
npm run build
npm run preview
```
