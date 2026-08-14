-- V3: políticas para administrador autenticado.
-- Crea un usuario administrador desde Supabase Auth y usa su UUID aquí.
create or replace function public.is_admin()
returns boolean language sql stable security definer set search_path = public
as $$
  select exists (
    select 1 from public.admin_users a
    where a.user_id = auth.uid() and a.active = true
  );
$$;

create table if not exists public.admin_users (
  user_id uuid primary key references auth.users(id) on delete cascade,
  active boolean not null default true,
  created_at timestamptz default now()
);

alter table public.admin_users enable row level security;

create policy "admins can read own profile" on public.admin_users
for select using (user_id = auth.uid());

create policy "admins manage churches" on public.churches
for all using (public.is_admin()) with check (public.is_admin());
create policy "admins manage businesses" on public.businesses
for all using (public.is_admin()) with check (public.is_admin());
create policy "admins manage news" on public.local_news
for all using (public.is_admin()) with check (public.is_admin());
create policy "admins manage daily content" on public.daily_content
for all using (public.is_admin()) with check (public.is_admin());
