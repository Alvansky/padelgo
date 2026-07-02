-- ============================================================================
-- PadelGo Database Schema
-- Frontend: Hugo (Vercel) | Backend: Supabase (PostgreSQL)
-- ============================================================================
-- Run this from Supabase SQL Editor. Intentionally rerunnable.
-- ============================================================================

-- Drop existing objects (for clean reinstall - order matters!)
DROP TRIGGER IF EXISTS bookings_validate ON public.bookings;
DROP TRIGGER IF EXISTS profiles_touch_updated_at ON public.profiles;
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
DROP TRIGGER IF EXISTS on_auth_user_updated ON auth.users;

-- Drop policies first (they depend on functions)
DROP POLICY IF EXISTS "Users view own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users insert own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users update own profile" ON public.profiles;
DROP POLICY IF EXISTS "Admins view all profiles" ON public.profiles;
DROP POLICY IF EXISTS "Admins update all profiles" ON public.profiles;
DROP POLICY IF EXISTS "Anyone view courts" ON public.courts;
DROP POLICY IF EXISTS "Admins manage courts" ON public.courts;
DROP POLICY IF EXISTS "Users view own bookings" ON public.bookings;
DROP POLICY IF EXISTS "Users create bookings" ON public.bookings;
DROP POLICY IF EXISTS "Users update own bookings" ON public.bookings;
DROP POLICY IF EXISTS "Admins view all bookings" ON public.bookings;
DROP POLICY IF EXISTS "Admins manage all bookings" ON public.bookings;
DROP POLICY IF EXISTS "Users can upload avatar" ON storage.objects;
DROP POLICY IF EXISTS "Users can view avatars" ON storage.objects;
DROP POLICY IF EXISTS "Users can update avatar" ON storage.objects;
DROP POLICY IF EXISTS "Users can delete avatar" ON storage.objects;
DROP POLICY IF EXISTS "Anyone can view avatars" ON storage.objects;
DROP POLICY IF EXISTS "Anyone can view court images" ON storage.objects;
DROP POLICY IF EXISTS "Admins can upload court images" ON storage.objects;
DROP POLICY IF EXISTS "Admins can update court images" ON storage.objects;
DROP POLICY IF EXISTS "Admins can delete court images" ON storage.objects;

-- Now drop functions
DROP FUNCTION IF EXISTS public.validate_booking();
DROP FUNCTION IF EXISTS public.touch_updated_at();
DROP FUNCTION IF EXISTS public.handle_new_user();
DROP FUNCTION IF EXISTS public.handle_updated_user();
DROP FUNCTION IF EXISTS public.is_admin();
DROP FUNCTION IF EXISTS public.get_booked_slots(TEXT, TEXT);
DROP FUNCTION IF EXISTS public.storage_filepath_matches_user(TEXT);

-- ============================================================================
-- TABLES
-- ============================================================================

-- Profiles table (extends auth.users)
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
  name TEXT,
  email TEXT,
  phone TEXT,
  avatar_url TEXT,
  role TEXT DEFAULT 'user' NOT NULL CHECK (role IN ('user', 'admin')),
  created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Courts table
