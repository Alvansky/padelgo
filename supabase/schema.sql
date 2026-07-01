-- Supabase schema for PadelGo
-- Run this from the Supabase SQL editor. It is intentionally rerunnable.

-- Profiles table (extends auth.users)
create table if not exists public.profiles (
  id uuid references auth.users on delete cascade primary key,
  name text,
  email text,
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
  image_url text,
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
  status text default 'pending' not null check (status in ('pending', 'approved', 'confirmed', 'cancelled')),
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Keep existing databases aligned when this file is rerun.
update public.profiles set role = 'user' where role is null;
update public.profiles set avatar_url = null where avatar_url = '';
update public.courts set available = true where available is null;
update public.bookings set status = 'pending' where status is null;
update public.bookings set status = 'approved' where status = 'confirmed';
update public.profiles p
set email = u.email
from auth.users u
where p.id = u.id
  and (p.email is null or p.email <> u.email);

alter table public.profiles alter column role set default 'user';
alter table public.profiles alter column role set not null;
alter table public.profiles add column if not exists email text;
alter table public.profiles add column if not exists avatar_url text;
alter table public.profiles alter column avatar_url drop default;
alter table public.courts add column if not exists image_url text;
alter table public.courts alter column available set default true;
alter table public.courts alter column available set not null;
alter table public.bookings alter column status set default 'pending';
alter table public.bookings alter column status set not null;

do $$
begin
  alter table public.bookings drop constraint if exists bookings_status_check;
  alter table public.bookings
    add constraint bookings_status_check
    check (status in ('pending', 'approved', 'confirmed', 'cancelled'));
end;
$$;

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
    new.status := 'pending';
  end if;

  if tg_op = 'INSERT' and not public.is_admin() then
    new.status := 'pending';
  end if;

  if tg_op = 'UPDATE' and not public.is_admin() then
    if old.user_id = auth.uid()
      and new.user_id = old.user_id
      and new.court_id = old.court_id
      and new.court_name = old.court_name
      and new.date = old.date
      and new.start_time = old.start_time
      and new.end_time = old.end_time
      and new.duration_hours = old.duration_hours
      and new.amount = old.amount
      and old.status <> 'cancelled'
      and new.status = 'cancelled'
    then
      return new;
    end if;

    raise exception 'User hanya dapat membatalkan booking miliknya sendiri.';
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
-- New users intentionally start with avatar_url = null; the UI renders a shared green default avatar.
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, name, email, avatar_url, role)
  values (
    new.id,
    new.raw_user_meta_data->>'name',
    new.email,
    coalesce(
      nullif(new.raw_user_meta_data->>'avatar_url', ''),
      nullif(new.raw_user_meta_data->>'avatar', '')
    ),
    'user'
  )
  on conflict (id) do update set
    email = excluded.email,
    name = coalesce(public.profiles.name, excluded.name),
    avatar_url = coalesce(public.profiles.avatar_url, excluded.avatar_url);
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

create or replace function public.handle_updated_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  update public.profiles
  set
    email = new.email,
    name = coalesce(nullif(new.raw_user_meta_data->>'name', ''), name),
    avatar_url = coalesce(
      nullif(new.raw_user_meta_data->>'avatar_url', ''),
      nullif(new.raw_user_meta_data->>'avatar', ''),
      avatar_url
    )
  where id = new.id;
  return new;
end;
$$;

drop trigger if exists on_auth_user_updated on auth.users;
create trigger on_auth_user_updated
  after update of email, raw_user_meta_data on auth.users
  for each row execute procedure public.handle_updated_user();

-- Admin bootstrap.
-- Create this login in Supabase Auth first:
--   email: admin@padelgo.com
--   password: Hanyaadmin!
-- Re-running this schema promotes that Auth user to admin without exposing a password in public tables.
insert into public.profiles (id, name, email, role)
select id, coalesce(raw_user_meta_data->>'name', 'PadelGo Admin'), email, 'admin'
from auth.users
where email = 'admin@padelgo.com'
on conflict (id) do update set
  name = coalesce(public.profiles.name, excluded.name),
  email = excluded.email,
  role = 'admin';

-- RLS
alter table public.profiles enable row level security;
alter table public.courts enable row level security;
alter table public.bookings enable row level security;

