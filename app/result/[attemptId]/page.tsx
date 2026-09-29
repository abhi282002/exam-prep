import { SiteHeader } from "@/components/navigation/site-header";
import { SiteFooter } from "@/components/footer/site-footer";
import { ResultViewContainer } from "@/components/result-page/result-view-container";

interface ResultPageProperties {
  params: Promise<{ attemptId: string }>;
}

export default async function ResultPage({ params }: ResultPageProperties) {
  const { attemptId } = await params;

  return (
    <div className="flex min-h-screen flex-col bg-neutral-100 text-neutral-900">
      <SiteHeader />
      <main className="flex-1 py-10">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <ResultViewContainer attemptIdentifier={attemptId} />
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
