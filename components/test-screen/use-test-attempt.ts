"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { trpc } from "@/src/trpc/client";

export function useTestAttempt(attemptId: string) {
  const router = useRouter();
  const attemptQuery = trpc.attempt.get.useQuery({ attemptId });
  const saveAnswerMutation = trpc.attempt.saveAnswer.useMutation({ retry: 2 });
  const submitMutation = trpc.attempt.submit.useMutation();

  const [answersMap, setAnswersMap] = React.useState<Record<string, string>>({});
  const [isSavedIndicator, setIsSavedIndicator] = React.useState(false);

  React.useEffect(() => {
    if (attemptQuery.data?.savedAnswers) {
      const initialMap: Record<string, string> = {};
      attemptQuery.data.savedAnswers.forEach((ans) => {
        if (ans.selected_option_key) initialMap[ans.question_id] = ans.selected_option_key;
      });
      setAnswersMap(initialMap);
    }
  }, [attemptQuery.data?.savedAnswers]);

  React.useEffect(() => {
    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      if (!attemptQuery.data?.isCompleted) { event.preventDefault(); event.returnValue = ""; }
    };
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [attemptQuery.data?.isCompleted]);

  const recordAnswer = async (questionId: string, optionKey: string | null) => {
    setAnswersMap((prev) => ({ ...prev, [questionId]: optionKey ?? "" }));
    setIsSavedIndicator(true);
    await saveAnswerMutation.mutateAsync({ attemptId, questionId, selectedOptionKey: optionKey });
    setTimeout(() => setIsSavedIndicator(false), 1200);
  };

  const finalizeTest = async () => {
    await submitMutation.mutateAsync({ attemptId });
    router.push(`/result/${attemptId}`);
  };

  return { attemptQuery, answersMap, isSavedIndicator, recordAnswer, finalizeTest };
}
