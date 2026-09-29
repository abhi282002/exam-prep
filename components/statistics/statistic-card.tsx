import { Card, CardContent } from "@/components/ui/card";
import { StatisticMetricItem } from "./statistics-data";

interface StatisticCardProperties {
  statisticMetric: StatisticMetricItem;
}

export function StatisticCard({ statisticMetric }: StatisticCardProperties) {
  const IconComponent = statisticMetric.metricIconElement;

  return (
    <Card className="border-neutral-200/90 bg-white/90 shadow-sm transition-all hover:shadow-md hover:-translate-y-0.5">
      <CardContent className="flex items-center gap-4 p-5">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
          <IconComponent className="h-6 w-6" />
        </div>
        <div className="flex flex-col">
          <span className="text-2xl font-bold tracking-tight text-neutral-900">
            {statisticMetric.metricNumericValue}
          </span>
          <span className="text-sm font-semibold text-neutral-700">
            {statisticMetric.metricPrimaryLabel}
          </span>
          <span className="text-xs text-neutral-500">
            {statisticMetric.metricDescriptionText}
          </span>
        </div>
      </CardContent>
    </Card>
  );
}
