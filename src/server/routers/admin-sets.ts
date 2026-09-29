import { z } from "zod";
import { adminProcedure } from "../trpc";

export const listSetsAdminProcedure = adminProcedure.query(async ({ ctx }) => {
  const { data: setList, error } = await ctx.supabase
    .from("sets")
    .select(`
      id, exam_id, name, year, session, total_marks,
      is_active, question_paper_path, answer_key_path, created_at,
      exams (name, slug),
      questions (count)
    `)
    .order("created_at", { ascending: false });

  if (error) throw new Error(error.message);
  return setList ?? [];
});

export const createSetAdminProcedure = adminProcedure
  .input(z.object({
    examId: z.string().uuid(),
    name: z.string().min(2),
    year: z.number().int(),
    session: z.string(),
    totalMarks: z.number().default(100),
  }))
  .mutation(async ({ ctx, input }) => {
    // Use the service-role admin client to bypass RLS for admin write operations
    const { data: createdSet, error } = await ctx.adminSupabase
      .from("sets")
      .insert({
        exam_id: input.examId,
        name: input.name,
        year: input.year,
        session: input.session,
        total_marks: input.totalMarks,
        is_active: false,
      })
      .select().single();

    if (error || !createdSet) throw new Error(error?.message ?? "Failed to create set");
    return createdSet;
  });
