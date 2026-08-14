-- Ejecutar una vez en Supabase.
-- Crea el bucket para las imágenes cristianas generadas diariamente.
insert into storage.buckets (id, name, public)
values ('christian-images', 'christian-images', true)
on conflict (id) do nothing;

create policy "public read christian images"
on storage.objects for select
using (bucket_id = 'christian-images');

create policy "admins upload christian images"
on storage.objects for insert
with check (bucket_id = 'christian-images' and public.is_admin());

create policy "admins update christian images"
on storage.objects for update
using (bucket_id = 'christian-images' and public.is_admin())
with check (bucket_id = 'christian-images' and public.is_admin());

create policy "admins delete christian images"
on storage.objects for delete
using (bucket_id = 'christian-images' and public.is_admin());
