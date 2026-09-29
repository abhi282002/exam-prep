import { QuestionWorkspaceHeader } from "./question-workspace-header";
import { QuestionWorkspaceBody } from "./question-workspace-body";
import { TestNavigationBar } from "./test-navigation-bar";
import type { WorkspacePanelProps } from "./types";

export function QuestionWorkspacePanel(props: WorkspacePanelProps) {
  return (
    <div className="flex flex-col rounded-xl border border-neutral-800 bg-[#121620] p-5 sm:p-6 shadow-md">
      <QuestionWorkspaceHeader
        questionNumber={props.questionNumber}
        totalQuestions={props.totalQuestions}
      />
      <QuestionWorkspaceBody
        questionText={props.questionText}
        options={props.options}
        selectedOptionKey={props.selectedOptionKey}
        onSelectOption={props.onSelectOption}
      />
      <TestNavigationBar
        canGoPrevious={props.canGoPrevious}
        onPrevious={props.onPrevious}
        onNext={props.onNext}
        onToggleReview={props.onToggleReview}
        onClear={props.onClear}
      />
    </div>
  );
}
