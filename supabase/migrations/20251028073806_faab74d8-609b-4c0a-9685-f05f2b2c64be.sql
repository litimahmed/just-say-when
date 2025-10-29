-- Create courses table
CREATE TABLE IF NOT EXISTS public.courses (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  teacher_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  title text NOT NULL,
  subtitle text,
  description text,
  category text,
  level text,
  language text,
  thumbnail_url text,
  price decimal(10,2) DEFAULT 0,
  currency text DEFAULT 'USD',
  promotional_price decimal(10,2),
  free_preview boolean DEFAULT false,
  published boolean DEFAULT false,
  enrollment_limit integer DEFAULT 0,
  certificate_enabled boolean DEFAULT false,
  total_duration integer DEFAULT 0,
  total_lessons integer DEFAULT 0,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now()
);

-- Create course_sections table
CREATE TABLE IF NOT EXISTS public.course_sections (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  course_id uuid NOT NULL REFERENCES public.courses(id) ON DELETE CASCADE,
  title text NOT NULL,
  description text,
  order_index integer NOT NULL,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now()
);

-- Create course_lessons table
CREATE TABLE IF NOT EXISTS public.course_lessons (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  section_id uuid NOT NULL REFERENCES public.course_sections(id) ON DELETE CASCADE,
  title text NOT NULL,
  description text,
  order_index integer NOT NULL,
  is_published boolean DEFAULT false,
  estimated_duration integer DEFAULT 0,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now()
);

-- Create lesson_content table
CREATE TABLE IF NOT EXISTS public.lesson_content (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  lesson_id uuid NOT NULL REFERENCES public.course_lessons(id) ON DELETE CASCADE,
  content_type text NOT NULL CHECK (content_type IN ('video', 'text', 'transcript', 'quiz', 'assignment')),
  title text NOT NULL,
  order_index integer NOT NULL,
  data jsonb NOT NULL,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.course_sections ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.course_lessons ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.lesson_content ENABLE ROW LEVEL SECURITY;

-- RLS Policies for courses
CREATE POLICY "Teachers can view their own courses"
  ON public.courses FOR SELECT
  USING (teacher_id = auth.uid() OR published = true);

CREATE POLICY "Teachers can create courses"
  ON public.courses FOR INSERT
  WITH CHECK (teacher_id = auth.uid() AND public.has_role(auth.uid(), 'teacher'));

CREATE POLICY "Teachers can update their own courses"
  ON public.courses FOR UPDATE
  USING (teacher_id = auth.uid() AND public.has_role(auth.uid(), 'teacher'));

CREATE POLICY "Teachers can delete their own courses"
  ON public.courses FOR DELETE
  USING (teacher_id = auth.uid() AND public.has_role(auth.uid(), 'teacher'));

-- RLS Policies for course_sections
CREATE POLICY "Users can view sections of accessible courses"
  ON public.course_sections FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.courses
      WHERE courses.id = course_sections.course_id
      AND (courses.teacher_id = auth.uid() OR courses.published = true)
    )
  );

CREATE POLICY "Teachers can manage sections of their courses"
  ON public.course_sections FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM public.courses
      WHERE courses.id = course_sections.course_id
      AND courses.teacher_id = auth.uid()
      AND public.has_role(auth.uid(), 'teacher')
    )
  );

-- RLS Policies for course_lessons
CREATE POLICY "Users can view lessons of accessible sections"
  ON public.course_lessons FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.course_sections
      JOIN public.courses ON courses.id = course_sections.course_id
      WHERE course_sections.id = course_lessons.section_id
      AND (courses.teacher_id = auth.uid() OR courses.published = true)
    )
  );

CREATE POLICY "Teachers can manage lessons of their courses"
  ON public.course_lessons FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM public.course_sections
      JOIN public.courses ON courses.id = course_sections.course_id
      WHERE course_sections.id = course_lessons.section_id
      AND courses.teacher_id = auth.uid()
      AND public.has_role(auth.uid(), 'teacher')
    )
  );

-- RLS Policies for lesson_content
CREATE POLICY "Users can view content of accessible lessons"
  ON public.lesson_content FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.course_lessons
      JOIN public.course_sections ON course_sections.id = course_lessons.section_id
      JOIN public.courses ON courses.id = course_sections.course_id
      WHERE course_lessons.id = lesson_content.lesson_id
      AND (courses.teacher_id = auth.uid() OR courses.published = true)
    )
  );

CREATE POLICY "Teachers can manage content of their courses"
  ON public.lesson_content FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM public.course_lessons
      JOIN public.course_sections ON course_sections.id = course_lessons.section_id
      JOIN public.courses ON courses.id = course_sections.course_id
      WHERE course_lessons.id = lesson_content.lesson_id
      AND courses.teacher_id = auth.uid()
      AND public.has_role(auth.uid(), 'teacher')
    )
  );

-- Create indexes for better performance
CREATE INDEX idx_courses_teacher_id ON public.courses(teacher_id);
CREATE INDEX idx_courses_published ON public.courses(published);
CREATE INDEX idx_course_sections_course_id ON public.course_sections(course_id);
CREATE INDEX idx_course_lessons_section_id ON public.course_lessons(section_id);
CREATE INDEX idx_lesson_content_lesson_id ON public.lesson_content(lesson_id);

-- Create trigger function for updating updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers
CREATE TRIGGER update_courses_updated_at
  BEFORE UPDATE ON public.courses
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_course_sections_updated_at
  BEFORE UPDATE ON public.course_sections
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_course_lessons_updated_at
  BEFORE UPDATE ON public.course_lessons
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_lesson_content_updated_at
  BEFORE UPDATE ON public.lesson_content
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();