CREATE TABLE IF NOT EXISTS public.courts (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  type TEXT NOT NULL,
  price_per_hour INTEGER NOT NULL CHECK (price_per_hour > 0),
  surface TEXT,
  image_url TEXT,
  available BOOLEAN DEFAULT true NOT NULL,
  created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Bookings table
CREATE TABLE IF NOT EXISTS public.bookings (
  id TEXT PRIMARY KEY,
  user_id UUID REFERENCES auth.users ON DELETE CASCADE NOT NULL,
  court_id TEXT NOT NULL REFERENCES public.courts(id),
  court_name TEXT NOT NULL,
  date TEXT NOT NULL,
  start_time TEXT NOT NULL,
  end_time TEXT NOT NULL,
  duration_hours INTEGER NOT NULL CHECK (duration_hours BETWEEN 1 AND 4),
  amount INTEGER NOT NULL CHECK (amount > 0),
  status TEXT DEFAULT 'pending' NOT NULL CHECK (status IN ('pending', 'approved', 'cancelled')),
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- ============================================================================
-- INDEXES (for performance)
-- ============================================================================

CREATE INDEX IF NOT EXISTS idx_profiles_email ON public.profiles(email);
CREATE INDEX IF NOT EXISTS idx_profiles_role ON public.profiles(role);
CREATE INDEX IF NOT EXISTS idx_bookings_user_id ON public.bookings(user_id);
CREATE INDEX IF NOT EXISTS idx_bookings_court_date ON public.bookings(court_id, date);
CREATE INDEX IF NOT EXISTS idx_bookings_date ON public.bookings(date);
CREATE INDEX IF NOT EXISTS idx_bookings_status ON public.bookings(status);

-- ============================================================================
-- HELPER FUNCTIONS
-- ============================================================================

-- Check if current user is admin
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN
LANGUAGE SQL
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.profiles
    WHERE id = auth.uid()
      AND role = 'admin'
  );
$$;

-- Auto-update updated_at timestamp
CREATE OR REPLACE FUNCTION public.touch_updated_at()
RETURNS TRIGGER
LANGUAGE plpgsql
SET search_path = public
AS $$
BEGIN
  new.updated_at = timezone('utc'::text, now());
  RETURN new;
END;
$$;

-- Create profile on new user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  is_admin_email BOOLEAN;
BEGIN
  -- Check if this is the admin email
  is_admin_email := new.email ILIKE '%@admin@padelgo%' OR new.email = 'admin@padelgo.com';

  INSERT INTO public.profiles (id, name, email, avatar_url, role)
  VALUES (
    new.id,
    COALESCE(NULLIF(new.raw_user_meta_data->>'name', ''), 'Player'),
    new.email,
    COALESCE(
      NULLIF(new.raw_user_meta_data->>'avatar_url', ''),
      NULLIF(new.raw_user_meta_data->>'avatar', '')
    ),
    CASE WHEN is_admin_email THEN 'admin' ELSE 'user' END
  )
  ON CONFLICT (id) DO UPDATE SET
    email = excluded.email,
    name = COALESCE(public.profiles.name, excluded.name),
    avatar_url = COALESCE(public.profiles.avatar_url, excluded.avatar_url),
    role = CASE
      WHEN excluded.email = 'admin@padelgo.com' OR excluded.email ILIKE '%@admin@padelgo%' THEN 'admin'
      ELSE COALESCE(NULLIF(public.profiles.role, 'user'), excluded.role)
    END;
  RETURN new;
END;
$$;

-- Update profile on user metadata change
CREATE OR REPLACE FUNCTION public.handle_updated_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  UPDATE public.profiles
  SET
    email = new.email,
    name = COALESCE(NULLIF(new.raw_user_meta_data->>'name', ''), name),
    avatar_url = COALESCE(
      NULLIF(new.raw_user_meta_data->>'avatar_url', ''),
      NULLIF(new.raw_user_meta_data->>'avatar', ''),
      avatar_url
    )
  WHERE id = new.id;
  RETURN new;
END;
$$;

-- Get booked slots for a court on specific date (public safe)
CREATE OR REPLACE FUNCTION public.get_booked_slots(
  p_court_id TEXT,
  p_date TEXT
)
RETURNS TABLE (
  start_time TEXT,
  end_time TEXT,
  duration_hours INTEGER,
  status TEXT
)
LANGUAGE SQL
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT b.start_time, b.end_time, b.duration_hours, b.status
  FROM public.bookings b
  WHERE b.court_id = p_court_id
    AND b.date = p_date
    AND b.status != 'cancelled'
  ORDER BY b.start_time;
$$;

-- Validate booking before insert/update
CREATE OR REPLACE FUNCTION public.validate_booking()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  court_record RECORD;
  start_hour INTEGER;
  end_hour INTEGER;
BEGIN
  -- Set default status
  IF new.status IS NULL THEN
    new.status := 'pending';
  END IF;

  -- Non-admin users can only create pending bookings
  IF tg_op = 'INSERT' AND NOT public.is_admin() THEN
    new.status := 'pending';
  END IF;

  -- User can only cancel their own bookings
  IF tg_op = 'UPDATE' AND NOT public.is_admin() THEN
    -- Allow user to cancel their own booking
    IF old.user_id = auth.uid()
      AND new.user_id = old.user_id
      AND old.status != 'cancelled'
      AND new.status = 'cancelled'
    THEN
      RETURN new;
    END IF;
    -- Block any other updates by non-admin users
    RAISE EXCEPTION 'User hanya dapat membatalkan booking miliknya sendiri.';
  END IF;

  -- Validate date format (YYYY-MM-DD)
  IF new.date !~ '^[0-9]{4}-[0-9]{2}-[0-9]{2}$' THEN
    RAISE EXCEPTION 'Tanggal booking tidak valid. Format: YYYY-MM-DD';
  END IF;

  -- Prevent past date booking
  IF new.date::date < current_date THEN
    RAISE EXCEPTION 'Tanggal booking tidak boleh di masa lalu.';
  END IF;

  -- Validate time format (HH:00)
  IF new.start_time !~ '^([01][0-9]|2[0-3]):00$' THEN
    RAISE EXCEPTION 'Jam mulai harus memakai format HH:00';
  END IF;

  IF new.end_time !~ '^([01][0-9]|2[0-4]):00$' THEN
    RAISE EXCEPTION 'Jam selesai harus memakai format HH:00';
  END IF;

  -- Parse hours
  start_hour := split_part(new.start_time, ':', 1)::INTEGER;
  end_hour := split_part(new.end_time, ':', 1)::INTEGER;

  -- Validate time range
  IF end_hour <= start_hour OR end_hour > 24 THEN
    RAISE EXCEPTION 'Rentang jam booking tidak valid';
  END IF;

  -- Validate duration (1-4 hours)
  IF (end_hour - start_hour) NOT BETWEEN 1 AND 4 THEN
    RAISE EXCEPTION 'Durasi booking harus 1 sampai 4 jam';
  END IF;

  -- Verify court exists and is available
  SELECT * INTO court_record
  FROM public.courts
  WHERE id = new.court_id
    AND available = true;

  IF NOT found THEN
    RAISE EXCEPTION 'Court tidak tersedia';
  END IF;

  -- Trust database for derived fields
  new.duration_hours := end_hour - start_hour;
  new.court_name := court_record.name;
  new.amount := court_record.price_per_hour * new.duration_hours;

  -- Prevent double booking (race condition safe)
  PERFORM pg_advisory_xact_lock(hashtext(new.court_id || ':' || new.date));

  IF new.status != 'cancelled' AND EXISTS (
    SELECT 1
    FROM public.bookings b
    WHERE b.court_id = new.court_id
      AND b.date = new.date
      AND b.status != 'cancelled'
      AND b.id != COALESCE(new.id, '')
      AND split_part(b.start_time, ':', 1)::INTEGER < end_hour
      AND split_part(b.end_time, ':', 1)::INTEGER > start_hour
  ) THEN
    RAISE EXCEPTION 'Slot sudah dipesan. Pilih waktu lain';
  END IF;

  RETURN new;
END;
$$;

-- ============================================================================
-- TRIGGERS
-- ============================================================================

-- Profile auto-update timestamp
CREATE TRIGGER profiles_touch_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE PROCEDURE public.touch_updated_at();

-- Create profile on signup
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();

-- Update profile on metadata change
CREATE TRIGGER on_auth_user_updated
  AFTER UPDATE OF email, raw_user_meta_data ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_updated_user();

-- Validate booking
CREATE TRIGGER bookings_validate
  BEFORE INSERT OR UPDATE ON public.bookings
  FOR EACH ROW EXECUTE PROCEDURE public.validate_booking();

-- ============================================================================
-- ROW LEVEL SECURITY (RLS)
-- ============================================================================

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.courts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;

-- Profiles policies
DROP POLICY IF EXISTS "Users view own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users insert own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users update own profile" ON public.profiles;
DROP POLICY IF EXISTS "Admins view all profiles" ON public.profiles;
DROP POLICY IF EXISTS "Admins update all profiles" ON public.profiles;

CREATE POLICY "Users view own profile"
  ON public.profiles FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users insert own profile"
  ON public.profiles FOR INSERT
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Users update own profile"
  ON public.profiles FOR UPDATE
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id AND (role IS NULL OR role = 'user'));

