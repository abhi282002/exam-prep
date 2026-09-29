import { Button } from "@/components/ui/button";

interface TestActionButtonsProperties {
  canNavigatePrevious: boolean;
  canNavigateNext: boolean;
  isMarkedForReview: boolean;
  onNavigatePrevious: () => void;
  onNavigateNext: () => void;
  onToggleMarkForReview: () => void;
  onClearResponse: () => void;
}

export function TestActionButtons({
  canNavigatePrevious,
  canNavigateNext,
  isMarkedForReview,
  onNavigatePrevious,
  onNavigateNext,
  onToggleMarkForReview,
  onClearResponse,
}: TestActionButtonsProperties) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-3 border-t border-neutral-200/80 pt-4">
      <div className="flex items-center gap-2">
        <Button variant="outline" size="sm" onClick={onToggleMarkForReview} className={isMarkedForReview ? "bg-purple-50 text-purple-700 border-purple-300" : ""}>
          {isMarkedForReview ? "Unmark Review" : "Mark for Review"}
        </Button>
        <Button variant="ghost" size="sm" onClick={onClearResponse} className="text-neutral-500 hover:text-neutral-900">
          Clear Answer
        </Button>
      </div>
      <div className="flex items-center gap-2">
        <Button variant="outline" size="sm" onClick={onNavigatePrevious} disabled={!canNavigatePrevious}>
          Previous
        </Button>
        <Button size="sm" onClick={onNavigateNext} disabled={!canNavigateNext}>
          Save & Next
        </Button>
      </div>
    </div>
  );
}
