-- ============================================================================
-- PadelGo Database Schema
-- Frontend: Hugo (Vercel) | Backend: Supabase (PostgreSQL)
-- Version: 3.0 | Last Updated: 2026-07-03
-- ============================================================================
-- Run this from Supabase SQL Editor. Intentionally rerunnable.
-- ============================================================================

-- ============================================================================
-- SECTION 1: DROP EXISTING OBJECTS
-- Order matters: triggers → policies → functions → tables
-- ============================================================================

-- Drop triggers
DROP TRIGGER IF EXISTS bookings_validate ON public.bookings;
DROP TRIGGER IF EXISTS profiles_touch_updated_at ON public.profiles;
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
DROP TRIGGER IF EXISTS on_auth_user_updated ON auth.users;

-- Drop policies
DROP POLICY IF EXISTS "Users view own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users insert own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users update own profile" ON public.profiles;
DROP POLICY IF EXISTS "Anyone view courts" ON public.courts;
DROP POLICY IF EXISTS "Users view own bookings" ON public.bookings;
DROP POLICY IF EXISTS "Users create bookings" ON public.bookings;
DROP POLICY IF EXISTS "Users update own bookings" ON public.bookings;
DROP POLICY IF EXISTS "Users can upload avatar" ON storage.objects;
DROP POLICY IF EXISTS "Users can view avatars" ON storage.objects;
DROP POLICY IF EXISTS "Users can update avatar" ON storage.objects;
DROP POLICY IF EXISTS "Users can delete avatar" ON storage.objects;
DROP POLICY IF EXISTS "Anyone can view avatars" ON storage.objects;
DROP POLICY IF EXISTS "Anyone can view court images" ON storage.objects;

-- Drop functions
DROP FUNCTION IF EXISTS public.validate_booking();
DROP FUNCTION IF EXISTS public.touch_updated_at();
DROP FUNCTION IF EXISTS public.handle_new_user();
DROP FUNCTION IF EXISTS public.handle_updated_user();
DROP FUNCTION IF EXISTS public.get_booked_slots(TEXT, TEXT);
DROP FUNCTION IF EXISTS public.storage_filepath_matches_user(TEXT);

-- ============================================================================
-- SECTION 2: TABLES
-- ============================================================================

-- Table: profiles - User information
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
  name TEXT,
  email TEXT UNIQUE,
  phone TEXT,
  avatar_url TEXT,
  created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Table: courts - Padel court information
