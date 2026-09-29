import { z } from "zod";

export const structuredOptionSchema = z.object({
  key: z.enum(["A", "B", "C", "D"]),
  text: z.string().min(1),
});

export const structuredQuestionSchema = z.object({
  number: z.number().int().positive(),
  text: z.string().min(1),
  passage: z.string().nullable().optional(),
  options: z.array(structuredOptionSchema).length(4, "Each question must have exactly 4 options"),
});

export const chunkExtractionSchema = z.array(structuredQuestionSchema);

export type StructuredQuestion = z.infer<typeof structuredQuestionSchema>;
export type ChunkExtractionResult = z.infer<typeof chunkExtractionSchema>;