CREATE POLICY "Admins view all profiles"
  ON public.profiles FOR SELECT
  USING (public.is_admin());

CREATE POLICY "Admins update all profiles"
  ON public.profiles FOR ALL
  USING (public.is_admin())
  WITH CHECK (public.is_admin());

-- Courts policies (public read, admin write)
DROP POLICY IF EXISTS "Anyone view courts" ON public.courts;
DROP POLICY IF EXISTS "Admins manage courts" ON public.courts;

CREATE POLICY "Anyone view courts"
  ON public.courts FOR SELECT
  USING (true);

CREATE POLICY "Admins manage courts"
  ON public.courts FOR ALL
  USING (public.is_admin())
  WITH CHECK (public.is_admin());

-- Bookings policies
DROP POLICY IF EXISTS "Users view own bookings" ON public.bookings;
DROP POLICY IF EXISTS "Users create bookings" ON public.bookings;
DROP POLICY IF EXISTS "Users update own bookings" ON public.bookings;
DROP POLICY IF EXISTS "Admins view all bookings" ON public.bookings;
DROP POLICY IF EXISTS "Admins manage all bookings" ON public.bookings;

CREATE POLICY "Users view own bookings"
  ON public.bookings FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users create bookings"
  ON public.bookings FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Users can only cancel their own non-cancelled bookings (handled by trigger)
