import { createOpenRouterClient } from "./openrouterClient";
import { EXTRACTION_SYSTEM_PROMPT } from "./structureChunkPrompt";
import { chunkExtractionSchema, type ChunkExtractionResult } from "./extractionSchema";

export function stripFences(rawContent: string): string {
  return rawContent.replace(/^```(?:json)?\s*/i, "").replace(/\s*```$/i, "").trim();
}

export async function structureChunk(rawChunkText: string): Promise<ChunkExtractionResult> {
  const openRouterClient = createOpenRouterClient();
  const primaryModel = process.env.EXTRACTION_MODEL || "meta-llama/llama-3.3-70b-instruct";
  const fallbackModel = process.env.EXTRACTION_MODEL_FALLBACK || "anthropic/claude-3.5-sonnet";
  const modelAttempts = [primaryModel, primaryModel, fallbackModel];

  let lastExtractionError: Error | null = null;
  for (const currentModel of modelAttempts) {
    try {
      const completion = await openRouterClient.chat.completions.create({
        model: currentModel,
        messages: [
          { role: "system", content: EXTRACTION_SYSTEM_PROMPT },
          { role: "user", content: `Extract questions from this chunk:\n\n${rawChunkText}` },
        ],
        temperature: 0.1,
      });

      const responseText = completion.choices[0]?.message?.content ?? "";
      const cleanedJsonString = stripFences(responseText);
      const parsedJsonData = JSON.parse(cleanedJsonString);
      return chunkExtractionSchema.parse(parsedJsonData);
    } catch (caughtError) {
      lastExtractionError = caughtError as Error;
    }
  }

  throw new Error(`Failed to structure chunk after 3 attempts: ${lastExtractionError?.message}`);
}
