-- ============================================================================
-- PadelGo Database Schema
-- Frontend: Hugo (Vercel) | Backend: Supabase (PostgreSQL)
-- Version: 5.0 | Last Updated: 2026-07-03
-- ============================================================================
-- Run this from Supabase SQL Editor. Intentionally rerunnable.
-- ============================================================================

-- ============================================================================
-- SECTION 1: DROP EXISTING OBJECTS
-- ============================================================================

DROP TRIGGER IF EXISTS bookings_validate ON public.bookings;
DROP TRIGGER IF EXISTS bookings_generate_id ON public.bookings;
DROP TRIGGER IF EXISTS profiles_touch_updated_at ON public.profiles;
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
DROP TRIGGER IF EXISTS on_auth_user_updated ON auth.users;

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

DROP FUNCTION IF EXISTS public.validate_booking();
DROP FUNCTION IF EXISTS public.touch_updated_at();
DROP FUNCTION IF EXISTS public.handle_new_user();
DROP FUNCTION IF EXISTS public.handle_updated_user();
DROP FUNCTION IF EXISTS public.get_booked_slots(TEXT, TEXT);
DROP FUNCTION IF EXISTS public.storage_filepath_matches_user(TEXT);
DROP FUNCTION IF EXISTS public.generate_booking_id();
DROP FUNCTION IF EXISTS public.set_booking_id();

-- ============================================================================
-- SECTION 2: TABLES
-- ============================================================================

CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
  name TEXT,
  email TEXT UNIQUE,
  phone TEXT,
  avatar_url TEXT,
  created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

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

-- Booking table - add booking_id column if not exists
CREATE TABLE IF NOT EXISTS public.bookings (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users ON DELETE CASCADE NOT NULL,
  court_id TEXT NOT NULL,
  court_name TEXT NOT NULL,
  date TEXT NOT NULL,
  start_time TEXT NOT NULL,
  end_time TEXT NOT NULL,
  duration_hours INTEGER NOT NULL CHECK (duration_hours BETWEEN 1 AND 6),
  amount INTEGER NOT NULL CHECK (amount > 0),
  status TEXT DEFAULT 'pending' NOT NULL CHECK (status IN ('pending', 'approved', 'cancelled')),
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- ============================================================================
-- SECTION 2.5: ADD MISSING COLUMNS (Safe migration)
-- ============================================================================

-- Add booking_id column if not exists
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'bookings' AND column_name = 'booking_id'
  ) THEN
    ALTER TABLE public.bookings ADD COLUMN booking_id TEXT UNIQUE;
    RAISE NOTICE 'Added booking_id column';
  ELSE
    RAISE NOTICE 'booking_id column already exists';
  END IF;
END $$;

-- Add notes column if not exists
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'bookings' AND column_name = 'notes'
  ) THEN
    ALTER TABLE public.bookings ADD COLUMN notes TEXT;
    RAISE NOTICE 'Added notes column';
  ELSE
    RAISE NOTICE 'notes column already exists';
  END IF;
END $$;

-- Update existing records with booking_id
UPDATE public.bookings
SET booking_id = 'PG' || upper(substr(replace(uuid_generate_v4()::TEXT, '-', ''), 1, 6))
WHERE booking_id IS NULL OR booking_id = '';

-- ============================================================================
-- SECTION 3: INDEXES
-- ============================================================================

CREATE INDEX IF NOT EXISTS idx_profiles_email ON public.profiles(email);
CREATE INDEX IF NOT EXISTS idx_bookings_user_id ON public.bookings(user_id);
CREATE INDEX IF NOT EXISTS idx_bookings_booking_id ON public.bookings(booking_id);
CREATE INDEX IF NOT EXISTS idx_bookings_court_date ON public.bookings(court_id, date);
CREATE INDEX IF NOT EXISTS idx_bookings_status ON public.bookings(status);

-- ============================================================================
-- SECTION 4: VIEWS
-- ============================================================================

-- Booking details view with user and court info
CREATE OR REPLACE VIEW public.booking_details AS
SELECT
  bk.id,
  bk.booking_id,
  bk.date,
  TO_CHAR(
    make_date(
      substring(bk.date from 1 for 4)::INTEGER,
      substring(bk.date from 6 for 2)::INTEGER,
      substring(bk.date from 9 for 2)::INTEGER
    ),
    'DD Mon YYYY'
  ) AS date_formatted,
  CASE EXTRACT(DOW FROM make_date(
    substring(bk.date from 1 for 4)::INTEGER,
    substring(bk.date from 6 for 2)::INTEGER,
    substring(bk.date from 9 for 2)::INTEGER
  ))
    WHEN 0 THEN 'Minggu'
    WHEN 1 THEN 'Senin'
    WHEN 2 THEN 'Selasa'
    WHEN 3 THEN 'Rabu'
    WHEN 4 THEN 'Kamis'
    WHEN 5 THEN 'Jumat'
    WHEN 6 THEN 'Sabtu'
  END AS day_name,
  bk.start_time,
  bk.end_time,
  bk.duration_hours,
  bk.court_id,
  bk.court_name,
  c.type AS court_type,
  c.price_per_hour,
  bk.amount,
  TO_CHAR(bk.amount, '999,999,999') AS amount_formatted,
  bk.status,
  CASE bk.status
    WHEN 'pending' THEN 'Menunggu'
    WHEN 'approved' THEN 'Diterima'
    WHEN 'cancelled' THEN 'Dibatalkan'
  END AS status_label,
  bk.user_id,
  p.name AS user_name,
  p.email AS user_email,
  p.phone AS user_phone,
  bk.notes,
  bk.created_at,
  CASE
    WHEN bk.created_at > now() - interval '1 hour' THEN
      EXTRACT(EPOCH FROM (now() - bk.created_at)) / 3600 || ' jam lalu'
    WHEN bk.created_at > now() - interval '1 day' THEN
      EXTRACT(EPOCH FROM (now() - bk.created_at)) / 86400 || ' hari lalu'
    ELSE TO_CHAR(bk.created_at, 'DD Mon YYYY HH24:MI')
  END AS created_ago
