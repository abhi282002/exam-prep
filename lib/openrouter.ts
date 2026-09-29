import OpenAI from "openai";

export function createOpenRouterClient() {
  return new OpenAI({
    baseURL: "https://openrouter.ai/api/v1",
    apiKey: process.env.OPENROUTER_API_KEY,
    defaultHeaders: {
      "HTTP-Referer": process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000",
      "X-Title": "ExamPrep Platform",
    },
  });
}

export const EXTRACTION_MODEL =
  process.env.EXTRACTION_MODEL ?? "google/gemini-2.0-flash-exp:free";

export const EXTRACTION_MODEL_FALLBACK =
  process.env.EXTRACTION_MODEL_FALLBACK ?? "meta-llama/llama-3.3-70b-instruct:free";
