-- Update existing courses to have slugs
UPDATE public.courses
SET slug = generate_slug(title)
WHERE slug IS NULL;

-- Make slug required for new courses
ALTER TABLE public.courses
ALTER COLUMN slug SET NOT NULL;