FROM public.bookings bk
LEFT JOIN public.courts c ON bk.court_id = c.id
LEFT JOIN public.profiles p ON bk.user_id = p.id;

-- User booking summary view
CREATE OR REPLACE VIEW public.user_booking_summary AS
SELECT
  user_id,
  COUNT(*) AS total_bookings,
  COUNT(*) FILTER (WHERE status = 'pending') AS pending_count,
  COUNT(*) FILTER (WHERE status = 'approved') AS approved_count,
  COUNT(*) FILTER (WHERE status = 'cancelled') AS cancelled_count,
  COALESCE(SUM(amount) FILTER (WHERE status = 'approved'), 0) AS total_spent,
  MAX(created_at) AS last_booking_date
FROM public.bookings
GROUP BY user_id;

-- ============================================================================
-- SECTION 5: FUNCTIONS
-- ============================================================================

-- Generate unique booking ID: PG + 6 random alphanumeric
CREATE OR REPLACE FUNCTION public.generate_booking_id()
RETURNS TEXT LANGUAGE plpgsql AS $$
DECLARE
  new_id TEXT;
  chars TEXT := 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  result TEXT := '';
  i INTEGER;
BEGIN
  FOR i IN 1..6 LOOP
    result := result || substr(chars, floor(random() * 36 + 1)::INTEGER, 1);
  END LOOP;
  new_id := 'PG' || result;

  WHILE EXISTS (SELECT 1 FROM public.bookings WHERE booking_id = new_id) LOOP
    result := '';
    FOR i IN 1..6 LOOP
      result := result || substr(chars, floor(random() * 36 + 1)::INTEGER, 1);
    END LOOP;
    new_id := 'PG' || result;
  END LOOP;

  RETURN new_id;
END;
$$;

-- Auto-update timestamp
CREATE OR REPLACE FUNCTION public.touch_updated_at()
RETURNS TRIGGER LANGUAGE plpgsql SET search_path = public AS $$
BEGIN
  new.updated_at = timezone('utc'::text, now());
  RETURN new;
END;
$$;

-- Auto-generate booking_id before insert
CREATE OR REPLACE FUNCTION public.set_booking_id()
RETURNS TRIGGER LANGUAGE plpgsql SET search_path = public AS $$
BEGIN
  IF new.booking_id IS NULL OR new.booking_id = '' THEN
    new.booking_id := public.generate_booking_id();
  END IF;
  RETURN new;
END;
$$;

-- Create profile on signup
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

-- Update profile on metadata change
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

-- Get booked time slots
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

-- Validate booking
CREATE OR REPLACE FUNCTION public.validate_booking()
RETURNS TRIGGER LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
DECLARE
  court_record RECORD;
  start_hour INTEGER;
  end_hour INTEGER;
