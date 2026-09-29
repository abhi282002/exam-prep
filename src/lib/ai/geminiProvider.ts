interface GeminiGenerateParameters {
  systemPrompt: string;
  userPrompt: string;
}

const CANDIDATE_MODELS = [
  process.env.GEMINI_MODEL || "gemini-3.5-flash-lite",
  "gemini-3.5-flash-lite",
  "gemini-flash-latest",
  "gemini-3.8-flash",
  "gemini-3.5-flash",
];

export async function requestGeminiCompletion({
  systemPrompt,
  userPrompt,
}: GeminiGenerateParameters): Promise<string> {
  const geminiApiKey = process.env.GEMINI_API_KEY;
  if (!geminiApiKey) throw new Error("GEMINI_API_KEY is not set in environment.");

  let lastResponseError: Error | null = null;
  const uniqueModels = Array.from(new Set(CANDIDATE_MODELS));

  for (const modelIdentifier of uniqueModels) {
    try {
      const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${modelIdentifier}:generateContent?key=${geminiApiKey}`;
      const apiResponse = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: `${systemPrompt}\n\n${userPrompt}` }] }],
          generationConfig: { temperature: 0.1, responseMimeType: "application/json" },
        }),
      });

      if (!apiResponse.ok) {
        const errorDetails = await apiResponse.text();
        throw new Error(`Model ${modelIdentifier} failed (${apiResponse.status}): ${errorDetails}`);
      }

      const responsePayload = await apiResponse.json();
      const generatedText = responsePayload.candidates?.[0]?.content?.parts?.[0]?.text;
      if (generatedText) return generatedText;
    } catch (caughtError) {
      lastResponseError = caughtError as Error;
      console.warn(`[gemini] ${modelIdentifier} unavailable, trying fallback:`, (caughtError as Error).message);
    }
  }

  throw new Error(`All Gemini models failed: ${lastResponseError?.message}`);
}
