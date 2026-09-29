import { splitQuestions, makeChunks } from "@/src/lib/pdf/splitQuestions";
import { structureChunk } from "@/src/lib/ai/structureChunk";
import type { StructuredQuestion } from "@/src/lib/ai/extractionSchema";

const QUESTIONS_PER_AI_BATCH = 8;

/** Splits document text into question blocks, sends each batch to OpenRouter, returns all parsed questions. */
export async function parseQuestionsFromText(
  fullDocumentText: string
): Promise<StructuredQuestion[]> {
  const questionBlocks = splitQuestions(fullDocumentText);

  if (questionBlocks.length === 0) {
    throw new Error(
      "No question patterns found in the document. " +
      "Verify the PDF contains numbered multiple-choice questions."
    );
  }

  const questionBatches = makeChunks(questionBlocks, QUESTIONS_PER_AI_BATCH);
  const allParsedQuestions: StructuredQuestion[] = [];

  for (const singleBatch of questionBatches) {
    const batchText = singleBatch
      .map((block) => block.rawQuestionText)
      .join("\n\n");

    const parsedBatch = await structureChunk(batchText);
    allParsedQuestions.push(...parsedBatch);
  }

  if (allParsedQuestions.length === 0) {
    throw new Error("AI returned zero questions after processing all batches.");
  }

  return allParsedQuestions;
}
