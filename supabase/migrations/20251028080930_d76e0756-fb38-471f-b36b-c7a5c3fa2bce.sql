-- Create storage bucket for course assets
INSERT INTO storage.buckets (id, name, public) 
VALUES ('course-assets', 'course-assets', true)
ON CONFLICT (id) DO NOTHING;

-- Allow anyone to view course assets (thumbnails, etc.)
CREATE POLICY "Anyone can view course assets"
ON storage.objects FOR SELECT
USING (bucket_id = 'course-assets');

-- Allow authenticated teachers to upload course assets
CREATE POLICY "Teachers can upload course assets"
ON storage.objects FOR INSERT
WITH CHECK (
  bucket_id = 'course-assets' 
  AND auth.role() = 'authenticated'
);

-- Allow teachers to update their own course assets
CREATE POLICY "Teachers can update their course assets"
ON storage.objects FOR UPDATE
USING (
  bucket_id = 'course-assets' 
  AND auth.role() = 'authenticated'
);

-- Allow teachers to delete their own course assets
CREATE POLICY "Teachers can delete their course assets"
ON storage.objects FOR DELETE
USING (
  bucket_id = 'course-assets' 
  AND auth.role() = 'authenticated'
);