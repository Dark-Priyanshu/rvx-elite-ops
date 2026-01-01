-- Create recruitment_applications table
CREATE TABLE public.recruitment_applications (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  player_name TEXT NOT NULL,
  ign TEXT NOT NULL,
  uid TEXT NOT NULL,
  role TEXT NOT NULL,
  experience TEXT NOT NULL,
  discord TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.recruitment_applications ENABLE ROW LEVEL SECURITY;

-- Allow anyone to insert applications (public form)
CREATE POLICY "Anyone can submit applications" 
ON public.recruitment_applications 
FOR INSERT 
WITH CHECK (true);

-- Only allow reading via service role (admin access through edge functions)
CREATE POLICY "Service role can read applications" 
ON public.recruitment_applications 
FOR SELECT 
USING (false);