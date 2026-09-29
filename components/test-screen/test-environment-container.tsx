"use client";

import * as React from "react";
import { TestHeaderBar } from "./test-header-bar";
import { SubmitConfirmationModal } from "./submit-confirmation-modal";
import { TestEnvironmentContent } from "./test-environment-content";
import { useTestAttempt } from "./use-test-attempt";
import { useTestTimer } from "./use-test-timer";

export function TestEnvironmentContainer({ attemptIdentifier }: { attemptIdentifier: string }) {
  const { attemptQuery, answersMap, isSavedIndicator, recordAnswer, finalizeTest } =
    useTestAttempt(attemptIdentifier);
  const [activeQuestionIndex, setActiveQuestionIndex] = React.useState(0);
  const [markedForReviewSet, setMarkedForReviewSet] = React.useState<Set<number>>(new Set());
  const [isSubmitModalVisible, setIsSubmitModalVisible] = React.useState(false);

  const remainingSeconds = useTestTimer({
    serverRemainingSeconds: attemptQuery.data?.remainingSeconds,
    onTimeExpired: finalizeTest,
    onReSync: () => attemptQuery.refetch(),
  });

  const questions = attemptQuery.data?.questions ?? [];
  const currentQuestion = questions[activeQuestionIndex];

  const handleSelectOption = (key: string) => { if (currentQuestion) recordAnswer(currentQuestion.id, key); };
  const handleClearResponse = () => { if (currentQuestion) recordAnswer(currentQuestion.id, null); };
  const handleToggleReview = () => setMarkedForReviewSet((prev) => {
    const next = new Set(prev);
    if (next.has(activeQuestionIndex)) next.delete(activeQuestionIndex);
    else next.add(activeQuestionIndex);
    return next;
  });

  if (attemptQuery.isLoading) {
    return <div className="flex min-h-screen items-center justify-center text-sm text-neutral-500">Loading mock exam environment...</div>;
  }

  return (
    <div className="flex min-h-screen flex-col bg-neutral-100 text-neutral-900">
      <TestHeaderBar
        examinationTestTitle={attemptQuery.data?.setName ?? "UGC NET Mock Paper"}
        remainingTimeInSeconds={remainingSeconds}
        onRequestSubmitTest={() => setIsSubmitModalVisible(true)}
        onTimeExpired={finalizeTest}
      />
      <TestEnvironmentContent
        questionsList={questions}
        activeQuestionIndex={activeQuestionIndex}
        recordedAnswers={answersMap}
        markedForReviewSet={markedForReviewSet}
        isAutosaveActive={isSavedIndicator}
        onSelectOption={handleSelectOption}
        onNavigatePrevious={() => setActiveQuestionIndex((p) => Math.max(0, p - 1))}
        onNavigateNext={() => setActiveQuestionIndex((p) => Math.min(questions.length - 1, p + 1))}
        onToggleReview={handleToggleReview}
        onClearResponse={handleClearResponse}
        onSelectQuestionIndex={setActiveQuestionIndex}
      />
      <SubmitConfirmationModal
        isModalOpen={isSubmitModalVisible}
        totalQuestionsCount={questions.length}
        answeredQuestionsCount={Object.keys(answersMap).length}
        markedForReviewCount={markedForReviewSet.size}
        onConfirmSubmission={finalizeTest}
        onCancelSubmission={() => setIsSubmitModalVisible(false)}
      />
    </div>
  );
}
