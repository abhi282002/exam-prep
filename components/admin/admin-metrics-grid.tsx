import { Card, CardContent } from "@/components/ui/card";

interface MetricsProperties {
  totalSetsCount: number;
  activeSetsCount: number;
  uploadedPapersCount: number;
}

export function AdminMetricsGrid({ totalSetsCount, activeSetsCount, uploadedPapersCount }: MetricsProperties) {
  const metricCards = [
    { title: "Total Exam Sets", value: totalSetsCount, description: "Catalogued papers" },
    { title: "Published Sets", value: activeSetsCount, description: "Available to students" },
    { title: "PDFs in Storage", value: uploadedPapersCount, description: "Secure papers bucket" },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
      {metricCards.map((metric) => (
        <Card key={metric.title} className="border-neutral-200 bg-white">
          <CardContent className="p-5 space-y-1">
            <span className="text-xs text-neutral-500 font-medium">{metric.title}</span>
            <div className="text-2xl font-black text-neutral-900">{metric.value}</div>
            <p className="text-[11px] text-neutral-400">{metric.description}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
