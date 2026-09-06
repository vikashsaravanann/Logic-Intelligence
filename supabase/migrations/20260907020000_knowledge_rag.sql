-- Production hybrid RAG: pgvector + full-text search over company knowledge chunks
CREATE EXTENSION IF NOT EXISTS vector;

CREATE TABLE IF NOT EXISTS public.knowledge_chunks (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  source text NOT NULL,              -- packages | services | portfolio | policy
  source_id text,                    -- slug / stable id
  title text NOT NULL,
  content text NOT NULL,
  -- Constrained facts (prices, timelines) — always preferred over free generation
  is_price_constrained boolean NOT NULL DEFAULT false,
  metadata jsonb NOT NULL DEFAULT '{}'::jsonb,
  -- Optional dense embedding (1536-dim OpenAI text-embedding-3-small); nullable until embedded
  embedding vector(1536),
  -- Lexical search
  fts tsvector GENERATED ALWAYS AS (
    setweight(to_tsvector('english', coalesce(title, '')), 'A') ||
    setweight(to_tsvector('english', coalesce(content, '')), 'B')
  ) STORED,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_knowledge_chunks_source ON public.knowledge_chunks (source);
CREATE INDEX IF NOT EXISTS idx_knowledge_chunks_fts ON public.knowledge_chunks USING gin (fts);
-- Vector index optional; create after embeddings exist:
-- CREATE INDEX idx_knowledge_chunks_embedding ON public.knowledge_chunks
--   USING hnsw (embedding vector_cosine_ops);

ALTER TABLE public.knowledge_chunks ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.knowledge_chunks FORCE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "knowledge_chunks_service_all" ON public.knowledge_chunks;
CREATE POLICY "knowledge_chunks_service_all"
  ON public.knowledge_chunks
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

-- Public read not required — retrieval is server-side only via service role
DROP POLICY IF EXISTS "knowledge_chunks_anon_none" ON public.knowledge_chunks;

-- Hybrid retrieval RPC: FTS primary; optional vector when embedding is provided
CREATE OR REPLACE FUNCTION public.match_knowledge_chunks(
  query_text text,
  match_count int DEFAULT 8,
  query_embedding vector(1536) DEFAULT NULL
)
RETURNS TABLE (
  id uuid,
  source text,
  source_id text,
  title text,
  content text,
  is_price_constrained boolean,
  metadata jsonb,
  rank double precision
)
LANGUAGE sql
STABLE
AS $$
  WITH fts AS (
    SELECT
      c.id,
      c.source,
      c.source_id,
      c.title,
      c.content,
      c.is_price_constrained,
      c.metadata,
      ts_rank_cd(c.fts, websearch_to_tsquery('english', query_text))::double precision AS fts_rank
    FROM public.knowledge_chunks c
    WHERE c.fts @@ websearch_to_tsquery('english', query_text)
       OR query_text IS NULL
       OR length(trim(query_text)) = 0
  ),
  vec AS (
    SELECT
      c.id,
      (1.0 - (c.embedding <=> query_embedding))::double precision AS vec_rank
    FROM public.knowledge_chunks c
    WHERE query_embedding IS NOT NULL
      AND c.embedding IS NOT NULL
    ORDER BY c.embedding <=> query_embedding
    LIMIT greatest(match_count * 3, 20)
  )
  SELECT
    c.id,
    c.source,
    c.source_id,
    c.title,
    c.content,
    c.is_price_constrained,
    c.metadata,
    (
      coalesce(f.fts_rank, 0) * 0.55
      + coalesce(v.vec_rank, 0) * 0.45
      + CASE WHEN c.is_price_constrained THEN 0.05 ELSE 0 END
    )::double precision AS rank
  FROM public.knowledge_chunks c
  LEFT JOIN fts f ON f.id = c.id
  LEFT JOIN vec v ON v.id = c.id
  WHERE f.id IS NOT NULL OR v.id IS NOT NULL
  ORDER BY rank DESC
  LIMIT match_count;
$$;

GRANT EXECUTE ON FUNCTION public.match_knowledge_chunks(text, int, vector) TO service_role;