CREATE TABLE IF NOT EXISTS public.courts (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  type TEXT,
  price_per_hour INTEGER NOT NULL CHECK (price_per_hour > 0),
  surface TEXT,
  image_url TEXT,
  available BOOLEAN DEFAULT true NOT NULL,
  created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Table: bookings - Booking records
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
-- SECTION 3: INDEXES
-- ============================================================================

CREATE INDEX IF NOT EXISTS idx_profiles_email ON public.profiles(email);
CREATE INDEX IF NOT EXISTS idx_bookings_user_id ON public.bookings(user_id);
CREATE INDEX IF NOT EXISTS idx_bookings_court_date ON public.bookings(court_id, date);
CREATE INDEX IF NOT EXISTS idx_bookings_status ON public.bookings(status);

-- ============================================================================
-- SECTION 4: FUNCTIONS
-- ============================================================================

-- Function: touch_updated_at() - Auto-update timestamp
CREATE OR REPLACE FUNCTION public.touch_updated_at()
RETURNS TRIGGER LANGUAGE plpgsql SET search_path = public AS $$
BEGIN
  new.updated_at = timezone('utc'::text, now());
  RETURN new;
END;
$$;

-- Function: handle_new_user() - Create profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
BEGIN
  INSERT INTO public.profiles (id, name, email, avatar_url)
  VALUES (
    new.id,
    COALESCE(NULLIF(new.raw_user_meta_data->>'name', ''), 'Player'),
    new.email,
    COALESCE(
      NULLIF(new.raw_user_meta_data->>'avatar_url', ''),
      NULLIF(new.raw_user_meta_data->>'avatar', '')
    )
  )
  ON CONFLICT (id) DO UPDATE SET
    email = excluded.email,
    name = COALESCE(public.profiles.name, excluded.name),
    avatar_url = COALESCE(public.profiles.avatar_url, excluded.avatar_url);
  RETURN new;
END;
$$;

-- Function: handle_updated_user() - Update profile on metadata change
CREATE OR REPLACE FUNCTION public.handle_updated_user()
RETURNS TRIGGER LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
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

-- Function: get_booked_slots() - Get booked time slots
CREATE OR REPLACE FUNCTION public.get_booked_slots(p_court_id TEXT, p_date TEXT)
RETURNS TABLE (start_time TEXT, end_time TEXT, duration_hours INTEGER, status TEXT)
LANGUAGE SQL STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT b.start_time, b.end_time, b.duration_hours, b.status
  FROM public.bookings b
  WHERE b.court_id = p_court_id
    AND b.date = p_date
    AND b.status != 'cancelled'
  ORDER BY b.start_time;
$$;

-- Function: validate_booking() - Validate and auto-populate booking
CREATE OR REPLACE FUNCTION public.validate_booking()
RETURNS TRIGGER LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
DECLARE
  court_record RECORD;
  start_hour INTEGER;
  end_hour INTEGER;
BEGIN
  -- Set default status
  IF new.status IS NULL THEN new.status := 'pending'; END IF;

  -- User can only cancel their own bookings
  IF tg_op = 'UPDATE' AND old.user_id = auth.uid() THEN
    IF old.status != 'cancelled' AND new.status = 'cancelled' THEN
      RETURN new;
    END IF;
    IF new.status != 'cancelled' THEN
      RAISE EXCEPTION 'User hanya dapat mengubah status booking miliknya sendiri.';
    END IF;
  END IF;

  -- Block non-owners from updating
  IF tg_op = 'UPDATE' AND old.user_id != auth.uid() THEN
    RAISE EXCEPTION 'Anda tidak memiliki akses untuk mengubah booking ini.';
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

  -- Parse and validate time range
  start_hour := split_part(new.start_time, ':', 1)::INTEGER;
  end_hour := split_part(new.end_time, ':', 1)::INTEGER;

  IF end_hour <= start_hour OR end_hour > 24 THEN
    RAISE EXCEPTION 'Rentang jam booking tidak valid';
  END IF;

  IF (end_hour - start_hour) NOT BETWEEN 1 AND 4 THEN
    RAISE EXCEPTION 'Durasi booking harus 1 sampai 4 jam';
  END IF;

  -- Verify court exists and is available
  SELECT * INTO court_record
  FROM public.courts
  WHERE id = new.court_id AND available = true;

  IF NOT found THEN
    RAISE EXCEPTION 'Court tidak tersedia';
  END IF;

  -- Auto-populate derived fields
  new.duration_hours := end_hour - start_hour;
  new.court_name := court_record.name;
  new.amount := court_record.price_per_hour * new.duration_hours;

  -- Prevent double booking
  PERFORM pg_advisory_xact_lock(hashtext(new.court_id || ':' || new.date));

  IF new.status != 'cancelled' AND EXISTS (
    SELECT 1 FROM public.bookings b
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
-- SECTION 5: TRIGGERS
-- ============================================================================

CREATE TRIGGER profiles_touch_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.touch_updated_at();

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

CREATE TRIGGER on_auth_user_updated
  AFTER UPDATE OF email, raw_user_meta_data ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_user();

CREATE TRIGGER bookings_validate
  BEFORE INSERT OR UPDATE ON public.bookings
  FOR EACH ROW EXECUTE FUNCTION public.validate_booking();

-- ============================================================================
-- SECTION 6: ROW LEVEL SECURITY (RLS)
-- ============================================================================

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.courts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;

-- Profiles: Users can only manage their own profile
CREATE POLICY "Users view own profile" ON public.profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users insert own profile" ON public.profiles
  FOR INSERT WITH CHECK (auth.uid() = id);

CREATE POLICY "Users update own profile" ON public.profiles
  FOR UPDATE USING (auth.uid() = id) WITH CHECK (auth.uid() = id);

-- Courts: Anyone can view courts
CREATE POLICY "Anyone view courts" ON public.courts
  FOR SELECT USING (true);

-- Bookings: Users can manage their own bookings
CREATE POLICY "Users view own bookings" ON public.bookings
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users create bookings" ON public.bookings
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users update own bookings" ON public.bookings
  FOR UPDATE USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

-- ============================================================================
-- SECTION 7: STORAGE
-- ============================================================================

CREATE OR REPLACE FUNCTION public.storage_filepath_matches_user(filepath TEXT)
RETURNS BOOLEAN LANGUAGE SQL STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT filepath LIKE auth.uid()::TEXT || '/%';
$$;

GRANT EXECUTE ON FUNCTION public.storage_filepath_matches_user(TEXT) TO authenticated;

-- Avatars bucket (2MB)
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
SELECT 'avatars', 'avatars', true, 2097152, ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/gif']
WHERE NOT EXISTS (SELECT 1 FROM storage.buckets WHERE id = 'avatars');

CREATE POLICY "Users can upload avatar" ON storage.objects
  FOR INSERT TO authenticated WITH CHECK (
    bucket_id = 'avatars' AND public.storage_filepath_matches_user(name)
  );

CREATE POLICY "Users can view avatars" ON storage.objects
  FOR SELECT USING (bucket_id = 'avatars');

CREATE POLICY "Users can update avatar" ON storage.objects
  FOR UPDATE TO authenticated USING (
    bucket_id = 'avatars' AND public.storage_filepath_matches_user(name)
  ) WITH CHECK (
    bucket_id = 'avatars' AND public.storage_filepath_matches_user(name)
  );

CREATE POLICY "Users can delete avatar" ON storage.objects
  FOR DELETE TO authenticated USING (
    bucket_id = 'avatars' AND public.storage_filepath_matches_user(name)
  );

CREATE POLICY "Anyone can view avatars" ON storage.objects
  FOR SELECT USING (bucket_id = 'avatars');

-- Court images bucket (5MB)
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
SELECT 'court-images', 'court-images', true, 5242880, ARRAY['image/jpeg', 'image/png', 'image/webp']
WHERE NOT EXISTS (SELECT 1 FROM storage.buckets WHERE id = 'court-images');

CREATE POLICY "Anyone can view court images" ON storage.objects
  FOR SELECT USING (bucket_id = 'court-images');

-- ============================================================================
-- SECTION 8: GRANTS
-- ============================================================================

GRANT EXECUTE ON FUNCTION public.get_booked_slots(TEXT, TEXT) TO anon, authenticated;

-- ============================================================================
-- SECTION 9: SEED DATA
-- ============================================================================

INSERT INTO public.courts (id, name, type, price_per_hour, surface, image_url, available) VALUES
  ('C1', 'Court 1 - Premium Indoor', 'Premium indoor court', 150000, 'Artificial Grass', '/images/padel1.jpg', true),
  ('C2', 'Court 2 - Standard Indoor', 'Standard indoor court', 100000, 'Artificial Grass', '/images/padel2.jpg', true),
  ('C3', 'Court 3 - Premium Glass', 'Premium glass court', 150000, 'Panoramic Glass', '/images/padel3.jpg', true),
  ('C4', 'Court 4 - Standard Glass', 'Standard glass court', 100000, 'Panoramic Glass', '/images/padel4.jpg', true)
ON CONFLICT (id) DO UPDATE SET
  name = excluded.name,
  type = excluded.type,
  price_per_hour = excluded.price_per_hour,
  surface = excluded.surface,
  image_url = COALESCE(public.courts.image_url, excluded.image_url),
  available = excluded.available;

-- ============================================================================
-- END OF SCHEMA
-- ============================================================================
