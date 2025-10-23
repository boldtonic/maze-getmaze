-- First, drop the insecure public access policies
DROP POLICY IF EXISTS "Public access to mazes" ON public.mazes;
DROP POLICY IF EXISTS "Public access to links" ON public.links;
DROP POLICY IF EXISTS "Public access to profiles" ON public.profiles;

-- Create secure RLS policies for profiles table
-- Users can view all profiles (for public profile pages)
CREATE POLICY "Anyone can view profiles"
  ON public.profiles
  FOR SELECT
  USING (true);

-- Users can insert their own profile
CREATE POLICY "Users can insert own profile"
  ON public.profiles
  FOR INSERT
  WITH CHECK (auth.uid() = id);

-- Users can update their own profile
CREATE POLICY "Users can update own profile"
  ON public.profiles
  FOR UPDATE
  USING (auth.uid() = id);

-- Users can delete their own profile
CREATE POLICY "Users can delete own profile"
  ON public.profiles
  FOR DELETE
  USING (auth.uid() = id);

-- Create secure RLS policies for mazes table
-- Anyone can view published mazes
CREATE POLICY "Anyone can view published mazes"
  ON public.mazes
  FOR SELECT
  USING (is_published = true);

-- Users can view their own mazes (published or not)
CREATE POLICY "Users can view own mazes"
  ON public.mazes
  FOR SELECT
  USING (auth.uid() IN (SELECT id FROM public.profiles WHERE id = profile_id));

-- Users can insert mazes linked to their profile
CREATE POLICY "Users can insert own mazes"
  ON public.mazes
  FOR INSERT
  WITH CHECK (
    auth.uid() IN (SELECT id FROM public.profiles WHERE id = profile_id)
  );

-- Users can update their own mazes
CREATE POLICY "Users can update own mazes"
  ON public.mazes
  FOR UPDATE
  USING (auth.uid() IN (SELECT id FROM public.profiles WHERE id = profile_id));

-- Users can delete their own mazes
CREATE POLICY "Users can delete own mazes"
  ON public.mazes
  FOR DELETE
  USING (auth.uid() IN (SELECT id FROM public.profiles WHERE id = profile_id));

-- Create secure RLS policies for links table
-- Anyone can view links from published mazes
CREATE POLICY "Anyone can view links from published mazes"
  ON public.links
  FOR SELECT
  USING (
    maze_id IN (SELECT id FROM public.mazes WHERE is_published = true)
  );

-- Users can view links from their own mazes
CREATE POLICY "Users can view own maze links"
  ON public.links
  FOR SELECT
  USING (
    maze_id IN (
      SELECT m.id FROM public.mazes m
      JOIN public.profiles p ON m.profile_id = p.id
      WHERE p.id = auth.uid()
    )
  );

-- Users can insert links to their own mazes
CREATE POLICY "Users can insert links to own mazes"
  ON public.links
  FOR INSERT
  WITH CHECK (
    maze_id IN (
      SELECT m.id FROM public.mazes m
      JOIN public.profiles p ON m.profile_id = p.id
      WHERE p.id = auth.uid()
    )
  );

-- Users can update links on their own mazes
CREATE POLICY "Users can update own maze links"
  ON public.links
  FOR UPDATE
  USING (
    maze_id IN (
      SELECT m.id FROM public.mazes m
      JOIN public.profiles p ON m.profile_id = p.id
      WHERE p.id = auth.uid()
    )
  );

-- Users can delete links from their own mazes
CREATE POLICY "Users can delete own maze links"
  ON public.links
  FOR DELETE
  USING (
    maze_id IN (
      SELECT m.id FROM public.mazes m
      JOIN public.profiles p ON m.profile_id = p.id
      WHERE p.id = auth.uid()
    )
  );

-- Create trigger to auto-create profile on user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, username, display_name)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'username', split_part(NEW.email, '@', 1)),
    COALESCE(NEW.raw_user_meta_data->>'display_name', split_part(NEW.email, '@', 1))
  );
  RETURN NEW;
END;
$$;

-- Trigger to create profile on auth.users insert
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();