"use client";

import * as React from "react";
import { featuredExaminationList } from "@/components/exams/featured-exams-data";
import { ExamItemCard } from "@/components/exams/exam-item-card";
import { ExamsFilterBar } from "./exams-filter-bar";

export function ExamsCatalogGrid() {
  const [activeCategoryFilter, setActiveCategoryFilter] = React.useState("All Exams");

  const filteredExaminationItems = featuredExaminationList.filter((individualExam) => {
    if (activeCategoryFilter === "All Exams") return true;
    if (activeCategoryFilter === "Teaching & Research") return individualExam.examinationCategory.includes("Teaching");
    if (activeCategoryFilter === "Computer Science") return individualExam.examinationTitle.includes("Computer Science");
    if (activeCategoryFilter === "Full Mock Papers") return individualExam.examinationCategory.includes("Complete");
    return true;
  });

  return (
    <div className="space-y-6">
      <ExamsFilterBar
        selectedCategoryName={activeCategoryFilter}
        onSelectCategoryName={setActiveCategoryFilter}
      />
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredExaminationItems.map((individualExamination) => (
          <ExamItemCard
            key={individualExamination.examinationIdentifier}
            examinationData={individualExamination}
          />
        ))}
      </div>
    </div>
  );
}
