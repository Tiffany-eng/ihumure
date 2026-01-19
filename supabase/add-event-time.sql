-- Add event_time field to events table
-- Run this in your Supabase SQL Editor

-- Add event_time column to events table
ALTER TABLE events ADD COLUMN IF NOT EXISTS event_time TEXT DEFAULT '18:00';

-- Update existing events to have default time
UPDATE events SET event_time = '18:00' WHERE event_time IS NULL;

-- Update RLS policies to include event_time
DROP POLICY IF EXISTS "Admins can manage events" ON events;

CREATE POLICY "Admins can manage events" ON events
  FOR ALL TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM user_roles 
      WHERE user_id = auth.uid() AND role = 'admin'
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM user_roles 
      WHERE user_id = auth.uid() AND role = 'admin'
    )
  );
