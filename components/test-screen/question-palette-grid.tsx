import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { TestPaletteLegend } from "./test-palette-legend";

interface PaletteGridProps {
  totalCount: number;
  activeIndex: number;
  answersMap: Record<number, string>;
  markedSet: Set<number>;
  onSelectIndex: (index: number) => void;
}

export function QuestionPaletteGrid(props: PaletteGridProps) {
  return (
    <Card className="border-neutral-200 bg-white shadow-sm">
      <CardHeader className="p-4 pb-2">
        <CardTitle className="text-xs font-bold text-neutral-900 uppercase tracking-wider">Question Palette</CardTitle>
      </CardHeader>
      <CardContent className="p-4 space-y-3">
        <TestPaletteLegend />
        <div className="grid grid-cols-5 gap-1.5 max-h-[360px] overflow-y-auto pr-1">
          {Array.from({ length: props.totalCount }).map((_, index) => {
            const isAnswered = props.answersMap[index] !== undefined;
            const isMarked = props.markedSet.has(index);
            const isCurrent = props.activeIndex === index;
            const bgClass = isAnswered ? "bg-emerald-600 text-white font-bold" : isMarked ? "bg-purple-600 text-white font-bold" : "bg-neutral-100 text-neutral-600";
            return (
              <button
                key={index} type="button" onClick={() => props.onSelectIndex(index)}
                className={`flex h-8 w-8 cursor-pointer items-center justify-center rounded-lg text-xs font-medium transition-all ${bgClass} ${isCurrent ? "ring-2 ring-blue-600 ring-offset-2" : ""}`}
              >
                {index + 1}
              </button>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
