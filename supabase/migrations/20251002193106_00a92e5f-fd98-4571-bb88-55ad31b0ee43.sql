-- Create contact_messages table
CREATE TABLE public.contact_messages (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  subject TEXT,
  message TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'new' CHECK (status IN ('new', 'read', 'replied')),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on contact_messages
ALTER TABLE public.contact_messages ENABLE ROW LEVEL SECURITY;

-- Contact messages policies (public can insert, only admins can read/update/delete)
CREATE POLICY "Anyone can submit contact messages"
  ON public.contact_messages
  FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Admins can view all messages"
  ON public.contact_messages
  FOR SELECT
  USING (true);

CREATE POLICY "Admins can update message status"
  ON public.contact_messages
  FOR UPDATE
  USING (true);

CREATE POLICY "Admins can delete messages"
  ON public.contact_messages
  FOR DELETE
  USING (true);

-- Create sponsors table
CREATE TABLE public.sponsors (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  logo_url TEXT,
  website_url TEXT,
  sponsor_level TEXT NOT NULL DEFAULT 'bronze' CHECK (sponsor_level IN ('platinum', 'gold', 'silver', 'bronze')),
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on sponsors
ALTER TABLE public.sponsors ENABLE ROW LEVEL SECURITY;

-- Sponsors policies (public read, admin write)
CREATE POLICY "Sponsors are viewable by everyone"
  ON public.sponsors
  FOR SELECT
  USING (true);

CREATE POLICY "Admins can insert sponsors"
  ON public.sponsors
  FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Admins can update sponsors"
  ON public.sponsors
  FOR UPDATE
  USING (true);

CREATE POLICY "Admins can delete sponsors"
  ON public.sponsors
  FOR DELETE
  USING (true);

-- Create speakers table
CREATE TABLE public.speakers (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  title TEXT NOT NULL,
  bio TEXT,
  image_url TEXT,
  speaker_type TEXT NOT NULL DEFAULT 'panel' CHECK (speaker_type IN ('keynote', 'panel')),
  panel_title TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on speakers
ALTER TABLE public.speakers ENABLE ROW LEVEL SECURITY;

-- Speakers policies (public read, admin write)
CREATE POLICY "Speakers are viewable by everyone"
  ON public.speakers
  FOR SELECT
  USING (true);

CREATE POLICY "Admins can insert speakers"
  ON public.speakers
  FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Admins can update speakers"
  ON public.speakers
  FOR UPDATE
  USING (true);

CREATE POLICY "Admins can delete speakers"
  ON public.speakers
  FOR DELETE
  USING (true);

-- Create events table
CREATE TABLE public.events (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  start_time TIMESTAMP WITH TIME ZONE NOT NULL,
  end_time TIMESTAMP WITH TIME ZONE NOT NULL,
  location TEXT,
  event_type TEXT NOT NULL DEFAULT 'session' CHECK (event_type IN ('keynote', 'panel', 'break', 'session', 'networking')),
  speaker_ids TEXT[],
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on events
ALTER TABLE public.events ENABLE ROW LEVEL SECURITY;

-- Events policies (public read, admin write)
CREATE POLICY "Events are viewable by everyone"
  ON public.events
  FOR SELECT
  USING (true);

CREATE POLICY "Admins can insert events"
  ON public.events
  FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Admins can update events"
  ON public.events
  FOR UPDATE
  USING (true);

CREATE POLICY "Admins can delete events"
  ON public.events
  FOR DELETE
  USING (true);

-- Create gallery table
CREATE TABLE public.gallery (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  image_url TEXT NOT NULL,
  image_type TEXT NOT NULL DEFAULT 'photo' CHECK (image_type IN ('photo', 'video')),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on gallery
ALTER TABLE public.gallery ENABLE ROW LEVEL SECURITY;

-- Gallery policies (public read, admin write)
CREATE POLICY "Gallery items are viewable by everyone"
  ON public.gallery
  FOR SELECT
  USING (true);

CREATE POLICY "Admins can insert gallery items"
  ON public.gallery
  FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Admins can update gallery items"
  ON public.gallery
  FOR UPDATE
  USING (true);

CREATE POLICY "Admins can delete gallery items"
  ON public.gallery
  FOR DELETE
  USING (true);