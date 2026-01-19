-- Admin Setup for Existing Policies
-- Run this if you get "policy already exists" errors

-- Drop only admin policies (keep user policies)
DROP POLICY IF EXISTS "Admins can manage events" ON events;
DROP POLICY IF EXISTS "Admins can manage event_registrations" ON event_registrations;
DROP POLICY IF EXISTS "Admins can manage chat_messages" ON chat_messages;
DROP POLICY IF EXISTS "Admins can manage message_reports" ON message_reports;

-- Create admin policies
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

-- Create or update admin user for testing
INSERT INTO user_roles (user_id, role) 
SELECT 
  au.id,
  'admin'
FROM auth.users au 
WHERE au.email = 'admin@ihumure.test'
ON CONFLICT (user_id) DO UPDATE SET role = 'admin';

-- Show current admin policies
SELECT 
  schemaname,
  tablename,
  policyname,
  permissive,
  roles,
  cmd,
  qual
FROM pg_policies 
WHERE tablename IN ('events', 'event_registrations', 'chat_messages', 'message_reports')
  AND policyname LIKE '%admin%'
ORDER BY tablename, policyname;
