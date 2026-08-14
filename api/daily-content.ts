import { GoogleGenAI } from '@google/genai';
import { createClient } from '@supabase/supabase-js';

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });
  const geminiKey = process.env.GEMINI_API_KEY;
  const supabaseUrl = process.env.SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!geminiKey || !supabaseUrl || !serviceKey) return res.status(500).json({ error: 'Faltan variables de servidor.' });
  const ai = new GoogleGenAI({ apiKey: geminiKey });
  const db = createClient(supabaseUrl, serviceKey);
  const today = new Date().toISOString().slice(0, 10);
  const prompt = `Genera contenido cristiano evangélico para Luz de Arica. Fecha: ${today}. Devuelve JSON válido con estas claves: devotional_title, devotional_reference, devotional_body, devotional_prayer, verse_text, verse_reference, image_prompt. El devocional debe ser edificante, en español, y las referencias bíblicas deben ser reales. image_prompt debe describir una imagen vertical 4:5 sobria, luminosa y apropiada para redes sociales.`;
  const response = await ai.models.generateContent({ model: 'gemini-3-flash-preview', contents: prompt, config: { responseMimeType: 'application/json' } });
  const content = JSON.parse(response.text || '{}');
  const { error } = await db.from('daily_content').upsert({ content_date: today, ...content, status: 'published' }, { onConflict: 'content_date' });
  if (error) return res.status(500).json({ error: error.message });
  return res.status(200).json({ ok: true, date: today });
}
