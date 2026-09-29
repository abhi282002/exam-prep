import { Badge } from "@/components/ui/badge";

export function FeaturedExamsHeader() {
  return (
    <div className="flex flex-col items-center text-center space-y-3">
      <Badge variant="outline" className="px-3 py-1 text-xs font-semibold text-blue-700 border-blue-200 bg-blue-50">
        Authentic NTA Pattern
      </Badge>
      <h2 className="text-3xl font-bold tracking-tight text-neutral-900 sm:text-4xl">
        Popular Mock Test Series
      </h2>
      <p className="max-w-2xl text-base text-neutral-600">
        Choose a curated exam set with authentic previous years questions, standard time limits, and official marking guidelines.
      </p>
    </div>
  );
}
