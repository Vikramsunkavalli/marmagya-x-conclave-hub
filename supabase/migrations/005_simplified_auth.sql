-- Simplified authentication system using Supabase auth
-- This approach uses Supabase's built-in authentication

-- Create admin users table (simplified)
CREATE TABLE IF NOT EXISTS admin_users (
  id UUID REFERENCES auth.users(id) PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  name VARCHAR(255) NOT NULL,
  role VARCHAR(50) DEFAULT 'admin',
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  last_login TIMESTAMP WITH TIME ZONE
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_admin_users_email ON admin_users(email);
CREATE INDEX IF NOT EXISTS idx_admin_users_active ON admin_users(is_active);

-- Enable Row Level Security
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;

-- Create policies for admin users
CREATE POLICY "Admin users can read their own data" ON admin_users 
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Admin users can update their own data" ON admin_users 
  FOR UPDATE USING (auth.uid() = id);

-- Update existing policies to require authentication for admin operations
-- Drop existing policies first
DROP POLICY IF EXISTS "Admin users can insert speakers" ON speakers;
DROP POLICY IF EXISTS "Admin users can update speakers" ON speakers;
DROP POLICY IF EXISTS "Admin users can delete speakers" ON speakers;
DROP POLICY IF EXISTS "Admin users can insert events" ON events;
DROP POLICY IF EXISTS "Admin users can update events" ON events;
DROP POLICY IF EXISTS "Admin users can delete events" ON events;
DROP POLICY IF EXISTS "Admin users can insert sponsors" ON sponsors;
DROP POLICY IF EXISTS "Admin users can update sponsors" ON sponsors;
DROP POLICY IF EXISTS "Admin users can delete sponsors" ON sponsors;
DROP POLICY IF EXISTS "Admin users can insert gallery" ON gallery;
DROP POLICY IF EXISTS "Admin users can update gallery" ON gallery;
DROP POLICY IF EXISTS "Admin users can delete gallery" ON gallery;

-- Create new policies with proper access control
-- Admin write access (authentication required)
CREATE POLICY "Authenticated admin users can insert speakers" ON speakers 
  FOR INSERT WITH CHECK (
    auth.role() = 'authenticated' AND 
    EXISTS (SELECT 1 FROM admin_users WHERE id = auth.uid() AND is_active = true)
  );

CREATE POLICY "Authenticated admin users can update speakers" ON speakers 
  FOR UPDATE USING (
    auth.role() = 'authenticated' AND 
    EXISTS (SELECT 1 FROM admin_users WHERE id = auth.uid() AND is_active = true)
  );

CREATE POLICY "Authenticated admin users can delete speakers" ON speakers 
  FOR DELETE USING (
    auth.role() = 'authenticated' AND 
    EXISTS (SELECT 1 FROM admin_users WHERE id = auth.uid() AND is_active = true)
  );

-- Similar policies for events
CREATE POLICY "Authenticated admin users can insert events" ON events 
  FOR INSERT WITH CHECK (
    auth.role() = 'authenticated' AND 
    EXISTS (SELECT 1 FROM admin_users WHERE id = auth.uid() AND is_active = true)
  );

CREATE POLICY "Authenticated admin users can update events" ON events 
  FOR UPDATE USING (
    auth.role() = 'authenticated' AND 
    EXISTS (SELECT 1 FROM admin_users WHERE id = auth.uid() AND is_active = true)
  );

CREATE POLICY "Authenticated admin users can delete events" ON events 
  FOR DELETE USING (
    auth.role() = 'authenticated' AND 
    EXISTS (SELECT 1 FROM admin_users WHERE id = auth.uid() AND is_active = true)
  );

-- Similar policies for sponsors
CREATE POLICY "Authenticated admin users can insert sponsors" ON sponsors 
  FOR INSERT WITH CHECK (
    auth.role() = 'authenticated' AND 
    EXISTS (SELECT 1 FROM admin_users WHERE id = auth.uid() AND is_active = true)
  );

CREATE POLICY "Authenticated admin users can update sponsors" ON sponsors 
  FOR UPDATE USING (
    auth.role() = 'authenticated' AND 
    EXISTS (SELECT 1 FROM admin_users WHERE id = auth.uid() AND is_active = true)
  );

CREATE POLICY "Authenticated admin users can delete sponsors" ON sponsors 
  FOR DELETE USING (
    auth.role() = 'authenticated' AND 
    EXISTS (SELECT 1 FROM admin_users WHERE id = auth.uid() AND is_active = true)
  );

-- Similar policies for gallery
CREATE POLICY "Authenticated admin users can insert gallery" ON gallery 
  FOR INSERT WITH CHECK (
    auth.role() = 'authenticated' AND 
    EXISTS (SELECT 1 FROM admin_users WHERE id = auth.uid() AND is_active = true)
  );

CREATE POLICY "Authenticated admin users can update gallery" ON gallery 
  FOR UPDATE USING (
    auth.role() = 'authenticated' AND 
    EXISTS (SELECT 1 FROM admin_users WHERE id = auth.uid() AND is_active = true)
  );

CREATE POLICY "Authenticated admin users can delete gallery" ON gallery 
  FOR DELETE USING (
    auth.role() = 'authenticated' AND 
    EXISTS (SELECT 1 FROM admin_users WHERE id = auth.uid() AND is_active = true)
  );

-- Insert default admin user (you'll need to create this user through Supabase Auth first)
-- This is just a placeholder - the actual user will be created through the Supabase dashboard
-- or through the signup process

-- Create function to check if user is admin
CREATE OR REPLACE FUNCTION is_admin_user(user_id UUID)
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM admin_users 
    WHERE id = user_id AND is_active = true
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create function to get admin user info
CREATE OR REPLACE FUNCTION get_admin_user_info(user_id UUID)
RETURNS TABLE(id UUID, email VARCHAR, name VARCHAR, role VARCHAR) AS $$
BEGIN
  RETURN QUERY
  SELECT au.id, au.email, au.name, au.role
  FROM admin_users au
  WHERE au.id = user_id AND au.is_active = true;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
