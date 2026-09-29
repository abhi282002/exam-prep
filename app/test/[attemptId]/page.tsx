import { TestEnvironmentContainer } from "@/components/test-screen/test-environment-container";

interface TestAttemptPageProperties {
  params: Promise<{ attemptId: string }>;
}

export default async function TestAttemptPage({ params }: TestAttemptPageProperties) {
  const { attemptId } = await params;

  return <TestEnvironmentContainer attemptIdentifier={attemptId} />;
}
