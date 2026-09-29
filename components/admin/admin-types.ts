export interface ExamSetRow {
  id: string;
  name: string;
  year: number;
  session: string;
  is_active: boolean;
  question_paper_path: string | null;
  exams?: { name: string; slug?: string } | { name: string; slug?: string }[] | null;
}
