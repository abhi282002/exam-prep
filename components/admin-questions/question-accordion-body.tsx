import { QuestionOptionCard } from "./question-option-card";
import type { ExtractedQuestionRecord } from "./admin-questions-types";

interface AccordionBodyProps {
  question: ExtractedQuestionRecord;
}

export function QuestionAccordionBody({ question }: AccordionBodyProps) {
  return (
    <div className="border-t border-neutral-100 bg-white p-5 pt-3 space-y-4">
      {question.passage && (
        <div className="rounded-xl border border-amber-200 bg-amber-50/60 p-3.5 text-xs text-amber-950">
          <span className="font-bold block mb-1">Reading Passage / Context:</span>
          <p className="whitespace-pre-line leading-relaxed">{question.passage}</p>
        </div>
      )}

      <div className="text-xs text-neutral-900 leading-relaxed font-medium">
        {question.text}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
        {question.options.map((option) => (
          <QuestionOptionCard
            key={option.key}
            optionItem={option}
            isCorrectAnswer={question.correct_option === option.key}
          />
        ))}
      </div>
    </div>
  );
}
