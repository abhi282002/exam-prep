import { QuestionOptionItem } from "./question-option-item";

interface OptionRecord {
  key: string;
  text: string;
}

interface OptionsListProps {
  options: OptionRecord[];
  selectedKey: string | null;
  onSelectOption: (key: string) => void;
}

export function QuestionOptionsList({
  options,
  selectedKey,
  onSelectOption,
}: OptionsListProps) {
  return (
    <div className="space-y-3">
      {options.map((option) => (
        <QuestionOptionItem
          key={option.key}
          optionKey={option.key}
          optionText={option.text}
          isSelected={selectedKey === option.key}
          onSelect={onSelectOption}
        />
      ))}
    </div>
  );
}
