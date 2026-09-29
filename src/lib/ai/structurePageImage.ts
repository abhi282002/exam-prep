import { createOpenRouterClient } from "./openrouterClient";
import { EXTRACTION_SYSTEM_PROMPT } from "./structureChunkPrompt";
import { stripFences } from "./structureChunk";
import { chunkExtractionSchema, type ChunkExtractionResult } from "./extractionSchema";

export async function structurePageImage(
  base64ImageUrl: string,
  pageIndex: number
): Promise<ChunkExtractionResult> {
  const openRouterClient = createOpenRouterClient();
  const visionModel = process.env.EXTRACTION_MODEL_FALLBACK || "anthropic/claude-3.5-sonnet";

  const completion = await openRouterClient.chat.completions.create({
    model: visionModel,
    messages: [
      { role: "system", content: EXTRACTION_SYSTEM_PROMPT },
      {
        role: "user",
        content: [
          { type: "text", text: `Extract all questions on page ${pageIndex} from this scanned exam image.` },
          { type: "image_url", image_url: { url: base64ImageUrl } },
        ],
      },
    ],
    temperature: 0.1,
  });

  const responseContent = completion.choices[0]?.message?.content ?? "";
  const cleaned = stripFences(responseContent);
  return chunkExtractionSchema.parse(JSON.parse(cleaned));
}
