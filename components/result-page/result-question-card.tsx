import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface ResultQuestionItem {
  questionIndexNumber: number;
  questionStatement: string;
  selectedOptionKey: string | null;
  correctOptionKey: string;
  explanationText: string;
  options: { key: string; label: string }[];
}

export function ResultQuestionCard({ questionItem }: { questionItem: ResultQuestionItem }) {
  const isAnswerCorrect = questionItem.selectedOptionKey === questionItem.correctOptionKey;
  const isAnswerSkipped = !questionItem.selectedOptionKey;

  return (
    <Card className="border-neutral-200 bg-white shadow-sm space-y-2">
      <CardHeader className="p-5 pb-3 flex flex-row items-center justify-between">
        <span className="text-xs font-bold text-neutral-900">Question {questionItem.questionIndexNumber}</span>
        {isAnswerCorrect && <Badge className="bg-emerald-100 text-emerald-800 text-[10px]">Correct (+2.0)</Badge>}
        {!isAnswerCorrect && !isAnswerSkipped && <Badge className="bg-red-100 text-red-800 text-[10px]">Wrong (0.0)</Badge>}
        {isAnswerSkipped && <Badge variant="secondary" className="text-[10px]">Skipped</Badge>}
      </CardHeader>
      <CardContent className="p-5 pt-0 space-y-4">
        <p className="text-sm font-medium text-neutral-900 leading-relaxed">{questionItem.questionStatement}</p>
        <div className="space-y-2">
          {questionItem.options.map((option) => {
            const isUserSelection = questionItem.selectedOptionKey === option.key;
            const isCorrectAnswer = questionItem.correctOptionKey === option.key;
            let cardStyle = "border-neutral-200 bg-neutral-50/50 text-neutral-700";
            if (isCorrectAnswer) cardStyle = "border-emerald-500 bg-emerald-50 font-semibold text-emerald-950 ring-1 ring-emerald-500";
            else if (isUserSelection && !isCorrectAnswer) cardStyle = "border-red-500 bg-red-50 font-semibold text-red-950";
            return (
              <div key={option.key} className={`flex items-center justify-between rounded-xl border p-3 text-xs ${cardStyle}`}>
                <span><strong className="mr-2">{option.key}.</strong>{option.label}</span>
                {isCorrectAnswer && <span className="text-[10px] font-bold text-emerald-700">Correct Answer</span>}
                {isUserSelection && !isCorrectAnswer && <span className="text-[10px] font-bold text-red-700">Your Answer</span>}
              </div>
            );
          })}
        </div>
        <div className="rounded-xl bg-blue-50/80 p-3 text-xs text-blue-900 leading-relaxed border border-blue-200/60">
          <strong>Explanation: </strong>{questionItem.explanationText}
        </div>
      </CardContent>
    </Card>
  );
}
