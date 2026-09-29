import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { TestPaletteLegend } from "./test-palette-legend";

interface QuestionPaletteGridProperties {
  totalQuestionNumberCount: number;
  currentActiveQuestionIndex: number;
  recordedAnswersMap: Record<number, string>;
  markedForReviewSet: Set<number>;
  onSelectQuestionIndex: (selectedQuestionIndex: number) => void;
}

export function QuestionPaletteGrid({
  totalQuestionNumberCount,
  currentActiveQuestionIndex,
  recordedAnswersMap,
  markedForReviewSet,
  onSelectQuestionIndex,
}: QuestionPaletteGridProperties) {
  return (
    <Card className="border-neutral-200 bg-white shadow-sm">
      <CardHeader className="p-4 pb-2">
        <CardTitle className="text-xs font-bold text-neutral-900 uppercase tracking-wider">Question Palette</CardTitle>
      </CardHeader>
      <CardContent className="p-4 space-y-3">
        <TestPaletteLegend />
        <div className="grid grid-cols-5 gap-1.5 max-h-[360px] overflow-y-auto pr-1">
          {Array.from({ length: totalQuestionNumberCount }).map((_, index) => {
            const isAnswered = recordedAnswersMap[index] !== undefined;
            const isMarked = markedForReviewSet.has(index);
            const isCurrent = currentActiveQuestionIndex === index;
            const bgClass = isAnswered
              ? "bg-emerald-600 text-white font-bold"
              : isMarked
              ? "bg-purple-600 text-white font-bold"
              : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200";

            return (
              <button
                key={index}
                type="button"
                onClick={() => onSelectQuestionIndex(index)}
                className={`flex h-8 w-8 cursor-pointer items-center justify-center rounded-lg text-xs font-medium transition-all ${bgClass} ${
                  isCurrent ? "ring-2 ring-blue-600 ring-offset-2" : ""
                }`}
              >
                {index + 1}
              </button>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
