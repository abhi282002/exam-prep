import { QuestionOptionsList } from "./question-options-list";

interface WorkspaceBodyProps {
  questionText: string;
  options: { key: string; text: string }[];
  selectedOptionKey: string | null;
  onSelectOption: (key: string) => void;
}

export function QuestionWorkspaceBody({
  questionText,
  options,
  selectedOptionKey,
  onSelectOption,
}: WorkspaceBodyProps) {
  return (
    <div className="py-4 space-y-6">
      <h2 className="text-base sm:text-lg font-medium text-white leading-relaxed whitespace-pre-line">
        {questionText}
      </h2>
      <QuestionOptionsList
        options={options}
        selectedKey={selectedOptionKey}
        onSelectOption={onSelectOption}
      />
    </div>
  );
}
