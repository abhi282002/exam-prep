export function QuestionPaletteLegend() {
  const legendItems = [
    { label: "Answered", dotClass: "bg-emerald-600 border border-emerald-400" },
    { label: "Not answered", dotClass: "bg-red-950 border border-red-600" },
    { label: "Not visited", dotClass: "bg-[#1f2633] border border-neutral-700" },
    { label: "Marked for review", dotClass: "bg-blue-900 border border-blue-500" },
    { label: "Answered and marked", dotClass: "bg-emerald-600 ring-2 ring-blue-500" },
  ];

  return (
    <div className="grid grid-cols-2 gap-y-2 gap-x-3 pb-3 border-b border-neutral-800 text-xs text-neutral-300">
      {legendItems.map((item) => (
        <div key={item.label} className="flex items-center gap-2">
          <span className={`h-3 w-3 shrink-0 rounded-xs ${item.dotClass}`} />
          <span className="truncate">{item.label}</span>
        </div>
      ))}
    </div>
  );
}
