import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface SubmitConfirmationModalProperties {
  isModalOpen: boolean;
  totalQuestionsCount: number;
  answeredQuestionsCount: number;
  markedForReviewCount: number;
  onConfirmSubmission: () => void;
  onCancelSubmission: () => void;
}

export function SubmitConfirmationModal({
  isModalOpen,
  totalQuestionsCount,
  answeredQuestionsCount,
  markedForReviewCount,
  onConfirmSubmission,
  onCancelSubmission,
}: SubmitConfirmationModalProperties) {
  if (!isModalOpen) return null;
  const unansweredCount = totalQuestionsCount - answeredQuestionsCount;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
      <Card className="w-full max-w-md border-neutral-200 bg-white shadow-2xl">
        <CardContent className="space-y-5 p-6">
          <h2 className="text-lg font-bold text-neutral-900">Confirm Exam Submission</h2>
          <p className="text-xs text-neutral-500">Are you sure you want to finish your attempt? You cannot change your answers after submission.</p>
          <div className="grid grid-cols-3 gap-3 text-center">
            <div className="rounded-xl bg-emerald-50 p-3"><span className="text-lg font-bold text-emerald-700">{answeredQuestionsCount}</span><p className="text-[10px] text-emerald-600">Answered</p></div>
            <div className="rounded-xl bg-amber-50 p-3"><span className="text-lg font-bold text-amber-700">{unansweredCount}</span><p className="text-[10px] text-amber-600">Unanswered</p></div>
            <div className="rounded-xl bg-purple-50 p-3"><span className="text-lg font-bold text-purple-700">{markedForReviewCount}</span><p className="text-[10px] text-purple-600">Review</p></div>
          </div>
          <div className="flex items-center justify-end gap-3 pt-2">
            <Button variant="outline" size="sm" onClick={onCancelSubmission}>Resume Test</Button>
            <Button size="sm" onClick={onConfirmSubmission} className="bg-emerald-600 hover:bg-emerald-700 text-white">Yes, Submit Now</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
