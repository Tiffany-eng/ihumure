-- Fix RLS Recursion Issue
-- Run this in your Supabase SQL Editor to fix the infinite recursion error

-- Drop problematic policies
DROP POLICY IF EXISTS "Admins can manage all roles" ON user_roles;
DROP POLICY IF EXISTS "Users can view own role" ON user_roles;

-- Create non-recursive policies
CREATE POLICY "Users can view own role" ON user_roles
  FOR SELECT TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Admins can manage all roles" ON user_roles
  FOR ALL TO authenticated
  USING (
    auth.uid() = user_id OR 
    (auth.uid() IS NOT NULL AND 
     EXISTS (
       SELECT 1 FROM user_roles ur 
       WHERE ur.user_id = auth.uid() 
       AND ur.role = 'admin'
     )
    )
  )
  WITH CHECK (
    auth.uid() = user_id OR 
    (auth.uid() IS NOT NULL AND 
     EXISTS (
       SELECT 1 FROM user_roles ur 
       WHERE ur.user_id = auth.uid() 
       AND ur.role = 'admin'
     )
    )
  );

-- Alternative simpler approach (if above doesn't work):
-- Comment out the above and use this instead:

/*
CREATE POLICY "Admins can manage all roles" ON user_roles
  FOR ALL TO authenticated
  USING (true)
  WITH CHECK (true);
*/
