"use client";

import { trpc } from "@/src/trpc/client";
import { AdminSetQuestionsHeader } from "./admin-set-questions-header";
import { AdminQuestionsToolbar } from "./admin-questions-toolbar";
import { AdminQuestionsAccordionList } from "./admin-questions-accordion-list";
import { useAdminQuestionsState } from "./use-admin-questions-state";

export function AdminSetQuestionsContainer({ setId }: { setId: string }) {
  const query = trpc.admin.getSetQuestions.useQuery({ setId });

  if (query.isLoading) {
    return <div className="py-20 text-center text-sm text-neutral-500">Loading extracted questions...</div>;
  }

  if (query.isError || !query.data) {
    return <div className="py-20 text-center text-sm text-red-500">Failed to load questions: {query.error?.message}</div>;
  }

  const { setDetails, questionsList } = query.data;

  return (
    <QuestionsViewWithState
      setDetails={setDetails}
      questionsList={questionsList as any}
    />
  );
}

function QuestionsViewWithState({ setDetails, questionsList }: any) {
  const state = useAdminQuestionsState(questionsList);

  return (
    <div className="space-y-6">
      <AdminSetQuestionsHeader
        setDetails={setDetails}
        totalQuestionsCount={questionsList.length}
      />
      <AdminQuestionsToolbar
        searchQuery={state.searchQuery}
        onSearchChange={state.setSearchQuery}
        onExpandAll={state.expandAll}
        onCollapseAll={state.collapseAll}
      />
      <AdminQuestionsAccordionList
        questionsList={state.filteredQuestions}
        expandedQuestionIds={state.expandedIds}
        onToggleQuestion={state.toggleQuestion}
      />
    </div>
  );
}
