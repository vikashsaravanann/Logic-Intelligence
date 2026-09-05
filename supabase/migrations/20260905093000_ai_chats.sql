CREATE TABLE IF NOT EXISTS public.ai_chats (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.ai_messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  chat_id UUID REFERENCES public.ai_chats(id) ON DELETE CASCADE,
  role TEXT NOT NULL CHECK (role IN ('user', 'assistant')),
  content TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE public.ai_chats ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ai_messages ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own chats" ON public.ai_chats FOR SELECT TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "Users can insert their own chats" ON public.ai_chats FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own chats" ON public.ai_chats FOR UPDATE TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "Users can delete their own chats" ON public.ai_chats FOR DELETE TO authenticated USING (auth.uid() = user_id);

CREATE POLICY "Users can view their own messages" ON public.ai_messages FOR SELECT TO authenticated USING (
  EXISTS (SELECT 1 FROM public.ai_chats WHERE id = ai_messages.chat_id AND user_id = auth.uid())
);
CREATE POLICY "Users can insert messages to their own chats" ON public.ai_messages FOR INSERT TO authenticated WITH CHECK (
  EXISTS (SELECT 1 FROM public.ai_chats WHERE id = ai_messages.chat_id AND user_id = auth.uid())
);

-- Notify realtime
alter publication supabase_realtime add table public.ai_chats;
alter publication supabase_realtime add table public.ai_messages;
