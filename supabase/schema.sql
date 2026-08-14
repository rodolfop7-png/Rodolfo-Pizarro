-- Luz de Arica V2.1: base de datos sugerida para Supabase
create extension if not exists pgcrypto;

create table if not exists churches (
  id uuid primary key default gen_random_uuid(), name text not null, denomination text,
  address text not null, phone text, website text, latitude double precision, longitude double precision,
  verified boolean default false, created_at timestamptz default now()
);
create table if not exists businesses (
  id uuid primary key default gen_random_uuid(), name text not null, category text,
  address text default 'Arica', phone text, website text, instagram text, active boolean default true,
  created_at timestamptz default now()
);
create table if not exists local_news (
  id uuid primary key default gen_random_uuid(), title text not null, summary text not null,
  body text, source text, source_url text, image_url text, published_at timestamptz default now(),
  status text default 'draft' check (status in ('draft','published'))
);
create table if not exists daily_content (
  id uuid primary key default gen_random_uuid(), content_date date unique not null,
  devotional_title text, devotional_reference text, devotional_body text, devotional_prayer text,
  verse_text text, verse_reference text, image_url text, image_prompt text,
  status text default 'published', created_at timestamptz default now()
);

alter table churches enable row level security;
alter table businesses enable row level security;
alter table local_news enable row level security;
alter table daily_content enable row level security;

create policy "public verified churches" on churches for select using (verified = true);
create policy "public active businesses" on businesses for select using (active = true);
create policy "public published news" on local_news for select using (status = 'published');
create policy "public daily content" on daily_content for select using (status = 'published');

-- Escrituras de administrador deben ejecutarse desde servidor con la service role key.
