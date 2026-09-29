import { z } from "zod";
import { adminProcedure } from "../trpc";

const getSetQuestionsInput = z.object({
  setId: z.string().uuid(),
});

export const getSetQuestionsAdminProcedure = adminProcedure
  .input(getSetQuestionsInput)
  .query(async ({ ctx, input }) => {
    const { data: setDetails, error: setError } = await ctx.adminSupabase
      .from("sets")
      .select("id, name, year, session, is_active, total_marks, exams(name, slug)")
      .eq("id", input.setId)
      .single();

    if (setError || !setDetails) {
      throw new Error(`Failed to load exam set: ${setError?.message}`);
    }

    const { data: questionsList, error: questionsError } = await ctx.adminSupabase
      .from("questions")
      .select(`
        id, number, text, subject, correct_option, explanation,
        options (id, key, text)
      `)
      .eq("set_id", input.setId)
      .order("number", { ascending: true });

    if (questionsError) {
      throw new Error(`Failed to load questions: ${questionsError.message}`);
    }

    return {
      setDetails,
      questionsList: questionsList ?? [],
    };
  });
