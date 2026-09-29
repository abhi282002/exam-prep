import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface QuestionContentCardProperties {
  activeQuestionNumber: number;
  totalQuestionsQuantity: number;
  questionStatementText: string;
  isMarkedForReview: boolean;
  marksPositive: number;
  marksNegative: number;
}

export function QuestionContentCard({
  activeQuestionNumber,
  totalQuestionsQuantity,
  questionStatementText,
  isMarkedForReview,
  marksPositive,
  marksNegative,
}: QuestionContentCardProperties) {
  return (
    <Card className="border-neutral-200 bg-white shadow-sm">
      <CardHeader className="p-5 border-b border-neutral-100 space-y-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-neutral-900">Question {activeQuestionNumber}</span>
            <span className="text-xs text-neutral-400">of {totalQuestionsQuantity}</span>
          </div>
          <div className="flex items-center gap-2">
            {isMarkedForReview && <Badge variant="secondary" className="bg-purple-100 text-purple-800 text-[10px]">Marked for Review</Badge>}
            <span className="text-xs font-semibold text-emerald-600">+{marksPositive}.0 / -{marksNegative}.0</span>
          </div>
        </div>
        <CardTitle className="text-base sm:text-lg font-medium text-neutral-900 leading-relaxed pt-2">
          {questionStatementText}
        </CardTitle>
      </CardHeader>
      <CardContent className="p-5 pt-0" />
    </Card>
  );
}
