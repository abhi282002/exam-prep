export interface ExaminationItem {
  examinationIdentifier: string;
  examinationTitle: string;
  examinationCategory: string;
  examinationDurationMinutes: number;
  totalQuestionCount: number;
  marksPerQuestion: number;
  negativeMarkingValue: number;
  isPopularExamination: boolean;
}

export const featuredExaminationList: ExaminationItem[] = [
  {
    examinationIdentifier: "ugc-net-paper-1",
    examinationTitle: "UGC NET Paper 1",
    examinationCategory: "Teaching & Research Aptitude",
    examinationDurationMinutes: 60,
    totalQuestionCount: 50,
    marksPerQuestion: 2,
    negativeMarkingValue: 0,
    isPopularExamination: true,
  },
  {
    examinationIdentifier: "ugc-net-paper-2-cs",
    examinationTitle: "UGC NET Paper 2 - Computer Science",
    examinationCategory: "Subject Paper",
    examinationDurationMinutes: 120,
    totalQuestionCount: 100,
    marksPerQuestion: 2,
    negativeMarkingValue: 0,
    isPopularExamination: true,
  },
  {
    examinationIdentifier: "ugc-net-full-mock",
    examinationTitle: "UGC NET Combined Full Mock",
    examinationCategory: "Paper 1 & 2 Complete Test",
    examinationDurationMinutes: 180,
    totalQuestionCount: 150,
    marksPerQuestion: 2,
    negativeMarkingValue: 0,
    isPopularExamination: false,
  },
];
