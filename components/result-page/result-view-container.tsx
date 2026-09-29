"use client";

import * as React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ResultScoreSummary } from "./result-score-summary";
import { ResultBreakdownMetrics } from "./result-breakdown-metrics";
import { ResultFilterTabs } from "./result-filter-tabs";
import { ResultQuestionCard } from "./result-question-card";
import { trpc } from "@/src/trpc/client";

export function ResultViewContainer({ attemptIdentifier }: { attemptIdentifier: string }) {
  const [selectedFilter, setSelectedFilter] = React.useState<"all" | "correct" | "wrong" | "skipped">("all");
  const resultQuery = trpc.attempt.result.useQuery({ attemptId: attemptIdentifier });

  if (resultQuery.isLoading) {
    return <div className="py-12 text-center text-sm text-neutral-500">Calculating your official scorecard...</div>;
  }
  if (resultQuery.error) {
    return (
      <div className="rounded-xl border border-red-200 bg-red-50 p-6 text-center space-y-3">
        <h3 className="text-base font-bold text-red-900">Access Restricted</h3>
        <p className="text-xs text-red-700">{resultQuery.error.message}</p>
        <Link href={`/test/${attemptIdentifier}`}><Button size="sm">Resume Test</Button></Link>
      </div>
    );
  }

  const data = resultQuery.data!;
  const filtered = data.questions.filter((q) => selectedFilter === "all" || q.status === selectedFilter);

  return (
    <div className="space-y-8">
      <ResultScoreSummary earnedMarks={data.score} maximumMarks={data.totalMarks} percentageScore={Math.round((data.score / (data.totalMarks || 1)) * 100)} accuracyRate={Math.round((data.correctCount / Math.max(1, data.correctCount + data.wrongCount)) * 100)} />
      <ResultBreakdownMetrics correctAnswerQuantity={data.correctCount} wrongAnswerQuantity={data.wrongCount} skippedAnswerQuantity={data.skippedCount} totalDurationSpentFormatted="Completed" />
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <ResultFilterTabs activeQuestionFilter={selectedFilter} onSelectFilter={setSelectedFilter} allCount={data.questions.length} correctCount={data.correctCount} wrongCount={data.wrongCount} skippedCount={data.skippedCount} />
          <Link href="/exams"><Button variant="outline" size="sm">Explore More Exams</Button></Link>
        </div>
        <div className="space-y-4">
          {filtered.map((q) => (
            <ResultQuestionCard key={q.id} questionItem={{
              questionIndexNumber: q.number, questionStatement: q.text,
              selectedOptionKey: q.userSelectedOptionKey, correctOptionKey: q.correct_option,
              explanationText: q.explanation ?? "",
              options: (q.options ?? []).map((o: any) => ({ key: o.key, label: o.text })),
            }} />
          ))}
        </div>
      </div>
    </div>
  );
}
