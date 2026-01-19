-- Drop existing permissive policies on chat_messages
DROP POLICY IF EXISTS "Anyone can read chat messages" ON public.chat_messages;
DROP POLICY IF EXISTS "Anyone can send chat messages" ON public.chat_messages;

-- Create new restrictive policies requiring authentication
-- Only authenticated users can read messages in any room
CREATE POLICY "Authenticated users can read chat messages"
ON public.chat_messages
FOR SELECT
TO authenticated
USING (true);

-- Only authenticated users can send messages
CREATE POLICY "Authenticated users can send chat messages"
ON public.chat_messages
FOR INSERT
TO authenticated
WITH CHECK (true);

-- Allow users to delete their own messages (based on nickname matching their display_name in profiles)
CREATE POLICY "Users can delete own chat messages"
ON public.chat_messages
FOR DELETE
TO authenticated
USING (
  nickname = (SELECT display_name FROM public.profiles WHERE id = auth.uid())
);

-- Drop existing permissive policy on message_reports
DROP POLICY IF EXISTS "Anyone can create reports" ON public.message_reports;

-- Only authenticated users can create reports
CREATE POLICY "Authenticated users can create reports"
ON public.message_reports
FOR INSERT
TO authenticated
WITH CHECK (true);

-- Add user_id column to message_reports for accountability
ALTER TABLE public.message_reports
ADD COLUMN IF NOT EXISTS reporter_id uuid REFERENCES auth.users(id);

-- Create admin role system for managing reports
CREATE TYPE public.app_role AS ENUM ('admin', 'moderator', 'user');

CREATE TABLE IF NOT EXISTS public.user_roles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role app_role NOT NULL,
  created_at timestamptz DEFAULT now(),
  UNIQUE (user_id, role)
);

ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Security definer function to check roles
CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role app_role)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
      AND role = _role
  )
$$;

-- Only admins and moderators can view reports
CREATE POLICY "Admins can view reports"
ON public.message_reports
FOR SELECT
TO authenticated
USING (public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'moderator'));

-- Users can only view their own roles
CREATE POLICY "Users can view own roles"
ON public.user_roles
FOR SELECT
TO authenticated
USING (user_id = auth.uid());

-- Only admins can manage roles
CREATE POLICY "Admins can manage roles"
ON public.user_roles
FOR ALL
TO authenticated
USING (public.has_role(auth.uid(), 'admin'))
WITH CHECK (public.has_role(auth.uid(), 'admin'));