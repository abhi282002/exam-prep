export interface QuestionRecord {
  id: string;
  text: string;
  options: { key: string; text: string }[];
}

export interface WorkspacePanelProps {
  questionNumber: number;
  totalQuestions: number;
  questionText: string;
  options: { key: string; text: string }[];
  selectedOptionKey: string | null;
  canGoPrevious: boolean;
  onSelectOption: (key: string) => void;
  onPrevious: () => void;
  onNext: () => void;
  onToggleReview: () => void;
  onClear: () => void;
}

export interface TestContentProps {
  questionsList: QuestionRecord[];
  activeQuestionIndex: number;
  answersMap: Record<string, string>;
  markedForReviewSet: Set<number>;
  onSelectOption: (optionKey: string) => void;
  onNavigatePrevious: () => void;
  onNavigateNext: () => void;
  onToggleReview: () => void;
  onClearResponse: () => void;
  onSelectQuestionIndex: (index: number) => void;
}
