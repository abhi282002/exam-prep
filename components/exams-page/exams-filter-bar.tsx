"use client";

import * as React from "react";
import { Badge } from "@/components/ui/badge";

const filterCategoryOptions = [
  "All Exams",
  "Teaching & Research",
  "Computer Science",
  "Full Mock Papers",
];

interface ExamsFilterBarProperties {
  selectedCategoryName: string;
  onSelectCategoryName: (categoryName: string) => void;
}

export function ExamsFilterBar({
  selectedCategoryName,
  onSelectCategoryName,
}: ExamsFilterBarProperties) {
  return (
    <div className="flex flex-wrap items-center gap-2 pt-2">
      {filterCategoryOptions.map((individualCategory) => (
        <Badge
          key={individualCategory}
          variant={selectedCategoryName === individualCategory ? "default" : "outline"}
          onClick={() => onSelectCategoryName(individualCategory)}
          className="cursor-pointer px-3.5 py-1.5 text-xs transition-colors hover:bg-blue-50 hover:text-blue-700"
        >
          {individualCategory}
        </Badge>
      ))}
    </div>
  );
}
