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

  -- 3. Insert Question 1
  INSERT INTO public.questions (set_id, number, text, subject, correct_option, explanation)
  VALUES (
    v_set_id,
    1,
    'Which of the following evaluation systems is primarily designed to assess student mastery at the end of an instructional unit?',
    'Teaching Aptitude',
    'B',
    'Summative evaluation assesses overall learning outcome at the conclusion of an instructional period.'
  )
  RETURNING id INTO v_question_id;

  INSERT INTO public.options (question_id, key, text) VALUES
    (v_question_id, 'A', 'Formative Evaluation'),
    (v_question_id, 'B', 'Summative Evaluation'),
    (v_question_id, 'C', 'Diagnostic Evaluation'),
    (v_question_id, 'D', 'Norm-Referenced Evaluation');

  -- 4. Insert Question 2
  INSERT INTO public.questions (set_id, number, text, subject, correct_option, explanation)
  VALUES (
    v_set_id,
    2,
    'In qualitative research, which technique is predominantly used to ensure data saturation and thematic consistency?',
    'Research Aptitude',
    'C',
    'Triangulation combines multiple observers, theories, or empirical materials to establish comprehensive validity.'
  )
  RETURNING id INTO v_question_id;

  INSERT INTO public.options (question_id, key, text) VALUES
    (v_question_id, 'A', 'Parametric Variance Testing'),
    (v_question_id, 'B', 'Quota Stratification'),
    (v_question_id, 'C', 'Triangulation'),
    (v_question_id, 'D', 'Standardized Normal Distribution');

  -- 5. Insert Question 3
  INSERT INTO public.questions (set_id, number, text, subject, correct_option, explanation)
  VALUES (
    v_set_id,
    3,
    'Which of the following communication barriers occurs when the receiver interprets words differently than intended by the sender due to language nuances?',
    'Communication',
    'A',
    'Semantic barriers arise from ambiguities in language, symbols, or technical jargon.'
  )
  RETURNING id INTO v_question_id;

  INSERT INTO public.options (question_id, key, text) VALUES
    (v_question_id, 'A', 'Semantic Barrier'),
    (v_question_id, 'B', 'Psychological Barrier'),
    (v_question_id, 'C', 'Physical Barrier'),
    (v_question_id, 'D', 'Organizational Barrier');

  -- 6. Insert Question 4
  INSERT INTO public.questions (set_id, number, text, subject, correct_option, explanation)
  VALUES (
    v_set_id,
    4,
    'Find the next number in the given logical sequence: 4, 9, 25, 49, 121, ?',
    'Mathematical Reasoning',
    'D',
    'The terms are squares of consecutive prime numbers: 2^2=4, 3^2=9, 5^2=25, 7^2=49, 11^2=121, 13^2=169.'
  )
  RETURNING id INTO v_question_id;

  INSERT INTO public.options (question_id, key, text) VALUES
    (v_question_id, 'A', '144'),
    (v_question_id, 'B', '156'),
    (v_question_id, 'C', '168'),
    (v_question_id, 'D', '169');

  -- 7. Insert Question 5
  INSERT INTO public.questions (set_id, number, text, subject, correct_option, explanation)
  VALUES (
    v_set_id,
    5,
    'In classical Indian logic (Nyaya), which source of knowledge refers to knowledge gained through comparison and analogy?',
    'Logical Reasoning',
    'B',
    'Upamana is valid cognition derived through similitude or comparison with an already known standard.'
  )
  RETURNING id INTO v_question_id;

  INSERT INTO public.options (question_id, key, text) VALUES
    (v_question_id, 'A', 'Pratyaksha (Perception)'),
    (v_question_id, 'B', 'Upamana (Comparison)'),
    (v_question_id, 'C', 'Anumana (Inference)'),
    (v_question_id, 'D', 'Sabda (Verbal Testimony)');

  -- 8. Insert Question 6
  INSERT INTO public.questions (set_id, number, text, subject, correct_option, explanation)
  VALUES (
    v_set_id,
    6,
    'Which protocol is primarily used for securely transferring encrypted web pages between a client browser and server?',
    'Information & Communication Technology',
    'C',
    'HTTPS uses TLS/SSL encryption to secure communications over computer networks.'
  )
  RETURNING id INTO v_question_id;

  INSERT INTO public.options (question_id, key, text) VALUES
    (v_question_id, 'A', 'FTP'),
    (v_question_id, 'B', 'SMTP'),
    (v_question_id, 'C', 'HTTPS'),
    (v_question_id, 'D', 'Telnet');

  -- 9. Insert Question 7
  INSERT INTO public.questions (set_id, number, text, subject, correct_option, explanation)
  VALUES (
    v_set_id,
    7,
    'Under the Sustainable Development Goals (SDGs) framework established by the United Nations, which goal specifically targets Quality Education?',
    'People, Development & Environment',
    'B',
    'SDG 4 aims to ensure inclusive and equitable quality education and promote lifelong learning opportunities for all.'
  )
  RETURNING id INTO v_question_id;

  INSERT INTO public.options (question_id, key, text) VALUES
    (v_question_id, 'A', 'SDG 3'),
    (v_question_id, 'B', 'SDG 4'),
    (v_question_id, 'C', 'SDG 6'),
    (v_question_id, 'D', 'SDG 13');

  -- 10. Insert Question 8
  INSERT INTO public.questions (set_id, number, text, subject, correct_option, explanation)
  VALUES (
    v_set_id,
    8,
    'According to the National Education Policy (NEP) 2020, what is the new pedagogical curricular structure replacing the 10+2 system?',
    'Higher Education System',
    'A',
    'NEP 2020 replaces the 10+2 structure with a 5+3+3+4 design covering foundational, preparatory, middle, and secondary stages.'
  )
  RETURNING id INTO v_question_id;

  INSERT INTO public.options (question_id, key, text) VALUES
    (v_question_id, 'A', '5+3+3+4'),
    (v_question_id, 'B', '5+4+3+2'),
    (v_question_id, 'C', '4+4+4+4'),
    (v_question_id, 'D', '3+3+4+5');

  -- 11. Insert Question 9
  INSERT INTO public.questions (set_id, number, text, subject, correct_option, explanation)
  VALUES (
    v_set_id,
    9,
    'Which metric measures the particulate matter suspended in air with a aerodynamic diameter equal to or less than 2.5 micrometers?',
    'People, Development & Environment',
    'C',
    'PM 2.5 refers to fine inhalable particles with diameters that are generally 2.5 micrometers and smaller.'
  )
  RETURNING id INTO v_question_id;

  INSERT INTO public.options (question_id, key, text) VALUES
    (v_question_id, 'A', 'AQI 100'),
    (v_question_id, 'B', 'VOC 50'),
    (v_question_id, 'C', 'PM 2.5'),
    (v_question_id, 'D', 'CO2 PPM');

  -- 12. Insert Question 10
  INSERT INTO public.questions (set_id, number, text, subject, correct_option, explanation)
  VALUES (
    v_set_id,
    10,
    'In digital storage hierarchy, which memory type provides the fastest data access speed to the central processing unit?',
    'Information & Communication Technology',
    'D',
    'CPU register and cache memory deliver the highest access speeds in the computer memory hierarchy.'
  )
  RETURNING id INTO v_question_id;

  INSERT INTO public.options (question_id, key, text) VALUES
    (v_question_id, 'A', 'Solid State Drive (SSD)'),
    (v_question_id, 'B', 'Dynamic Random Access Memory (DRAM)'),
    (v_question_id, 'C', 'Optical Storage'),
    (v_question_id, 'D', 'CPU Cache Memory');

END $$;
