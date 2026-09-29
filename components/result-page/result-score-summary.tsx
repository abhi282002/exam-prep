import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Trophy } from "@/components/icons";

interface ResultScoreSummaryProperties {
  earnedMarks: number;
  maximumMarks: number;
  percentageScore: number;
  accuracyRate: number;
}

export function ResultScoreSummary({
  earnedMarks,
  maximumMarks,
  percentageScore,
  accuracyRate,
}: ResultScoreSummaryProperties) {
  return (
    <Card className="border-neutral-200 bg-gradient-to-br from-neutral-900 to-neutral-800 text-white shadow-xl">
      <CardContent className="flex flex-col sm:flex-row items-center justify-between gap-6 p-6 sm:p-8">
        <div className="flex items-center gap-4">
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-amber-500/20 text-amber-400 border border-amber-400/30">
            <Trophy className="h-7 w-7" />
          </div>
          <div className="space-y-1">
            <Badge variant="secondary" className="bg-emerald-500/20 text-emerald-300 text-[10px] font-bold">Passed — Qualified</Badge>
            <h1 className="text-2xl font-bold sm:text-3xl">Attempt Scorecard</h1>
            <p className="text-xs text-neutral-400">UGC NET Paper 1 — Official Syllabus Mock Test</p>
          </div>
        </div>
        <div className="flex items-center gap-6 text-center border-t sm:border-t-0 sm:border-l border-neutral-700/80 pt-4 sm:pt-0 sm:pl-8">
          <div><span className="text-3xl font-extrabold text-blue-400">{earnedMarks}</span><span className="text-xs text-neutral-400">/{maximumMarks}</span><p className="text-[10px] text-neutral-400 uppercase tracking-wider">Total Marks</p></div>
          <div><span className="text-3xl font-extrabold text-emerald-400">{percentageScore}%</span><p className="text-[10px] text-neutral-400 uppercase tracking-wider">Score</p></div>
          <div><span className="text-3xl font-extrabold text-amber-400">{accuracyRate}%</span><p className="text-[10px] text-neutral-400 uppercase tracking-wider">Accuracy</p></div>
        </div>
      </CardContent>
    </Card>
  );
}
