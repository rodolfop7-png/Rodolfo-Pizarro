# Luz de Arica — V2.1

Portal cristiano evangélico orientado a la comunidad de Arica.

## Arquitectura
- React/Vite para la interfaz.
- Gemini para estudio bíblico y generación de contenido.
- Supabase como base de datos recomendada; esquema en `supabase/schema.sql`.
- GitHub Actions preparado para ejecutar el flujo diario.

## Variables necesarias
- `GEMINI_API_KEY`
- `SUPABASE_URL`
- `SUPABASE_ANON_KEY`
- Para automatizaciones servidoras: `SUPABASE_SERVICE_ROLE_KEY` (nunca exponerla en frontend).

## Funciones V2.1
- Fecha/hora de Arica.
- Devocional y versículo diario.
- Asistente bíblico con IA.
- Mapa de iglesias evangélicas de Arica.
- Administración de iglesias, negocios y noticias en el prototipo.
- Huincha de negocios cristianos.
- Esquema persistente para noticias, iglesias, negocios y contenido diario.
- Workflow diario preparado.

## Producción
El frontend actual conserva un modo local para que pueda probarse sin servicios externos. Para producción, conectar los formularios de administración a Supabase mediante un backend/server action protegido y sustituir el generador local por el servicio Gemini.
