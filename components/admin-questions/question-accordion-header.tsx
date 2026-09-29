import type { ExtractedQuestionRecord } from "./admin-questions-types";

interface AccordionHeaderProps {
  question: ExtractedQuestionRecord;
  isExpanded: boolean;
  onToggle: () => void;
}

function ChevronDownIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="6 9 12 15 18 9" />
    </svg>
  );
}

export function QuestionAccordionHeader({
  question,
  isExpanded,
  onToggle,
}: AccordionHeaderProps) {
  return (
    <button
      type="button"
      onClick={onToggle}
      className="flex w-full items-center justify-between gap-3 p-4 text-left transition-colors hover:bg-neutral-50/80"
    >
      <div className="flex items-center gap-3 overflow-hidden">
        <span className="shrink-0 rounded-lg bg-blue-50 px-2.5 py-1 text-xs font-bold text-blue-700 border border-blue-200">
          Q.{question.number}
        </span>
        <span className="truncate text-xs font-semibold text-neutral-800">
          {question.text}
        </span>
      </div>
      <div className="flex shrink-0 items-center gap-2">
        <span className="rounded-md bg-neutral-100 px-2 py-0.5 text-[11px] font-medium text-neutral-500">
          {question.options.length} Options
        </span>
        <ChevronDownIcon
          className={`h-4 w-4 text-neutral-400 transition-transform duration-200 ${
            isExpanded ? "rotate-180 text-blue-600" : ""
          }`}
        />
      </div>
    </button>
  );
}
