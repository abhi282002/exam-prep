"use client";

import * as React from "react";

export function useTestEnvironmentState(totalQuestions: number) {
  const [activeQuestionIndex, setActiveQuestionIndex] = React.useState(0);
  const [markedForReviewSet, setMarkedForReviewSet] = React.useState<Set<number>>(new Set());
  const [isSubmitModalVisible, setIsSubmitModalVisible] = React.useState(false);

  const toggleReview = (index: number) => {
    setMarkedForReviewSet((prev) => {
      const next = new Set(prev);
      if (next.has(index)) next.delete(index);
      else next.add(index);
      return next;
    });
  };

  const navigatePrevious = () => setActiveQuestionIndex((prev) => Math.max(0, prev - 1));
  const navigateNext = () => setActiveQuestionIndex((prev) => Math.min(totalQuestions - 1, prev + 1));

  return {
    activeQuestionIndex,
    setActiveQuestionIndex,
    markedForReviewSet,
    isSubmitModalVisible,
    setIsSubmitModalVisible,
    toggleReview,
    navigatePrevious,
    navigateNext,
  };
}
