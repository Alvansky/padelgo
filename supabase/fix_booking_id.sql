-- ============================================================================
-- PadelGo Schema - Full Migration
-- Run this ONCE in Supabase SQL Editor to create/update all tables
-- ============================================================================

-- Step 1: Check current table structure first
DO $$
BEGIN
  RAISE NOTICE 'Checking current bookings table structure...';
END $$;

-- Step 2: Create generate_booking_id function
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

-- Step 3: Add booking_id column (will fail silently if exists)
ALTER TABLE public.bookings ADD COLUMN IF NOT EXISTS booking_id TEXT UNIQUE;

-- Step 4: Update existing records with booking_id
UPDATE public.bookings
SET booking_id = public.generate_booking_id()
WHERE booking_id IS NULL;

-- Step 5: Verify result
SELECT
  'bookings' as table_name,
  COUNT(*) as total_records,
  COUNT(booking_id) as with_booking_id
FROM public.bookings;
