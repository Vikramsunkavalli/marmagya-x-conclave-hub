-- Insert sample speakers data
INSERT INTO speakers (name, title, bio, speaker_type, panel_title) VALUES
  -- Keynote Speakers
  ('Dr. Rajesh Sharma', 'CEO, TechForward Inc.', 'Future of Business Leadership', 'keynote', NULL),
  ('Ms. Priya Nair', 'Chief AI Officer, Global Tech', 'AI and Future of Work', 'keynote', NULL),
  
  -- Panel 1: Digital Transformation
  ('Mr. Arjun Kumar', 'Managing Director, Innovation Labs', NULL, 'panel', 'Panel 1: Digital Transformation in Traditional Industries'),
  ('Dr. Savita Reddy', 'CTO, Legacy Systems Corp', NULL, 'panel', 'Panel 1: Digital Transformation in Traditional Industries'),
  ('Mr. Rohit Mehta', 'Digital Strategy Head, Manufacturing Plus', NULL, 'panel', 'Panel 1: Digital Transformation in Traditional Industries'),
  ('Ms. Ananya Joshi', 'Transformation Lead, Banking Solutions', NULL, 'panel', 'Panel 1: Digital Transformation in Traditional Industries'),
  ('Dr. Kiran Patel', 'Industry 4.0 Expert, Tech Innovations', NULL, 'panel', 'Panel 1: Digital Transformation in Traditional Industries'),
  
  -- Panel 2: Sustainable Business Practices
  ('Dr. Meera Gupta', 'Sustainability Director, EcoVentures', NULL, 'panel', 'Panel 2: Sustainable Business Practices'),
  ('Mr. Aditya Singh', 'Green Finance Head, Impact Capital', NULL, 'panel', 'Panel 2: Sustainable Business Practices'),
  ('Ms. Riya Sharma', 'ESG Consultant, Future Earth', NULL, 'panel', 'Panel 2: Sustainable Business Practices'),
  ('Dr. Vikram Rao', 'Climate Tech Researcher, GreenLabs', NULL, 'panel', 'Panel 2: Sustainable Business Practices'),
  ('Ms. Pooja Nair', 'Circular Economy Expert, ReGen Corp', NULL, 'panel', 'Panel 2: Sustainable Business Practices');

-- Insert sample events/agenda data
INSERT INTO events (title, description, start_time, end_time, location, event_type) VALUES
  ('Registration & Welcome', 'Conference registration and welcome reception', '2024-03-15 08:00:00+00', '2024-03-15 09:00:00+00', 'Main Hall', 'session'),
  ('Opening Keynote', 'Future of Business Leadership by Dr. Rajesh Sharma', '2024-03-15 09:00:00+00', '2024-03-15 10:00:00+00', 'Main Hall', 'keynote'),
  ('Coffee Break', 'Networking and refreshments', '2024-03-15 10:00:00+00', '2024-03-15 10:30:00+00', 'Lobby', 'break'),
  ('Panel 1: Digital Transformation', 'Digital Transformation in Traditional Industries', '2024-03-15 10:30:00+00', '2024-03-15 12:00:00+00', 'Conference Room A', 'panel'),
  ('Lunch Break', 'Lunch and networking', '2024-03-15 12:00:00+00', '2024-03-15 13:30:00+00', 'Dining Hall', 'break'),
  ('Panel 2: Sustainable Business', 'Sustainable Business Practices', '2024-03-15 13:30:00+00', '2024-03-15 15:00:00+00', 'Conference Room B', 'panel'),
  ('AI Keynote', 'AI and Future of Work by Ms. Priya Nair', '2024-03-15 15:30:00+00', '2024-03-15 16:30:00+00', 'Main Hall', 'keynote'),
  ('Closing Ceremony', 'Awards and closing remarks', '2024-03-15 17:00:00+00', '2024-03-15 18:00:00+00', 'Main Hall', 'session');

-- Insert sample sponsors data
INSERT INTO sponsors (name, sponsor_level, description, website_url) VALUES
  ('TechForward Inc.', 'platinum', 'Leading technology innovation company', 'https://techforward.com'),
  ('Global Tech', 'gold', 'AI and technology solutions provider', 'https://globaltech.com'),
  ('Innovation Labs', 'silver', 'Research and development partner', 'https://innovationlabs.com'),
  ('EcoVentures', 'bronze', 'Sustainable business solutions', 'https://ecoventures.com'),
  ('Impact Capital', 'bronze', 'Green finance and investment', 'https://impactcapital.com');

-- Insert sample gallery data
INSERT INTO gallery (title, description, image_url, image_type) VALUES
  ('Marmagya 9.0 Opening Ceremony', 'Grand opening with distinguished guests', 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&h=600&fit=crop', 'photo'),
  ('Panel Discussion - Digital Innovation', 'Industry leaders sharing insights on digital transformation', 'https://images.unsplash.com/photo-1559223607-b4d0555ae227?w=800&h=600&fit=crop', 'photo'),
  ('Networking Session', 'Participants engaging in meaningful conversations', 'https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=800&h=600&fit=crop', 'photo'),
  ('Keynote Presentation', 'Inspiring talks from business visionaries', 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=800&h=600&fit=crop', 'photo'),
  ('Awards Ceremony', 'Recognizing excellence and innovation', 'https://images.unsplash.com/photo-1511578314322-379afb476865?w=800&h=600&fit=crop', 'photo'),
  ('Workshop Sessions', 'Interactive learning and skill development', 'https://images.unsplash.com/photo-1540317580384-e5d43616b9aa?w=800&h=600&fit=crop', 'photo');
