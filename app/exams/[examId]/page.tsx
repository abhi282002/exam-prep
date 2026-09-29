import { SiteHeader } from "@/components/navigation/site-header";
import { SiteFooter } from "@/components/footer/site-footer";
import { ExamHeroSummary } from "@/components/exam-details/exam-hero-summary";
import { ExamSetList } from "@/components/exam-details/exam-set-list";

interface ExamDetailPageProperties {
  params: Promise<{ examId: string }>;
}

export default async function ExamDetailPage({ params }: ExamDetailPageProperties) {
  const { examId } = await params;

  return (
    <div className="flex min-h-screen flex-col bg-neutral-100 text-neutral-900">
      <SiteHeader />
      <main className="flex-1 py-10">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 space-y-8">
          <ExamHeroSummary
            examinationTitle={`UGC NET — ${examId.toUpperCase()}`}
            durationMinutes={60}
            questionCount={50}
            marksPerQuestion={2}
          />
          <ExamSetList examinationSlug={examId} />
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
