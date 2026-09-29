"use client";

import * as React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Trophy } from "@/components/icons";
import { trpc } from "@/src/trpc/client";
import { AdminMetricsGrid } from "./admin-metrics-grid";
import { AdminSetsTable } from "./admin-sets-table";

export function AdminDashboardContainer() {
  const setsQuery = trpc.admin.listSets.useQuery();

  if (setsQuery.isLoading) {
    return <div className="py-12 text-center text-sm text-neutral-500">Loading admin console telemetry...</div>;
  }

  const setsList = setsQuery.data ?? [];
  const activeCount = setsList.filter((s) => s.is_active).length;
  const uploadedCount = setsList.filter((s) => Boolean(s.question_paper_path)).length;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-neutral-900">Admin Operations Dashboard</h1>
          <p className="text-xs text-neutral-500">Manage official papers, extraction queues, and published mock sets.</p>
        </div>
        <Link href="/admin/upload">
          <Button size="sm" className="gap-2">
            <Trophy className="h-4 w-4" />
            <span>Upload New Paper</span>
            <ArrowRight className="h-4 w-4" />
          </Button>
        </Link>
      </div>

      <AdminMetricsGrid
        totalSetsCount={setsList.length}
        activeSetsCount={activeCount}
        uploadedPapersCount={uploadedCount}
      />

      <AdminSetsTable setsList={setsList} />
    </div>
  );
}
