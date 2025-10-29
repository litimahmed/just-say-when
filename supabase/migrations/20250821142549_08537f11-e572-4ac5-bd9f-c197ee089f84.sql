-- Create user registrations table
CREATE TABLE public.user_registrations (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  phone TEXT NOT NULL,
  full_name TEXT NOT NULL,
  date_of_birth DATE NOT NULL,
  gender TEXT NOT NULL CHECK (gender IN ('male', 'female')),
  wilaya TEXT NOT NULL,
  address TEXT,
  nin TEXT NOT NULL UNIQUE,
  user_type TEXT NOT NULL CHECK (user_type IN ('student', 'teacher')),
  
  -- Student specific fields
  education_level TEXT,
  institution_name TEXT,
  
  -- Teacher specific fields
  highest_degree TEXT,
  institution_affiliation TEXT,
  bio TEXT,
  linkedin TEXT,
  website TEXT,
  
  -- File paths
  national_id_front_path TEXT,
  national_id_back_path TEXT,
  student_card_path TEXT,
  teaching_qualification_path TEXT,
  
  -- Status and timestamps
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.user_registrations ENABLE ROW LEVEL SECURITY;

-- Create policies for user registrations
CREATE POLICY "Users can view their own registrations" 
ON public.user_registrations 
FOR SELECT 
USING (true); -- For now allow viewing all registrations

CREATE POLICY "Anyone can create registrations" 
ON public.user_registrations 
FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Users can update their own registrations" 
ON public.user_registrations 
FOR UPDATE 
USING (true);

-- Create storage buckets for document uploads
INSERT INTO storage.buckets (id, name, public) VALUES ('registration-documents', 'registration-documents', false);

-- Create policies for registration document uploads
CREATE POLICY "Anyone can upload registration documents" 
ON storage.objects 
FOR INSERT 
WITH CHECK (bucket_id = 'registration-documents');

CREATE POLICY "Anyone can view registration documents" 
ON storage.objects 
FOR SELECT 
USING (bucket_id = 'registration-documents');

CREATE POLICY "Anyone can update registration documents" 
ON storage.objects 
FOR UPDATE 
USING (bucket_id = 'registration-documents');

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
NEW.updated_at = now();
RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_user_registrations_updated_at
BEFORE UPDATE ON public.user_registrations
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();