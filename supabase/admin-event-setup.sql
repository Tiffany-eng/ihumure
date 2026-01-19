-- Admin and Event Management Setup
-- Run this in your Supabase SQL Editor to support admin dashboard

-- Add status column to events table if it doesn't exist
ALTER TABLE events ADD COLUMN IF NOT EXISTS status TEXT DEFAULT 'approved';

-- Update existing events to have approved status
UPDATE events SET status = 'approved' WHERE status IS NULL;

-- Enable Row Level Security for events with admin controls
DROP POLICY IF EXISTS "Events are viewable by everyone" ON events;
DROP POLICY IF EXISTS "Users can register for events" ON events;
DROP POLICY IF EXISTS "Admins can manage events" ON events;

-- Event policies
CREATE POLICY "Events are viewable by everyone" ON events
  FOR SELECT TO PUBLIC
  USING (true);

CREATE POLICY "Users can register for events" ON events
  FOR INSERT TO authenticated
  WITH CHECK (auth.uid() IS NOT NULL);

CREATE POLICY "Users can view own event registrations" ON event_registrations
  FOR SELECT TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own registrations" ON event_registrations
  FOR INSERT TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Admin policies for events
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

-- Function to check if user is admin
CREATE OR REPLACE FUNCTION is_admin(user_id UUID)
RETURNS BOOLEAN
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM user_roles 
    WHERE user_roles.user_id = is_admin.user_id 
    AND user_roles.role = 'admin'
  );
END;
$$;

-- Grant necessary permissions
GRANT USAGE ON SCHEMA public TO authenticated;
GRANT ALL ON ALL TABLES IN SCHEMA public TO authenticated;