-- Profiles policies
drop policy if exists "Users view own profile" on public.profiles;
drop policy if exists "Users insert own profile" on public.profiles;
drop policy if exists "Users update own profile" on public.profiles;
drop policy if exists "Admins view all profiles" on public.profiles;
drop policy if exists "Admins update all profiles" on public.profiles;

create policy "Users view own profile"
  on public.profiles
  for select
  using (auth.uid() = id);

create policy "Users insert own profile"
  on public.profiles
  for insert
  with check (auth.uid() = id and coalesce(role, 'user') = 'user');

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

create policy "Users update own bookings"
  on public.bookings
  for update
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id and status = 'cancelled');

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

-- Storage bucket for avatars (requires supabase client library, run once)
-- To create the bucket: Run this in Supabase SQL editor or use Dashboard > Storage
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
select 'avatars', 'avatars', true, 2097152, array['image/jpeg', 'image/png', 'image/webp', 'image/gif']
where not exists (select 1 from storage.buckets where id = 'avatars');

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
select 'court-images', 'court-images', true, 5242880, array['image/jpeg', 'image/png', 'image/webp']
where not exists (select 1 from storage.buckets where id = 'court-images');

-- Allow authenticated users to upload their own avatars
drop policy if exists "Users can upload their own avatar" on storage.objects;
drop policy if exists "Users can view avatars" on storage.objects;
drop policy if exists "Users can update their own avatar" on storage.objects;
drop policy if exists "Users can delete their own avatar" on storage.objects;

create policy "Users can upload their own avatar"
  on storage.objects
  for insert
  to authenticated
  with check (
    bucket_id = 'avatars' and
    (
      (storage.foldername(name))[1] = auth.uid()::text or
      ((storage.foldername(name))[1] = 'avatars' and (storage.foldername(name))[2] = auth.uid()::text)
    )
  );

create policy "Users can view avatars"
  on storage.objects
  for select
  using (bucket_id = 'avatars');

create policy "Users can update their own avatar"
  on storage.objects
  for update
  to authenticated
  using (
    bucket_id = 'avatars' and
    (
      (storage.foldername(name))[1] = auth.uid()::text or
      ((storage.foldername(name))[1] = 'avatars' and (storage.foldername(name))[2] = auth.uid()::text)
    )
  );

create policy "Users can delete their own avatar"
  on storage.objects
  for delete
  to authenticated
  using (
    bucket_id = 'avatars' and
    (
      (storage.foldername(name))[1] = auth.uid()::text or
      ((storage.foldername(name))[1] = 'avatars' and (storage.foldername(name))[2] = auth.uid()::text)
    )
  );

-- Allow public reads for avatars (since bucket is public)
drop policy if exists "Anyone can view avatars" on storage.objects;

create policy "Anyone can view avatars"
  on storage.objects
  for select
  using (bucket_id = 'avatars');

drop policy if exists "Anyone can view court images" on storage.objects;
drop policy if exists "Admins can upload court images" on storage.objects;
drop policy if exists "Admins can update court images" on storage.objects;
drop policy if exists "Admins can delete court images" on storage.objects;

create policy "Anyone can view court images"
  on storage.objects
  for select
  using (bucket_id = 'court-images');

create policy "Admins can upload court images"
  on storage.objects
  for insert
  to authenticated
  with check (bucket_id = 'court-images' and public.is_admin());

create policy "Admins can update court images"
  on storage.objects
  for update
  to authenticated
  using (bucket_id = 'court-images' and public.is_admin());

create policy "Admins can delete court images"
  on storage.objects
  for delete
  to authenticated
  using (bucket_id = 'court-images' and public.is_admin());

-- Seed courts.
insert into public.courts (id, name, type, price_per_hour, surface, image_url, available) values
  ('A1', 'Court A1', 'Premium indoor court', 150000, 'Artificial Grass', '/images/padel1.jpg', true),
  ('A2', 'Court A2', 'Standard indoor court', 100000, 'Artificial Grass', '/images/padel2.jpg', true),
  ('B1', 'Court B1', 'Premium glass court', 150000, 'Panoramic Glass', '/images/padel3.jpg', true),
  ('B2', 'Court B2', 'Standard glass court', 100000, 'Panoramic Glass', '/images/padel4.jpg', true)
on conflict (id) do update set
  name = excluded.name,
  type = excluded.type,
  price_per_hour = excluded.price_per_hour,
  surface = excluded.surface,
  image_url = coalesce(public.courts.image_url, excluded.image_url),
  available = excluded.available;