CREATE POLICY "Users update own bookings"
  ON public.bookings FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Admins view all bookings"
  ON public.bookings FOR SELECT
  USING (public.is_admin());

CREATE POLICY "Admins manage all bookings"
  ON public.bookings FOR ALL
  USING (public.is_admin())
  WITH CHECK (public.is_admin());

-- ============================================================================
-- GRANTS
-- ============================================================================

GRANT EXECUTE ON FUNCTION public.get_booked_slots(TEXT, TEXT) TO anon, authenticated;
GRANT EXECUTE ON FUNCTION public.is_admin() TO authenticated;

-- ============================================================================
-- STORAGE BUCKETS & POLICIES
-- ============================================================================

-- Helper function to check folder ownership (create first!)
CREATE OR REPLACE FUNCTION public.storage_filepath_matches_user(filepath TEXT)
RETURNS BOOLEAN
LANGUAGE SQL
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT filepath LIKE auth.uid()::TEXT || '/%';
$$;

GRANT EXECUTE ON FUNCTION public.storage_filepath_matches_user(TEXT) TO authenticated;

-- Avatars bucket (2MB limit)
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
SELECT 'avatars', 'avatars', true, 2097152, ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/gif']
WHERE NOT EXISTS (SELECT 1 FROM storage.buckets WHERE id = 'avatars');

-- Court images bucket (5MB limit)
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
SELECT 'court-images', 'court-images', true, 5242880, ARRAY['image/jpeg', 'image/png', 'image/webp']
WHERE NOT EXISTS (SELECT 1 FROM storage.buckets WHERE id = 'court-images');

