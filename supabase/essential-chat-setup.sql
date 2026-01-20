-- Essential Chatroom Setup for Ihumure (idempotent)

-- Create chat_rooms table first
CREATE TABLE IF NOT EXISTS chat_rooms (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  is_private BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create room_members table
CREATE TABLE IF NOT EXISTS room_members (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  room_id UUID REFERENCES chat_rooms(id) ON DELETE CASCADE,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  nickname TEXT NOT NULL,
  joined_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create chat_messages table
CREATE TABLE IF NOT EXISTS chat_messages (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  room_id UUID REFERENCES chat_rooms(id) ON DELETE CASCADE,
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  nickname TEXT NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE chat_rooms ENABLE ROW LEVEL SECURITY;
ALTER TABLE room_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE chat_messages ENABLE ROW LEVEL SECURITY;

-- Chat rooms policies
DROP POLICY IF EXISTS "Chat rooms are viewable by everyone" ON chat_rooms;
CREATE POLICY "Chat rooms are viewable by everyone" ON chat_rooms
  FOR SELECT TO PUBLIC
  USING (true);

-- room_members policies
DROP POLICY IF EXISTS "Users can view own room memberships" ON room_members;
CREATE POLICY "Users can view own room memberships" ON room_members
  FOR SELECT TO authenticated
  USING ((SELECT auth.uid()) = user_id);

DROP POLICY IF EXISTS "Users can join rooms" ON room_members;
CREATE POLICY "Users can join rooms" ON room_members
  FOR INSERT TO authenticated
  WITH CHECK ((SELECT auth.uid()) = user_id);

DROP POLICY IF EXISTS "Users can leave rooms" ON room_members;
CREATE POLICY "Users can leave rooms" ON room_members
  FOR DELETE TO authenticated
  USING ((SELECT auth.uid()) = user_id);

-- chat_messages policies
DROP POLICY IF EXISTS "Chat messages are viewable by everyone" ON chat_messages;
CREATE POLICY "Chat messages are viewable by everyone" ON chat_messages
  FOR SELECT TO PUBLIC
  USING (true);

DROP POLICY IF EXISTS "Users can insert messages" ON chat_messages;
CREATE POLICY "Users can insert messages" ON chat_messages
  FOR INSERT TO authenticated
  WITH CHECK ((SELECT auth.uid()) = user_id);

DROP POLICY IF EXISTS "Users can delete own messages" ON chat_messages;
CREATE POLICY "Users can delete own messages" ON chat_messages
  FOR DELETE TO authenticated
  USING ((SELECT auth.uid()) = user_id);

-- Insert default chat rooms (idempotent)
INSERT INTO chat_rooms (name, description, is_private) VALUES
('Anxiety Support', 'Share experiences and coping strategies for anxiety', FALSE),
('Depression Support', 'Community support for managing depression', FALSE),
('PTSD & Trauma', 'Safe space for trauma and PTSD support', FALSE),
('Bipolar Support', 'Support for bipolar disorder management', FALSE),
('OCD Support', 'OCD coping strategies and peer support', FALSE),
('Stress & Overwhelm', 'Managing stress and feeling overwhelmed', FALSE),
('Eating Disorders', 'Support for eating disorder recovery', FALSE),
('Addiction Recovery', 'Addiction recovery support and resources', FALSE),
('Grief & Loss', 'Grief counseling and loss support', FALSE),
('Burnout Recovery', 'Recovery from burnout and exhaustion', FALSE),
('ADHD Support', 'ADHD management and support community', FALSE)
ON CONFLICT (id) DO NOTHING;