-- Agent evaluation run log (Master Orchestrator metrics)
CREATE TABLE IF NOT EXISTS public.agent_runs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  run_id TEXT NOT NULL UNIQUE,
  agent_role TEXT NOT NULL DEFAULT 'logic-ai',
  task_id TEXT,
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  success BOOLEAN NOT NULL DEFAULT false,
  steps INT NOT NULL DEFAULT 1,
  tool_calls INT NOT NULL DEFAULT 0,
  tokens_in INT NOT NULL DEFAULT 0,
  tokens_out INT NOT NULL DEFAULT 0,
  latency_ms INT NOT NULL DEFAULT 0,
  cost_usd NUMERIC(12, 6) NOT NULL DEFAULT 0,
  failure_class TEXT,
  faithfulness NUMERIC(5, 4),
  escalated BOOLEAN NOT NULL DEFAULT false,
  used_fallback BOOLEAN NOT NULL DEFAULT false,
  model TEXT,
  meta JSONB NOT NULL DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS agent_runs_created_at_idx ON public.agent_runs (created_at DESC);
CREATE INDEX IF NOT EXISTS agent_runs_success_idx ON public.agent_runs (success);
CREATE INDEX IF NOT EXISTS agent_runs_agent_role_idx ON public.agent_runs (agent_role);

ALTER TABLE public.agent_runs ENABLE ROW LEVEL SECURITY;

-- Service role inserts from API; authenticated users cannot read others' runs.
CREATE POLICY "Service role full access agent_runs"
  ON public.agent_runs
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Users read own agent_runs"
  ON public.agent_runs
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);
