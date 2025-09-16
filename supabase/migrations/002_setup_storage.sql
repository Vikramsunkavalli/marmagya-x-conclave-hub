-- Create storage buckets for images
INSERT INTO storage.buckets (id, name, public) VALUES 
  ('speaker-images', 'speaker-images', true),
  ('gallery-images', 'gallery-images', true),
  ('sponsor-logos', 'sponsor-logos', true)
ON CONFLICT (id) DO NOTHING;

-- Create storage policies for public access
CREATE POLICY "Public read access for speaker images" ON storage.objects
  FOR SELECT USING (bucket_id = 'speaker-images');

CREATE POLICY "Public read access for gallery images" ON storage.objects
  FOR SELECT USING (bucket_id = 'gallery-images');

CREATE POLICY "Public read access for sponsor logos" ON storage.objects
  FOR SELECT USING (bucket_id = 'sponsor-logos');

-- Allow authenticated users to upload images (for admin use)
CREATE POLICY "Authenticated users can upload speaker images" ON storage.objects
  FOR INSERT WITH CHECK (bucket_id = 'speaker-images' AND auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can upload gallery images" ON storage.objects
  FOR INSERT WITH CHECK (bucket_id = 'gallery-images' AND auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can upload sponsor logos" ON storage.objects
  FOR INSERT WITH CHECK (bucket_id = 'sponsor-logos' AND auth.role() = 'authenticated');
