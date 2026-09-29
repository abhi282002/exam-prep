-- Migration: Add typed questions support
-- Deprecation note: 'text' and 'passage' columns on questions are deprecated; new code reads 'stem' and 'content'.

ALTER TABLE public.questions
  ADD COLUMN IF NOT EXISTS type text NOT NULL DEFAULT 'mcq'
    CHECK (type IN ('mcq', 'match', 'passage', 'statements', 'assertion_reason')),
  ADD COLUMN IF NOT EXISTS stem text,
  ADD COLUMN IF NOT EXISTS content jsonb,
  ADD COLUMN IF NOT EXISTS source_page int;

ALTER TABLE public.answers
  ADD COLUMN IF NOT EXISTS visited boolean NOT NULL DEFAULT false;

-- Backfill: set stem = text for existing rows
UPDATE public.questions
SET stem = text
WHERE stem IS NULL AND text IS NOT NULL;
