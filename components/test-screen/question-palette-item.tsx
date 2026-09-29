interface PaletteItemProps {
  questionNumber: number;
  questionIndex: number;
  isActive: boolean;
  isAnswered: boolean;
  isMarkedForReview: boolean;
  onSelectIndex: (index: number) => void;
}

export function QuestionPaletteItem({
  questionNumber,
  questionIndex,
  isActive,
  isAnswered,
  isMarkedForReview,
  onSelectIndex,
}: PaletteItemProps) {
  let styleClasses = "bg-[#161B26] border-neutral-800 text-neutral-300 hover:bg-[#1d2433]";

  if (isAnswered && isMarkedForReview) {
    styleClasses = "bg-emerald-950/70 border-blue-500 text-emerald-300 ring-1 ring-blue-500";
  } else if (isAnswered) {
    styleClasses = "bg-emerald-950/50 border-emerald-600/80 text-emerald-300";
  } else if (isMarkedForReview) {
    styleClasses = "bg-blue-950/70 border-blue-500/80 text-blue-300";
  }

  const activeAccent = isActive
    ? "border-b-[3px] border-b-green-500 text-white font-bold bg-[#222a3a] shadow-sm"
    : "border";

  return (
    <button
      type="button"
      onClick={() => onSelectIndex(questionIndex)}
      className={`flex h-10 w-full items-center justify-center rounded-md text-xs sm:text-sm transition-all cursor-pointer ${styleClasses} ${activeAccent}`}
      aria-label={`Question ${questionNumber}`}
    >
      {questionNumber}
    </button>
  );
}
