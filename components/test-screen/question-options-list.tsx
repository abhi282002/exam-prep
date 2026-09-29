import { CheckCircle2 } from "@/components/icons";

interface QuestionOptionRecord {
  optionKey: string;
  optionLabelText: string;
}

interface QuestionOptionsListProperties {
  availableOptionList: QuestionOptionRecord[];
  selectedOptionKey: string | null;
  onSelectOption: (optionKey: string) => void;
  isAutosaveActive: boolean;
}

export function QuestionOptionsList({
  availableOptionList,
  selectedOptionKey,
  onSelectOption,
  isAutosaveActive,
}: QuestionOptionsListProperties) {
  return (
    <div className="space-y-3">
      {availableOptionList.map((optionItem) => {
        const isSelected = selectedOptionKey === optionItem.optionKey;
        const activeContainerStyle = isSelected
          ? "border-blue-600 bg-blue-50/70 shadow-sm ring-1 ring-blue-500"
          : "border-neutral-200 bg-white hover:border-neutral-300 hover:bg-neutral-50";
        const badgeStyle = isSelected ? "bg-blue-600 text-white" : "bg-neutral-100 text-neutral-600";

        return (
          <button
            key={optionItem.optionKey}
            type="button"
            onClick={() => onSelectOption(optionItem.optionKey)}
            className={`flex w-full cursor-pointer items-center justify-between rounded-2xl border p-4 text-left transition-all ${activeContainerStyle}`}
          >
            <div className="flex items-center gap-3">
              <span className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-xl text-xs font-bold ${badgeStyle}`}>
                {optionItem.optionKey}
              </span>
              <span className="text-sm text-neutral-900">{optionItem.optionLabelText}</span>
            </div>
            {isSelected && <CheckCircle2 className="h-5 w-5 text-blue-600" />}
          </button>
        );
      })}
      {isAutosaveActive && <span className="text-[11px] text-emerald-600 font-medium">✓ Response autosaved to server</span>}
    </div>
  );
}
