-- Initial Schema for Personal Mock Exam Prep Platform (Postgres / Supabase)

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

-- Performance Indexes
CREATE INDEX IF NOT EXISTS idx_sets_exam_id ON public.sets(exam_id);
CREATE INDEX IF NOT EXISTS idx_questions_set_id_number ON public.questions(set_id, number);
CREATE INDEX IF NOT EXISTS idx_options_question_id ON public.options(question_id);
CREATE INDEX IF NOT EXISTS idx_attempts_user_set ON public.attempts(user_id, set_id);
CREATE INDEX IF NOT EXISTS idx_answers_attempt_id ON public.answers(attempt_id);
CREATE INDEX IF NOT EXISTS idx_extraction_chunks_set_status ON public.extraction_chunks(set_id, status);

-- Enable Row Level Security (RLS)
ALTER TABLE public.exams ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.sets ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.questions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.options ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.attempts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.answers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.extraction_chunks ENABLE ROW LEVEL SECURITY;

-- Public Read Policies
CREATE POLICY "Public exams are viewable by everyone" ON public.exams FOR SELECT USING (true);
CREATE POLICY "Public sets are viewable by everyone" ON public.sets FOR SELECT USING (true);
CREATE POLICY "Public questions are viewable by everyone" ON public.questions FOR SELECT USING (true);
CREATE POLICY "Public options are viewable by everyone" ON public.options FOR SELECT USING (true);

-- User-scoped Policies for Attempts
CREATE POLICY "Users can view their own attempts" ON public.attempts FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can create their own attempts" ON public.attempts FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own attempts" ON public.attempts FOR UPDATE USING (auth.uid() = user_id);

-- User-scoped Policies for Answers
CREATE POLICY "Users can view answers to their own attempts" ON public.answers FOR SELECT USING (
  EXISTS (SELECT 1 FROM public.attempts WHERE attempts.id = answers.attempt_id AND attempts.user_id = auth.uid())
);
CREATE POLICY "Users can insert answers to their own attempts" ON public.answers FOR INSERT WITH CHECK (
  EXISTS (SELECT 1 FROM public.attempts WHERE attempts.id = answers.attempt_id AND attempts.user_id = auth.uid())
);
CREATE POLICY "Users can update answers to their own attempts" ON public.answers FOR UPDATE USING (
  EXISTS (SELECT 1 FROM public.attempts WHERE attempts.id = answers.attempt_id AND attempts.user_id = auth.uid())
);
