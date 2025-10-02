-- Create user roles enum
CREATE TYPE public.app_role AS ENUM ('admin', 'user');

-- Create user_roles table
CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role public.app_role NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  UNIQUE(user_id, role)
);

-- Enable RLS on user_roles
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Create security definer function to check admin status FIRST
CREATE OR REPLACE FUNCTION public.is_admin(_user_id UUID)
RETURNS BOOLEAN
LANGUAGE SQL
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
      AND role = 'admin'
  );
$$;

-- Now create policies that use the function
CREATE POLICY "Users can view their own roles"
  ON public.user_roles
  FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Admins can manage all roles"
  ON public.user_roles
  FOR ALL
  USING (public.is_admin(auth.uid()));

-- Update RLS policies for contact_messages
DROP POLICY IF EXISTS "Admins can view all messages" ON public.contact_messages;
CREATE POLICY "Admins can view all messages"
  ON public.contact_messages
  FOR SELECT
  USING (public.is_admin(auth.uid()));

DROP POLICY IF EXISTS "Admins can update message status" ON public.contact_messages;
CREATE POLICY "Admins can update message status"
  ON public.contact_messages
  FOR UPDATE
  USING (public.is_admin(auth.uid()));

DROP POLICY IF EXISTS "Admins can delete messages" ON public.contact_messages;
CREATE POLICY "Admins can delete messages"
  ON public.contact_messages
  FOR DELETE
  USING (public.is_admin(auth.uid()));

-- Update RLS policies for events
DROP POLICY IF EXISTS "Admins can insert events" ON public.events;
CREATE POLICY "Admins can insert events"
  ON public.events
  FOR INSERT
  WITH CHECK (public.is_admin(auth.uid()));

DROP POLICY IF EXISTS "Admins can update events" ON public.events;
CREATE POLICY "Admins can update events"
  ON public.events
  FOR UPDATE
  USING (public.is_admin(auth.uid()));

DROP POLICY IF EXISTS "Admins can delete events" ON public.events;
CREATE POLICY "Admins can delete events"
  ON public.events
  FOR DELETE
  USING (public.is_admin(auth.uid()));

-- Update RLS policies for gallery
DROP POLICY IF EXISTS "Admins can insert gallery items" ON public.gallery;
CREATE POLICY "Admins can insert gallery items"
  ON public.gallery
  FOR INSERT
  WITH CHECK (public.is_admin(auth.uid()));

DROP POLICY IF EXISTS "Admins can update gallery items" ON public.gallery;
CREATE POLICY "Admins can update gallery items"
  ON public.gallery
  FOR UPDATE
  USING (public.is_admin(auth.uid()));

DROP POLICY IF EXISTS "Admins can delete gallery items" ON public.gallery;
CREATE POLICY "Admins can delete gallery items"
  ON public.gallery
  FOR DELETE
  USING (public.is_admin(auth.uid()));

-- Update RLS policies for speakers
DROP POLICY IF EXISTS "Admins can insert speakers" ON public.speakers;
CREATE POLICY "Admins can insert speakers"
  ON public.speakers
  FOR INSERT
  WITH CHECK (public.is_admin(auth.uid()));

DROP POLICY IF EXISTS "Admins can update speakers" ON public.speakers;
CREATE POLICY "Admins can update speakers"
  ON public.speakers
  FOR UPDATE
  USING (public.is_admin(auth.uid()));

DROP POLICY IF EXISTS "Admins can delete speakers" ON public.speakers;
CREATE POLICY "Admins can delete speakers"
  ON public.speakers
  FOR DELETE
  USING (public.is_admin(auth.uid()));

-- Update RLS policies for sponsors
DROP POLICY IF EXISTS "Admins can insert sponsors" ON public.sponsors;
CREATE POLICY "Admins can insert sponsors"
  ON public.sponsors
  FOR INSERT
  WITH CHECK (public.is_admin(auth.uid()));

DROP POLICY IF EXISTS "Admins can update sponsors" ON public.sponsors;
CREATE POLICY "Admins can update sponsors"
  ON public.sponsors
  FOR UPDATE
  USING (public.is_admin(auth.uid()));

DROP POLICY IF EXISTS "Admins can delete sponsors" ON public.sponsors;
CREATE POLICY "Admins can delete sponsors"
  ON public.sponsors
  FOR DELETE
  USING (public.is_admin(auth.uid()));