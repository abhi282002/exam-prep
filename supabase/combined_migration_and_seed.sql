-- ============================================================================
-- Complete Database Migration & Seed for ExamPrep Platform
-- Run this in your Supabase SQL Editor: https://supabase.com/dashboard/project/vqkkjanlfgcdevtesmaw
-- ============================================================================

-- 1. Exams Table
CREATE TABLE IF NOT EXISTS public.exams (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  total_questions INTEGER NOT NULL DEFAULT 50,
  duration_minutes INTEGER NOT NULL DEFAULT 60,
  marks_per_question NUMERIC(4, 2) NOT NULL DEFAULT 2.0,
  negative_marks NUMERIC(4, 2) NOT NULL DEFAULT 0.0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 2. Sets Table
CREATE TABLE IF NOT EXISTS public.sets (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  exam_id UUID NOT NULL REFERENCES public.exams(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  year INTEGER NOT NULL,
  session TEXT NOT NULL DEFAULT 'June',
  total_marks INTEGER NOT NULL DEFAULT 100,
  question_paper_path TEXT,
  answer_key_path TEXT,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 3. Questions Table
CREATE TABLE IF NOT EXISTS public.questions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  set_id UUID NOT NULL REFERENCES public.sets(id) ON DELETE CASCADE,
  number INTEGER NOT NULL,
  text TEXT NOT NULL,
  image_url TEXT,
  subject TEXT NOT NULL DEFAULT 'General Paper 1',
  correct_option TEXT NOT NULL,
  explanation TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  CONSTRAINT unique_question_per_set UNIQUE (set_id, number)
);

-- 4. Options Table
CREATE TABLE IF NOT EXISTS public.options (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  question_id UUID NOT NULL REFERENCES public.questions(id) ON DELETE CASCADE,
  key TEXT NOT NULL,
  text TEXT NOT NULL,
  image_url TEXT,
  CONSTRAINT unique_option_per_question UNIQUE (question_id, key)
);

-- 5. Attempts Table
CREATE TABLE IF NOT EXISTS public.attempts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  set_id UUID NOT NULL REFERENCES public.sets(id) ON DELETE CASCADE,
  status TEXT NOT NULL DEFAULT 'in_progress' CHECK (status IN ('in_progress', 'completed', 'timed_out')),
  score NUMERIC(6, 2) DEFAULT 0,
  total_marks NUMERIC(6, 2) DEFAULT 100,
  started_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  deadline TIMESTAMPTZ NOT NULL,
  completed_at TIMESTAMPTZ,
  submitted_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 6. Answers Table
CREATE TABLE IF NOT EXISTS public.answers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  attempt_id UUID NOT NULL REFERENCES public.attempts(id) ON DELETE CASCADE,
  question_id UUID NOT NULL REFERENCES public.questions(id) ON DELETE CASCADE,
  selected_option_key TEXT,
  is_marked_for_review BOOLEAN NOT NULL DEFAULT false,
  is_correct BOOLEAN,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  CONSTRAINT unique_answer_per_attempt_question UNIQUE (attempt_id, question_id)
);

-- 7. Extraction Chunks Table
CREATE TABLE IF NOT EXISTS public.extraction_chunks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  set_id UUID NOT NULL REFERENCES public.sets(id) ON DELETE CASCADE,
  chunk_index INTEGER NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'processing', 'completed', 'failed')),
  raw_text TEXT NOT NULL DEFAULT '',
  error_message TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 8. Performance Indexes
CREATE INDEX IF NOT EXISTS idx_sets_exam_id ON public.sets(exam_id);
CREATE INDEX IF NOT EXISTS idx_questions_set_id_number ON public.questions(set_id, number);
CREATE INDEX IF NOT EXISTS idx_options_question_id ON public.options(question_id);
CREATE INDEX IF NOT EXISTS idx_attempts_user_set ON public.attempts(user_id, set_id);
CREATE INDEX IF NOT EXISTS idx_answers_attempt_id ON public.answers(attempt_id);
CREATE INDEX IF NOT EXISTS idx_extraction_chunks_set_status ON public.extraction_chunks(set_id, status);

