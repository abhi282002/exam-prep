import { QuestionAccordionHeader } from "./question-accordion-header";
import { QuestionAccordionBody } from "./question-accordion-body";
import type { ExtractedQuestionRecord } from "./admin-questions-types";

interface QuestionAccordionItemProps {
  question: ExtractedQuestionRecord;
  isExpanded: boolean;
  onToggle: () => void;
}

export function QuestionAccordionItem({
  question,
  isExpanded,
  onToggle,
}: QuestionAccordionItemProps) {
  return (
    <div className="overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-xs transition-shadow hover:shadow-sm">
      <QuestionAccordionHeader
        question={question}
        isExpanded={isExpanded}
        onToggle={onToggle}
      />
      {isExpanded && <QuestionAccordionBody question={question} />}
    </div>
  );
}
