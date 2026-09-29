import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface QuestionCardProps {
  questionNumber: number;
  totalQuestions: number;
  subjectName?: string;
  questionText: string;
  isMarkedForReview: boolean;
}

export function QuestionDisplayCard({
  questionNumber,
  totalQuestions,
  subjectName = "General Paper 1",
  questionText,
  isMarkedForReview,
}: QuestionCardProps) {
  return (
    <Card className="border-neutral-200 bg-white shadow-xs">
      <CardHeader className="flex flex-row items-center justify-between p-4 sm:p-5 border-b border-neutral-100">
        <div className="flex items-center gap-2.5">
          <span className="rounded-xl bg-blue-600 px-3 py-1 text-xs font-black text-white shadow-xs">
            Question {questionNumber} of {totalQuestions}
          </span>
          <Badge variant="outline" className="text-[11px] font-medium text-neutral-600">
            {subjectName}
          </Badge>
        </div>
        <div className="flex items-center gap-2">
          {isMarkedForReview && (
            <Badge className="bg-purple-600 text-white text-[10px] font-bold">
              Marked for Review
            </Badge>
          )}
          <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
            +2 Marks
          </span>
        </div>
      </CardHeader>
      <CardContent className="p-5 sm:p-6">
        <p className="text-sm sm:text-base font-semibold text-neutral-900 leading-relaxed whitespace-pre-line">
          {questionText}
        </p>
      </CardContent>
    </Card>
  );
}
