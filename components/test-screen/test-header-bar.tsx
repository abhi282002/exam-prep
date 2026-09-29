import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { GraduationCap } from "@/components/icons";
import { TestTimerDisplay } from "./test-timer-display";

interface TestHeaderBarProperties {
  examinationTestTitle: string;
  remainingTimeInSeconds: number;
  onRequestSubmitTest: () => void;
  onTimeExpired: () => void;
}

export function TestHeaderBar({
  examinationTestTitle,
  remainingTimeInSeconds,
  onRequestSubmitTest,
  onTimeExpired,
}: TestHeaderBarProperties) {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-neutral-200 bg-white shadow-sm">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-600 text-white">
            <GraduationCap className="h-5 w-5" />
          </div>
          <div>
            <h1 className="text-sm font-bold text-neutral-900 leading-tight">{examinationTestTitle}</h1>
            <Badge variant="secondary" className="text-[10px] px-1.5 py-0 font-medium">NTA CBT Mode</Badge>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <TestTimerDisplay initialRemainingSeconds={remainingTimeInSeconds} onTimerExpired={onTimeExpired} />
          <Button variant="default" size="sm" onClick={onRequestSubmitTest} className="bg-emerald-600 hover:bg-emerald-700 text-white">
            Submit Test
          </Button>
        </div>
      </div>
    </header>
  );
}
