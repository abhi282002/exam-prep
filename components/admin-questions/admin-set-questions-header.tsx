import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import type { SetHeaderDetails } from "./admin-questions-types";

interface QuestionsHeaderProps {
  setDetails: SetHeaderDetails;
  totalQuestionsCount: number;
}

export function AdminSetQuestionsHeader({
  setDetails,
  totalQuestionsCount,
}: QuestionsHeaderProps) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-neutral-200 pb-5">
      <div className="space-y-1.5">
        <div className="flex items-center gap-2">
          <Link href="/admin">
            <Button variant="ghost" size="sm" className="h-7 px-2 text-xs text-neutral-500">
              ← Back to Sets
            </Button>
          </Link>
          <Badge variant="outline" className="text-[10px]">
            {setDetails.exams?.name ?? "General"}
          </Badge>
          <Badge variant={setDetails.is_active ? "default" : "secondary"} className="text-[10px]">
            {setDetails.is_active ? "Published" : "Draft"}
          </Badge>
        </div>
        <h1 className="text-xl font-black text-neutral-900">{setDetails.name}</h1>
        <p className="text-xs text-neutral-500">
          {setDetails.year} • Session {setDetails.session} • {totalQuestionsCount} Questions Extracted
        </p>
      </div>
    </div>
  );
}
