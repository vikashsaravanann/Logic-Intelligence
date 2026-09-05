CREATE TABLE IF NOT EXISTS public.ai_memory (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    memory_key TEXT NOT NULL,
    memory_value TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(user_id, memory_key)
);

ALTER TABLE public.ai_memory ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own AI memories"
    ON public.ai_memory FOR SELECT
    USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own AI memories"
    ON public.ai_memory FOR INSERT
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own AI memories"
    ON public.ai_memory FOR UPDATE
    USING (auth.uid() = user_id);
