-- Cleanup unused tables + enable RLS (fixed profiles policy)
-- DROP unused
DROP TABLE IF EXISTS public.ai_memory CASCADE;
DROP TABLE IF EXISTS public.login_events CASCADE;
DROP TABLE IF EXISTS public.leads CASCADE;
DROP TABLE IF EXISTS public."Leads" CASCADE;

-- Enable RLS on keepers
DO $$
DECLARE t text;
BEGIN
  FOREACH t IN ARRAY ARRAY[
    'agent_runs','ai_chats','ai_messages','checklist_leads','client_files','cms_posts',
    'contact_leads','demo_leads','invoices','newsletter_subscribers',
    'omni_channel_credentials','omni_engagement_events','omni_post_variants',
    'omni_posts','omni_publish_jobs','onboarding_submissions','profiles','projects','support_tickets'
  ]
  LOOP
    IF to_regclass('public.' || t) IS NOT NULL THEN
      EXECUTE format('ALTER TABLE public.%I ENABLE ROW LEVEL SECURITY', t);
    END IF;
  END LOOP;
END $$;

-- agent_runs
DROP POLICY IF EXISTS "Service role full access agent_runs" ON public.agent_runs;
DROP POLICY IF EXISTS "Users read own agent_runs" ON public.agent_runs;
CREATE POLICY "Service role full access agent_runs"
  ON public.agent_runs FOR ALL TO service_role USING (true) WITH CHECK (true);
CREATE POLICY "Users read own agent_runs"
  ON public.agent_runs FOR SELECT TO authenticated
  USING (user_id IS NULL OR auth.uid() = user_id);

-- ai_chats
DROP POLICY IF EXISTS "Users can view their own chats" ON public.ai_chats;
DROP POLICY IF EXISTS "Users can insert their own chats" ON public.ai_chats;
DROP POLICY IF EXISTS "Users can update their own chats" ON public.ai_chats;
DROP POLICY IF EXISTS "Users can delete their own chats" ON public.ai_chats;
DROP POLICY IF EXISTS "Service role ai_chats" ON public.ai_chats;
CREATE POLICY "Service role ai_chats"
  ON public.ai_chats FOR ALL TO service_role USING (true) WITH CHECK (true);
CREATE POLICY "Users can view their own chats"
  ON public.ai_chats FOR SELECT TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "Users can insert their own chats"
  ON public.ai_chats FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own chats"
  ON public.ai_chats FOR UPDATE TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "Users can delete their own chats"
  ON public.ai_chats FOR DELETE TO authenticated USING (auth.uid() = user_id);

-- ai_messages
DROP POLICY IF EXISTS "Users can view their own messages" ON public.ai_messages;
DROP POLICY IF EXISTS "Users can insert messages to their own chats" ON public.ai_messages;
DROP POLICY IF EXISTS "Service role ai_messages" ON public.ai_messages;
CREATE POLICY "Service role ai_messages"
  ON public.ai_messages FOR ALL TO service_role USING (true) WITH CHECK (true);
CREATE POLICY "Users can view their own messages"
  ON public.ai_messages FOR SELECT TO authenticated USING (
    EXISTS (SELECT 1 FROM public.ai_chats c WHERE c.id = ai_messages.chat_id AND c.user_id = auth.uid())
  );
CREATE POLICY "Users can insert messages to their own chats"
  ON public.ai_messages FOR INSERT TO authenticated WITH CHECK (
    EXISTS (SELECT 1 FROM public.ai_chats c WHERE c.id = ai_messages.chat_id AND c.user_id = auth.uid())
  );

-- Lead tables
DROP POLICY IF EXISTS "Service role contact_leads" ON public.contact_leads;
DROP POLICY IF EXISTS "Auth read contact_leads" ON public.contact_leads;
CREATE POLICY "Service role contact_leads"
  ON public.contact_leads FOR ALL TO service_role USING (true) WITH CHECK (true);
CREATE POLICY "Auth read contact_leads"
  ON public.contact_leads FOR SELECT TO authenticated USING (true);

DROP POLICY IF EXISTS "Service role demo_leads" ON public.demo_leads;
DROP POLICY IF EXISTS "Auth read demo_leads" ON public.demo_leads;
CREATE POLICY "Service role demo_leads"
  ON public.demo_leads FOR ALL TO service_role USING (true) WITH CHECK (true);
CREATE POLICY "Auth read demo_leads"
  ON public.demo_leads FOR SELECT TO authenticated USING (true);

DROP POLICY IF EXISTS "Service role checklist_leads" ON public.checklist_leads;
DROP POLICY IF EXISTS "Auth read checklist_leads" ON public.checklist_leads;
CREATE POLICY "Service role checklist_leads"
  ON public.checklist_leads FOR ALL TO service_role USING (true) WITH CHECK (true);
CREATE POLICY "Auth read checklist_leads"
  ON public.checklist_leads FOR SELECT TO authenticated USING (true);

DROP POLICY IF EXISTS "Service role newsletter" ON public.newsletter_subscribers;
DROP POLICY IF EXISTS "Auth read newsletter" ON public.newsletter_subscribers;
CREATE POLICY "Service role newsletter"
  ON public.newsletter_subscribers FOR ALL TO service_role USING (true) WITH CHECK (true);
CREATE POLICY "Auth read newsletter"
  ON public.newsletter_subscribers FOR SELECT TO authenticated USING (true);

-- profiles: PK is id (= auth.users.id), no user_id column
DROP POLICY IF EXISTS "Users read own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users update own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users insert own profile" ON public.profiles;
DROP POLICY IF EXISTS "Service role profiles" ON public.profiles;
CREATE POLICY "Service role profiles"
  ON public.profiles FOR ALL TO service_role USING (true) WITH CHECK (true);
