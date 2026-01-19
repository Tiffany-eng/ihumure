-- Create room_members table to track who can see messages in which rooms
CREATE TABLE IF NOT EXISTS public.room_members (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  room_id text NOT NULL,
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  nickname text NOT NULL,
  joined_at timestamptz DEFAULT now(),
  UNIQUE (room_id, user_id)
);

ALTER TABLE public.room_members ENABLE ROW LEVEL SECURITY;

-- Users can view their own room memberships
CREATE POLICY "Users can view own room memberships"
ON public.room_members
FOR SELECT
TO authenticated
USING (user_id = auth.uid());

-- Users can join rooms
CREATE POLICY "Users can join rooms"
ON public.room_members
FOR INSERT
TO authenticated
WITH CHECK (user_id = auth.uid());

-- Users can leave rooms (delete their membership)
CREATE POLICY "Users can leave rooms"
ON public.room_members
FOR DELETE
TO authenticated
USING (user_id = auth.uid());

-- Drop old permissive chat_messages policies  
DROP POLICY IF EXISTS "Authenticated users can read chat messages" ON public.chat_messages;
DROP POLICY IF EXISTS "Authenticated users can send chat messages" ON public.chat_messages;
DROP POLICY IF EXISTS "Users can delete own chat messages" ON public.chat_messages;

-- Add user_id column to chat_messages for proper tracking
ALTER TABLE public.chat_messages
ADD COLUMN IF NOT EXISTS user_id uuid REFERENCES auth.users(id);

-- Create function to check room membership
CREATE OR REPLACE FUNCTION public.is_room_member(_user_id uuid, _room_id text)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.room_members
    WHERE user_id = _user_id
      AND room_id = _room_id
  )
$$;

-- Users can only read messages from rooms they are members of
CREATE POLICY "Users can read messages from joined rooms"
ON public.chat_messages
FOR SELECT
TO authenticated
USING (public.is_room_member(auth.uid(), room_id));

-- Users can only send messages to rooms they are members of
CREATE POLICY "Users can send messages to joined rooms"
ON public.chat_messages
FOR INSERT
TO authenticated
WITH CHECK (
  user_id = auth.uid() AND
  public.is_room_member(auth.uid(), room_id)
);

-- Users can delete their own messages
CREATE POLICY "Users can delete own messages"
ON public.chat_messages
FOR DELETE
TO authenticated
USING (user_id = auth.uid());

-- Fix message_reports INSERT policy to prevent reporter impersonation
DROP POLICY IF EXISTS "Authenticated users can create reports" ON public.message_reports;

CREATE POLICY "Authenticated users can create own reports"
ON public.message_reports
FOR INSERT
TO authenticated
WITH CHECK (reporter_id = auth.uid());

-- Enable realtime for room_members (for presence tracking)
ALTER TABLE public.room_members REPLICA IDENTITY FULL;
ALTER PUBLICATION supabase_realtime ADD TABLE public.room_members;