-- 9. Enable Row Level Security (RLS)
ALTER TABLE public.exams ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.sets ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.questions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.options ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.attempts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.answers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.extraction_chunks ENABLE ROW LEVEL SECURITY;

-- 10. Public Read Policies
DROP POLICY IF EXISTS "Public exams are viewable by everyone" ON public.exams;
CREATE POLICY "Public exams are viewable by everyone" ON public.exams FOR SELECT USING (true);

DROP POLICY IF EXISTS "Public sets are viewable by everyone" ON public.sets;
CREATE POLICY "Public sets are viewable by everyone" ON public.sets FOR SELECT USING (true);

DROP POLICY IF EXISTS "Public questions are viewable by everyone" ON public.questions;
CREATE POLICY "Public questions are viewable by everyone" ON public.questions FOR SELECT USING (true);

DROP POLICY IF EXISTS "Public options are viewable by everyone" ON public.options;
CREATE POLICY "Public options are viewable by everyone" ON public.options FOR SELECT USING (true);

-- 11. User-scoped Policies for Attempts & Answers
DROP POLICY IF EXISTS "Users can view their own attempts" ON public.attempts;
CREATE POLICY "Users can view their own attempts" ON public.attempts FOR SELECT USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can create their own attempts" ON public.attempts;
CREATE POLICY "Users can create their own attempts" ON public.attempts FOR INSERT WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can update their own attempts" ON public.attempts;
CREATE POLICY "Users can update their own attempts" ON public.attempts FOR UPDATE USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can view answers to their own attempts" ON public.answers;
CREATE POLICY "Users can view answers to their own attempts" ON public.answers FOR SELECT USING (
  EXISTS (SELECT 1 FROM public.attempts WHERE attempts.id = answers.attempt_id AND attempts.user_id = auth.uid())
);

DROP POLICY IF EXISTS "Users can insert answers to their own attempts" ON public.answers;
CREATE POLICY "Users can insert answers to their own attempts" ON public.answers FOR INSERT WITH CHECK (
  EXISTS (SELECT 1 FROM public.attempts WHERE attempts.id = answers.attempt_id AND attempts.user_id = auth.uid())
);

DROP POLICY IF EXISTS "Users can update answers to their own attempts" ON public.answers;
CREATE POLICY "Users can update answers to their own attempts" ON public.answers FOR UPDATE USING (
  EXISTS (SELECT 1 FROM public.attempts WHERE attempts.id = answers.attempt_id AND attempts.user_id = auth.uid())
);

-- 12. Fix RLS Recursion on Profiles
DROP POLICY IF EXISTS "Admins can view all profiles" ON public.profiles;

CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS boolean AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM public.profiles
    WHERE id = auth.uid() AND role = 'admin'
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

CREATE POLICY "Admins can view all profiles"
  ON public.profiles FOR SELECT
  USING (public.is_admin());

-- 13. Seed Mock UGC NET Exam, Set, and 10 Authentic Questions
DO $$
DECLARE
  v_exam_id UUID;
  v_set_id UUID;
  v_question_id UUID;
