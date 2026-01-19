-- Complete Admin Dashboard Setup
-- Run this in your Supabase SQL Editor to fix admin functionality

-- Drop and recreate admin policies
DROP POLICY IF EXISTS "Admins can manage events" ON events;
DROP POLICY IF EXISTS "Admins can manage event_registrations" ON event_registrations;

-- Complete admin policies for events
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

-- Admin policies for event_registrations
CREATE POLICY "Admins can manage event_registrations" ON event_registrations
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

-- Admin policies for chat moderation
CREATE POLICY "Admins can manage chat_messages" ON chat_messages
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

-- Admin policies for message_reports
CREATE POLICY "Admins can manage message_reports" ON message_reports
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

-- Create admin user for testing (optional)
INSERT INTO auth.users (
  id,
  email,
  created_at
) VALUES (
  gen_random_uuid(),
  'admin@ihumure.test',
  NOW()
) ON CONFLICT DO NOTHING;

-- Insert admin role for testing
INSERT INTO user_roles (user_id, role) 
SELECT 
  au.id,
  'admin'
FROM auth.users au 
WHERE au.email = 'admin@ihumure.test'
ON CONFLICT DO NOTHING;

-- Grant necessary permissions
GRANT ALL ON ALL TABLES IN SCHEMA public TO authenticated;
GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO authenticated;

-- Show current policies for verification
SELECT 
  schemaname,
  tablename,
  policyname,
  permissive,
  roles,
  cmd,
  qual
FROM pg_policies 
WHERE schemaname = 'public'
ORDER BY tablename, policyname;
