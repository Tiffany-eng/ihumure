-- Fix search_path for validate_mood_level function
CREATE OR REPLACE FUNCTION public.validate_mood_level()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  IF NEW.mood_level < 1 OR NEW.mood_level > 10 THEN
    RAISE EXCEPTION 'mood_level must be between 1 and 10';
  END IF;
  RETURN NEW;
END;
$$;

-- Fix search_path for update_updated_at function
CREATE OR REPLACE FUNCTION public.update_updated_at()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$;