-- ============================================================================
-- PadelGo Schema Migration - Add booking_id
-- Safe to run multiple times
-- ============================================================================

-- Step 1: Add booking_id column if not exists
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'bookings' AND column_name = 'booking_id'
  ) THEN
    ALTER TABLE public.bookings ADD COLUMN booking_id TEXT UNIQUE;
    RAISE NOTICE 'Column booking_id added';
  ELSE
    RAISE NOTICE 'Column booking_id already exists';
  END IF;
END $$;

-- Step 2: Update existing records that don't have booking_id
UPDATE public.bookings
SET booking_id = 'PG' || upper(substr(replace(uuid_generate_v4()::text, '-', ''), 1, 6))
WHERE booking_id IS NULL OR booking_id = '';

-- Step 3: Verify
SELECT
  'bookings' as table_name,
  COUNT(*) as total_records,
  COUNT(booking_id) as with_booking_id,
  COUNT(*) FILTER (WHERE booking_id IS NULL) as missing_booking_id
FROM public.bookings;
