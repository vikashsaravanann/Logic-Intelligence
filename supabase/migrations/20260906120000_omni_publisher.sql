-- Omni-Channel Autonomous Publishing Engine (monorepo integration)

CREATE EXTENSION IF NOT EXISTS "pgcrypto";

CREATE TABLE IF NOT EXISTS public.omni_channel_credentials (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  channel TEXT NOT NULL CHECK (channel IN (
    'instagram','facebook','linkedin','x','telegram','threads','discord','website'
  )),
  secret_ciphertext TEXT NOT NULL,
  secret_nonce TEXT,
  key_version INT NOT NULL DEFAULT 1,
  scopes TEXT[] DEFAULT '{}',
  external_account_id TEXT,
  is_active BOOLEAN NOT NULL DEFAULT true,
  last_rotated_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (user_id, channel)
);

CREATE TABLE IF NOT EXISTS public.omni_posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  root_text TEXT NOT NULL,
  media_master_url TEXT,
  status TEXT NOT NULL DEFAULT 'draft'
    CHECK (status IN ('draft','queued','publishing','published','partial','failed','cancelled')),
  channels TEXT[] NOT NULL DEFAULT '{}',
  execute_at TIMESTAMPTZ,
  schedule_mode TEXT NOT NULL DEFAULT 'manual'
    CHECK (schedule_mode IN ('manual','predictive')),
  predicted_score NUMERIC(6,4),
  seo_meta JSONB NOT NULL DEFAULT '{}'::jsonb,
  title TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.omni_post_variants (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  post_id UUID NOT NULL REFERENCES public.omni_posts(id) ON DELETE CASCADE,
  channel TEXT NOT NULL,
  caption TEXT NOT NULL,
  hashtags TEXT[] DEFAULT '{}',
  alt_text TEXT,
  media_url TEXT,
  aspect_ratio TEXT,
  payload JSONB NOT NULL DEFAULT '{}'::jsonb,
  UNIQUE (post_id, channel)
);

CREATE TABLE IF NOT EXISTS public.omni_publish_jobs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  post_id UUID NOT NULL REFERENCES public.omni_posts(id) ON DELETE CASCADE,
  channel TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending'
    CHECK (status IN ('pending','running','succeeded','failed','skipped')),
  scheduled_for TIMESTAMPTZ NOT NULL,
  started_at TIMESTAMPTZ,
  finished_at TIMESTAMPTZ,
  external_post_id TEXT,
  error_class TEXT,
  error_message TEXT,
  mcp_tool TEXT,
  attempts INT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS omni_publish_jobs_due_idx
  ON public.omni_publish_jobs (status, scheduled_for)
  WHERE status = 'pending';

CREATE TABLE IF NOT EXISTS public.omni_engagement_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  channel TEXT NOT NULL,
  external_post_id TEXT,
  posted_at TIMESTAMPTZ NOT NULL,
  hour_of_week INT NOT NULL CHECK (hour_of_week BETWEEN 0 AND 167),
  impressions INT DEFAULT 0,
  engagements INT DEFAULT 0,
  clicks INT DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS omni_engagement_channel_hour_idx
  ON public.omni_engagement_events (user_id, channel, hour_of_week);

CREATE TABLE IF NOT EXISTS public.cms_posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  slug TEXT UNIQUE,
  body_md TEXT NOT NULL,
  excerpt TEXT,
  cover_image_url TEXT,
  alt_text TEXT,
  seo JSONB NOT NULL DEFAULT '{}'::jsonb,
  status TEXT NOT NULL DEFAULT 'published',
  published_at TIMESTAMPTZ DEFAULT now(),
  source_omni_post_id UUID REFERENCES public.omni_posts(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.omni_channel_credentials ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.omni_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.omni_post_variants ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.omni_publish_jobs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.omni_engagement_events ENABLE ROW LEVEL SECURITY;

CREATE POLICY omni_creds_owner ON public.omni_channel_credentials
  FOR ALL TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);
CREATE POLICY omni_posts_owner ON public.omni_posts
  FOR ALL TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);
CREATE POLICY omni_variants_owner ON public.omni_post_variants
  FOR ALL TO authenticated USING (
    EXISTS (SELECT 1 FROM public.omni_posts p WHERE p.id = post_id AND p.user_id = auth.uid())
  );
CREATE POLICY omni_jobs_owner ON public.omni_publish_jobs
  FOR ALL TO authenticated USING (
    EXISTS (SELECT 1 FROM public.omni_posts p WHERE p.id = post_id AND p.user_id = auth.uid())
  );
CREATE POLICY omni_engagement_owner ON public.omni_engagement_events
  FOR ALL TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

-- CMS inserts via service role from MCP; authenticated read optional later
ALTER TABLE public.cms_posts ENABLE ROW LEVEL SECURITY;
CREATE POLICY cms_posts_service ON public.cms_posts
  FOR ALL TO service_role USING (true) WITH CHECK (true);
