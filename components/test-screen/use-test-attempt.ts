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

  React.useEffect(() => {
    if (attemptQuery.data?.savedAnswers) {
      const initialMap: Record<string, string> = {};
      attemptQuery.data.savedAnswers.forEach((ans) => {
        if (ans.selected_option_key) initialMap[ans.question_id] = ans.selected_option_key;
      });
      setAnswersMap(initialMap);
    }
  }, [attemptQuery.data?.savedAnswers]);

  const recordAnswer = React.useCallback(async (questionId: string, optionKey: string | null) => {
    setAnswersMap((prev) => ({ ...prev, [questionId]: optionKey ?? "" }));
    await saveAnswerMutation.mutateAsync({ attemptId, questionId, selectedOptionKey: optionKey });
  }, [attemptId, saveAnswerMutation]);

  const finalizeTest = React.useCallback(async () => {
    await submitMutation.mutateAsync({ attemptId });
    router.push(`/result/${attemptId}`);
  }, [attemptId, submitMutation, router]);

  return { attemptQuery, answersMap, recordAnswer, finalizeTest };
}
