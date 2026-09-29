"use client";

import * as React from "react";
import { QuestionContentCard } from "./question-content-card";
import { QuestionOptionsList } from "./question-options-list";
import { TestActionButtons } from "./test-action-buttons";
import { QuestionPaletteGrid } from "./question-palette-grid";

interface TestEnvironmentContentProperties {
  questionsList: any[];
  activeQuestionIndex: number;
  recordedAnswers: Record<string, string>;
  markedForReviewSet: Set<number>;
  isAutosaveActive: boolean;
  onSelectOption: (optionKey: string) => void;
  onNavigatePrevious: () => void;
  onNavigateNext: () => void;
  onToggleReview: () => void;
  onClearResponse: () => void;
  onSelectQuestionIndex: (index: number) => void;
}

export function TestEnvironmentContent({
  questionsList,
  activeQuestionIndex,
  recordedAnswers,
  markedForReviewSet,
  isAutosaveActive,
  onSelectOption,
  onNavigatePrevious,
  onNavigateNext,
  onToggleReview,
  onClearResponse,
  onSelectQuestionIndex,
}: TestEnvironmentContentProperties) {
  const activeQuestion = questionsList[activeQuestionIndex] ?? { text: "", options: [] };
  const currentAnswer = recordedAnswers[activeQuestion.id] || null;
  const paletteAnswers = Object.fromEntries(
    questionsList.map((q, idx) => [idx, recordedAnswers[q.id]]).filter(([, v]) => !!v)
  );

  return (
    <main className="flex-1 py-6">
      <div className="mx-auto max-w-7xl px-4 grid grid-cols-1 gap-6 lg:grid-cols-12">
        <div className="lg:col-span-8 space-y-6">
          <QuestionContentCard
            activeQuestionNumber={activeQuestionIndex + 1}
            totalQuestionsQuantity={questionsList.length}
            questionStatementText={activeQuestion.text}
            isMarkedForReview={markedForReviewSet.has(activeQuestionIndex)}
            marksPositive={2}
            marksNegative={0}
          />
          <QuestionOptionsList
            availableOptionList={(activeQuestion.options ?? []).map((opt: any) => ({
              optionKey: opt.key,
              optionLabelText: opt.text,
            }))}
            selectedOptionKey={currentAnswer}
            onSelectOption={onSelectOption}
            isAutosaveActive={isAutosaveActive}
          />
          <TestActionButtons
            canNavigatePrevious={activeQuestionIndex > 0}
            canNavigateNext={activeQuestionIndex < questionsList.length - 1}
            isMarkedForReview={markedForReviewSet.has(activeQuestionIndex)}
            onNavigatePrevious={onNavigatePrevious}
            onNavigateNext={onNavigateNext}
            onToggleMarkForReview={onToggleReview}
            onClearResponse={onClearResponse}
          />
        </div>
        <div className="lg:col-span-4">
          <QuestionPaletteGrid
            totalQuestionNumberCount={questionsList.length}
            currentActiveQuestionIndex={activeQuestionIndex}
            recordedAnswersMap={paletteAnswers}
            markedForReviewSet={markedForReviewSet}
            onSelectQuestionIndex={onSelectQuestionIndex}
          />
        </div>
      </div>
    </main>
  );
}
