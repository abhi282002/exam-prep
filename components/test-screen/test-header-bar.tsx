import { Button } from "@/components/ui/button";
import { ExamTimerBadge } from "./exam-timer-badge";

interface HeaderBarProps {
  paperTitle: string;
  deadlineTimestampMs: number;
  onRequestSubmit: () => void;
  onTimeExpired: () => void;
}

export function TestHeaderBar({
  paperTitle,
  deadlineTimestampMs,
  onRequestSubmit,
  onTimeExpired,
}: HeaderBarProps) {
  return (
    <header className="sticky top-0 z-30 border-b border-neutral-800 bg-[#0B0F17]/95 backdrop-blur-md px-4 sm:px-8 py-3 shadow-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <h1 className="text-sm sm:text-base font-bold text-white tracking-tight">
            {paperTitle}
          </h1>
        </div>

        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-1.5 rounded-lg border border-neutral-700 bg-[#161B26] px-3 py-1.5 text-xs text-neutral-300">
            <span className="text-neutral-400">View in</span>
            <span className="font-semibold text-white">English ▾</span>
          </div>

          <ExamTimerBadge
            deadlineTimestampMs={deadlineTimestampMs}
            onTimeExpired={onTimeExpired}
          />

          <Button
            size="sm"
            onClick={onRequestSubmit}
            className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs h-9 px-4 shadow-sm"
          >
            Submit Test
          </Button>
        </div>
      </div>
    </header>
  );
}
