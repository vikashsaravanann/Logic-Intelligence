-- Add has_subscribed column to profiles table
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS has_subscribed boolean DEFAULT false;
