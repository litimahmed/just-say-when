-- Remove email and other auth-related fields from profiles table
-- These should be in auth.users instead
ALTER TABLE public.profiles 
DROP COLUMN IF EXISTS email,
DROP COLUMN IF EXISTS phone,
DROP COLUMN IF EXISTS full_name;

-- Ensure proper foreign key relationship to auth.users exists
-- (This should already exist from previous migration, but ensuring it's there)
DO $$ 
BEGIN
    -- Check if foreign key constraint exists, if not add it
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.table_constraints 
        WHERE constraint_name = 'profiles_id_fkey' 
        AND table_name = 'profiles'
    ) THEN
        ALTER TABLE public.profiles 
        ADD CONSTRAINT profiles_id_fkey 
        FOREIGN KEY (id) REFERENCES auth.users(id) ON DELETE CASCADE;
    END IF;
END $$;

-- Drop the user_registrations table as it's no longer needed
DROP TABLE IF EXISTS public.user_registrations;

-- Update the handle_new_user function to not reference email anymore
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $function$
BEGIN
  INSERT INTO public.profiles (id)
  VALUES (NEW.id)
  ON CONFLICT (id) DO NOTHING;
  RETURN NEW;
END;
$function$;

-- Remove the sync_profile_email function as email is now in auth.users
DROP FUNCTION IF EXISTS public.sync_profile_email();