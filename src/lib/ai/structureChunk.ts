import { EXTRACTION_SYSTEM_PROMPT } from "./structureChunkPrompt";
import { chunkExtractionSchema, type ChunkExtractionResult } from "./extractionSchema";
import { requestAiCompletion } from "./aiCompletionService";
import { sanitizeQuestionItem } from "./sanitizeQuestionBatch";

export function stripFences(rawContent: string): string {
  return rawContent.replace(/^```(?:json)?\s*/i, "").replace(/\s*```$/i, "").trim();
}

export async function structureChunk(rawChunkText: string): Promise<ChunkExtractionResult> {
  const userPrompt = `Extract questions from this chunk:\n\n${rawChunkText}`;
  const rawResponse = await requestAiCompletion({
    systemPrompt: EXTRACTION_SYSTEM_PROMPT,
    userPrompt,
  });

  const cleanedJsonString = stripFences(rawResponse);
  const parsedJsonData = JSON.parse(cleanedJsonString);
  const rawQuestionList = Array.isArray(parsedJsonData) ? parsedJsonData : [];
  const sanitizedQuestions = rawQuestionList.map((item, index) =>
    sanitizeQuestionItem(item, index)
  );

  return chunkExtractionSchema.parse(sanitizedQuestions);
}
