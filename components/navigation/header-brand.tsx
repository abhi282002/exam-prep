import Link from "next/link";
import { GraduationCap } from "@/components/icons";
import { Badge } from "@/components/ui/badge";

export function HeaderBrand() {
  return (
    <Link href="/" className="flex items-center gap-2.5 group">
      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-white shadow-sm transition-transform group-hover:scale-105">
        <GraduationCap className="h-5 w-5" />
      </div>
      <div className="flex flex-col">
        <span className="text-lg font-bold tracking-tight text-neutral-900">
          ExamPrep
        </span>
        <span className="text-[10px] font-medium uppercase tracking-wider text-neutral-500">
          Mock Platform
        </span>
      </div>
      <Badge variant="secondary" className="hidden text-[10px] sm:inline-flex">
        UGC NET
      </Badge>
    </Link>
  );
}
