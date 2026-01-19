-- Complete Database Setup for Ihumure Dashboard
-- Run this in your Supabase SQL Editor to fix all issues

-- Drop and recreate all tables with proper schema
DROP TABLE IF EXISTS message_reports CASCADE;
DROP TABLE IF EXISTS chat_messages CASCADE;
DROP TABLE IF EXISTS room_members CASCADE;
DROP TABLE IF EXISTS chat_rooms CASCADE;
DROP TABLE IF EXISTS event_registrations CASCADE;
DROP TABLE IF EXISTS events CASCADE;
DROP TABLE IF EXISTS saved_affirmations CASCADE;
DROP TABLE IF EXISTS gratitude_entries CASCADE;
DROP TABLE IF EXISTS mood_entries CASCADE;
DROP TABLE IF EXISTS user_roles CASCADE;
DROP TABLE IF EXISTS profiles CASCADE;

-- Recreate profiles table
CREATE TABLE profiles (
  id UUID REFERENCES auth.users(id) PRIMARY KEY,
  display_name TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Recreate user_roles table
CREATE TABLE user_roles (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  role TEXT NOT NULL DEFAULT 'user',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Recreate mood_entries table
CREATE TABLE mood_entries (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  mood_level INTEGER NOT NULL CHECK (mood_level >= 1 AND mood_level <= 10),
  mood_label TEXT,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Recreate gratitude_entries table
CREATE TABLE gratitude_entries (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  entry_text TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Recreate saved_affirmations table
CREATE TABLE saved_affirmations (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  affirmation_text TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Recreate events table with all required fields
CREATE TABLE events (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  event_date DATE NOT NULL,
  event_time TEXT DEFAULT '18:00',
  event_type TEXT DEFAULT 'workshop',
  location TEXT,
  max_attendees INTEGER,
  image_url TEXT,
  status TEXT DEFAULT 'approved',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Recreate event_registrations table
CREATE TABLE event_registrations (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  event_id UUID REFERENCES events(id) ON DELETE CASCADE,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  status TEXT DEFAULT 'registered',
  registered_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Recreate chat_rooms table with string IDs
CREATE TABLE chat_rooms (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  is_private BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Recreate room_members table
CREATE TABLE room_members (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  room_id TEXT REFERENCES chat_rooms(id) ON DELETE CASCADE,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  nickname TEXT NOT NULL,
  joined_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Recreate chat_messages table
CREATE TABLE chat_messages (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  room_id TEXT REFERENCES chat_rooms(id) ON DELETE CASCADE,
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  nickname TEXT NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Recreate message_reports table
CREATE TABLE message_reports (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  message_id UUID REFERENCES chat_messages(id) ON DELETE CASCADE,
  reporter_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  reason TEXT NOT NULL,
  details TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE mood_entries ENABLE ROW LEVEL SECURITY;
ALTER TABLE gratitude_entries ENABLE ROW LEVEL SECURITY;
ALTER TABLE saved_affirmations ENABLE ROW LEVEL SECURITY;
ALTER TABLE events ENABLE ROW LEVEL SECURITY;
ALTER TABLE event_registrations ENABLE ROW LEVEL SECURITY;
ALTER TABLE chat_rooms ENABLE ROW LEVEL SECURITY;
ALTER TABLE room_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE chat_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE message_reports ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Users can view own profile" ON profiles
  FOR SELECT TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON profiles
  FOR UPDATE TO authenticated
  USING (auth.uid() = id);

-- User roles policies
CREATE POLICY "Users can view own role" ON user_roles
  FOR SELECT TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Admins can manage all roles" ON user_roles
  FOR ALL TO authenticated
  USING (
    auth.uid() = user_id OR
    EXISTS (
      SELECT 1 FROM user_roles 
      WHERE user_roles.user_id = auth.uid() 
      AND user_roles.role = 'admin'
    )
  )
  WITH CHECK (
    auth.uid() = user_id OR
    EXISTS (
      SELECT 1 FROM user_roles 
      WHERE user_roles.user_id = auth.uid() 
      AND user_roles.role = 'admin'
    )
  );

-- Mood entries policies
CREATE POLICY "Users can view own mood entries" ON mood_entries
  FOR SELECT TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own mood entries" ON mood_entries
  FOR INSERT TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own mood entries" ON mood_entries
  FOR UPDATE TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own mood entries" ON mood_entries
  FOR DELETE TO authenticated
  USING (auth.uid() = user_id);

-- Gratitude entries policies
CREATE POLICY "Users can view own gratitude entries" ON gratitude_entries
  FOR SELECT TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own gratitude entries" ON gratitude_entries
  FOR INSERT TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own gratitude entries" ON gratitude_entries
  FOR UPDATE TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own gratitude entries" ON gratitude_entries
  FOR DELETE TO authenticated
  USING (auth.uid() = user_id);

-- Saved affirmations policies
CREATE POLICY "Users can view own saved affirmations" ON saved_affirmations
  FOR SELECT TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own saved affirmations" ON saved_affirmations
  FOR INSERT TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own saved affirmations" ON saved_affirmations
  FOR DELETE TO authenticated
  USING (auth.uid() = user_id);

-- Events policies
CREATE POLICY "Events are viewable by everyone" ON events
  FOR SELECT TO PUBLIC
  USING (true);

CREATE POLICY "Users can register for events" ON events
  FOR INSERT TO authenticated
  WITH CHECK (auth.uid() IS NOT NULL);

CREATE POLICY "Admins can manage all events" ON events
  FOR ALL TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM user_roles 
      WHERE user_id = auth.uid() AND role = 'admin'
    )
  );

-- Event registrations policies
CREATE POLICY "Users can view own event registrations" ON event_registrations
  FOR SELECT TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own registrations" ON event_registrations
  FOR INSERT TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own registrations" ON event_registrations
  FOR UPDATE TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own registrations" ON event_registrations
  FOR DELETE TO authenticated
  USING (auth.uid() = user_id);

-- Chat rooms policies
CREATE POLICY "Chat rooms are viewable by everyone" ON chat_rooms
  FOR SELECT TO PUBLIC
  USING (true);

-- Room members policies
CREATE POLICY "Users can view own room memberships" ON room_members
  FOR SELECT TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can join rooms" ON room_members
  FOR INSERT TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can leave rooms" ON room_members
  FOR DELETE TO authenticated
  USING (auth.uid() = user_id);

-- Chat messages policies
CREATE POLICY "Chat messages are viewable by everyone" ON chat_messages
  FOR SELECT TO PUBLIC
  USING (true);

CREATE POLICY "Users can insert messages" ON chat_messages
  FOR INSERT TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own messages" ON chat_messages
  FOR UPDATE TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own messages" ON chat_messages
  FOR DELETE TO authenticated
  USING (auth.uid() = user_id);

-- Message reports policies
CREATE POLICY "Users can report messages" ON message_reports
  FOR INSERT TO authenticated
  WITH CHECK (auth.uid() = reporter_id);

CREATE POLICY "Users can view own reports" ON message_reports
  FOR SELECT TO authenticated
  USING (auth.uid() = reporter_id);

-- Insert default chat rooms
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

-- Insert sample events
INSERT INTO events (title, description, event_date, event_time, event_type, location, max_attendees, status) VALUES
('Mindfulness Workshop', 'Learn mindfulness techniques for stress reduction', CURRENT_DATE + INTERVAL '7 days', '10:00', 'workshop', 'Online', 50, 'approved'),
('Mental Health Awareness Day', 'Community event to raise awareness', CURRENT_DATE + INTERVAL '14 days', '14:00', 'community', 'Kigali Convention Center', 200, 'approved');

-- Create trigger for automatic profile creation
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  INSERT INTO public.profiles (id, display_name)
  VALUES (NEW.id, NEW.raw_user_meta_data->>'display_name');
  
  INSERT INTO public.user_roles (user_id, role)
  VALUES (NEW.id, 'user');
  RETURN NEW;
END;
$$;

-- Create trigger
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();
