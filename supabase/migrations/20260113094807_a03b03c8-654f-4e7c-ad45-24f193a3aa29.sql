-- Add policy to allow admins to view all event registrations
CREATE POLICY "Admins can view all registrations"
ON public.event_registrations
FOR SELECT
USING (has_role(auth.uid(), 'admin'::app_role));