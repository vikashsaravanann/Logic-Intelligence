-- Create profiles table to track user metadata and idempotency (welcome_email_sent_at)
CREATE TABLE IF NOT EXISTS public.profiles (
  id uuid REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  full_name text,
  role text DEFAULT 'user',
  welcome_email_sent_at timestamptz,
  created_at timestamptz DEFAULT now() NOT NULL
);

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read own profile" ON public.profiles
  FOR SELECT TO authenticated
  USING (auth.uid() = id);

-- Create login_events table
CREATE TABLE IF NOT EXISTS public.login_events (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  email text NOT NULL,
  user_agent text,
  device_summary text,
  screen_size text,
  timezone text,
  ip_address inet,
  created_at timestamptz DEFAULT now() NOT NULL,
  notification_sent_at timestamptz
);

ALTER TABLE public.login_events ENABLE ROW LEVEL SECURITY;

-- Admins can read all login events. Users cannot read even their own for now, to keep it simple.
-- The server (service role) bypasses RLS to insert.
CREATE POLICY "Admins can read login events" ON public.login_events
  FOR SELECT TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE profiles.id = auth.uid() AND profiles.role = 'admin'
    )
  );

-- Checklist submissions tracking (if missing, ensure it has RLS)
CREATE TABLE IF NOT EXISTS public.checklist_submissions (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  email text NOT NULL,
  answers jsonb NOT NULL,
  created_at timestamptz DEFAULT now() NOT NULL
);

ALTER TABLE public.checklist_submissions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow anonymous checklist inserts" ON public.checklist_submissions
  FOR INSERT TO anon
  WITH CHECK (true);

CREATE POLICY "Admins can read checklist submissions" ON public.checklist_submissions
  FOR SELECT TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE profiles.id = auth.uid() AND profiles.role = 'admin'
    )
  );
