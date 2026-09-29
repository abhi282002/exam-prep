import { Badge } from "@/components/ui/badge";

export function FeaturesHeader() {
  return (
    <div className="flex flex-col items-center text-center space-y-3">
      <Badge variant="secondary" className="px-3 py-1 text-xs font-semibold text-neutral-800">
        Same Practice. Higher Goals.
      </Badge>
      <h2 className="text-3xl font-bold tracking-tight text-neutral-900 sm:text-4xl">
        Designed for Focused Examination Prep
      </h2>
      <p className="max-w-2xl text-base text-neutral-600">
        Every element is engineered to eliminate distractions, enforce true test timing, and provide actionable feedback.
      </p>
    </div>
  );
}
