-- Apply RLS Fix - Option 1
-- Run this in your Supabase SQL Editor to fix the infinite recursion

-- Step 1: Drop problematic policies
DROP POLICY IF EXISTS "Admins can manage all roles" ON user_roles;
DROP POLICY IF EXISTS "Users can view own role" ON user_roles;

-- Step 2: Create fixed policies
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

-- Step 3: Verify policies are created correctly
SELECT 
  schemaname,
  tablename,
  policyname,
  permissive,
  roles,
  cmd,
  qual
FROM pg_policies 
WHERE tablename = 'user_roles';
