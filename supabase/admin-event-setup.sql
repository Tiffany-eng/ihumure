-- Admin and Event Management Setup (idempotent)
-- Run in Supabase SQL Editor to support admin dashboard

-- 1) Ensure status column exists with default
ALTER TABLE public.events
  ADD COLUMN IF NOT EXISTS status TEXT DEFAULT 'approved';

-- Backfill NULL statuses (idempotent)
UPDATE public.events
  SET status = 'approved'
  WHERE status IS NULL;

-- 2) Enable Row Level Security on the relevant tables (idempotent)
ALTER TABLE public.events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.event_registrations ENABLE ROW LEVEL SECURITY;

-- 3) Drop existing policies if present (be explicit per table)
DROP POLICY IF EXISTS "Events are viewable by everyone" ON public.events;
DROP POLICY IF EXISTS "Users can register for events" ON public.events;
DROP POLICY IF EXISTS "Admins can manage events" ON public.events;

DROP POLICY IF EXISTS "Users can view own event registrations" ON public.event_registrations;
DROP POLICY IF EXISTS "Users can insert own registrations" ON public.event_registrations;

-- 4) Create policies (idempotent starting from clean state)

-- Events: public read-only
CREATE POLICY "Events are viewable by everyone" ON public.events
  FOR SELECT TO PUBLIC
  USING (true);

-- Events: allow authenticated users to create events if intended
-- (If you don't want authenticated users to create events, remove this policy)
CREATE POLICY "Users can register for events" ON public.events
  FOR INSERT TO authenticated
  WITH CHECK ((SELECT auth.uid()) IS NOT NULL);

-- Admins: manage events (restrict to users with 'admin' role)
CREATE POLICY "Admins can manage events" ON public.events
  FOR ALL TO authenticated
  USING (
    EXISTS (
      SELECT 1
      FROM public.user_roles ur
      WHERE ur.user_id = (SELECT auth.uid()) AND ur.role = 'admin'
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1
      FROM public.user_roles ur
      WHERE ur.user_id = (SELECT auth.uid()) AND ur.role = 'admin'
    )
  );

-- Event registrations: users can view/insert their own registrations
CREATE POLICY "Users can view own event registrations" ON public.event_registrations
  FOR SELECT TO authenticated
  USING ((SELECT auth.uid()) = user_id);

CREATE POLICY "Users can insert own registrations" ON public.event_registrations
  FOR INSERT TO authenticated
  WITH CHECK ((SELECT auth.uid()) = user_id);

-- 5) Helper function to check admin (fixed argument reference)
CREATE OR REPLACE FUNCTION public.is_admin(p_user_id UUID)
RETURNS BOOLEAN
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM public.user_roles ur
    WHERE ur.user_id = p_user_id
      AND ur.role = 'admin'
  );
END;
$$;

-- Revoke execute on helper from public roles (optional, more secure)
REVOKE EXECUTE ON FUNCTION public.is_admin(UUID) FROM PUBLIC;

-- 6) Grants: be conservative (avoid granting ALL)
GRANT USAGE ON SCHEMA public TO authenticated;

-- Grant read on events and read/insert on event_registrations as an example
GRANT SELECT ON public.events TO authenticated;
GRANT SELECT, INSERT ON public.event_registrations TO authenticated;

-- 7) Helpful indexes (create if not exists) to support policy checks and performance
CREATE INDEX IF NOT EXISTS idx_user_roles_user_id ON public.user_roles(user_id);
CREATE INDEX IF NOT EXISTS idx_event_registrations_user_id ON public.event_registrations(user_id);
CREATE INDEX IF NOT EXISTS idx_events_status ON public.events(status);