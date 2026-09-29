interface OptionItemProps {
  optionKey: string;
  optionText: string;
  isSelected: boolean;
  onSelect: (key: string) => void;
}

export function QuestionOptionItem({
  optionKey,
  optionText,
  isSelected,
  onSelect,
}: OptionItemProps) {
  const containerStyle = isSelected
    ? "border-blue-600 bg-[#0d1d36] text-white ring-1 ring-blue-500 shadow-sm"
    : "border-neutral-800 bg-[#121620] hover:border-neutral-700 hover:bg-[#161c28] text-neutral-200";

  return (
    <button
      type="button"
      onClick={() => onSelect(optionKey)}
      className={`group flex w-full items-center gap-3.5 rounded-xl border p-4 text-left transition-colors cursor-pointer ${containerStyle}`}
    >
      <span
        className={`flex h-4 w-4 shrink-0 items-center justify-center rounded-full border-2 transition-all ${
          isSelected ? "border-blue-400 bg-blue-500" : "border-neutral-500 group-hover:border-neutral-400"
        }`}
      >
        {isSelected && <span className="h-1.5 w-1.5 rounded-full bg-white" />}
      </span>
      <span className="text-sm font-normal leading-relaxed">{optionText}</span>
    </button>
  );
}
