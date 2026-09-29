import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle2, Clock } from "@/components/icons";

interface ResultBreakdownMetricsProperties {
  correctAnswerQuantity: number;
  wrongAnswerQuantity: number;
  skippedAnswerQuantity: number;
  totalDurationSpentFormatted: string;
}

export function ResultBreakdownMetrics({
  correctAnswerQuantity,
  wrongAnswerQuantity,
  skippedAnswerQuantity,
  totalDurationSpentFormatted,
}: ResultBreakdownMetricsProperties) {
  const metricCards = [
    { title: "Correct Answers", value: correctAnswerQuantity, label: "+84.0 Marks", colorClass: "text-emerald-600 bg-emerald-50", icon: CheckCircle2 },
    { title: "Wrong Answers", value: wrongAnswerQuantity, label: "-0.0 Marks", colorClass: "text-red-600 bg-red-50", icon: CheckCircle2 },
    { title: "Skipped Questions", value: skippedAnswerQuantity, label: "Unattempted", colorClass: "text-amber-600 bg-amber-50", icon: Clock },
    { title: "Time Taken", value: totalDurationSpentFormatted, label: "Of 60 Minutes", colorClass: "text-blue-600 bg-blue-50", icon: Clock },
  ];

  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
      {metricCards.map((individualMetric) => (
        <Card key={individualMetric.title} className="border-neutral-200 bg-white shadow-sm">
          <CardContent className="p-4 space-y-1">
            <span className="text-xs text-neutral-500 font-medium">{individualMetric.title}</span>
            <div className="text-2xl font-bold text-neutral-900">{individualMetric.value}</div>
            <span className="text-[11px] font-semibold text-neutral-600">{individualMetric.label}</span>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
