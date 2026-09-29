"use client";

import * as React from "react";

interface UseTestTimerProperties {
  serverRemainingSeconds?: number;
  onTimeExpired: () => void;
  onReSync: () => void;
}

export function useTestTimer({
  serverRemainingSeconds = 3600,
  onTimeExpired,
  onReSync,
}: UseTestTimerProperties) {
  const [remainingSeconds, setRemainingSeconds] = React.useState(serverRemainingSeconds);

  React.useEffect(() => {
    setRemainingSeconds(serverRemainingSeconds);
  }, [serverRemainingSeconds]);

  React.useEffect(() => {
    if (remainingSeconds <= 0) {
      onTimeExpired();
      return;
    }
    const timer = setInterval(() => {
      setRemainingSeconds((prev) => {
        if (prev <= 1) { clearInterval(timer); onTimeExpired(); return 0; }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [remainingSeconds, onTimeExpired]);

  React.useEffect(() => {
    const handleFocus = () => onReSync();
    window.addEventListener("focus", handleFocus);
    const syncInterval = setInterval(onReSync, 60000);
    return () => {
      window.removeEventListener("focus", handleFocus);
      clearInterval(syncInterval);
    };
  }, [onReSync]);

  return remainingSeconds;
}