BEGIN
  IF new.status IS NULL THEN new.status := 'pending'; END IF;

  -- User can only cancel their own bookings
  IF tg_op = 'UPDATE' AND old.user_id = auth.uid() THEN
    IF old.status != 'cancelled' AND new.status = 'cancelled' THEN RETURN new; END IF;
    IF new.status != 'cancelled' THEN RAISE EXCEPTION 'User hanya dapat membatalkan booking miliknya sendiri.'; END IF;
  END IF;

  IF tg_op = 'UPDATE' AND old.user_id != auth.uid() THEN
    RAISE EXCEPTION 'Anda tidak memiliki akses untuk mengubah booking ini.';
  END IF;

  -- Validate date format
  IF new.date !~ '^[0-9]{4}-[0-9]{2}-[0-9]{2}$' THEN
    RAISE EXCEPTION 'Tanggal booking tidak valid. Format: YYYY-MM-DD';
  END IF;

  IF new.date::date < current_date THEN
    RAISE EXCEPTION 'Tanggal booking tidak boleh di masa lalu.';
  END IF;

  -- Validate time format
  IF new.start_time !~ '^([01][0-9]|2[0-3]):00$' THEN
    RAISE EXCEPTION 'Jam mulai harus memakai format HH:00';
  END IF;
  IF new.end_time !~ '^([01][0-9]|2[0-4]):00$' THEN
    RAISE EXCEPTION 'Jam selesai harus memakai format HH:00';
  END IF;

  start_hour := split_part(new.start_time, ':', 1)::INTEGER;
  end_hour := split_part(new.end_time, ':', 1)::INTEGER;

  IF end_hour <= start_hour OR end_hour > 24 THEN
    RAISE EXCEPTION 'Rentang jam booking tidak valid';
  END IF;

  IF (end_hour - start_hour) NOT BETWEEN 1 AND 6 THEN
    RAISE EXCEPTION 'Durasi booking harus 1 sampai 6 jam';
  END IF;

  SELECT * INTO court_record
  FROM public.courts
  WHERE id = new.court_id AND available = true;

  IF NOT found THEN RAISE EXCEPTION 'Court tidak tersedia'; END IF;

  new.duration_hours := end_hour - start_hour;
  new.court_name := court_record.name;
  new.amount := court_record.price_per_hour * new.duration_hours;

  PERFORM pg_advisory_xact_lock(hashtext(new.court_id || ':' || new.date));

  IF new.status != 'cancelled' AND EXISTS (
    SELECT 1 FROM public.bookings b
    WHERE b.court_id = new.court_id
      AND b.date = new.date
      AND b.status != 'cancelled'
      AND b.id != COALESCE(new.id, '00000000-0000-0000-0000-000000000000'::UUID)
      AND split_part(b.start_time, ':', 1)::INTEGER < end_hour
      AND split_part(b.end_time, ':', 1)::INTEGER > start_hour
  ) THEN
    RAISE EXCEPTION 'Slot sudah dipesan. Pilih waktu lain';
  END IF;

  RETURN new;
END;
$$;

-- ============================================================================
-- SECTION 6: TRIGGERS
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

CREATE TRIGGER bookings_generate_id
  BEFORE INSERT ON public.bookings
  FOR EACH ROW EXECUTE FUNCTION public.set_booking_id();

CREATE TRIGGER bookings_validate
  BEFORE INSERT OR UPDATE ON public.bookings
  FOR EACH ROW EXECUTE FUNCTION public.validate_booking();

-- ============================================================================
-- SECTION 7: ROW LEVEL SECURITY (RLS)
-- ============================================================================

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.courts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users view own profile" ON public.profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users insert own profile" ON public.profiles
  FOR INSERT WITH CHECK (auth.uid() = id);

CREATE POLICY "Users update own profile" ON public.profiles
  FOR UPDATE USING (auth.uid() = id) WITH CHECK (auth.uid() = id);

CREATE POLICY "Anyone view courts" ON public.courts
  FOR SELECT USING (true);

CREATE POLICY "Users view own bookings" ON public.bookings
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users create bookings" ON public.bookings
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users update own bookings" ON public.bookings
  FOR UPDATE USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

-- ============================================================================
-- SECTION 8: STORAGE
-- ============================================================================

CREATE OR REPLACE FUNCTION public.storage_filepath_matches_user(filepath TEXT)
RETURNS BOOLEAN LANGUAGE SQL STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT filepath LIKE auth.uid()::TEXT || '/%';
$$;

GRANT EXECUTE ON FUNCTION public.storage_filepath_matches_user(TEXT) TO authenticated;

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

INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
SELECT 'court-images', 'court-images', true, 5242880, ARRAY['image/jpeg', 'image/png', 'image/webp']
WHERE NOT EXISTS (SELECT 1 FROM storage.buckets WHERE id = 'court-images');

CREATE POLICY "Anyone can view court images" ON storage.objects
  FOR SELECT USING (bucket_id = 'court-images');

-- ============================================================================
-- SECTION 9: GRANTS
-- ============================================================================

GRANT EXECUTE ON FUNCTION public.get_booked_slots(TEXT, TEXT) TO anon, authenticated;
GRANT EXECUTE ON FUNCTION public.generate_booking_id() TO authenticated;
GRANT SELECT ON public.booking_details TO anon, authenticated;
GRANT SELECT ON public.user_booking_summary TO authenticated;

-- ============================================================================
-- SECTION 10: SEED DATA
-- ============================================================================

INSERT INTO public.courts (id, name, type, price_per_hour, surface, image_url, available) VALUES
  ('C1', 'Court 1 - Premium Indoor', 'Premium Indoor', 150000, 'Artificial Grass', '/images/padel1.jpg', true),
  ('C2', 'Court 2 - Standard Indoor', 'Standard Indoor', 100000, 'Artificial Grass', '/images/padel2.jpg', true),
  ('C3', 'Court 3 - Premium Glass', 'Premium Glass', 150000, 'Panoramic Glass', '/images/padel3.jpg', true),
  ('C4', 'Court 4 - Standard Glass', 'Standard Glass', 100000, 'Panoramic Glass', '/images/padel4.jpg', true)
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
