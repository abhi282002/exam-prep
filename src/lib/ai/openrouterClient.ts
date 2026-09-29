import OpenAI from "openai";

export function createOpenRouterClient() {
  const openRouterApiKey = process.env.OPENROUTER_API_KEY || "placeholder-key";

  return new OpenAI({
    baseURL: "https://openrouter.ai/api/v1",
    apiKey: openRouterApiKey,
    defaultHeaders: {
      "HTTP-Referer": process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
      "X-Title": "ExamPrep Personal Mock Platform",
    },
  });
}
