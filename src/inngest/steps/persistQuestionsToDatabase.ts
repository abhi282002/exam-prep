import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import type { StructuredQuestion } from "@/src/lib/ai/extractionSchema";
import { saveQuestion } from "./saveQuestion";
import { saveOptions } from "./saveOptions";

interface PersistenceResult {
  totalQuestions: number;
  savedSuccessfully: number;
}

/** Persists all parsed questions and their options into the database. */
export async function persistQuestionsToDatabase(
  setId: string,
  parsedQuestions: StructuredQuestion[]
): Promise<PersistenceResult> {
  let savedSuccessfully = 0;

  for (const parsedQuestion of parsedQuestions) {
    const savedRow = await saveQuestion(setId, parsedQuestion);
    if (!savedRow) continue;

    const optionsSaved = await saveOptions(savedRow.questionId, parsedQuestion);
    if (optionsSaved) savedSuccessfully++;
  }

  return {
    totalQuestions: parsedQuestions.length,
    savedSuccessfully,
  };
}
