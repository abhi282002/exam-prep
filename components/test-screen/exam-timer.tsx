"use client";

import { useEffect, useState, useRef } from "react";

interface ExamTimerProps {
  endsAt: number;
  onTimeExpired?: () => void;
}

export function ExamTimer({ endsAt, onTimeExpired }: ExamTimerProps) {
  const [secondsLeft, setSecondsLeft] = useState(() =>
    Math.max(0, Math.ceil((endsAt - Date.now()) / 1000))
  );

  const onExpiredRef = useRef(onTimeExpired);
  useEffect(() => { onExpiredRef.current = onTimeExpired; }, [onTimeExpired]);
  const hasTriggeredRef = useRef(false);

  useEffect(() => {
    hasTriggeredRef.current = false;
    const intervalTimer = setInterval(() => {
      const remainingSeconds = Math.max(0, Math.ceil((endsAt - Date.now()) / 1000));
      setSecondsLeft((previousSeconds) => {
        if (previousSeconds === remainingSeconds) return previousSeconds;
        return remainingSeconds;
      });

      if (remainingSeconds <= 0) {
        clearInterval(intervalTimer);
        if (!hasTriggeredRef.current) {
          hasTriggeredRef.current = true;
          onExpiredRef.current?.();
        }
      }
    }, 1000);

    return () => clearInterval(intervalTimer);
  }, [endsAt]);

  const displayHours = Math.floor(secondsLeft / 3600);
  const displayMinutes = Math.floor((secondsLeft % 3600) / 60);
  const displaySeconds = secondsLeft % 60;

  const formattedCountdown = displayHours > 0
    ? `${displayHours}:${String(displayMinutes).padStart(2, "0")}:${String(displaySeconds).padStart(2, "0")}`
    : `${displayMinutes}:${String(displaySeconds).padStart(2, "0")}`;

  return <span>{formattedCountdown}</span>;
}
