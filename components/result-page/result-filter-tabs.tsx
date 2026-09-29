import { Badge } from "@/components/ui/badge";

interface ResultFilterTabsProperties {
  activeQuestionFilter: "all" | "correct" | "wrong" | "skipped";
  onSelectFilter: (filter: "all" | "correct" | "wrong" | "skipped") => void;
  allCount: number;
  correctCount: number;
  wrongCount: number;
  skippedCount: number;
}

export function ResultFilterTabs({
  activeQuestionFilter,
  onSelectFilter,
  allCount,
  correctCount,
  wrongCount,
  skippedCount,
}: ResultFilterTabsProperties) {
  const filterTabs = [
    { id: "all" as const, label: "All Questions", count: allCount },
    { id: "correct" as const, label: "Correct", count: correctCount },
    { id: "wrong" as const, label: "Wrong", count: wrongCount },
    { id: "skipped" as const, label: "Skipped", count: skippedCount },
  ];

  return (
    <div className="flex flex-wrap items-center gap-2 border-b border-neutral-200 pb-3">
      {filterTabs.map((individualTab) => (
        <Badge
          key={individualTab.id}
          variant={activeQuestionFilter === individualTab.id ? "default" : "outline"}
          onClick={() => onSelectFilter(individualTab.id)}
          className="cursor-pointer gap-2 px-3 py-1.5 text-xs font-semibold"
        >
          <span>{individualTab.label}</span>
          <span className="rounded-full bg-neutral-200/50 px-1.5 py-0.2 text-[10px]">{individualTab.count}</span>
        </Badge>
      ))}
    </div>
  );
}
