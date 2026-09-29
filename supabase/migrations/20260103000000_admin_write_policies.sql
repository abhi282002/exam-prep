-- Admin Write Policies for Content Tables
-- These allow users with role='admin' to perform full CRUD on content tables.
-- Note: The application backend uses the service-role client (bypassing RLS) for admin
-- mutations, but these policies are kept as a proper safety net.

-- Sets table: admin can insert, update, delete
CREATE POLICY "Admins can insert sets"
  ON public.sets FOR INSERT
  WITH CHECK (public.is_admin());

CREATE POLICY "Admins can update sets"
  ON public.sets FOR UPDATE
  USING (public.is_admin());

CREATE POLICY "Admins can delete sets"
  ON public.sets FOR DELETE
  USING (public.is_admin());

-- Exams table: admin can insert, update, delete
CREATE POLICY "Admins can insert exams"
  ON public.exams FOR INSERT
  WITH CHECK (public.is_admin());

CREATE POLICY "Admins can update exams"
  ON public.exams FOR UPDATE
  USING (public.is_admin());

CREATE POLICY "Admins can delete exams"
  ON public.exams FOR DELETE
  USING (public.is_admin());

-- Questions table: admin can insert, update, delete
CREATE POLICY "Admins can insert questions"
  ON public.questions FOR INSERT
  WITH CHECK (public.is_admin());

CREATE POLICY "Admins can update questions"
  ON public.questions FOR UPDATE
  USING (public.is_admin());

CREATE POLICY "Admins can delete questions"
  ON public.questions FOR DELETE
  USING (public.is_admin());

-- Options table: admin can insert, update, delete
CREATE POLICY "Admins can insert options"
  ON public.options FOR INSERT
  WITH CHECK (public.is_admin());

CREATE POLICY "Admins can update options"
  ON public.options FOR UPDATE
  USING (public.is_admin());

CREATE POLICY "Admins can delete options"
  ON public.options FOR DELETE
  USING (public.is_admin());

-- Extraction chunks: admin can insert, update, delete
CREATE POLICY "Admins can insert extraction chunks"
  ON public.extraction_chunks FOR INSERT
  WITH CHECK (public.is_admin());

CREATE POLICY "Admins can update extraction chunks"
  ON public.extraction_chunks FOR UPDATE
  USING (public.is_admin());

CREATE POLICY "Admins can delete extraction chunks"
  ON public.extraction_chunks FOR DELETE
  USING (public.is_admin());

-- Admins can view all extraction chunks (for monitoring)
CREATE POLICY "Admins can view all extraction chunks"
  ON public.extraction_chunks FOR SELECT
  USING (public.is_admin());
