-- Supabase schema for PadelGo

-- Profiles table (extends auth.users)
create table if not exists public.profiles (
  id uuid references auth.users on delete cascade primary key,
  name text,
  phone text,
  role text default 'user' check (role in ('user', 'admin')),
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Courts table
create table if not exists public.courts (
  id text primary key,
  name text not null,
  type text not null,
  price_per_hour integer not null,
  surface text,
  available boolean default true,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Bookings table
create table if not exists public.bookings (
  id text primary key,
  user_id uuid references auth.users on delete cascade not null,
  court_id text not null references courts(id),
  court_name text not null,
  date text not null,
  start_time text not null,
  end_time text not null,
  duration_hours integer not null,
  amount integer not null,
  status text default 'confirmed' check (status in ('confirmed', 'pending', 'cancelled')),
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Indexes
create index if not exists idx_bookings_user_id on public.bookings(user_id);
create index if not exists idx_bookings_court_date on public.bookings(court_id, date);
create index if not exists idx_profiles_role on public.profiles(role);

-- RLS
alter table public.profiles enable row level security;
alter table public.courts enable row level security;
alter table public.bookings enable row level security;

-- Profiles policies
create policy "Users view own profile" on public.profiles for select using (auth.uid() = id);
create policy "Users update own profile" on public.profiles for update using (auth.uid() = id);
create policy "Admins view all profiles" on public.profiles for select using (
  exists (select 1 from public.profiles where id = auth.uid() and role = 'admin')
);
create policy "Admins update all profiles" on public.profiles for update using (
  exists (select 1 from public.profiles where id = auth.uid() and role = 'admin')
);

-- Courts policies (public read, admin write)
create policy "Anyone view courts" on public.courts for select using (true);
create policy "Admins manage courts" on public.courts for all using (
  exists (select 1 from public.profiles where id = auth.uid() and role = 'admin')
);

-- Bookings policies
create policy "Users view own bookings" on public.bookings for select using (auth.uid() = user_id);
create policy "Users create bookings" on public.bookings for insert with check (auth.uid() = user_id);
create policy "Users update own bookings" on public.bookings for update using (auth.uid() = user_id);
create policy "Admins view all bookings" on public.bookings for select using (
  exists (select 1 from public.profiles where id = auth.uid() and role = 'admin')
);
create policy "Admins manage all bookings" on public.bookings for all using (
  exists (select 1 from public.profiles where id = auth.uid() and role = 'admin')
);

-- Trigger to create profile on signup
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, name, role)
  values (new.id, new.raw_user_meta_data->>'name', 'user');
  return new;
end;
$$ language plpgsql security definer;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- Seed courts
insert into public.courts (id, name, type, price_per_hour, surface, available) values
  ('A1', 'Pista Norte', 'Exterior', 150000, 'Artificial Grass', true),
  ('A2', 'Pista Sur', 'Exterior', 100000, 'Artificial Grass', true),
  ('B1', 'Pista Central', 'Interior Premium', 150000, 'Panoramic Glass', true),
  ('B2', 'Pista Elite', 'Interior Elite', 100000, 'Panoramic Glass', true)
on conflict (id) do nothing;
