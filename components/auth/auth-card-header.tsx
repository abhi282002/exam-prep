import Link from "next/link";
import { GraduationCap } from "@/components/icons";

export function AuthCardHeader() {
  return (
    <div className="flex flex-col items-center space-y-2 text-center pb-2">
      <Link href="/" className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-600 text-white shadow-md transition-transform hover:scale-105">
        <GraduationCap className="h-6 w-6" />
      </Link>
      <h1 className="text-2xl font-bold tracking-tight text-neutral-900">
        Welcome to ExamPrep
      </h1>
      <p className="text-xs text-neutral-500 max-w-xs">
        Access authentic UGC NET mock tests, timer simulations, and detailed performance analytics.
      </p>
    </div>
  );
}
