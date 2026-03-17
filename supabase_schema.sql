-- SilviVerse Supabase Schema

-- Enable UUID and JSON extensions
create extension if not exists "uuid-ossp";

-- Recuerdos (Memories) table
create table if not exists public.recuerdos (
  id uuid default uuid_generate_v4() primary key,
  titulo text not null,
  poema text not null,
  fecha text not null,
  imagen_url text,
  tags jsonb default '[]'::jsonb,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Sensaciones (Feelings) table
create table if not exists public.sensaciones (
  id uuid default uuid_generate_v4() primary key,
  texto text not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Cartas (Letters) table
create table if not exists public.cartas (
  id uuid default uuid_generate_v4() primary key,
  texto text not null,
  password text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Flores (Flowers) table
create table if not exists public.flores (
  id uuid default uuid_generate_v4() primary key,
  tipo text not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Bouquets table
create table if not exists public.bouquets (
  id uuid default uuid_generate_v4() primary key,
  flores jsonb default '[]'::jsonb,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable row level security
alter table public.recuerdos enable row level security;
alter table public.sensaciones enable row level security;
alter table public.cartas enable row level security;
alter table public.flores enable row level security;
alter table public.bouquets enable row level security;

-- Drop existing policies to recreate them cleanly
drop policy if exists "Allow public access to recuerdos" on public.recuerdos;
drop policy if exists "Allow public insert to recuerdos" on public.recuerdos;
drop policy if exists "Allow public update to recuerdos" on public.recuerdos;
drop policy if exists "Allow public delete to recuerdos" on public.recuerdos;

drop policy if exists "Allow public access to sensaciones" on public.sensaciones;
drop policy if exists "Allow public insert to sensaciones" on public.sensaciones;
drop policy if exists "Allow public delete to sensaciones" on public.sensaciones;

drop policy if exists "Allow public access to cartas" on public.cartas;
drop policy if exists "Allow public insert to cartas" on public.cartas;
drop policy if exists "Allow public delete to cartas" on public.cartas;

drop policy if exists "Allow public access to flores" on public.flores;
drop policy if exists "Allow public insert to flores" on public.flores;
drop policy if exists "Allow public delete to flores" on public.flores;

drop policy if exists "Allow public access to bouquets" on public.bouquets;
drop policy if exists "Allow public insert to bouquets" on public.bouquets;
drop policy if exists "Allow public delete to bouquets" on public.bouquets;

drop policy if exists "Allow public read access to recuerdos storage" on storage.objects;
drop policy if exists "Allow public upload to recuerdos storage" on storage.objects;
drop policy if exists "Allow public delete from recuerdos storage" on storage.objects;

-- Create policies for anon (public) access
-- Recuerdos policies
create policy "Allow public access to recuerdos" on public.recuerdos
  for select using (true);

create policy "Allow public insert to recuerdos" on public.recuerdos
  for insert with check (true);

create policy "Allow public update to recuerdos" on public.recuerdos
  for update using (true) with check (true);

create policy "Allow public delete to recuerdos" on public.recuerdos
  for delete using (true);

-- Sensaciones policies
create policy "Allow public access to sensaciones" on public.sensaciones
  for select using (true);

create policy "Allow public insert to sensaciones" on public.sensaciones
  for insert with check (true);

create policy "Allow public delete to sensaciones" on public.sensaciones
  for delete using (true);

-- Cartas policies
create policy "Allow public access to cartas" on public.cartas
  for select using (true);

create policy "Allow public insert to cartas" on public.cartas
  for insert with check (true);

create policy "Allow public delete to cartas" on public.cartas
  for delete using (true);

-- Flores policies
create policy "Allow public access to flores" on public.flores
  for select using (true);

create policy "Allow public insert to flores" on public.flores
  for insert with check (true);

create policy "Allow public delete to flores" on public.flores
  for delete using (true);

-- Bouquets policies
create policy "Allow public access to bouquets" on public.bouquets
  for select using (true);

create policy "Allow public insert to bouquets" on public.bouquets
  for insert with check (true);

create policy "Allow public delete to bouquets" on public.bouquets
  for delete using (true);

-- Create storage bucket for images
insert into storage.buckets (id, name, public) 
values ('recuerdos', 'recuerdos', true)
on conflict (id) do update set public = true;

-- Drop existing storage policies if they exist
drop policy if exists "Allow public read access to recuerdos storage" on storage.objects;
drop policy if exists "Allow public upload to recuerdos storage" on storage.objects;
drop policy if exists "Allow public delete from recuerdos storage" on storage.objects;

-- Storage policies for public access
create policy "Allow public read access to recuerdos storage" on storage.objects
  for select using (bucket_id = 'recuerdos');

create policy "Allow public upload to recuerdos storage" on storage.objects
  for insert with check (bucket_id = 'recuerdos');

create policy "Allow public delete from recuerdos storage" on storage.objects
  for delete using (bucket_id = 'recuerdos');
