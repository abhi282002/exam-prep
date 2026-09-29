"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, Trophy } from "@/components/icons";
import { trpc } from "@/src/trpc/client";

interface ExamSetCardProperties {
  setIdentifier: string;
  setTitle: string;
  questionQuantity: number;
}

export function ExamSetCard({
  setIdentifier,
  setTitle,
  questionQuantity,
}: ExamSetCardProperties) {
  const router = useRouter();
  const startMutation = trpc.attempt.start.useMutation();

  const handleStartAttempt = async () => {
    try {
      const result = await startMutation.mutateAsync({ setId: setIdentifier });
      router.push(`/test/${result.attemptId}`);
    } catch {
      router.push(`/login?redirect=/exams`);
    }
  };

  return (
    <Card className="border-neutral-200 bg-white transition-all hover:border-blue-300 hover:shadow-md">
      <CardContent className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Badge variant="secondary" className="text-[10px] font-semibold">Published</Badge>
            <span className="text-xs text-neutral-500">{questionQuantity} Questions</span>
          </div>
          <h3 className="text-base font-bold text-neutral-900">{setTitle}</h3>
          <p className="text-xs text-neutral-500">Includes complete answer key & detailed explanations</p>
        </div>
        <Button onClick={handleStartAttempt} disabled={startMutation.isPending} className="w-full sm:w-auto gap-2">
          <Trophy className="h-4 w-4" />
          <span>{startMutation.isPending ? "Starting..." : "Start Attempt"}</span>
          <ArrowRight className="h-4 w-4" />
        </Button>
      </CardContent>
    </Card>
  );
}
