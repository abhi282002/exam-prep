import Link from "next/link";
import { Button } from "@/components/ui/button";
import { PushToQueueButton } from "./push-to-queue-button";
import type { ExamSetRow } from "./admin-types";

export function SetActionsCell({ set }: { set: ExamSetRow }) {
  const hasQuestionPdf = Boolean(set.question_paper_path);
  const isAlreadyPublished = set.is_active;

  return (
    <div className="flex items-center gap-2">
      <Link href={`/admin/sets/${set.id}`}>
        <Button variant="outline" size="sm" className="h-7 px-2.5 text-[11px]">
          View Questions
        </Button>
      </Link>

      {!hasQuestionPdf && (
        <span className="text-[10px] text-neutral-400">PDF needed</span>
      )}

      {hasQuestionPdf && isAlreadyPublished && (
        <span className="text-[10px] text-emerald-600 font-semibold">✓ Live</span>
      )}

      {hasQuestionPdf && !isAlreadyPublished && (
        <PushToQueueButton setId={set.id} setName={set.name} />
      )}
    </div>
  );
}
