import { supabase } from './supabaseClient';

export async function getDailyContent() {
  if (!supabase) return null;
  const date = new Date().toISOString().slice(0, 10);
  const { data, error } = await supabase.from('daily_content').select('*').eq('content_date', date).eq('status', 'published').maybeSingle();
  if (error) throw error;
  return data;
}

export async function getChurches() {
  if (!supabase) return [];
  const { data, error } = await supabase.from('churches').select('*').eq('verified', true).order('name');
  if (error) throw error;
  return data ?? [];
}

export async function getBusinesses() {
  if (!supabase) return [];
  const { data, error } = await supabase.from('businesses').select('*').eq('active', true).order('name');
  if (error) throw error;
  return data ?? [];
}

export async function getNews() {
  if (!supabase) return [];
  const { data, error } = await supabase.from('local_news').select('*').eq('status', 'published').order('published_at', { ascending: false });
  if (error) throw error;
  return data ?? [];
}

export async function signInAdmin(email: string, password: string) {
  if (!supabase) throw new Error('Supabase no está configurado.');
  const { data, error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) throw error;
  return data.session;
}

export async function signOutAdmin() {
  if (supabase) await supabase.auth.signOut();
}
