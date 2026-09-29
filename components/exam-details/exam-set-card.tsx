"use client";

import { useRouter } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, Trophy } from "@/components/icons";
import { trpc } from "@/src/trpc/client";

interface ExamSetCardProps {
  setId: string;
  setName: string;
  totalQuestions: number;
}

export function ExamSetCard({ setId, setName, totalQuestions }: ExamSetCardProps) {
  const router = useRouter();
  const startMutation = trpc.attempt.start.useMutation();

  const handleStartAttempt = async () => {
    try {
      const result = await startMutation.mutateAsync({ setId });
      router.push(`/test/${result.attemptId}`);
    } catch {
      router.push(`/login?redirect=/exams`);
    }
  };

  return (
    <Card className="border-neutral-200 bg-white transition-all hover:border-blue-300 hover:shadow-md">
      <CardContent className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Badge variant="secondary" className="text-[10px] font-semibold">Published</Badge>
            <span className="text-xs text-neutral-500">{totalQuestions} Questions</span>
          </div>
          <h3 className="text-base font-bold text-neutral-900">{setName}</h3>
          <p className="text-xs text-neutral-500">Includes complete answer key & timer countdown</p>
        </div>
        <Button onClick={handleStartAttempt} disabled={startMutation.isPending} className="gap-2 shrink-0">
          <Trophy className="h-4 w-4" />
          <span>{startMutation.isPending ? "Starting..." : "Start Exam Set"}</span>
          <ArrowRight className="h-4 w-4" />
        </Button>
      </CardContent>
    </Card>
  );
}
