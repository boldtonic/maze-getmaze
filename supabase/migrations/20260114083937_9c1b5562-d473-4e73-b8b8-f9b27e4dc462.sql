-- Add subscription columns to profiles table
ALTER TABLE public.profiles 
ADD COLUMN subscription_tier text DEFAULT 'free' CHECK (subscription_tier IN ('free', 'premium')),
ADD COLUMN subscription_type text CHECK (subscription_type IN ('user', 'media'));