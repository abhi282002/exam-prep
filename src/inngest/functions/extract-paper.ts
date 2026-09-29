import { inngestClient } from "../client";
import { extractTextFromStoragePdf } from "../steps/extractTextFromStoragePdf";
import { parseQuestionsFromText } from "../steps/parseQuestionsFromText";
import { persistQuestionsToDatabase } from "../steps/persistQuestionsToDatabase";
import { activateExamSet } from "../steps/activateExamSet";

interface ExtractionEventData {
  setId: string;
  setName: string;
  questionPaperPath: string;
}

export const extractPaperFunction = inngestClient.createFunction(
  {
    id: "extract-paper-questions",
    retries: 2,
    triggers: [{ event: "paper/extract.requested" }],
  },
  async ({ event, step }) => {
    const eventData = event.data as ExtractionEventData;
    const { setId, setName, questionPaperPath } = eventData;

    const cleanedDocumentText = await step.run("extract-pdf-text", () =>
      extractTextFromStoragePdf(questionPaperPath)
    );

    const parsedQuestions = await step.run("parse-questions-with-ai", () =>
      parseQuestionsFromText(cleanedDocumentText)
    );

    const persistenceResult = await step.run("persist-questions-to-db", () =>
      persistQuestionsToDatabase(setId, parsedQuestions)
    );

    await step.run("activate-set", () => activateExamSet(setId));

    return {
      success: true,
      setId,
      setName,
      totalParsed: persistenceResult.totalQuestions,
      totalSaved: persistenceResult.savedSuccessfully,
    };
  }
);
