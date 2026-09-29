import { requestGeminiCompletion } from "./geminiProvider";
import { requestOpenRouterCompletion } from "./openrouterProvider";

interface GenerateParameters {
  systemPrompt: string;
  userPrompt: string;
}

export async function requestAiCompletion(
  parameters: GenerateParameters
): Promise<string> {
  if (process.env.GEMINI_API_KEY) {
    try {
      return await requestGeminiCompletion(parameters);
    } catch (geminiError) {
      console.warn("[ai] Gemini unavailable, falling back to OpenRouter:", (geminiError as Error).message);
    }
  }

  return requestOpenRouterCompletion(parameters);
}
