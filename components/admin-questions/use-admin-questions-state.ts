"use client";

import * as React from "react";
import type { ExtractedQuestionRecord } from "./admin-questions-types";

export function useAdminQuestionsState(initialQuestions: ExtractedQuestionRecord[]) {
  const [searchQuery, setSearchQuery] = React.useState("");
  const [expandedIds, setExpandedIds] = React.useState<Set<string>>(
    () => new Set(initialQuestions.slice(0, 3).map((q) => q.id))
  );

  const filteredQuestions = React.useMemo(() => {
    const cleanQuery = searchQuery.trim().toLowerCase();
    if (!cleanQuery) return initialQuestions;
    return initialQuestions.filter(
      (q) =>
        String(q.number).includes(cleanQuery) ||
        q.text.toLowerCase().includes(cleanQuery) ||
        q.options.some((opt) => opt.text.toLowerCase().includes(cleanQuery))
    );
  }, [initialQuestions, searchQuery]);

  const toggleQuestion = (questionId: string) => {
    setExpandedIds((prev) => {
      const next = new Set(prev);
      if (next.has(questionId)) next.delete(questionId);
      else next.add(questionId);
      return next;
    });
  };

  const expandAll = () => setExpandedIds(new Set(initialQuestions.map((q) => q.id)));
  const collapseAll = () => setExpandedIds(new Set());

  return {
    searchQuery,
    setSearchQuery,
    filteredQuestions,
    expandedIds,
    toggleQuestion,
    expandAll,
    collapseAll,
  };
}
