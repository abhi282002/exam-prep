"use client";

import { QuestionWorkspacePanel } from "./question-workspace-panel";
import { QuestionPalettePanel } from "./question-palette-panel";
import type { TestContentProps } from "./types";

export function TestEnvironmentContent(props: TestContentProps) {
  const current = props.questionsList[props.activeQuestionIndex] ?? { text: "", options: [] };
  const currentAnswer = props.answersMap[current.id] || null;
  const questionIds = props.questionsList.map((question) => question.id);

  return (
    <main className="mx-auto max-w-7xl w-full flex-1 p-4 sm:p-6 grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
      <div className="lg:col-span-8">
        <QuestionWorkspacePanel
          questionNumber={props.activeQuestionIndex + 1}
          totalQuestions={props.questionsList.length}
          questionText={current.text}
          options={current.options ?? []}
          selectedOptionKey={currentAnswer}
          canGoPrevious={props.activeQuestionIndex > 0}
          onSelectOption={props.onSelectOption}
          onPrevious={props.onNavigatePrevious}
          onNext={props.onNavigateNext}
          onToggleReview={props.onToggleReview}
          onClear={props.onClearResponse}
        />
      </div>
      <div className="lg:col-span-4">
        <QuestionPalettePanel
          totalQuestions={props.questionsList.length}
          activeQuestionIndex={props.activeQuestionIndex}
          answersRecord={props.answersMap}
          questionIdList={questionIds}
          markedForReviewSet={props.markedForReviewSet}
          onSelectIndex={props.onSelectQuestionIndex}
        />
      </div>
    </main>
  );
}
