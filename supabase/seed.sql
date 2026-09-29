-- Seed Data for Personal Mock Exam Prep Platform (UGC NET Paper 1)

DO $$
DECLARE
  v_exam_id UUID;
  v_set_id UUID;
  v_question_id UUID;
BEGIN
  -- 1. Insert UGC NET Exam
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

  -- 2. Insert June 2024 Shift 1 Mock Set
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

  -- 3. Question 1 (mcq)
  INSERT INTO public.questions (set_id, number, text, stem, type, content, source_page, subject, correct_option, explanation)
  VALUES (
    v_set_id, 1,
    'Which of the following evaluation systems is primarily designed to assess student mastery at the end of an instructional unit?',
    'Which of the following evaluation systems is primarily designed to assess student mastery at the end of an instructional unit?',
    'mcq', null, 1, 'Teaching Aptitude', 'B',
    'Summative evaluation assesses overall learning outcome at the conclusion of an instructional period.'
  ) RETURNING id INTO v_question_id;

  INSERT INTO public.options (question_id, key, text) VALUES
    (v_question_id, 'A', 'Formative Evaluation'),
    (v_question_id, 'B', 'Summative Evaluation'),
    (v_question_id, 'C', 'Diagnostic Evaluation'),
    (v_question_id, 'D', 'Norm-Referenced Evaluation');

  -- 4. Question 2 (match with 3 rows per list)
  INSERT INTO public.questions (set_id, number, text, stem, type, content, source_page, subject, correct_option, explanation)
  VALUES (
    v_set_id, 2,
    'Match List I with List II',
    'Match List I with List II:',
    'match',
    '{"list_a": {"title": "List I (Storage Media)", "items": [{"label": "A", "text": "RAM"}, {"label": "B", "text": "Hard Disk"}, {"label": "C", "text": "Blu-ray Disc"}]}, "list_b": {"title": "List II (Classification)", "items": [{"label": "I", "text": "Volatile Primary Memory"}, {"label": "II", "text": "Non-volatile Magnetic Storage"}, {"label": "III", "text": "Optical Storage Medium"}]}}'::jsonb,
    2, 'Information & Communication Technology', 'A',
    'RAM is volatile primary memory, Hard Disk is non-volatile magnetic storage, and Blu-ray is optical storage.'
  ) RETURNING id INTO v_question_id;

  INSERT INTO public.options (question_id, key, text) VALUES
    (v_question_id, 'A', 'A-I, B-II, C-III'),
    (v_question_id, 'B', 'A-II, B-I, C-III'),
    (v_question_id, 'C', 'A-III, B-II, C-I'),
    (v_question_id, 'D', 'A-I, B-III, C-II');

  -- 5. Question 3 (passage)
  INSERT INTO public.questions (set_id, number, text, stem, type, content, source_page, subject, correct_option, explanation)
  VALUES (
    v_set_id, 3,
    'Read the passage and answer the following question:',
    'According to the passage, what is the primary threat to freshwater ecosystems?',
    'passage',
    '{"passage": "Freshwater ecosystems cover less than one percent of the Earth surface yet support remarkable biodiversity. However, escalating human interventions—such as industrial pollutant runoff, unsustainable water extraction, and invasive aquatic species—threaten their biological integrity at unprecedented rates."}'::jsonb,
    3, 'Reading Comprehension', 'B',
    'The passage explicitly identifies escalating human interventions and industrial pollutant runoff as primary threats.'
  ) RETURNING id INTO v_question_id;

  INSERT INTO public.options (question_id, key, text) VALUES
    (v_question_id, 'A', 'Natural salinity fluctuations'),
    (v_question_id, 'B', 'Human interventions and industrial runoff'),
    (v_question_id, 'C', 'Seasonal precipitation anomalies'),
    (v_question_id, 'D', 'Glacial meltwater dilution');

  -- 6. Question 4 (statements)
  INSERT INTO public.questions (set_id, number, text, stem, type, content, source_page, subject, correct_option, explanation)
  VALUES (
    v_set_id, 4,
    'Given below are two statements:',
    'In the light of the above statements, choose the most appropriate answer from the options given below:',
    'statements',
    '{"statements": [{"label": "Statement I", "text": "Qualitative research paradigms emphasize contextual understanding and inductive thematic synthesis."}, {"label": "Statement II", "text": "Quantitative research strictly excludes statistical hypothesis testing."}]}'::jsonb,
    4, 'Research Aptitude', 'C',
    'Statement I is true because qualitative research is inductive and contextual; Statement II is false because quantitative research relies on statistical hypothesis testing.'
  ) RETURNING id INTO v_question_id;

  INSERT INTO public.options (question_id, key, text) VALUES
    (v_question_id, 'A', 'Both Statement I and Statement II are correct'),
    (v_question_id, 'B', 'Both Statement I and Statement II are incorrect'),
    (v_question_id, 'C', 'Statement I is correct but Statement II is incorrect'),
    (v_question_id, 'D', 'Statement I is incorrect but Statement II is correct');

  -- 7. Question 5 (assertion_reason)
  INSERT INTO public.questions (set_id, number, text, stem, type, content, source_page, subject, correct_option, explanation)
  VALUES (
    v_set_id, 5,
    'Given below are two statements, one is labelled as Assertion (A) and the other is labelled as Reason (R):',
    'In the light of the above statements, choose the correct answer from the options given below:',
    'assertion_reason',
    '{"assertion": "Higher education institutions in India are rapidly adopting blended learning models.", "reason": "Digital infrastructure expansion and NEP 2020 recommendations encourage technology-enabled pedagogical flexibility."}'::jsonb,
    5, 'Higher Education System', 'A',
    'Both Assertion (A) and Reason (R) are true, and (R) is the correct explanation of (A).'
  ) RETURNING id INTO v_question_id;

  INSERT INTO public.options (question_id, key, text) VALUES
    (v_question_id, 'A', 'Both (A) and (R) are true and (R) is the correct explanation of (A)'),
    (v_question_id, 'B', 'Both (A) and (R) are true but (R) is NOT the correct explanation of (A)'),
    (v_question_id, 'C', '(A) is true but (R) is false'),
    (v_question_id, 'D', '(A) is false but (R) is true');

  -- 8. Question 6 (mcq)
  INSERT INTO public.questions (set_id, number, text, stem, type, content, source_page, subject, correct_option, explanation)
  VALUES (
    v_set_id, 6,
    'Which protocol is primarily used for securely transferring encrypted web pages between a client browser and server?',
    'Which protocol is primarily used for securely transferring encrypted web pages between a client browser and server?',
    'mcq', null, 6, 'Information & Communication Technology', 'C',
    'HTTPS uses TLS/SSL encryption to secure communications over computer networks.'
  ) RETURNING id INTO v_question_id;

  INSERT INTO public.options (question_id, key, text) VALUES
    (v_question_id, 'A', 'FTP'),
    (v_question_id, 'B', 'SMTP'),
    (v_question_id, 'C', 'HTTPS'),
    (v_question_id, 'D', 'Telnet');

END $$;
