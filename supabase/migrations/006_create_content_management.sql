-- Create content management table for storing page content
CREATE TABLE IF NOT EXISTS page_content (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  page_key VARCHAR(100) UNIQUE NOT NULL, -- e.g., 'hero', 'about', 'contact'
  section_key VARCHAR(100) NOT NULL, -- e.g., 'title', 'subtitle', 'description'
  content TEXT NOT NULL,
  content_type VARCHAR(50) DEFAULT 'text', -- 'text', 'html', 'json'
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_page_content_page_key ON page_content(page_key);
CREATE INDEX IF NOT EXISTS idx_page_content_section_key ON page_content(section_key);
CREATE INDEX IF NOT EXISTS idx_page_content_active ON page_content(is_active);

-- Enable Row Level Security
ALTER TABLE page_content ENABLE ROW LEVEL SECURITY;

-- Create policies for page content
CREATE POLICY "Public read access for page content" ON page_content 
  FOR SELECT USING (is_active = true);

CREATE POLICY "Admin users can manage page content" ON page_content 
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM admin_users 
      WHERE id = auth.uid()::uuid 
      AND is_active = true
    )
  );

-- Insert default content
INSERT INTO page_content (page_key, section_key, content, content_type) VALUES
-- Hero section
('hero', 'main_title', 'Marmagya 10.0', 'text'),
('hero', 'subtitle', 'Annual Business Conclave', 'text'),
('hero', 'description', 'Join us for the most prestigious business conclave at IIM Sambalpur. Where innovation meets excellence, and leaders shape the future of business.', 'text'),
('hero', 'event_dates', 'March 15-16, 2024 | IIM Sambalpur', 'text'),

-- About section
('about', 'title', 'About Marmagya 10.0', 'text'),
('about', 'description', 'Marmagya 10.0 is the flagship annual business conclave of IIM Sambalpur, bringing together industry leaders, entrepreneurs, and academicians to discuss the latest trends and challenges in the business world.', 'text'),
('about', 'mission', 'Our mission is to foster innovation, entrepreneurship, and leadership in the business community while providing a platform for meaningful discussions and networking opportunities.', 'text'),

-- Contact section
('contact', 'title', 'Get In Touch', 'text'),
('contact', 'description', 'Have questions about Marmagya 10.0? We would love to hear from you. Send us a message and we will respond as soon as possible.', 'text'),
('contact', 'email', 'info@marmagya.com', 'text'),
('contact', 'phone', '+91 1234567890', 'text'),
('contact', 'address', 'IIM Sambalpur, Odisha, India', 'text'),

-- Theme section
('theme', 'title', 'Theme: Innovation & Leadership', 'text'),
('theme', 'description', 'This year''s theme focuses on the intersection of innovation and leadership in the modern business landscape.', 'text'),

-- Games section
('games', 'title', 'Interactive Games & Activities', 'text'),
('games', 'description', 'Engage in fun and interactive games designed to enhance your networking experience and make the most of your time at Marmagya 10.0.', 'text'),

-- Sponsors section
('sponsors', 'title', 'Our Sponsors', 'text'),
('sponsors', 'description', 'We are grateful to our sponsors who make Marmagya 10.0 possible.', 'text'),

-- Gallery section
('gallery', 'title', 'Gallery', 'text'),
('gallery', 'description', 'Relive the moments from previous editions of Marmagya and stay tuned for updates from this year''s event.', 'text'),

-- Speakers section
('speakers', 'title', 'Our Speakers', 'text'),
('speakers', 'description', 'Meet our distinguished panel of speakers who will share their insights and experiences.', 'text'),

-- Agenda section
('agenda', 'title', 'Event Agenda', 'text'),
('agenda', 'description', 'Explore the comprehensive agenda for Marmagya 10.0 featuring keynote sessions, panel discussions, and networking opportunities.', 'text');

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_page_content_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for updated_at
CREATE TRIGGER update_page_content_updated_at
  BEFORE UPDATE ON page_content
  FOR EACH ROW
  EXECUTE FUNCTION update_page_content_updated_at();
