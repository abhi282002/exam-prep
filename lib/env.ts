import { z } from "zod";

const applicationEnvironmentSchema = z.object({
  NEXT_PUBLIC_APP_URL: z.string().url().default("http://localhost:3000"),
  NEXT_PUBLIC_SUPABASE_URL: z.string().url().default("https://placeholder.supabase.co"),
  NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY: z.string().min(1).default("placeholder-publishable-key"),
  SUPABASE_SECRET_KEY: z.string().min(1).default("placeholder-secret-key"),
  OPENROUTER_API_KEY: z.string().min(1).optional(),
  EXTRACTION_MODEL: z.string().default("meta-llama/llama-3.3-70b-instruct"),
  EXTRACTION_MODEL_FALLBACK: z.string().default("anthropic/claude-3.5-sonnet"),
  ADMIN_EMAILS: z.string().default("admin@example.com"),
  INNGEST_EVENT_KEY: z.string().optional(),
  INNGEST_SIGNING_KEY: z.string().optional(),
});

export const validatedEnvironment = applicationEnvironmentSchema.parse({
  NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
  NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
  NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY:
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ||
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  SUPABASE_SECRET_KEY:
    process.env.SUPABASE_SECRET_KEY ||
    process.env.SUPABASE_SERVICE_ROLE_KEY,
  OPENROUTER_API_KEY: process.env.OPENROUTER_API_KEY,
  EXTRACTION_MODEL: process.env.EXTRACTION_MODEL,
  EXTRACTION_MODEL_FALLBACK: process.env.EXTRACTION_MODEL_FALLBACK,
  ADMIN_EMAILS: process.env.ADMIN_EMAILS,
  INNGEST_EVENT_KEY: process.env.INNGEST_EVENT_KEY,
  INNGEST_SIGNING_KEY: process.env.INNGEST_SIGNING_KEY,
});
