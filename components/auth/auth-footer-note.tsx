import Link from "next/link";

export function AuthFooterNote() {
  return (
    <div className="text-center text-[11px] text-neutral-500 pt-2 border-t border-neutral-100">
      <span>By continuing, you agree to ExamPrep{" "}</span>
      <Link href="/terms" className="underline hover:text-neutral-900">
        Terms of Service
      </Link>
      <span>{" "}and{" "}</span>
      <Link href="/privacy" className="underline hover:text-neutral-900">
        Privacy Policy
      </Link>
      <span>.</span>
    </div>
  );
}
