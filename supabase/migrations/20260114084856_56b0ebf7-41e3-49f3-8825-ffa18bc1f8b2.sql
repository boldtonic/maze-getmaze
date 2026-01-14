-- Fix 1: Create a public view for profiles that excludes subscription data
CREATE VIEW public.profiles_public
WITH (security_invoker = on) AS
SELECT 
  id,
  username,
  display_name,
  bio,
  avatar_url,
  created_at
FROM public.profiles;

-- Fix 2: Drop the overly permissive SELECT policy
DROP POLICY IF EXISTS "Anyone can view profiles" ON public.profiles;

-- Fix 3: Create new restrictive SELECT policies for profiles
-- Owners can see their full profile (including subscription data)
CREATE POLICY "Users can view own full profile"
  ON public.profiles
  FOR SELECT
  USING (auth.uid() = id);

-- Anyone can view public profile info via the view (RLS applied via security_invoker)
-- For direct table access, only allow viewing profiles where user is the owner
-- This effectively blocks direct SELECT on other users' subscription data

-- Fix 4: Update handle_new_user function with validation
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  -- Validate trigger is properly invoked with valid user data
  IF NEW.id IS NULL THEN
    RAISE EXCEPTION 'Invalid user ID - cannot create profile';
  END IF;
  
  IF NEW.email IS NULL THEN
    RAISE EXCEPTION 'Invalid email - cannot create profile';
  END IF;

  INSERT INTO public.profiles (id, username, display_name)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'username', split_part(NEW.email, '@', 1)),
    COALESCE(NEW.raw_user_meta_data->>'display_name', split_part(NEW.email, '@', 1))
  );
  RETURN NEW;
END;
$$;