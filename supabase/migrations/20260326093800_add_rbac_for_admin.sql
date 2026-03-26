-- Function to get the role of the current user
CREATE OR REPLACE FUNCTION get_my_role() RETURNS TEXT AS $$
BEGIN
  RETURN (SELECT auth.jwt()->>'role');
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Drop existing policies
DROP POLICY IF EXISTS "Anyone can submit contact form" ON public.contact_submissions;
DROP POLICY IF EXISTS "Authenticated users can view submissions" ON public.contact_submissions;
DROP POLICY IF EXISTS "Authenticated users can update submissions" ON public.contact_submissions;

-- Allow anonymous inserts (public contact form)
CREATE POLICY "Anyone can submit contact form" 
ON public.contact_submissions FOR INSERT 
TO anon, authenticated 
WITH CHECK (true);

-- Admins can view all submissions
CREATE POLICY "Admins can view submissions" 
ON public.contact_submissions FOR SELECT 
TO authenticated 
USING (get_my_role() = 'admin');

-- Admins can update all submissions
CREATE POLICY "Admins can update submissions" 
ON public.contact_submissions FOR UPDATE 
TO authenticated 
USING (get_my_role() = 'admin');
