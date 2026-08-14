import { GoogleGenAI } from '@google/genai';
import { createClient } from '@supabase/supabase-js';

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });
  const geminiKey = process.env.GEMINI_API_KEY;
  const supabaseUrl = process.env.SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!geminiKey || !supabaseUrl || !serviceKey) return res.status(500).json({ error: 'Faltan variables de servidor.' });
  const db = createClient(supabaseUrl, serviceKey);
  const ai = new GoogleGenAI({ apiKey: geminiKey });
  const date = new Date().toISOString().slice(0, 10);
  const { data, error } = await db.from('daily_content').select('verse_text,verse_reference,image_prompt').eq('content_date', date).maybeSingle();
  if (error || !data) return res.status(404).json({ error: 'No existe contenido diario para hoy.' });
  const prompt = data.image_prompt || `Diseño cristiano evangélico vertical 4:5 para redes sociales, elegante y luminoso. Texto principal: ${data.verse_text}. Referencia: ${data.verse_reference}. Sin marcas de agua.`;
  const result = await ai.models.generateContent({ model: 'gemini-2.5-flash-image', contents: prompt });
  const part = result.candidates?.[0]?.content?.parts?.find((p: any) => p.inlineData);
  if (!part?.inlineData?.data) return res.status(502).json({ error: 'El modelo no devolvió una imagen.' });
  const bytes = Buffer.from(part.inlineData.data, 'base64');
  const path = `daily/${date}.png`;
  const upload = await db.storage.from('christian-images').upload(path, bytes, { contentType: part.inlineData.mimeType || 'image/png', upsert: true });
  if (upload.error) return res.status(500).json({ error: upload.error.message });
  const publicUrl = db.storage.from('christian-images').getPublicUrl(path).data.publicUrl;
  const update = await db.from('daily_content').update({ image_url: publicUrl }).eq('content_date', date);
  if (update.error) return res.status(500).json({ error: update.error.message });
  return res.status(200).json({ ok: true, image_url: publicUrl });
}
