"use client";

import * as React from "react";
import { TestHeaderBar } from "./test-header-bar";
import { SubmitConfirmationModal } from "./submit-confirmation-modal";
import { TestEnvironmentContent } from "./test-environment-content";
import { useTestAttempt } from "./use-test-attempt";
import { useTestEnvironmentState } from "./use-test-environment-state";

export function TestEnvironmentContainer({ attemptIdentifier }: { attemptIdentifier: string }) {
  const { attemptQuery, answersMap, recordAnswer, finalizeTest } = useTestAttempt(attemptIdentifier);
  const questions = attemptQuery.data?.questions ?? [];
  const state = useTestEnvironmentState(questions.length);
  const deadlineMs = React.useMemo(() => {
    return attemptQuery.data?.deadline ? new Date(attemptQuery.data.deadline).getTime() : 0;
  }, [attemptQuery.data?.deadline]);

  if (attemptQuery.isLoading || deadlineMs === 0) {
    return <div className="flex min-h-screen items-center justify-center bg-[#0B0F17] text-sm text-neutral-400">Loading test...</div>;
  }
  const current = questions[state.activeQuestionIndex];

  return (
    <div className="flex min-h-screen flex-col bg-[#0B0F17] text-neutral-100">
      <TestHeaderBar
        paperTitle={attemptQuery.data?.setName ?? "UGC NET Paper 1"}
        deadlineTimestampMs={deadlineMs}
        onRequestSubmit={() => state.setIsSubmitModalVisible(true)} onTimeExpired={finalizeTest}
      />
      <TestEnvironmentContent
        questionsList={questions}
        activeQuestionIndex={state.activeQuestionIndex}
        answersMap={answersMap}
        markedForReviewSet={state.markedForReviewSet}
        onSelectOption={(key) => current && recordAnswer(current.id, key)}
        onNavigatePrevious={state.navigatePrevious} onNavigateNext={state.navigateNext}
        onToggleReview={() => state.toggleReview(state.activeQuestionIndex)}
        onClearResponse={() => current && recordAnswer(current.id, null)}
        onSelectQuestionIndex={state.setActiveQuestionIndex}
      />
      <SubmitConfirmationModal
        isOpen={state.isSubmitModalVisible}
        totalQuestions={questions.length} answeredCount={Object.keys(answersMap).length}
        markedCount={state.markedForReviewSet.size}
        onConfirm={finalizeTest} onCancel={() => state.setIsSubmitModalVisible(false)}
      />
    </div>
  );
}
