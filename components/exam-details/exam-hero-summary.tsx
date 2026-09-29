import { Badge } from "@/components/ui/badge";
import { Clock, FileText } from "@/components/icons";

interface ExamHeroSummaryProperties {
  examinationTitle: string;
  durationMinutes: number;
  questionCount: number;
  marksPerQuestion: number;
}

export function ExamHeroSummary({
  examinationTitle,
  durationMinutes,
  questionCount,
  marksPerQuestion,
}: ExamHeroSummaryProperties) {
  return (
    <div className="space-y-4 rounded-3xl border border-neutral-200 bg-white p-6 sm:p-8 shadow-sm">
      <Badge variant="outline" className="border-blue-200 bg-blue-50 text-blue-700 text-xs">
        Standard Test Series
      </Badge>
      <h1 className="text-2xl font-bold tracking-tight text-neutral-900 sm:text-3xl">
        {examinationTitle}
      </h1>
      <div className="flex flex-wrap items-center gap-6 text-xs text-neutral-600 border-t border-neutral-100 pt-4">
        <span className="inline-flex items-center gap-2"><Clock className="h-4 w-4 text-blue-600" />{durationMinutes} Minutes Allotted</span>
        <span className="inline-flex items-center gap-2"><FileText className="h-4 w-4 text-blue-600" />{questionCount} Multiple Choice Questions</span>
        <span className="font-semibold text-emerald-600">+{marksPerQuestion}.0 Marks per correct answer</span>
      </div>
    </div>
  );
}
