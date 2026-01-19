-- Profiles table (auto-created when users sign up)
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  display_name TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Mood entries table
CREATE TABLE public.mood_entries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  mood_level INTEGER NOT NULL,
  mood_label TEXT,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Validation trigger instead of CHECK constraint for mood_level
CREATE OR REPLACE FUNCTION public.validate_mood_level()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.mood_level < 1 OR NEW.mood_level > 10 THEN
    RAISE EXCEPTION 'mood_level must be between 1 and 10';
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER validate_mood_level_trigger
BEFORE INSERT OR UPDATE ON public.mood_entries
FOR EACH ROW EXECUTE FUNCTION public.validate_mood_level();

-- Saved affirmations table
CREATE TABLE public.saved_affirmations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  affirmation_text TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Gratitude entries table
CREATE TABLE public.gratitude_entries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  entry_text TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Chat messages table for live chatrooms
CREATE TABLE public.chat_messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  room_id TEXT NOT NULL,
  nickname TEXT NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Message reports table
CREATE TABLE public.message_reports (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  message_id UUID REFERENCES public.chat_messages(id) ON DELETE CASCADE NOT NULL,
  reason TEXT NOT NULL,
  details TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS on all tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.mood_entries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.saved_affirmations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.gratitude_entries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.chat_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.message_reports ENABLE ROW LEVEL SECURITY;

-- RLS Policies for profiles
CREATE POLICY "Users can view own profile" ON public.profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON public.profiles FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Users can insert own profile" ON public.profiles FOR INSERT WITH CHECK (auth.uid() = id);

-- RLS Policies for mood_entries
CREATE POLICY "Users can view own mood entries" ON public.mood_entries FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own mood entries" ON public.mood_entries FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can delete own mood entries" ON public.mood_entries FOR DELETE USING (auth.uid() = user_id);

-- RLS Policies for saved_affirmations
CREATE POLICY "Users can view own affirmations" ON public.saved_affirmations FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own affirmations" ON public.saved_affirmations FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can delete own affirmations" ON public.saved_affirmations FOR DELETE USING (auth.uid() = user_id);

-- RLS Policies for gratitude_entries
CREATE POLICY "Users can view own gratitude entries" ON public.gratitude_entries FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own gratitude entries" ON public.gratitude_entries FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can delete own gratitude entries" ON public.gratitude_entries FOR DELETE USING (auth.uid() = user_id);

-- Chat messages - public read/write for anonymous chatrooms
CREATE POLICY "Anyone can read chat messages" ON public.chat_messages FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "Anyone can send chat messages" ON public.chat_messages FOR INSERT TO anon, authenticated WITH CHECK (true);

-- Message reports - anyone can report
CREATE POLICY "Anyone can create reports" ON public.message_reports FOR INSERT TO anon, authenticated WITH CHECK (true);

-- Enable realtime for chat messages
ALTER PUBLICATION supabase_realtime ADD TABLE public.chat_messages;

-- Function to handle new user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id)
  VALUES (NEW.id);
  RETURN NEW;
END;
$$;

-- Trigger for new user signup
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$;

-- Trigger for profile updates
CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();