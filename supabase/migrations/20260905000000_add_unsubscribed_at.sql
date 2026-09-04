-- Add unsubscribed_at column to profiles table
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS unsubscribed_at TIMESTAMP WITH TIME ZONE;
