-- Create events table
CREATE TABLE public.events (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  event_date TIMESTAMP WITH TIME ZONE NOT NULL,
  event_type TEXT NOT NULL DEFAULT 'workshop',
  location TEXT,
  max_attendees INTEGER,
  image_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create event_registrations table
CREATE TABLE public.event_registrations (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  event_id UUID NOT NULL REFERENCES public.events(id) ON DELETE CASCADE,
  user_id UUID NOT NULL,
  registered_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  status TEXT NOT NULL DEFAULT 'confirmed',
  UNIQUE(event_id, user_id)
);

-- Enable RLS
ALTER TABLE public.events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.event_registrations ENABLE ROW LEVEL SECURITY;

-- Events are public to view
CREATE POLICY "Anyone can view events" 
ON public.events 
FOR SELECT 
USING (true);

-- Only admins can manage events
CREATE POLICY "Admins can manage events" 
ON public.events 
FOR ALL 
USING (has_role(auth.uid(), 'admin'));

-- Users can view their own registrations
CREATE POLICY "Users can view own registrations" 
ON public.event_registrations 
FOR SELECT 
USING (auth.uid() = user_id);

-- Users can register for events
CREATE POLICY "Users can register for events" 
ON public.event_registrations 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

-- Users can cancel their registrations
CREATE POLICY "Users can cancel registrations" 
ON public.event_registrations 
FOR DELETE 
USING (auth.uid() = user_id);

-- Insert sample events
INSERT INTO public.events (title, description, event_date, event_type, location, max_attendees) VALUES
('Understanding Anxiety Workshop', 'Learn practical techniques for managing anxiety in daily life. Join our expert-led session.', now() + interval '7 days', 'workshop', 'Virtual', 50),
('Mindfulness Meditation Session', 'A guided meditation session for beginners and experienced practitioners alike.', now() + interval '14 days', 'session', 'Virtual', 30),
('Depression Support Group', 'A safe space to share experiences and find community support.', now() + interval '21 days', 'support', 'Virtual', 20),
('Stress Management Webinar', 'Expert tips on identifying and managing stress triggers effectively.', now() + interval '10 days', 'webinar', 'Virtual', 100),
('Youth Mental Health Forum', 'Special session focused on mental health challenges facing young adults.', now() + interval '30 days', 'workshop', 'Nairobi, Kenya', 40);