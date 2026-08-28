-- Create Projects Table
CREATE TABLE IF NOT EXISTS public.projects (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    project_code VARCHAR(50) NOT NULL UNIQUE,
    client_name VARCHAR(255) NOT NULL,
    name VARCHAR(255) NOT NULL,
    status VARCHAR(50) NOT NULL DEFAULT 'Planning',
    progress INTEGER NOT NULL DEFAULT 0,
    value DECIMAL(10, 2) NOT NULL DEFAULT 0.00,
    due_date DATE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create Invoices Table
CREATE TABLE IF NOT EXISTS public.invoices (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    invoice_code VARCHAR(50) NOT NULL UNIQUE,
    project_id UUID REFERENCES public.projects(id) ON DELETE CASCADE,
    client_name VARCHAR(255) NOT NULL,
    amount DECIMAL(10, 2) NOT NULL DEFAULT 0.00,
    status VARCHAR(50) NOT NULL DEFAULT 'Pending',
    due_date DATE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS (Row Level Security)
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.invoices ENABLE ROW LEVEL SECURITY;

-- Allow authenticated users to view and modify (assuming internal CRM users are authenticated)
CREATE POLICY "Allow authenticated users to view projects" ON public.projects FOR SELECT TO authenticated USING (true);
CREATE POLICY "Allow authenticated users to insert projects" ON public.projects FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Allow authenticated users to update projects" ON public.projects FOR UPDATE TO authenticated USING (true);
CREATE POLICY "Allow authenticated users to delete projects" ON public.projects FOR DELETE TO authenticated USING (true);

CREATE POLICY "Allow authenticated users to view invoices" ON public.invoices FOR SELECT TO authenticated USING (true);
CREATE POLICY "Allow authenticated users to insert invoices" ON public.invoices FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Allow authenticated users to update invoices" ON public.invoices FOR UPDATE TO authenticated USING (true);
CREATE POLICY "Allow authenticated users to delete invoices" ON public.invoices FOR DELETE TO authenticated USING (true);
