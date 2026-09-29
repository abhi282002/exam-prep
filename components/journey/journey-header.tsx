import { Badge } from "@/components/ui/badge";

export function JourneyHeader() {
  return (
    <div className="flex flex-col items-center text-center space-y-3">
      <Badge variant="outline" className="border-blue-200 bg-blue-50 text-blue-700">
        Roadmap to Success
      </Badge>
      <h2 className="text-3xl font-bold tracking-tight text-neutral-900 sm:text-4xl">
        The Path to Your Dream Score
      </h2>
      <p className="max-w-2xl text-base text-neutral-600">
        From your very first practice question to your final exam hall triumph — follow a structured preparation path.
      </p>
    </div>
  );
}
