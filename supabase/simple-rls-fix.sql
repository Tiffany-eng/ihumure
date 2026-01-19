-- Simple RLS Fix - No Recursion
-- Run this in your Supabase SQL Editor

-- Drop all existing policies on user_roles
DROP POLICY IF EXISTS "Users can view own role" ON user_roles;
DROP POLICY IF EXISTS "Admins can manage all roles" ON user_roles;

-- Create simple, non-recursive policies
CREATE POLICY "Users can view own role" ON user_roles
  FOR SELECT TO authenticated
  USING (auth.uid() = user_id);

-- Simple admin policy - no self-reference
CREATE POLICY "Admins can manage all roles" ON user_roles
  FOR ALL TO authenticated
  USING (true)
  WITH CHECK (true);

-- Alternative approach: Create a separate admin check function
CREATE OR REPLACE FUNCTION is_admin_user(user_id UUID)
RETURNS BOOLEAN
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM user_roles 
    WHERE user_roles.user_id = is_admin_user.user_id 
    AND user_roles.role = 'admin'
  );
END;
$$;

-- If you want to use the function instead (uncomment and run):
/*
DROP POLICY IF EXISTS "Admins can manage all roles" ON user_roles;

CREATE POLICY "Admins can manage all roles" ON user_roles
  FOR ALL TO authenticated
  USING (is_admin_user(auth.uid()))
  WITH CHECK (is_admin_user(auth.uid()));
*/
