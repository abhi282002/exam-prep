export interface UploadSubmitParameters {
  examId: string;
  examSlug: string;
  setName: string;
  yearNumber: number;
  sessionText: string;
  questionPdf: File | null;
  answerKeyPdf: File | null;
}
