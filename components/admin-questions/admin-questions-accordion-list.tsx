import { QuestionAccordionItem } from "./question-accordion-item";
import type { ExtractedQuestionRecord } from "./admin-questions-types";

interface AccordionListProps {
  questionsList: ExtractedQuestionRecord[];
  expandedQuestionIds: Set<string>;
  onToggleQuestion: (questionId: string) => void;
}

export function AdminQuestionsAccordionList({
  questionsList,
  expandedQuestionIds,
  onToggleQuestion,
}: AccordionListProps) {
  if (questionsList.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-neutral-300 bg-white p-12 text-center text-xs text-neutral-500">
        No questions matched your search criteria.
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {questionsList.map((question) => (
        <QuestionAccordionItem
          key={question.id}
          question={question}
          isExpanded={expandedQuestionIds.has(question.id)}
          onToggle={() => onToggleQuestion(question.id)}
        />
      ))}
    </div>
  );
}
