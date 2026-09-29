interface NavigationBarProps {
  canGoPrevious: boolean;
  onPrevious: () => void;
  onNext: () => void;
  onToggleReview: () => void;
  onClear: () => void;
}

export function TestNavigationBar({
  canGoPrevious,
  onPrevious,
  onNext,
  onToggleReview,
  onClear,
}: NavigationBarProps) {
  const secondaryStyle = "bg-[#161B26] hover:bg-[#1f2637] border border-neutral-700 text-neutral-200 text-xs sm:text-sm px-4 py-2.5 rounded-lg cursor-pointer transition-colors";
  const handleSaveAndReview = () => { onToggleReview(); onNext(); };

  return (
    <div className="pt-5 border-t border-neutral-800 space-y-3">
      <div className="flex flex-wrap items-center gap-2.5">
        <button type="button" onClick={onNext} className="bg-green-600 hover:bg-green-500 text-white font-semibold text-xs sm:text-sm px-5 py-2.5 rounded-lg cursor-pointer transition-colors">
          Save and next
        </button>
        <button type="button" onClick={onClear} className={secondaryStyle}>
          Clear response
        </button>
        <button type="button" onClick={handleSaveAndReview} className={secondaryStyle}>
          Save and mark for review
        </button>
      </div>
      <div className="flex items-center gap-2.5">
        <button type="button" onClick={handleSaveAndReview} className={secondaryStyle}>
          Mark for review and next
        </button>
        <button type="button" onClick={onPrevious} disabled={!canGoPrevious} className={`${secondaryStyle} disabled:opacity-40 disabled:cursor-not-allowed`}>
          ← Previous
        </button>
      </div>
    </div>
  );
}
