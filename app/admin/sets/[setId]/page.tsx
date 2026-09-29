import { AdminSetQuestionsContainer } from "@/components/admin-questions/admin-set-questions-container";

interface PageProps {
  params: Promise<{ setId: string }>;
}

export default async function AdminSetQuestionsPage({ params }: PageProps) {
  const resolvedParameters = await params;
  return (
    <div className="mx-auto max-w-5xl px-4 sm:px-6 py-6">
      <AdminSetQuestionsContainer setId={resolvedParameters.setId} />
    </div>
  );
}
