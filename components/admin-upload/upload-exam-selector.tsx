"use client";

import { Label } from "@/components/ui/label";
import { trpc } from "@/src/trpc/client";

interface ExamSelectorProperties {
  selectedExamId: string;
  onSelectExamId: (examId: string) => void;
  onSelectExamSlug: (examSlug: string) => void;
}

export function UploadExamSelector({ selectedExamId, onSelectExamId, onSelectExamSlug }: ExamSelectorProperties) {
  const examsQuery = trpc.exam.list.useQuery();
  const examsList = examsQuery.data ?? [];

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedId = event.target.value;
    const selectedExam = examsList.find((exam) => exam.id === selectedId);
    onSelectExamId(selectedId);
    onSelectExamSlug(selectedExam?.slug ?? "");
  };

  return (
    <div className="space-y-1.5">
      <Label htmlFor="exam-select">Target Competitive Examination</Label>
      <select
        id="exam-select"
        value={selectedExamId}
        onChange={handleChange}
        className="w-full rounded-lg border border-neutral-300 bg-white px-3 py-2 text-sm text-neutral-900 shadow-sm focus:border-blue-500 focus:outline-none"
        required
      >
        <option value="">Select an examination...</option>
        {examsList.map((exam) => (
          <option key={exam.id} value={exam.id}>
            {exam.name} ({exam.slug})
          </option>
        ))}
      </select>
    </div>
  );
}
