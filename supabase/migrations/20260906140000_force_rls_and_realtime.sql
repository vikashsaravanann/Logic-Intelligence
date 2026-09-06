-- Force RLS (applies even to table owners) + Realtime where the UI shows "Enabled"
-- Note: Supabase Table Editor "Disabled/Enabled" column is Realtime, not RLS.
-- RLS was already enabled; we FORCE it and publish selected tables to realtime.

DO $$
DECLARE t text;
BEGIN
  FOREACH t IN ARRAY ARRAY[
    'agent_runs','ai_chats','ai_messages','checklist_leads','client_files','cms_posts',
    'contact_leads','demo_leads','invoices','newsletter_subscribers',
    'omni_channel_credentials','omni_engagement_events','omni_post_variants',
    'omni_posts','omni_publish_jobs','onboarding_submissions','profiles','projects',
    'support_tickets'
  ]
  LOOP
    IF to_regclass('public.' || t) IS NOT NULL THEN
      EXECUTE format('ALTER TABLE public.%I ENABLE ROW LEVEL SECURITY', t);
      EXECUTE format('ALTER TABLE public.%I FORCE ROW LEVEL SECURITY', t);
    END IF;
  END LOOP;
END $$;

-- Realtime publication (idempotent add)
DO $$
DECLARE t text;
BEGIN
  FOREACH t IN ARRAY ARRAY[
    'ai_chats','ai_messages','contact_leads','demo_leads','checklist_leads',
    'newsletter_subscribers','profiles','projects','support_tickets','invoices',
    'omni_posts','omni_publish_jobs','agent_runs'
  ]
  LOOP
    IF to_regclass('public.' || t) IS NOT NULL THEN
      BEGIN
        EXECUTE format('ALTER PUBLICATION supabase_realtime ADD TABLE public.%I', t);
      EXCEPTION WHEN duplicate_object THEN
        NULL; -- already in publication
      WHEN undefined_object THEN
        NULL;
      END;
    END IF;
  END LOOP;
END $$;
