import { Separator } from "@/components/ui/separator";
import { FooterLinks } from "./footer-links";
import { GraduationCap } from "@/components/icons";

export function SiteFooter() {
  return (
    <footer className="border-t border-neutral-200 bg-white py-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <div className="flex items-center gap-2 text-neutral-800">
            <GraduationCap className="h-5 w-5 text-blue-600" />
            <span className="text-sm font-bold">ExamPrep</span>
            <span className="text-xs text-neutral-400">| Practice & Succeed</span>
          </div>
          <FooterLinks />
        </div>
        <Separator />
        <div className="text-center text-xs text-neutral-400">
          © {new Date().getFullYear()} ExamPrep Platform. All rights reserved. Designed for mock exam practice.
        </div>
      </div>
    </footer>
  );
}
