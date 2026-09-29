import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import type { StructuredQuestion } from "@/src/lib/ai/extractionSchema";

/** Upserts all 4 options for a single question into the `options` table. */
export async function saveOptions(
  questionId: string,
  parsedQuestion: StructuredQuestion
): Promise<boolean> {
  const supabaseAdminClient = createSupabaseAdminClient();

  const optionRows = parsedQuestion.options.map((singleOption) => ({
    question_id: questionId,
    key: singleOption.key,
    text: singleOption.text,
  }));

  const { error: upsertError } = await supabaseAdminClient
    .from("options")
    .upsert(optionRows, { onConflict: "question_id,key" });

  if (upsertError) {
    console.error(
      `[save-options] Failed to save options for question ${questionId}:`,
      upsertError.message
    );
    return false;
  }

  return true;
}
