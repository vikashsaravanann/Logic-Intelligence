-- Fix Security: Prevent users from escalating their privileges via RLS UPDATE
DROP POLICY IF EXISTS "Users can update own profile" ON public.profiles;

-- Optionally, if we ever need to allow users to update their own profiles (e.g., name/avatar),
-- we can do it via a secure server route using the service_role key, or by using a strict function.
-- For now, since there is no profile edit UI, we disable direct client-side updates entirely.

-- Tighten lead policies to require basic validation (e.g., email must exist)
DROP POLICY IF EXISTS "Allow anonymous inserts to contact_leads" ON public.contact_leads;
CREATE POLICY "Allow anonymous inserts to contact_leads" ON public.contact_leads 
FOR INSERT TO anon WITH CHECK (email IS NOT NULL AND email != '');

DROP POLICY IF EXISTS "Allow anonymous inserts to demo_leads" ON public.demo_leads;
CREATE POLICY "Allow anonymous inserts to demo_leads" ON public.demo_leads 
FOR INSERT TO anon WITH CHECK (email IS NOT NULL AND email != '');

DROP POLICY IF EXISTS "Allow anonymous inserts to checklist_leads" ON public.checklist_leads;
CREATE POLICY "Allow anonymous inserts to checklist_leads" ON public.checklist_leads 
FOR INSERT TO anon WITH CHECK (email IS NOT NULL AND email != '');
