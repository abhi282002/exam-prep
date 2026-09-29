export interface QuestionOptionItem {
  id: string;
  key: string;
  text: string;
}

export interface ExtractedQuestionRecord {
  id: string;
  number: number;
  text: string;
  passage?: string | null;
  subject: string;
  correct_option: string;
  explanation?: string | null;
  options: QuestionOptionItem[];
}

export interface SetHeaderDetails {
  id: string;
  name: string;
  year: number;
  session: string;
  is_active: boolean;
  total_marks: number;
  exams?: { name: string; slug: string } | null;
}
