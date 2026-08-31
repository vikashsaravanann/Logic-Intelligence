-- Client Portal Upgrade Migration

-- 1. Modify Projects Table
ALTER TABLE public.projects 
ADD COLUMN IF NOT EXISTS user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL;

CREATE POLICY "Clients can view own projects" ON public.projects 
FOR SELECT TO authenticated USING (auth.uid() = user_id OR (user_id IS NULL)); 

-- 2. Modify Invoices Table
ALTER TABLE public.invoices 
ADD COLUMN IF NOT EXISTS user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL;

-- 3. Create Support Tickets Table
CREATE TABLE IF NOT EXISTS public.support_tickets (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    subject VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    status VARCHAR(50) NOT NULL DEFAULT 'Open',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE public.support_tickets ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Clients can view own tickets" ON public.support_tickets 
FOR SELECT TO authenticated USING (auth.uid() = user_id);

CREATE POLICY "Clients can create tickets" ON public.support_tickets 
FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Admins can view all tickets" ON public.support_tickets 
FOR SELECT TO authenticated USING (true);

-- 4. Create Client Files Table
CREATE TABLE IF NOT EXISTS public.client_files (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    file_name VARCHAR(255) NOT NULL,
    file_path TEXT NOT NULL,
    size INTEGER NOT NULL DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE public.client_files ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Clients can view own files" ON public.client_files 
FOR SELECT TO authenticated USING (auth.uid() = user_id);

CREATE POLICY "Clients can upload files metadata" ON public.client_files 
FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Clients can delete own files" ON public.client_files 
FOR DELETE TO authenticated USING (auth.uid() = user_id);

CREATE POLICY "Admins can view all files" ON public.client_files 
FOR SELECT TO authenticated USING (true);

-- 5. Create Onboarding Submissions Table
CREATE TABLE IF NOT EXISTS public.onboarding_submissions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    answers_json JSONB NOT NULL DEFAULT '{}'::jsonb,
    status VARCHAR(50) NOT NULL DEFAULT 'Submitted',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE public.onboarding_submissions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Clients can view own onboarding" ON public.onboarding_submissions 
FOR SELECT TO authenticated USING (auth.uid() = user_id);

CREATE POLICY "Clients can submit onboarding" ON public.onboarding_submissions 
FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Clients can update own onboarding" ON public.onboarding_submissions 
FOR UPDATE TO authenticated USING (auth.uid() = user_id);

CREATE POLICY "Admins can view all onboarding" ON public.onboarding_submissions 
FOR SELECT TO authenticated USING (true);

-- 6. Storage Bucket for Client Vault
INSERT INTO storage.buckets (id, name, public) 
VALUES ('client_vault', 'client_vault', false)
ON CONFLICT (id) DO NOTHING;

-- Storage Policies for client_vault
CREATE POLICY "Clients can upload to vault" ON storage.objects 
FOR INSERT TO authenticated WITH CHECK (
    bucket_id = 'client_vault' 
    AND (auth.uid()::text = (storage.foldername(name))[1])
);

CREATE POLICY "Clients can read vault" ON storage.objects 
FOR SELECT TO authenticated USING (
    bucket_id = 'client_vault' 
    AND (auth.uid()::text = (storage.foldername(name))[1])
);

CREATE POLICY "Admins can read vault" ON storage.objects 
FOR SELECT TO authenticated USING (
    bucket_id = 'client_vault'
);
