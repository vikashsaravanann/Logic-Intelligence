-- Switch dense embeddings from OpenAI 1536-d to Groq nomic-embed-text-v1_5 (768-d)
-- xAI embeddings can also target 768 if configured; OpenAI path optional via separate column later.

DROP INDEX IF EXISTS idx_knowledge_chunks_embedding_hnsw;
DROP INDEX IF EXISTS idx_knowledge_chunks_embedding;

ALTER TABLE public.knowledge_chunks DROP COLUMN IF EXISTS embedding;
ALTER TABLE public.knowledge_chunks ADD COLUMN embedding vector(768);

CREATE INDEX IF NOT EXISTS idx_knowledge_chunks_embedding_hnsw
  ON public.knowledge_chunks
  USING hnsw (embedding vector_cosine_ops);

-- Replace hybrid RPC for 768-d vectors
CREATE OR REPLACE FUNCTION public.match_knowledge_chunks(
  query_text text,
  match_count int DEFAULT 8,
  query_embedding vector(768) DEFAULT NULL
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
      ts_rank_cd(c.fts, websearch_to_tsquery('english', query_text))::double precision AS fts_rank
    FROM public.knowledge_chunks c
    WHERE length(trim(coalesce(query_text, ''))) > 0
      AND c.fts @@ websearch_to_tsquery('english', query_text)
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
