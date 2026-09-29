import { z } from "zod";

export const itemSchema = z.object({ label: z.string(), text: z.string() });
export type Item = z.infer<typeof itemSchema>;
export const listSchema = z.object({ title: z.string(), items: z.array(itemSchema).min(2) });
export type List = z.infer<typeof listSchema>;
export const optionSchema = z.object({ key: z.string(), text: z.string() });
const fourOptions = z.array(optionSchema).length(4);

export const mcqSchema = z.object({
  type: z.literal("mcq"), stem: z.string().min(1), options: fourOptions,
});
export const matchSchema = z.object({
  type: z.literal("match"), stem: z.string().min(1),
  list_a: listSchema, list_b: listSchema, options: fourOptions,
});
export const passageSchema = z.object({
  type: z.literal("passage"), passage: z.string().min(1),
  stem: z.string().min(1), options: fourOptions,
});
export const statementsSchema = z.object({
  type: z.literal("statements"), stem: z.string().min(1),
  statements: z.array(itemSchema).min(2), options: fourOptions,
});
export const assertionReasonSchema = z.object({
  type: z.literal("assertion_reason"), assertion: z.string().min(1),
  reason: z.string().min(1), options: fourOptions,
});

export const questionSchema = z.discriminatedUnion("type", [
  mcqSchema, matchSchema, passageSchema, statementsSchema, assertionReasonSchema,
]);

export type Question = z.infer<typeof questionSchema>;
export type QuestionContent =
  | { list_a: List; list_b: List }
  | { passage: string }
  | { statements: Item[] }
  | { assertion: string; reason: string }
  | null;

export function parseQuestion(input: unknown): Question {
  return questionSchema.parse(input);
}
