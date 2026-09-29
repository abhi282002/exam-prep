"use client";

import { trpc } from "@/src/trpc/client";
import { ExamSetCard } from "./exam-set-card";

interface ExamSetListProps {
  examinationSlug: string;
}

export function ExamSetList({ examinationSlug }: ExamSetListProps) {
  const examQuery = trpc.exam.getBySlug.useQuery({ slug: examinationSlug });
  const rawSets = examQuery.data?.sets ?? [];
  const publishedSets = rawSets.filter((s: any) => s.is_active);

  if (examQuery.isLoading) {
    return <div className="py-8 text-center text-xs text-neutral-500">Loading exam sets...</div>;
  }

  if (publishedSets.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-neutral-300 p-8 text-center text-xs text-neutral-500">
        No active sets published yet for this exam. Check back soon!
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-bold text-neutral-900">Available Practice Sets</h2>
        <span className="text-xs text-neutral-500">{publishedSets.length} Sets Available</span>
      </div>
      <div className="space-y-3">
        {publishedSets.map((set: any) => (
          <ExamSetCard
            key={set.id}
            setId={set.id}
            setName={set.name}
            totalQuestions={set.total_marks ? Math.floor(set.total_marks / 2) : 50}
          />
        ))}
      </div>
    </div>
  );
}
