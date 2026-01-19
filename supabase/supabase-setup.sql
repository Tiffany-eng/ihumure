-- Ihumure Supabase Database Setup
-- Run this in your Supabase SQL Editor

-- Create app_role enum
CREATE TYPE app_role AS ENUM ('admin', 'moderator', 'user');

-- Create profiles table
CREATE TABLE IF NOT EXISTS profiles (
  id UUID REFERENCES auth.users(id) PRIMARY KEY,
  display_name TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create user_roles table
CREATE TABLE IF NOT EXISTS user_roles (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  role app_role NOT NULL DEFAULT 'user',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create mood_entries table
CREATE TABLE IF NOT EXISTS mood_entries (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  mood_level INTEGER NOT NULL CHECK (mood_level >= 1 AND mood_level <= 10),
  mood_label TEXT,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create gratitude_entries table
CREATE TABLE IF NOT EXISTS gratitude_entries (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  entry_text TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create saved_affirmations table
CREATE TABLE IF NOT EXISTS saved_affirmations (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  affirmation_text TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create events table
CREATE TABLE IF NOT EXISTS events (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  event_date TIMESTAMP WITH TIME ZONE NOT NULL,
  event_type TEXT DEFAULT 'workshop',
  location TEXT,
  max_attendees INTEGER,
  image_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create event_registrations table
CREATE TABLE IF NOT EXISTS event_registrations (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  event_id UUID REFERENCES events(id) ON DELETE CASCADE,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  status TEXT DEFAULT 'registered',
  registered_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create chat_rooms table (for chat functionality)
CREATE TABLE IF NOT EXISTS chat_rooms (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  is_private BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
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

-- Create room_members table
CREATE TABLE IF NOT EXISTS room_members (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  room_id UUID REFERENCES chat_rooms(id) ON DELETE CASCADE,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  nickname TEXT NOT NULL,
  joined_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create message_reports table
CREATE TABLE IF NOT EXISTS message_reports (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  message_id UUID REFERENCES chat_messages(id) ON DELETE CASCADE,
  reporter_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  reason TEXT NOT NULL,
  details TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create functions
CREATE OR REPLACE FUNCTION has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM user_roles 
    WHERE user_id = _user_id AND role = _role
  );
END;
$$;

CREATE OR REPLACE FUNCTION is_room_member(_user_id UUID, _room_id UUID)
RETURNS BOOLEAN
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM room_members 
    WHERE user_id = _user_id AND room_id = _room_id
  );
END;
$$;

-- Create triggers for updating timestamps
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_profiles_updated_at 
    BEFORE UPDATE ON profiles 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Create profile automatically when user signs up
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, display_name)
  VALUES (new.id, new.raw_user_meta_data->>'display_name');
  
  INSERT INTO public.user_roles (user_id, role)
  VALUES (new.id, 'user');
  
  RETURN new;
END;
$$;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Enable Row Level Security (RLS)
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE mood_entries ENABLE ROW LEVEL SECURITY;
ALTER TABLE gratitude_entries ENABLE ROW LEVEL SECURITY;
ALTER TABLE saved_affirmations ENABLE ROW LEVEL SECURITY;
ALTER TABLE event_registrations ENABLE ROW LEVEL SECURITY;
ALTER TABLE chat_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE room_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE message_reports ENABLE ROW LEVEL SECURITY;

-- RLS Policies

-- Users can view their own profile
CREATE POLICY "Users can view own profile" ON profiles
  FOR SELECT USING (auth.uid() = id);

-- Users can update their own profile
CREATE POLICY "Users can update own profile" ON profiles
  FOR UPDATE USING (auth.uid() = id);

-- Users can view their own role
CREATE POLICY "Users can view own role" ON user_roles
  FOR SELECT USING (auth.uid() = user_id);

-- Users can view their own mood entries
CREATE POLICY "Users can view own mood entries" ON mood_entries
  FOR SELECT USING (auth.uid() = user_id);

-- Users can insert their own mood entries
CREATE POLICY "Users can insert own mood entries" ON mood_entries
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Users can update their own mood entries
CREATE POLICY "Users can update own mood entries" ON mood_entries
  FOR UPDATE USING (auth.uid() = user_id);

-- Users can delete their own mood entries
CREATE POLICY "Users can delete own mood entries" ON mood_entries
  FOR DELETE USING (auth.uid() = user_id);

-- Similar policies for gratitude_entries
CREATE POLICY "Users can view own gratitude entries" ON gratitude_entries
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own gratitude entries" ON gratitude_entries
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own gratitude entries" ON gratitude_entries
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own gratitude entries" ON gratitude_entries
  FOR DELETE USING (auth.uid() = user_id);

-- Similar policies for saved_affirmations
CREATE POLICY "Users can view own saved affirmations" ON saved_affirmations
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own saved affirmations" ON saved_affirmations
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own saved affirmations" ON saved_affirmations
  FOR DELETE USING (auth.uid() = user_id);

-- Event policies
CREATE POLICY "Events are viewable by everyone" ON events
  FOR SELECT USING (true);

CREATE POLICY "Users can register for events" ON event_registrations
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can view own event registrations" ON event_registrations
  FOR SELECT USING (auth.uid() = user_id);

-- Chat policies
CREATE POLICY "Chat messages are viewable by room members" ON chat_messages
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM room_members 
      WHERE room_members.room_id = chat_messages.room_id 
      AND room_members.user_id = auth.uid()
    )
  );

CREATE POLICY "Room members can insert messages" ON chat_messages
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM room_members 
      WHERE room_members.room_id = chat_messages.room_id 
      AND room_members.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can view own room memberships" ON room_members
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can join rooms" ON room_members
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can leave rooms" ON room_members
  FOR DELETE USING (auth.uid() = user_id);

-- Message reports policies
CREATE POLICY "Users can report messages" ON message_reports
  FOR INSERT WITH CHECK (auth.uid() = reporter_id);

-- Insert some sample data
INSERT INTO chat_rooms (name, description, is_private) VALUES
('General Support', 'A safe space for general mental health discussions', FALSE),
('Anxiety Support', 'Share experiences and coping strategies for anxiety', FALSE),
('Depression Support', 'Community support for managing depression', FALSE),
('Wellness Tips', 'Share and learn wellness strategies', FALSE);

INSERT INTO events (title, description, event_date, event_type, location) VALUES
('Mindfulness Workshop', 'Learn mindfulness techniques for stress reduction', NOW() + INTERVAL '7 days', 'workshop', 'Online'),
('Mental Health Awareness Day', 'Community event to raise awareness', NOW() + INTERVAL '14 days', 'community', 'Kigali Convention Center'),
('Stress Management Seminar', 'Professional guidance on managing stress', NOW() + INTERVAL '21 days', 'seminar', 'Online');
