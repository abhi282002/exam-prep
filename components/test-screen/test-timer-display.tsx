"use client";

import * as React from "react";
import { Clock } from "@/components/icons";
import { Badge } from "@/components/ui/badge";

interface TestTimerDisplayProperties {
  initialRemainingSeconds: number;
  onTimerExpired: () => void;
}

export function TestTimerDisplay({
  initialRemainingSeconds,
  onTimerExpired,
}: TestTimerDisplayProperties) {
  const [secondsRemaining, setSecondsRemaining] = React.useState(initialRemainingSeconds);

  React.useEffect(() => {
    if (secondsRemaining <= 0) {
      onTimerExpired();
      return;
    }
    const intervalTimer = setInterval(() => {
      setSecondsRemaining((previousSeconds) => {
        if (previousSeconds <= 1) {
          clearInterval(intervalTimer);
          onTimerExpired();
          return 0;
        }
        return previousSeconds - 1;
      });
    }, 1000);
    return () => clearInterval(intervalTimer);
  }, [secondsRemaining, onTimerExpired]);

  const hours = Math.floor(secondsRemaining / 3600);
  const minutes = Math.floor((secondsRemaining % 3600) / 60);
  const seconds = secondsRemaining % 60;
  const formattedTime = `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;

  return (
    <Badge variant="outline" className={`gap-2 font-mono text-sm font-bold px-3 py-1.5 ${
      secondsRemaining < 300 ? "border-red-400 bg-red-50 text-red-700 animate-pulse" : "border-neutral-300 bg-white text-neutral-800"
    }`}>
      <Clock className="h-4 w-4 text-blue-600" />
      <span>{formattedTime}</span>
    </Badge>
  );
}
