"use client";

import { Clock } from "@/components/icons";
import { ExamTimer } from "./exam-timer";

interface TimerBadgeProps {
  deadlineTimestampMs: number;
  onTimeExpired?: () => void;
}

export function ExamTimerBadge({
  deadlineTimestampMs,
  onTimeExpired,
}: TimerBadgeProps) {
  return (
    <div className="flex items-center gap-2 rounded-lg border border-amber-500/30 bg-amber-950/40 px-3.5 py-1.5 font-mono text-xs sm:text-sm font-bold text-amber-400 shadow-inner">
      <Clock className="h-4 w-4 text-amber-400 shrink-0" />
      <ExamTimer endsAt={deadlineTimestampMs} onTimeExpired={onTimeExpired} />
    </div>
  );
}
