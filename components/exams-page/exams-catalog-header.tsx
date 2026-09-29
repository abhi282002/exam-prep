import { Badge } from "@/components/ui/badge";

export function ExamsCatalogHeader() {
  return (
    <div className="flex flex-col space-y-3 text-center sm:text-left">
      <div className="inline-flex">
        <Badge variant="outline" className="border-blue-200 bg-blue-50 text-blue-700 text-xs">
          Authentic Examination Bank
        </Badge>
      </div>
      <h1 className="text-3xl font-extrabold tracking-tight text-neutral-900 sm:text-4xl">
        Explore Examination Series
      </h1>
      <p className="max-w-3xl text-sm sm:text-base text-neutral-600">
        Practice full-length timed mock tests structured according to official NTA UGC NET guidelines. Select any exam set below to begin your timed test.
      </p>
    </div>
  );
}
