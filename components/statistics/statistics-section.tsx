import { platformStatisticMetrics } from "./statistics-data";
import { StatisticCard } from "./statistic-card";

export function StatisticsSection() {
  return (
    <section className="py-6 sm:py-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {platformStatisticMetrics.map((individualMetric) => (
            <StatisticCard
              key={individualMetric.metricIdentifier}
              statisticMetric={individualMetric}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
