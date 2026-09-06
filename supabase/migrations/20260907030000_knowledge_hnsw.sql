-- HNSW index for dense retrieval (safe after embeddings are backfilled)
-- If the table has few rows, index build is cheap; null embeddings are ignored by the index.

CREATE INDEX IF NOT EXISTS idx_knowledge_chunks_embedding_hnsw
  ON public.knowledge_chunks
  USING hnsw (embedding vector_cosine_ops);
