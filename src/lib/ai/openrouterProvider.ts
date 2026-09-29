import { createOpenRouterClient } from "./openrouterClient";

interface OpenRouterGenerateParameters {
  systemPrompt: string;
  userPrompt: string;
}

const CANDIDATE_OPENROUTER_MODELS = [
  process.env.EXTRACTION_MODEL || "google/gemini-2.0-flash-exp:free",
  "meta-llama/llama-3.3-70b-instruct:free",
  "deepseek/deepseek-chat",
];

export async function requestOpenRouterCompletion({
  systemPrompt,
  userPrompt,
}: OpenRouterGenerateParameters): Promise<string> {
  const openRouterClient = createOpenRouterClient();
  let lastFailureError: Error | null = null;

  for (const modelIdentifier of CANDIDATE_OPENROUTER_MODELS) {
    try {
      const completion = await openRouterClient.chat.completions.create({
        model: modelIdentifier,
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userPrompt },
        ],
        temperature: 0.1,
      });

      const responseContent = completion.choices[0]?.message?.content;
      if (responseContent) return responseContent;
    } catch (caughtError) {
      lastFailureError = caughtError as Error;
    }
  }

  throw new Error(`OpenRouter extraction failed: ${lastFailureError?.message}`);
}
