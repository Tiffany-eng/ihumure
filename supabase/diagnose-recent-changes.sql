-- Diagnose Recent Changes
-- Run this in your Supabase SQL Editor to identify what broke profile display

-- Check current user profile with all details
SELECT 
  p.id,
  p.display_name,
  p.created_at,
  p.updated_at,
  au.email,
  au.raw_user_meta_data,
  au.created_at as user_created_at,
  au.email_confirmed_at,
  au.last_sign_in_at
FROM profiles p
JOIN auth.users au ON p.id = au.id
WHERE au.email = 'YOUR_EMAIL_HERE'; -- Replace with your actual email

-- Check if profile trigger exists and when it was created
SELECT 
  tgname,
  tgenabled,
  evtsql,
  tgrelid,
  tgname as table_name
FROM pg_trigger 
WHERE tgname = 'handle_new_user';

-- Check recent changes to profiles table
SELECT 
  schemaname,
  tablename,
  command_type,
  command,
  pg_class.relname as table_modified,
  pg_stat_user.usename as modified_by,
  pg_stat_user.query_start as change_time
FROM pg_stat_user 
JOIN pg_class ON pg_stat_user.staoid = pg_class.oid
WHERE schemaname = 'public' 
AND tablename = 'profiles'
ORDER BY change_time DESC
LIMIT 10;

-- Check if user_roles table was recently modified
SELECT 
  schemaname,
  tablename,
  command_type,
  command,
  pg_class.relname as table_modified,
  pg_stat_user.usename as modified_by,
  pg_stat_user.query_start as change_time
FROM pg_stat_user 
JOIN pg_class ON pg_stat_user.staoid = pg_class.oid
WHERE schemaname = 'public' 
AND tablename = 'user_roles'
ORDER BY change_time DESC
LIMIT 10;

-- Check if auth.users table was recently modified
SELECT 
  schemaname,
  tablename,
  command_type,
  command,
  pg_class.relname as table_modified,
  pg_stat_user.usename as modified_by,
  pg_stat_user.query_start as change_time
FROM pg_stat_user 
JOIN pg_class ON pg_stat_user.staoid = pg_class.oid
WHERE schemaname = 'public' 
AND tablename = 'users'
ORDER BY change_time DESC
LIMIT 10;

-- Check current RLS policies on profiles table
SELECT 
  schemaname,
  tablename,
  policyname,
  permissive,
  roles,
  cmd,
  qual
FROM pg_policies 
WHERE tablename = 'profiles'
ORDER BY policyname;

-- Check if there are any disabled RLS policies
SELECT 
  schemaname,
  tablename,
  forcerls
FROM pg_tables 
WHERE schemaname = 'public' 
AND tablename IN ('profiles', 'user_roles', 'events')
AND forcerls = false;
