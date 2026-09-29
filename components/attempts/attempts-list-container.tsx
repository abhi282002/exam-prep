"use client";

import * as React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { trpc } from "@/src/trpc/client";
import { AttemptItemCard } from "./attempt-item-card";

export function AttemptsListContainer() {
  const attemptsQuery = trpc.attempt.list.useQuery();

  if (attemptsQuery.isLoading) {
    return <div className="py-12 text-center text-sm text-neutral-500">Loading your exam attempts history...</div>;
  }

  const attempts = attemptsQuery.data ?? [];

  if (attempts.length === 0) {
    return (
      <div className="rounded-2xl border border-neutral-200 bg-white p-8 text-center space-y-4 shadow-sm">
        <h3 className="text-base font-bold text-neutral-900">No mock tests attempted yet</h3>
        <p className="text-xs text-neutral-500 max-w-sm mx-auto">
          Start your first mock test paper to measure your speed, accuracy, and detailed question-by-question performance.
        </p>
        <Link href="/exams"><Button size="sm">Explore Available Exams</Button></Link>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {attempts.map((attempt) => (
        <AttemptItemCard key={attempt.id} attemptItem={attempt as any} />
      ))}
    </div>
  );
}
