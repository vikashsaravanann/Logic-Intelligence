-- Initial Schema Migration for Logic Intelligence Technologies

-- 1. Create table for Contact Form Leads
CREATE TABLE IF NOT EXISTS public.contact_leads (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    company TEXT,
    message TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc', now()) NOT NULL
);

-- 2. Create table for Free Demo Leads
CREATE TABLE IF NOT EXISTS public.demo_leads (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT,
    company_name TEXT,
    job_title TEXT,
    interests TEXT[],
    budget TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc', now()) NOT NULL
);

-- 3. Create table for Checklist Submissions
CREATE TABLE IF NOT EXISTS public.checklist_leads (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    company TEXT,
    role TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc', now()) NOT NULL
);

-- 4. Create profiles table for user accounts (syncs with auth.users)
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
    email TEXT,
    full_name TEXT,
    avatar_url TEXT,
    role TEXT DEFAULT 'client',
    welcome_email_sent BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc', now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc', now()) NOT NULL
);

-- Row Level Security (RLS) Settings

ALTER TABLE public.contact_leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.demo_leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.checklist_leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Allow anonymous inserts so frontend API routes can insert data without the service_role key
CREATE POLICY "Allow anonymous inserts to contact_leads" ON public.contact_leads FOR INSERT TO anon WITH CHECK (true);
CREATE POLICY "Allow anonymous inserts to demo_leads" ON public.demo_leads FOR INSERT TO anon WITH CHECK (true);
CREATE POLICY "Allow anonymous inserts to checklist_leads" ON public.checklist_leads FOR INSERT TO anon WITH CHECK (true);

-- Service Role doesn't need policies because it bypasses RLS automatically, 
-- but we can explicitly allow the authenticated role to read if needed (optional)
CREATE POLICY "Service Role can manage profiles" ON public.profiles FOR ALL USING (auth.role() = 'service_role');


-- Allow authenticated users to view their own profile
CREATE POLICY "Users can view own profile" ON public.profiles FOR SELECT USING (auth.uid() = id);
-- Allow authenticated users to update their own profile
CREATE POLICY "Users can update own profile" ON public.profiles FOR UPDATE USING (auth.uid() = id);

-- Trigger to update 'updated_at' on profiles
CREATE OR REPLACE FUNCTION update_modified_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_profiles_updated_at
BEFORE UPDATE ON public.profiles
FOR EACH ROW EXECUTE FUNCTION update_modified_column();
