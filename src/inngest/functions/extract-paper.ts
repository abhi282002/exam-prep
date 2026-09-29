import { inngestClient } from "../client";

export const extractPaperFunction = inngestClient.createFunction(
  {
    id: "extract-paper-questions",
    retries: 2,
    triggers: [{ event: "paper/extract.requested" }],
  },
  async ({ event, step }: { event: any; step: any }) => {
    const { setId, questionPaperPath } = event.data;

    await step.run("log-extraction-request", async () => {
      console.log(`Extraction requested for set: ${setId}, file: ${questionPaperPath}`);
      return { status: "queued", setId };
    });

    return { success: true, setId };
  }
);
