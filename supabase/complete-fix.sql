-- ============================================================================
-- Complete Database Fix
-- Run this ONCE in Supabase SQL Editor
-- ============================================================================

-- Fix 1: Add id default if missing
DO $$
BEGIN
  -- Check if id column needs default
  IF NOT EXISTS (
    SELECT 1 FROM pg_attrdef
    WHERE adrelid = 'public.bookings'::regclass
    AND adnum = 1
    AND pg_get_expr(adbin, adrelid) LIKE '%gen_random_uuid%'
  ) THEN
    ALTER TABLE public.bookings ALTER COLUMN id SET DEFAULT gen_random_uuid();
  END IF;
END $$;

-- Fix 2: Add missing columns
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'bookings' AND column_name = 'booking_id') THEN
    ALTER TABLE public.bookings ADD COLUMN booking_id TEXT UNIQUE;
  END IF;
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'bookings' AND column_name = 'notes') THEN
    ALTER TABLE public.bookings ADD COLUMN notes TEXT;
  END IF;
END $$;

-- Fix 3: Update existing records with booking_id
UPDATE public.bookings
SET booking_id = 'PG' || upper(substr(replace(uuid_generate_v4()::text, '-', ''), 1, 6))
WHERE booking_id IS NULL;

-- Fix 4: Recreate validate_booking trigger
DROP TRIGGER IF EXISTS bookings_validate ON public.bookings;

CREATE OR REPLACE FUNCTION public.validate_booking()
RETURNS TRIGGER LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
DECLARE
  court_record RECORD;
  start_hour INTEGER;
  end_hour INTEGER;
BEGIN
  IF new.status IS NULL THEN new.status := 'pending'; END IF;
  start_hour := split_part(new.start_time, ':', 1)::INTEGER;
  end_hour := split_part(new.end_time, ':', 1)::INTEGER;
  IF new.date !~ '^[0-9]{4}-[0-9]{2}-[0-9]{2}$' THEN RAISE EXCEPTION 'Tanggal tidak valid'; END IF;
  IF new.date::date < current_date THEN RAISE EXCEPTION 'Tanggal tidak boleh lalu'; END IF;
  IF end_hour <= start_hour OR end_hour > 24 THEN RAISE EXCEPTION 'Jam tidak valid'; END IF;
  IF (end_hour - start_hour) NOT BETWEEN 1 AND 6 THEN RAISE EXCEPTION 'Durasi 1-6 jam'; END IF;
  SELECT * INTO court_record FROM public.courts WHERE id = new.court_id AND available = true;
  IF NOT found THEN RAISE EXCEPTION 'Court tidak tersedia'; END IF;
  new.duration_hours := end_hour - start_hour;
  new.court_name := court_record.name;
  new.amount := court_record.price_per_hour * new.duration_hours;
  IF new.status != 'cancelled' AND EXISTS (
    SELECT 1 FROM public.bookings b WHERE b.court_id = new.court_id AND b.date = new.date
    AND b.status != 'cancelled' AND b.id IS DISTINCT FROM new.id
    AND split_part(b.start_time, ':', 1)::INTEGER < end_hour
    AND split_part(b.end_time, ':', 1)::INTEGER > start_hour
  ) THEN RAISE EXCEPTION 'Slot sudah dipesan'; END IF;
  RETURN new;
END;
$$;

CREATE TRIGGER bookings_validate BEFORE INSERT OR UPDATE ON public.bookings FOR EACH ROW EXECUTE FUNCTION public.validate_booking();

-- Fix 5: Recreate set_booking_id trigger
DROP TRIGGER IF EXISTS bookings_generate_id ON public.bookings;

CREATE OR REPLACE FUNCTION public.set_booking_id()
RETURNS TRIGGER LANGUAGE plpgsql SET search_path = public AS $$
DECLARE
  chars TEXT := 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  result TEXT := '';
  i INTEGER;
BEGIN
  FOR i IN 1..6 LOOP result := result || substr(chars, floor(random() * 36 + 1)::INTEGER, 1); END LOOP;
  new.booking_id := 'PG' || result;
  RETURN new;
END;
$$;

CREATE TRIGGER bookings_generate_id BEFORE INSERT ON public.bookings FOR EACH ROW EXECUTE FUNCTION public.set_booking_id();

-- Done!
SELECT 'Fix complete!' as status,
       (SELECT COUNT(*) FROM public.bookings) as total_bookings,
       (SELECT COUNT(booking_id) FROM public.bookings) as with_booking_id;
