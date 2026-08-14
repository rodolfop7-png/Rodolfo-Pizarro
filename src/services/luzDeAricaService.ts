import { GoogleGenAI } from '@google/genai';

const apiKey = process.env.GEMINI_API_KEY || '';
const ai = apiKey ? new GoogleGenAI({ apiKey }) : null;

export async function answerBibleQuestion(question: string) {
  if (!ai) return 'La IA no está configurada todavía. Agrega GEMINI_API_KEY en los Secrets del proyecto.';
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `Eres un asistente de estudio bíblico para una comunidad cristiana evangélica de Arica, Chile. Responde en español, con respeto y sin presentar opiniones como doctrina absoluta. Explica el contexto, menciona referencias bíblicas relevantes y termina con 2 preguntas para profundizar. Pregunta: ${question}`,
  });
  return response.text || 'No se pudo generar una respuesta.';
}

export async function generateDailyDevotional() {
  if (!ai) return null;
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: 'Crea un devocional cristiano evangélico diario en español para la comunidad de Arica. Devuelve: título, referencia bíblica, reflexión de 180 palabras, oración de 60 palabras y una acción práctica. No inventes citas bíblicas.',
  });
  return response.text || null;
}

export async function generateChristianImagePrompt() {
  if (!ai) return null;
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: 'Crea un prompt breve para una imagen cristiana vertical para redes sociales, elegante, luminosa y sobria, basada en un versículo bíblico. Incluye el versículo y su referencia. No uses símbolos de otras religiones.',
  });
  return response.text || null;
}
