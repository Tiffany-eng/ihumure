-- Fix Profile Display Issue
-- Run this in your Supabase SQL Editor

-- Check if profile exists for current user
SELECT 
  p.id,
  p.display_name,
  p.created_at,
  p.updated_at,
  au.email,
  au.created_at as user_created_at
FROM profiles p
RIGHT JOIN auth.users au ON p.id = au.id
WHERE au.email = 'YOUR_EMAIL_HERE'; -- Replace with actual email

-- Update profile display name (replace with your actual user ID and display name)
UPDATE profiles 
SET display_name = 'Your Name Here'
WHERE id = 'YOUR_USER_ID_HERE';

-- Check if trigger is working
SELECT 
  trigger_name,
  event_manipulation,
  action_timing,
  action_orientation
FROM information_schema.triggers 
WHERE event_object_table = 'auth.users';

-- Recreate profile trigger if needed
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  -- Insert profile with display name from user metadata
  INSERT INTO public.profiles (id, display_name)
  VALUES (NEW.id, COALESCE(NEW.raw_user_meta_data->>'display_name', 'Friend'));
  
  -- Insert user role
  INSERT INTO public.user_roles (user_id, role)
  VALUES (NEW.id, 'user');
  
  RETURN NEW;
END;
$$;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();

-- Test profile creation
SELECT 
  p.id,
  p.display_name,
  ur.role,
  au.email
FROM profiles p
LEFT JOIN user_roles ur ON p.id = ur.user_id
JOIN auth.users au ON p.id = au.id
LIMIT 5;
