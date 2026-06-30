-- Supabase schema for PadelGo
-- Run this from the Supabase SQL editor. It is intentionally rerunnable.

-- Profiles table (extends auth.users)
create table if not exists public.profiles (
  id uuid references auth.users on delete cascade primary key,
  name text,
  phone text,
  avatar_url text,
  role text default 'user' not null check (role in ('user', 'admin')),
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Courts table
create table if not exists public.courts (
  id text primary key,
  name text not null,
  type text not null,
  price_per_hour integer not null check (price_per_hour > 0),
  surface text,
  available boolean default true not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Bookings table
create table if not exists public.bookings (
  id text primary key,
  user_id uuid references auth.users on delete cascade not null,
  court_id text not null references public.courts(id),
  court_name text not null,
  date text not null,
  start_time text not null,
  end_time text not null,
  duration_hours integer not null check (duration_hours between 1 and 4),
  amount integer not null check (amount > 0),
  status text default 'confirmed' not null check (status in ('confirmed', 'pending', 'cancelled')),
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Keep existing databases aligned when this file is rerun.
update public.profiles set role = 'user' where role is null;
update public.courts set available = true where available is null;
update public.bookings set status = 'confirmed' where status is null;

alter table public.profiles alter column role set default 'user';
alter table public.profiles alter column role set not null;
alter table public.profiles add column if not exists avatar_url text;
alter table public.courts alter column available set default true;
alter table public.courts alter column available set not null;
alter table public.bookings alter column status set default 'confirmed';
alter table public.bookings alter column status set not null;

-- Indexes
create index if not exists idx_bookings_user_id on public.bookings(user_id);
create index if not exists idx_bookings_court_date on public.bookings(court_id, date);
create index if not exists idx_profiles_role on public.profiles(role);

-- Helper functions avoid recursive RLS checks on profiles.
create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.profiles
    where id = auth.uid()
      and role = 'admin'
  );
$$;

create or replace function public.touch_updated_at()
returns trigger
language plpgsql
set search_path = public
as $$
begin
  new.updated_at = timezone('utc'::text, now());
  return new;
end;
$$;

drop trigger if exists profiles_touch_updated_at on public.profiles;
create trigger profiles_touch_updated_at
  before update on public.profiles
  for each row execute procedure public.touch_updated_at();

-- Server-side booking validation. Frontend checks are convenience only.
create or replace function public.validate_booking()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  court_record public.courts%rowtype;
  start_hour integer;
  end_hour integer;
begin
  if new.status is null then
    new.status := 'confirmed';
  end if;

  if new.date !~ '^[0-9]{4}-[0-9]{2}-[0-9]{2}$' then
    raise exception 'Tanggal booking tidak valid.';
  end if;

  if new.date::date < current_date then
    raise exception 'Tanggal booking tidak boleh di masa lalu.';
  end if;

  if new.start_time !~ '^([01][0-9]|2[0-3]):00$' then
    raise exception 'Jam mulai harus memakai format HH:00.';
  end if;

  if new.end_time !~ '^([01][0-9]|2[0-4]):00$' then
    raise exception 'Jam selesai harus memakai format HH:00.';
  end if;

  start_hour := split_part(new.start_time, ':', 1)::integer;
  end_hour := split_part(new.end_time, ':', 1)::integer;

  if end_hour <= start_hour or end_hour > 24 then
    raise exception 'Rentang jam booking tidak valid.';
  end if;

  if not ((end_hour - start_hour) between 1 and 4) then
    raise exception 'Durasi booking harus 1 sampai 4 jam.';
  end if;

  select *
  into court_record
  from public.courts
  where id = new.court_id
    and available = true;

  if not found then
    raise exception 'Court tidak tersedia.';
  end if;

  -- Trust the database for derived fields, not client input.
  new.duration_hours := end_hour - start_hour;
  new.court_name := court_record.name;
  new.amount := court_record.price_per_hour * new.duration_hours;

  -- Prevent race-condition double bookings per court/date.
  perform pg_advisory_xact_lock(hashtext(new.court_id || ':' || new.date));

  if new.status <> 'cancelled' and exists (
    select 1
    from public.bookings b
    where b.court_id = new.court_id
      and b.date = new.date
      and b.status <> 'cancelled'
      and b.id <> new.id
      and split_part(b.start_time, ':', 1)::integer < end_hour
      and split_part(b.end_time, ':', 1)::integer > start_hour
  ) then
    raise exception 'Slot sudah dipesan. Pilih waktu lain.';
  end if;

  return new;
end;
$$;

drop trigger if exists bookings_validate on public.bookings;
create trigger bookings_validate
  before insert or update on public.bookings
  for each row execute procedure public.validate_booking();

-- Public-safe availability endpoint. It exposes only slot timing, not user data.
create or replace function public.get_booked_slots(p_court_id text, p_date text)
returns table (
  start_time text,
  end_time text,
  duration_hours integer,
  status text
)
language sql
stable
security definer
set search_path = public
as $$
  select b.start_time, b.end_time, b.duration_hours, b.status
  from public.bookings b
  where b.court_id = p_court_id
    and b.date = p_date
    and b.status <> 'cancelled'
  order by b.start_time;
$$;

-- Trigger to create profile on signup.
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, name, role)
  values (new.id, new.raw_user_meta_data->>'name', 'user')
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- RLS
alter table public.profiles enable row level security;
alter table public.courts enable row level security;
alter table public.bookings enable row level security;

-- Profiles policies
drop policy if exists "Users view own profile" on public.profiles;
drop policy if exists "Users update own profile" on public.profiles;
drop policy if exists "Admins view all profiles" on public.profiles;
drop policy if exists "Admins update all profiles" on public.profiles;

create policy "Users view own profile"
  on public.profiles
  for select
  using (auth.uid() = id);

create policy "Users update own profile"
  on public.profiles
  for update
  using (auth.uid() = id)
  with check (auth.uid() = id and role = 'user');

create policy "Admins view all profiles"
  on public.profiles
  for select
  using (public.is_admin());

create policy "Admins update all profiles"
  on public.profiles
  for update
  using (public.is_admin())
  with check (public.is_admin());

-- Courts policies (public read, admin write)
drop policy if exists "Anyone view courts" on public.courts;
drop policy if exists "Admins manage courts" on public.courts;

create policy "Anyone view courts"
  on public.courts
  for select
  using (true);

create policy "Admins manage courts"
  on public.courts
  for all
  using (public.is_admin())
  with check (public.is_admin());

-- Bookings policies
drop policy if exists "Users view own bookings" on public.bookings;
drop policy if exists "Users create bookings" on public.bookings;
drop policy if exists "Users update own bookings" on public.bookings;
drop policy if exists "Admins view all bookings" on public.bookings;
drop policy if exists "Admins manage all bookings" on public.bookings;

create policy "Users view own bookings"
  on public.bookings
  for select
  using (auth.uid() = user_id);

create policy "Users create bookings"
  on public.bookings
  for insert
  with check (auth.uid() = user_id);

create policy "Admins view all bookings"
  on public.bookings
  for select
  using (public.is_admin());

create policy "Admins manage all bookings"
  on public.bookings
  for all
  using (public.is_admin())
  with check (public.is_admin());

grant execute on function public.get_booked_slots(text, text) to anon, authenticated;
grant execute on function public.is_admin() to authenticated;

-- Seed courts. Admin account creation is intentionally not included here.
insert into public.courts (id, name, type, price_per_hour, surface, available) values
  ('A1', 'Pista Norte', 'Exterior', 150000, 'Artificial Grass', true),
  ('A2', 'Pista Sur', 'Exterior', 100000, 'Artificial Grass', true),
  ('B1', 'Pista Central', 'Interior Premium', 150000, 'Panoramic Glass', true),
  ('B2', 'Pista Elite', 'Interior Elite', 100000, 'Panoramic Glass', true)
on conflict (id) do update set
  name = excluded.name,
  type = excluded.type,
  price_per_hour = excluded.price_per_hour,
  surface = excluded.surface,
  available = excluded.available;
