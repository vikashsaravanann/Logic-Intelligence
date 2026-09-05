-- Add has_converted column to profiles table
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS has_converted boolean DEFAULT false;
