import { SiteHeader } from "@/components/navigation/site-header";
import { SiteFooter } from "@/components/footer/site-footer";
import { ExamsCatalogHeader } from "@/components/exams-page/exams-catalog-header";
import { ExamsCatalogGrid } from "@/components/exams-page/exams-catalog-grid";

export default function ExamsIndexPage() {
  return (
    <div className="flex min-h-screen flex-col bg-neutral-100 text-neutral-900">
      <SiteHeader />
      <main className="flex-1 py-10 sm:py-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-8">
          <ExamsCatalogHeader />
          <ExamsCatalogGrid />
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
