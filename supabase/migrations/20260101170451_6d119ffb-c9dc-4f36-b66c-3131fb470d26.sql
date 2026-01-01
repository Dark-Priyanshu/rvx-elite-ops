-- Add length constraints to recruitment_applications table
ALTER TABLE public.recruitment_applications
ADD CONSTRAINT check_player_name_length CHECK (char_length(player_name) <= 50),
ADD CONSTRAINT check_ign_length CHECK (char_length(ign) <= 30),
ADD CONSTRAINT check_uid_length CHECK (char_length(uid) <= 20),
ADD CONSTRAINT check_uid_numeric CHECK (uid ~ '^\d+$'),
ADD CONSTRAINT check_discord_length CHECK (char_length(discord) <= 50),
ADD CONSTRAINT check_role_valid CHECK (role IN ('rusher', 'sniper', 'support', 'igl')),
ADD CONSTRAINT check_experience_valid CHECK (experience IN ('beginner', 'intermediate', 'advanced', 'pro'));