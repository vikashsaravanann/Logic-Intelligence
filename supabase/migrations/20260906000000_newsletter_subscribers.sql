CREATE TABLE IF NOT EXISTS public.newsletter_subscribers (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    email TEXT NOT NULL UNIQUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc', now()) NOT NULL
);

ALTER TABLE public.newsletter_subscribers ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Allow anonymous inserts to newsletter_subscribers" ON public.newsletter_subscribers;
CREATE POLICY "Allow anonymous inserts to newsletter_subscribers"
  ON public.newsletter_subscribers
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

DROP POLICY IF EXISTS "Service role can manage newsletter_subscribers" ON public.newsletter_subscribers;
CREATE POLICY "Service role can manage newsletter_subscribers"
  ON public.newsletter_subscribers
  FOR ALL
  USING (auth.role() = 'service_role');
