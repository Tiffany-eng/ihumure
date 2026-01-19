-- Fix Chatroom IDs to match frontend (string-based IDs)
-- Run this in your Supabase SQL Editor

-- Drop existing tables and recreate with string IDs
DROP TABLE IF EXISTS message_reports;
DROP TABLE IF EXISTS chat_messages;
DROP TABLE IF EXISTS room_members;
DROP TABLE IF EXISTS chat_rooms;

-- Recreate chat_rooms with string ID
CREATE TABLE chat_rooms (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  is_private BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Recreate room_members with string room_id
CREATE TABLE room_members (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  room_id TEXT REFERENCES chat_rooms(id) ON DELETE CASCADE,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  nickname TEXT NOT NULL,
  joined_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Recreate chat_messages with string room_id
CREATE TABLE chat_messages (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  room_id TEXT REFERENCES chat_rooms(id) ON DELETE CASCADE,
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
CREATE POLICY "Chat rooms are viewable by everyone" ON chat_rooms
  FOR SELECT TO PUBLIC
  USING (true);

-- room_members policies
CREATE POLICY "Users can view own room memberships" ON room_members
  FOR SELECT TO authenticated
  USING ((SELECT auth.uid()) = user_id);

CREATE POLICY "Users can join rooms" ON room_members
  FOR INSERT TO authenticated
  WITH CHECK ((SELECT auth.uid()) = user_id);

CREATE POLICY "Users can leave rooms" ON room_members
  FOR DELETE TO authenticated
  USING ((SELECT auth.uid()) = user_id);

-- chat_messages policies
CREATE POLICY "Chat messages are viewable by everyone" ON chat_messages
  FOR SELECT TO PUBLIC
  USING (true);

CREATE POLICY "Users can insert messages" ON chat_messages
  FOR INSERT TO authenticated
  WITH CHECK ((SELECT auth.uid()) = user_id);

CREATE POLICY "Users can delete own messages" ON chat_messages
  FOR DELETE TO authenticated
  USING ((SELECT auth.uid()) = user_id);

-- Insert default chat rooms with string IDs that match frontend
INSERT INTO chat_rooms (id, name, description, is_private) VALUES
('anxiety', 'Anxiety Support', 'Share experiences and coping strategies for anxiety', FALSE),
('depression', 'Depression Support', 'Community support for managing depression', FALSE),
('ptsd', 'PTSD & Trauma', 'Safe space for trauma and PTSD support', FALSE),
('bipolar', 'Bipolar Support', 'Support for bipolar disorder management', FALSE),
('ocd', 'OCD Support', 'OCD coping strategies and peer support', FALSE),
('stress', 'Stress & Overwhelm', 'Managing stress and feeling overwhelmed', FALSE),
('eating', 'Eating Disorders', 'Support for eating disorder recovery', FALSE),
('addiction', 'Addiction Recovery', 'Addiction recovery support and resources', FALSE),
('grief', 'Grief & Loss', 'Grief counseling and loss support', FALSE),
('burnout', 'Burnout Recovery', 'Recovery from burnout and exhaustion', FALSE),
('adhd', 'ADHD Support', 'ADHD management and support community', FALSE);
