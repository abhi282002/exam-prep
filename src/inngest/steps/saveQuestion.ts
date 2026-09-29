import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import type { StructuredQuestion } from "@/src/lib/ai/extractionSchema";

interface SavedQuestionRow {
  questionId: string;
  questionNumber: number;
}

/** Upserts a single question row into the `questions` table. */
export async function saveQuestion(
  setId: string,
  parsedQuestion: StructuredQuestion
): Promise<SavedQuestionRow | null> {
  const supabaseAdminClient = createSupabaseAdminClient();

  const { data: savedRow, error: upsertError } = await supabaseAdminClient
    .from("questions")
    .upsert(
      {
        set_id: setId,
        number: parsedQuestion.number,
        text: parsedQuestion.text,
        subject: "General Paper 1",
        correct_option: "A", // placeholder — set from answer key later
        explanation: null,
      },
      { onConflict: "set_id,number" }
    )
    .select("id")
    .single();

  if (upsertError || !savedRow) {
    console.error(
      `[save-question] Failed to save Q${parsedQuestion.number}:`,
      upsertError?.message
    );
    return null;
  }

  return { questionId: savedRow.id, questionNumber: parsedQuestion.number };
}
