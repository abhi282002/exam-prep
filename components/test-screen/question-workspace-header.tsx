interface WorkspaceHeaderProps {
  questionNumber: number;
  totalQuestions: number;
}

export function QuestionWorkspaceHeader({
  questionNumber,
  totalQuestions,
}: WorkspaceHeaderProps) {
  return (
    <div className="flex items-center justify-between pb-4 border-b border-neutral-800">
      <div className="text-sm sm:text-base font-semibold text-neutral-200">
        Question {questionNumber} of {totalQuestions}
      </div>
      <div className="text-xs text-neutral-400 font-medium">
        +2 correct · no negative marking
      </div>
    </div>
  );
}