-- Avatar storage policies
DROP POLICY IF EXISTS "Users can upload avatar" ON storage.objects;
DROP POLICY IF EXISTS "Users can view avatars" ON storage.objects;
DROP POLICY IF EXISTS "Users can update avatar" ON storage.objects;
DROP POLICY IF EXISTS "Users can delete avatar" ON storage.objects;
DROP POLICY IF EXISTS "Anyone can view avatars" ON storage.objects;

CREATE POLICY "Users can upload avatar"
  ON storage.objects FOR INSERT
  TO authenticated
  WITH CHECK (
    bucket_id = 'avatars'
    AND public.storage_filepath_matches_user(name)
  );

CREATE POLICY "Users can view avatars"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'avatars');

CREATE POLICY "Users can update avatar"
  ON storage.objects FOR UPDATE
  TO authenticated
  USING (
    bucket_id = 'avatars'
    AND public.storage_filepath_matches_user(name)
  )
  WITH CHECK (
    bucket_id = 'avatars'
    AND public.storage_filepath_matches_user(name)
  );

CREATE POLICY "Users can delete avatar"
  ON storage.objects FOR DELETE
  TO authenticated
  USING (
    bucket_id = 'avatars'
    AND public.storage_filepath_matches_user(name)
  );

CREATE POLICY "Anyone can view avatars"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'avatars');

-- Court images storage policies
DROP POLICY IF EXISTS "Anyone can view court images" ON storage.objects;
DROP POLICY IF EXISTS "Admins can upload court images" ON storage.objects;
DROP POLICY IF EXISTS "Admins can update court images" ON storage.objects;
DROP POLICY IF EXISTS "Admins can delete court images" ON storage.objects;

CREATE POLICY "Anyone can view court images"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'court-images');

CREATE POLICY "Admins can upload court images"
  ON storage.objects FOR INSERT
  TO authenticated
  WITH CHECK (
    bucket_id = 'court-images'
    AND public.is_admin()
  );

CREATE POLICY "Admins can update court images"
  ON storage.objects FOR UPDATE
  TO authenticated
  USING (
    bucket_id = 'court-images'
    AND public.is_admin()
  )
  WITH CHECK (
    bucket_id = 'court-images'
    AND public.is_admin()
  );

CREATE POLICY "Admins can delete court images"
  ON storage.objects FOR DELETE
  TO authenticated
  USING (
    bucket_id = 'court-images'
    AND public.is_admin()
  );

-- ============================================================================
-- SEED DATA
-- ============================================================================

-- Seed courts
INSERT INTO public.courts (id, name, type, price_per_hour, surface, image_url, available) VALUES
  ('A1', 'Court A1', 'Premium indoor court', 150000, 'Artificial Grass', '/images/padel1.jpg', true),
  ('A2', 'Court A2', 'Standard indoor court', 100000, 'Artificial Grass', '/images/padel2.jpg', true),
  ('B1', 'Court B1', 'Premium glass court', 150000, 'Panoramic Glass', '/images/padel3.jpg', true),
  ('B2', 'Court B2', 'Standard glass court', 100000, 'Panoramic Glass', '/images/padel4.jpg', true)
ON CONFLICT (id) DO UPDATE SET
  name = excluded.name,
  type = excluded.type,
  price_per_hour = excluded.price_per_hour,
  surface = excluded.surface,
  image_url = COALESCE(public.courts.image_url, excluded.image_url),
  available = excluded.available;

-- ============================================================================
-- ADMIN ACCOUNT SETUP
-- ============================================================================
-- Admin account will be created automatically when user signs up with:
-- Email: admin@padelgo.com
--
-- To create the admin manually (if user already exists):
-- 1. Create user in Supabase Dashboard > Authentication > Add User
-- 2. Email: admin@padelgo.com
-- 3. The trigger will automatically set role='admin' on first profile creation
-- 4. OR run this SQL manually:
--    UPDATE public.profiles SET role = 'admin' WHERE email = 'admin@padelgo.com';
-- ============================================================================
