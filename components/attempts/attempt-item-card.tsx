import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "@/components/icons";

interface AttemptRecord {
  id: string;
  score: number | null;
  total_marks: number | null;
  status: string;
  created_at: string;
  sets: { name: string; year: number; session: string; exams?: { name: string } | null } | null;
}

export function AttemptItemCard({ attemptItem }: { attemptItem: AttemptRecord }) {
  const isCompleted = attemptItem.status === "completed";
  const dateFormatted = new Date(attemptItem.created_at).toLocaleDateString("en-US", {
    month: "short", day: "numeric", year: "numeric",
  });

  return (
    <Card className="border-neutral-200 bg-white transition-all hover:border-blue-300 hover:shadow-sm">
      <CardContent className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Badge variant={isCompleted ? "default" : "outline"} className="text-[10px]">
              {isCompleted ? "Completed" : "In Progress"}
            </Badge>
            <span className="text-xs text-neutral-500">{dateFormatted}</span>
          </div>
          <h3 className="text-sm font-bold text-neutral-900">{attemptItem.sets?.name ?? "Mock Exam Paper"}</h3>
          <p className="text-xs text-neutral-500">{attemptItem.sets?.exams?.name ?? "General Paper 1"}</p>
        </div>
        <div className="flex items-center gap-4">
          {isCompleted && (
            <div className="text-right">
              <span className="text-xs text-neutral-500 block">Score</span>
              <span className="text-base font-extrabold text-blue-600">{attemptItem.score ?? 0} / {attemptItem.total_marks ?? 100}</span>
            </div>
          )}
          <Link href={isCompleted ? `/result/${attemptItem.id}` : `/test/${attemptItem.id}`}>
            <Button size="sm" variant={isCompleted ? "outline" : "default"} className="gap-1.5">
              <span>{isCompleted ? "Review Scorecard" : "Resume Test"}</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
