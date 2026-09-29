import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "@/components/icons";
import { HeaderAuthButton } from "./header-auth-button";

export function HeaderActions() {
  return (
    <div className="flex items-center gap-3">
      <HeaderAuthButton />
      <Link href="/exams">
        <Button size="sm" className="hidden sm:inline-flex">
          <span>Start Practice</span>
          <ArrowRight className="h-4 w-4" />
        </Button>
      </Link>
    </div>
  );
}
