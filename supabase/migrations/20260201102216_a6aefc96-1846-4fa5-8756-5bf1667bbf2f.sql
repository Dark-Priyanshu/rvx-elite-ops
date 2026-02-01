-- Drop the existing overly permissive INSERT policy
DROP POLICY IF EXISTS "Anyone can submit applications" ON public.recruitment_applications;

-- Create a new INSERT policy with actual validation checks
-- This ensures all required fields are non-empty strings
CREATE POLICY "Public can submit valid applications"
ON public.recruitment_applications
FOR INSERT
TO anon, authenticated
WITH CHECK (
  -- Validate that all required fields are non-empty
  length(trim(player_name)) > 0 AND
  length(trim(ign)) > 0 AND
  length(trim(uid)) > 0 AND
  length(trim(role)) > 0 AND
  length(trim(experience)) > 0 AND
  length(trim(discord)) > 0 AND
  -- Ensure status starts as pending
  status = 'pending'
);