export function TestPaletteLegend() {
  const legendItems = [
    { label: "Answered", badgeClass: "bg-emerald-600 text-white" },
    { label: "Marked Review", badgeClass: "bg-purple-600 text-white" },
    { label: "Unanswered", badgeClass: "bg-amber-100 text-amber-800 border border-amber-300" },
    { label: "Not Visited", badgeClass: "bg-neutral-100 text-neutral-600" },
  ];

  return (
    <div className="grid grid-cols-2 gap-2 text-[11px] pb-3 border-b border-neutral-100">
      {legendItems.map((individualLegend) => (
        <div key={individualLegend.label} className="flex items-center gap-1.5">
          <span className={`h-4 w-4 rounded-md text-[9px] font-bold flex items-center justify-center ${individualLegend.badgeClass}`}>✓</span>
          <span className="text-neutral-600">{individualLegend.label}</span>
        </div>
      ))}
    </div>
  );
}
