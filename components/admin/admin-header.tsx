import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export function AdminHeader({ userEmailAddress }: { userEmailAddress: string }) {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-neutral-200 bg-white/95 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3">
          <Link href="/admin" className="flex items-center gap-2">
            <span className="text-base font-extrabold tracking-tight text-neutral-900">ExamPrep</span>
            <Badge variant="default" className="bg-purple-600 text-[10px] font-bold">Admin</Badge>
          </Link>
          <nav className="hidden sm:flex items-center gap-4 ml-6">
            <Link href="/admin" className="text-xs font-semibold text-neutral-600 hover:text-neutral-900">Dashboard</Link>
            <Link href="/admin/upload" className="text-xs font-semibold text-neutral-600 hover:text-neutral-900">Upload Paper</Link>
          </nav>
        </div>
        <div className="flex items-center gap-3">
          <span className="hidden sm:inline-block text-xs text-neutral-500 font-mono">{userEmailAddress}</span>
          <Link href="/exams"><Button variant="outline" size="sm">Student View</Button></Link>
        </div>
      </div>
    </header>
  );
}
