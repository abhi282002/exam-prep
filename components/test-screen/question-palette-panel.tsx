import { QuestionPaletteItem } from "./question-palette-item";
import { QuestionPaletteLegend } from "./question-palette-legend";

interface PalettePanelProps {
  totalQuestions: number;
  activeQuestionIndex: number;
  answersRecord: Record<string, string>;
  questionIdList: string[];
  markedForReviewSet: Set<number>;
  onSelectIndex: (index: number) => void;
}

export function QuestionPalettePanel({
  totalQuestions,
  activeQuestionIndex,
  answersRecord,
  questionIdList,
  markedForReviewSet,
  onSelectIndex,
}: PalettePanelProps) {
  return (
    <div className="flex flex-col rounded-xl border border-neutral-800 bg-[#121620] p-4 shadow-md sticky top-20">
      <QuestionPaletteLegend />
      <div className="mt-4 grid grid-cols-5 gap-2 overflow-y-auto max-h-[calc(100vh-260px)] pr-1">
        {Array.from({ length: totalQuestions }).map((_, index) => (
          <QuestionPaletteItem
            key={index}
            questionNumber={index + 1}
            questionIndex={index}
            isActive={activeQuestionIndex === index}
            isAnswered={Boolean(answersRecord[questionIdList[index] ?? ""])}
            isMarkedForReview={markedForReviewSet.has(index)}
            onSelectIndex={onSelectIndex}
          />
        ))}
      </div>
    </div>
  );
}
