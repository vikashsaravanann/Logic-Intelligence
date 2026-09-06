-- AI-captured leads + restore ai_memory for logged-in continuity
-- (ai_memory was dropped in an earlier cleanup; recreate if missing)

CREATE TABLE IF NOT EXISTS public.ai_captured_leads (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  phone text,
  company text,
  interest text,
  source text NOT NULL CHECK (source IN ('chat_widget', 'ai_page')),
  user_id uuid REFERENCES auth.users (id) ON DELETE SET NULL,
  chat_id uuid,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_ai_captured_leads_email ON public.ai_captured_leads (email);
CREATE INDEX IF NOT EXISTS idx_ai_captured_leads_source ON public.ai_captured_leads (source);
CREATE INDEX IF NOT EXISTS idx_ai_captured_leads_created ON public.ai_captured_leads (created_at DESC);

ALTER TABLE public.ai_captured_leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ai_captured_leads FORCE ROW LEVEL SECURITY;

-- Service role / backend inserts only (anon/authenticated cannot read leads)
DROP POLICY IF EXISTS "ai_captured_leads_service_insert" ON public.ai_captured_leads;
CREATE POLICY "ai_captured_leads_service_insert"
  ON public.ai_captured_leads
  FOR INSERT
  TO service_role
  WITH CHECK (true);

DROP POLICY IF EXISTS "ai_captured_leads_service_select" ON public.ai_captured_leads;
CREATE POLICY "ai_captured_leads_service_select"
  ON public.ai_captured_leads
  FOR SELECT
  TO service_role
  USING (true);

-- Durable per-user memory (key/value)
CREATE TABLE IF NOT EXISTS public.ai_memory (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users (id) ON DELETE CASCADE,
  memory_key text NOT NULL,
  memory_value text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (user_id, memory_key)
);

CREATE INDEX IF NOT EXISTS idx_ai_memory_user ON public.ai_memory (user_id);

ALTER TABLE public.ai_memory ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ai_memory FORCE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "ai_memory_service_all" ON public.ai_memory;
CREATE POLICY "ai_memory_service_all"
  ON public.ai_memory
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

-- Authenticated users may read/write only their own memory rows
DROP POLICY IF EXISTS "ai_memory_owner_select" ON public.ai_memory;
CREATE POLICY "ai_memory_owner_select"
  ON public.ai_memory FOR SELECT TO authenticated
  USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "ai_memory_owner_upsert" ON public.ai_memory;
CREATE POLICY "ai_memory_owner_upsert"
  ON public.ai_memory FOR INSERT TO authenticated
  WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "ai_memory_owner_update" ON public.ai_memory;
CREATE POLICY "ai_memory_owner_update"
  ON public.ai_memory FOR UPDATE TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);