CREATE POLICY "Users read own profile"
  ON public.profiles FOR SELECT TO authenticated USING (auth.uid() = id);
CREATE POLICY "Users update own profile"
  ON public.profiles FOR UPDATE TO authenticated USING (auth.uid() = id);
CREATE POLICY "Users insert own profile"
  ON public.profiles FOR INSERT TO authenticated WITH CHECK (auth.uid() = id);

-- projects / invoices / tickets / files / onboarding
DROP POLICY IF EXISTS "Users own projects" ON public.projects;
DROP POLICY IF EXISTS "Service role projects" ON public.projects;
CREATE POLICY "Service role projects"
  ON public.projects FOR ALL TO service_role USING (true) WITH CHECK (true);
CREATE POLICY "Users own projects"
  ON public.projects FOR ALL TO authenticated
  USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users own invoices" ON public.invoices;
DROP POLICY IF EXISTS "Service role invoices" ON public.invoices;
CREATE POLICY "Service role invoices"
  ON public.invoices FOR ALL TO service_role USING (true) WITH CHECK (true);
CREATE POLICY "Users own invoices"
  ON public.invoices FOR SELECT TO authenticated USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users own tickets" ON public.support_tickets;
DROP POLICY IF EXISTS "Service role tickets" ON public.support_tickets;
CREATE POLICY "Service role tickets"
  ON public.support_tickets FOR ALL TO service_role USING (true) WITH CHECK (true);
CREATE POLICY "Users own tickets"
  ON public.support_tickets FOR ALL TO authenticated
  USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users own client_files" ON public.client_files;
DROP POLICY IF EXISTS "Service role client_files" ON public.client_files;
CREATE POLICY "Service role client_files"
  ON public.client_files FOR ALL TO service_role USING (true) WITH CHECK (true);
CREATE POLICY "Users own client_files"
  ON public.client_files FOR ALL TO authenticated
  USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users own onboarding" ON public.onboarding_submissions;
DROP POLICY IF EXISTS "Service role onboarding" ON public.onboarding_submissions;
CREATE POLICY "Service role onboarding"
  ON public.onboarding_submissions FOR ALL TO service_role USING (true) WITH CHECK (true);
CREATE POLICY "Users own onboarding"
  ON public.onboarding_submissions FOR ALL TO authenticated
  USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

-- cms_posts
DROP POLICY IF EXISTS "cms_posts_service" ON public.cms_posts;
DROP POLICY IF EXISTS "cms_posts_public_read" ON public.cms_posts;
CREATE POLICY "cms_posts_service"
  ON public.cms_posts FOR ALL TO service_role USING (true) WITH CHECK (true);
CREATE POLICY "cms_posts_public_read"
  ON public.cms_posts FOR SELECT TO anon, authenticated USING (status = 'published');

-- Omni
DROP POLICY IF EXISTS omni_creds_owner ON public.omni_channel_credentials;
DROP POLICY IF EXISTS "Service role omni_creds" ON public.omni_channel_credentials;
CREATE POLICY "Service role omni_creds"
  ON public.omni_channel_credentials FOR ALL TO service_role USING (true) WITH CHECK (true);
CREATE POLICY omni_creds_owner
  ON public.omni_channel_credentials FOR ALL TO authenticated
  USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS omni_posts_owner ON public.omni_posts;
DROP POLICY IF EXISTS "Service role omni_posts" ON public.omni_posts;
CREATE POLICY "Service role omni_posts"
  ON public.omni_posts FOR ALL TO service_role USING (true) WITH CHECK (true);
CREATE POLICY omni_posts_owner
  ON public.omni_posts FOR ALL TO authenticated
  USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS omni_variants_owner ON public.omni_post_variants;
DROP POLICY IF EXISTS "Service role omni_variants" ON public.omni_post_variants;
CREATE POLICY "Service role omni_variants"
  ON public.omni_post_variants FOR ALL TO service_role USING (true) WITH CHECK (true);
CREATE POLICY omni_variants_owner
  ON public.omni_post_variants FOR ALL TO authenticated USING (
    EXISTS (SELECT 1 FROM public.omni_posts p WHERE p.id = post_id AND p.user_id = auth.uid())
  ) WITH CHECK (
    EXISTS (SELECT 1 FROM public.omni_posts p WHERE p.id = post_id AND p.user_id = auth.uid())
  );

DROP POLICY IF EXISTS omni_jobs_owner ON public.omni_publish_jobs;
DROP POLICY IF EXISTS "Service role omni_jobs" ON public.omni_publish_jobs;
CREATE POLICY "Service role omni_jobs"
  ON public.omni_publish_jobs FOR ALL TO service_role USING (true) WITH CHECK (true);
CREATE POLICY omni_jobs_owner
  ON public.omni_publish_jobs FOR ALL TO authenticated USING (
    EXISTS (SELECT 1 FROM public.omni_posts p WHERE p.id = post_id AND p.user_id = auth.uid())
  );

DROP POLICY IF EXISTS omni_engagement_owner ON public.omni_engagement_events;
DROP POLICY IF EXISTS "Service role omni_engagement" ON public.omni_engagement_events;
CREATE POLICY "Service role omni_engagement"
  ON public.omni_engagement_events FOR ALL TO service_role USING (true) WITH CHECK (true);
CREATE POLICY omni_engagement_owner
  ON public.omni_engagement_events FOR ALL TO authenticated
  USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);