BEGIN
  -- Insert Exam
  INSERT INTO public.exams (name, slug, description, total_questions, duration_minutes)
  VALUES (
    'UGC NET General Paper 1',
    'ugc-net-paper-1',
    'National Eligibility Test - General Paper on Teaching and Research Aptitude with authentic timer and scoring.',
    50,
    60
  )
  ON CONFLICT (slug) DO UPDATE SET name = EXCLUDED.name
  RETURNING id INTO v_exam_id;

  -- Insert June 2024 Shift 1 Mock Set
  INSERT INTO public.sets (exam_id, name, year, session, total_marks, is_active)
  VALUES (
    v_exam_id,
    'UGC NET June 2024 - Shift 1 Full Paper',
    2024,
    'June',
    100,
    true
  )
  RETURNING id INTO v_set_id;

  -- Question 1
  INSERT INTO public.questions (set_id, number, text, subject, correct_option, explanation)
  VALUES (
    v_set_id, 1,
    'Which of the following evaluation systems is primarily designed to assess student mastery at the end of an instructional unit?',
    'Teaching Aptitude', 'B',
    'Summative evaluation assesses overall learning outcome at the conclusion of an instructional period.'
  ) RETURNING id INTO v_question_id;

  INSERT INTO public.options (question_id, key, text) VALUES
    (v_question_id, 'A', 'Formative Evaluation'),
    (v_question_id, 'B', 'Summative Evaluation'),
    (v_question_id, 'C', 'Diagnostic Evaluation'),
    (v_question_id, 'D', 'Norm-Referenced Evaluation');

  -- Question 2
  INSERT INTO public.questions (set_id, number, text, subject, correct_option, explanation)
  VALUES (
    v_set_id, 2,
    'In qualitative research, which technique is predominantly used to ensure data saturation and thematic consistency?',
    'Research Aptitude', 'C',
    'Triangulation combines multiple observers, theories, or empirical materials to establish comprehensive validity.'
  ) RETURNING id INTO v_question_id;

  INSERT INTO public.options (question_id, key, text) VALUES
    (v_question_id, 'A', 'Pearson correlation analysis'),
    (v_question_id, 'B', 'Stratified random sampling'),
    (v_question_id, 'C', 'Triangulation methodology'),
    (v_question_id, 'D', 'Chi-square goodness of fit');

  -- Question 3
  INSERT INTO public.questions (set_id, number, text, subject, correct_option, explanation)
  VALUES (
    v_set_id, 3,
    'Identify the informal logical fallacy committed in: Everyone believes this candidate is the best teacher, so it must be true.',
    'Logical Reasoning', 'B',
    'Argumentum ad populum (appeal to popularity) concludes that a proposition must be true because many people believe it.'
  ) RETURNING id INTO v_question_id;

  INSERT INTO public.options (question_id, key, text) VALUES
    (v_question_id, 'A', 'Ad Hominem'),
    (v_question_id, 'B', 'Argumentum ad Populum'),
    (v_question_id, 'C', 'Straw Man Fallacy'),
    (v_question_id, 'D', 'Post Hoc Ergo Propter Hoc');

  -- Question 4
  INSERT INTO public.questions (set_id, number, text, subject, correct_option, explanation)
  VALUES (
    v_set_id, 4,
    'Which Nyaya Pramana corresponds to knowledge derived from authoritative spoken or written testimony of a trustworthy person (Aptavakya)?',
    'Indian Logic', 'A',
    'Shabda (word/testimony) is recognized by Nyaya as valid verbal testimony derived from an authoritative source.'
  ) RETURNING id INTO v_question_id;

  INSERT INTO public.options (question_id, key, text) VALUES
    (v_question_id, 'A', 'Shabda'),
    (v_question_id, 'B', 'Upamana'),
    (v_question_id, 'C', 'Pratyaksha'),
    (v_question_id, 'D', 'Anumana');

  -- Question 5
  INSERT INTO public.questions (set_id, number, text, subject, correct_option, explanation)
  VALUES (
    v_set_id, 5,
    'In classroom synchronous communication, which non-verbal dimension relates directly to personal space and distance management?',
    'Communication', 'D',
    'Proxemics is the study of space and how spatial separation between individuals impacts interpersonal communication.'
  ) RETURNING id INTO v_question_id;

  INSERT INTO public.options (question_id, key, text) VALUES
    (v_question_id, 'A', 'Kinesics'),
    (v_question_id, 'B', 'Haptics'),
    (v_question_id, 'C', 'Chronemics'),
    (v_question_id, 'D', 'Proxemics');

  -- Question 6
  INSERT INTO public.questions (set_id, number, text, subject, correct_option, explanation)
  VALUES (
    v_set_id, 6,
    'If a train traveling at 72 km/h crosses a 200m long bridge in 20 seconds, what is the length of the train in meters?',
    'Mathematical Reasoning', 'C',
    'Speed = 72 * 5/18 = 20 m/s. Total distance in 20s = 400m. Length of train = 400 - 200 = 200 meters.'
  ) RETURNING id INTO v_question_id;

  INSERT INTO public.options (question_id, key, text) VALUES
    (v_question_id, 'A', '150 meters'),
    (v_question_id, 'B', '180 meters'),
    (v_question_id, 'C', '200 meters'),
    (v_question_id, 'D', '240 meters');

  -- Question 7
  INSERT INTO public.questions (set_id, number, text, subject, correct_option, explanation)
  VALUES (
    v_set_id, 7,
    'According to Sustainable Development Goal 4 (SDG 4), the target date to ensure inclusive and equitable quality education is:',
    'Higher Education System', 'B',
    'UN SDG Goal 4 aims for complete inclusive and equitable quality education by target year 2030.'
  ) RETURNING id INTO v_question_id;

  INSERT INTO public.options (question_id, key, text) VALUES
    (v_question_id, 'A', '2025'),
    (v_question_id, 'B', '2030'),
    (v_question_id, 'C', '2035'),
    (v_question_id, 'D', '2040');

  -- Question 8
  INSERT INTO public.questions (set_id, number, text, subject, correct_option, explanation)
  VALUES (
    v_set_id, 8,
    'Under the National Education Policy 2020 (NEP 2020), what is the new pedagogical and curricular structure replacing the 10+2 format?',
    'Higher Education System', 'A',
    'NEP 2020 replaces 10+2 with a 5+3+3+4 design covering ages 3 to 18.'
  ) RETURNING id INTO v_question_id;

  INSERT INTO public.options (question_id, key, text) VALUES
    (v_question_id, 'A', '5+3+3+4'),
    (v_question_id, 'B', '5+4+3+2'),
    (v_question_id, 'C', '4+4+4+4'),
    (v_question_id, 'D', '3+3+4+5');

  -- Question 9
  INSERT INTO public.questions (set_id, number, text, subject, correct_option, explanation)
  VALUES (
    v_set_id, 9,
    'Which metric measures particulate matter suspended in air with an aerodynamic diameter equal to or less than 2.5 micrometers?',
    'People, Development & Environment', 'C',
    'PM 2.5 refers to fine inhalable particles with diameters that are generally 2.5 micrometers and smaller.'
  ) RETURNING id INTO v_question_id;

  INSERT INTO public.options (question_id, key, text) VALUES
    (v_question_id, 'A', 'AQI 100'),
    (v_question_id, 'B', 'VOC 50'),
    (v_question_id, 'C', 'PM 2.5'),
    (v_question_id, 'D', 'CO2 PPM');

  -- Question 10
  INSERT INTO public.questions (set_id, number, text, subject, correct_option, explanation)
  VALUES (
    v_set_id, 10,
    'In digital storage hierarchy, which memory type provides the fastest data access speed to the central processing unit?',
    'Information & Communication Technology', 'D',
    'CPU register and cache memory deliver the highest access speeds in the computer memory hierarchy.'
  ) RETURNING id INTO v_question_id;

  INSERT INTO public.options (question_id, key, text) VALUES
    (v_question_id, 'A', 'Solid State Drive (SSD)'),
    (v_question_id, 'B', 'Dynamic Random Access Memory (DRAM)'),
    (v_question_id, 'C', 'Optical Storage'),
    (v_question_id, 'D', 'CPU Cache Memory');

END $$;
