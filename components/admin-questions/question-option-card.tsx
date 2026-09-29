import type { QuestionOptionItem } from "./admin-questions-types";

interface OptionCardProps {
  optionItem: QuestionOptionItem;
  isCorrectAnswer?: boolean;
}

export function QuestionOptionCard({
  optionItem,
  isCorrectAnswer = false,
}: OptionCardProps) {
  const containerStyle = isCorrectAnswer
    ? "border-emerald-300 bg-emerald-50/60 text-emerald-950"
    : "border-neutral-200 bg-neutral-50/70 text-neutral-800 hover:bg-neutral-100/70";

  const badgeStyle = isCorrectAnswer
    ? "bg-emerald-600 text-white"
    : "bg-neutral-200 text-neutral-700";

  return (
    <div className={`flex items-start gap-3 rounded-xl border p-3 text-xs transition-colors ${containerStyle}`}>
      <span className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-lg text-[11px] font-bold ${badgeStyle}`}>
        {optionItem.key}
      </span>
      <span className="pt-0.5 leading-relaxed font-medium">
        {optionItem.text}
      </span>
    </div>
  );
}
