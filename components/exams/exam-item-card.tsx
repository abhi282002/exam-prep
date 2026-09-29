import Link from "next/link";
import { Clock, FileText, ArrowRight } from "@/components/icons";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExaminationItem } from "./featured-exams-data";

interface ExamItemCardProperties {
  examinationData: ExaminationItem;
}

export function ExamItemCard({ examinationData }: ExamItemCardProperties) {
  return (
    <Card className="flex flex-col justify-between border-neutral-200 bg-white transition-all hover:border-blue-300 hover:shadow-lg">
      <CardHeader className="p-6">
        <div className="flex items-center justify-between pb-2">
          <Badge variant={examinationData.isPopularExamination ? "default" : "secondary"}>
            {examinationData.examinationCategory}
          </Badge>
          <span className="text-xs font-semibold text-emerald-600">+{examinationData.marksPerQuestion} / -{examinationData.negativeMarkingValue}</span>
        </div>
        <CardTitle className="text-xl font-bold text-neutral-900">{examinationData.examinationTitle}</CardTitle>
        <CardDescription className="text-sm text-neutral-500">Official syllabus standard pattern</CardDescription>
      </CardHeader>
      <CardContent className="p-6 pt-0 space-y-4">
        <div className="flex items-center justify-between text-xs text-neutral-600 border-t border-b border-neutral-100 py-3">
          <span className="inline-flex items-center gap-1.5"><Clock className="h-4 w-4 text-neutral-400" />{examinationData.examinationDurationMinutes} Minutes</span>
          <span className="inline-flex items-center gap-1.5"><FileText className="h-4 w-4 text-neutral-400" />{examinationData.totalQuestionCount} Questions</span>
        </div>
        <Link href={`/exams`} className="block w-full">
          <Button variant="outline" className="w-full justify-between hover:bg-blue-50 hover:text-blue-700 hover:border-blue-200">
            <span>Take Practice Set</span>
            <ArrowRight className="h-4 w-4" />
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
}
