-- ============================================================================
-- Quick Fix: Run this ONLY if schema.sql keeps failing
-- This fixes the COALESCE error without dropping anything
-- ============================================================================

-- Fix 1: Add missing columns if not exists
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'bookings' AND column_name = 'booking_id') THEN
    ALTER TABLE public.bookings ADD COLUMN booking_id TEXT UNIQUE;
  END IF;
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'bookings' AND column_name = 'notes') THEN
    ALTER TABLE public.bookings ADD COLUMN notes TEXT;
  END IF;
END $$;

-- Fix 2: Update existing records with booking_id
UPDATE public.bookings
SET booking_id = 'PG' || upper(substr(replace(uuid_generate_v4()::text, '-', ''), 1, 6))
WHERE booking_id IS NULL;

-- Fix 3: Drop and recreate the problematic trigger
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

  IF new.date !~ '^[0-9]{4}-[0-9]{2}-[0-9]{2}$' THEN
    RAISE EXCEPTION 'Tanggal booking tidak valid. Format: YYYY-MM-DD';
  END IF;

  IF new.date::date < current_date THEN
    RAISE EXCEPTION 'Tanggal booking tidak boleh di masa lalu.';
  END IF;

  IF new.start_time !~ '^([01][0-9]|2[0-3]):00$' THEN
    RAISE EXCEPTION 'Jam mulai harus memakai format HH:00';
  END IF;

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
      AND b.id IS DISTINCT FROM new.id
      AND split_part(b.start_time, ':', 1)::INTEGER < end_hour
      AND split_part(b.end_time, ':', 1)::INTEGER > start_hour
  ) THEN
    RAISE EXCEPTION 'Slot sudah dipesan. Pilih waktu lain';
  END IF;

  RETURN new;
END;
$$;

CREATE TRIGGER bookings_validate
  BEFORE INSERT OR UPDATE ON public.bookings
  FOR EACH ROW EXECUTE FUNCTION public.validate_booking();

-- Fix 4: Set booking_id on insert
DROP TRIGGER IF EXISTS bookings_generate_id ON public.bookings;

CREATE OR REPLACE FUNCTION public.set_booking_id()
RETURNS TRIGGER LANGUAGE plpgsql SET search_path = public AS $$
DECLARE
  chars TEXT := 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  result TEXT := '';
  i INTEGER;
BEGIN
  FOR i IN 1..6 LOOP
    result := result || substr(chars, floor(random() * 36 + 1)::INTEGER, 1);
  END LOOP;
  new.booking_id := 'PG' || result;
  RETURN new;
END;
$$;

CREATE TRIGGER bookings_generate_id
  BEFORE INSERT ON public.bookings
  FOR EACH ROW EXECUTE FUNCTION public.set_booking_id();

-- Done!
SELECT 'Fix complete!' as status;
