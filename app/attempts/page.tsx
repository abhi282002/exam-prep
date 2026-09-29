import { SiteHeader } from "@/components/navigation/site-header";
import { SiteFooter } from "@/components/footer/site-footer";
import { AttemptsListContainer } from "@/components/attempts/attempts-list-container";

export default function AttemptsPage() {
  return (
    <div className="flex min-h-screen flex-col bg-neutral-100 text-neutral-900">
      <SiteHeader />
      <main className="flex-1 py-10">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="space-y-1">
            <h1 className="text-2xl font-extrabold text-neutral-900 sm:text-3xl">My Exam Attempts</h1>
            <p className="text-xs text-neutral-500">Track all your mock test results, accuracy scores, and performance history.</p>
          </div>
          <AttemptsListContainer />
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
