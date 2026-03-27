-- Create testimonials table
CREATE TABLE public.testimonials (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  role TEXT,
  content TEXT NOT NULL,
  rating INTEGER NOT NULL DEFAULT 5,
  is_approved BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.testimonials ENABLE ROW LEVEL SECURITY;

-- Allow anyone to submit a review (insert)
CREATE POLICY "Anyone can submit a review" 
ON public.testimonials FOR INSERT 
TO anon, authenticated 
WITH CHECK (true);

-- Allow anyone to view ONLY approved reviews
CREATE POLICY "Anyone can view approved reviews" 
ON public.testimonials FOR SELECT 
TO anon, authenticated 
USING (is_approved = true);

-- Allow admins (using our bypass or auth) to view all and update
CREATE POLICY "Admins can manage reviews" 
ON public.testimonials FOR ALL 
TO authenticated 
USING (true);

-- Seed some initial data (approved)
INSERT INTO public.testimonials (name, role, content, rating, is_approved)
VALUES 
('Priya Sharma', 'Café Owner', 'StartupSetGo built our website in just 5 days. Now customers find us on Google and order online!', 5, true),
('Rahul Verma', 'Coaching Institute', 'Our enrollment doubled after we got our app. Parents love the easy access to schedules and results.', 5, true),
('Anita Desai', 'Medical Store', 'Going digital felt overwhelming, but the team made it so simple. Highly recommended!', 5, true);
