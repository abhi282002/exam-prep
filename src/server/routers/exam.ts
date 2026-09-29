import { z } from "zod";
import { router, publicProcedure } from "../trpc";

export const examRouter = router({
  list: publicProcedure.query(async ({ ctx }) => {
    const { data: exams, error } = await ctx.supabase
      .from("exams")
      .select("id, name, slug, description, total_questions, duration_minutes, sets(id, name, is_active)")
      .order("created_at", { ascending: true });

    if (error) throw new Error(error.message);
    return exams ?? [];
  }),

  getBySlug: publicProcedure
    .input(z.object({ slug: z.string() }))
    .query(async ({ ctx, input }) => {
      const { data: exam, error } = await ctx.supabase
        .from("exams")
        .select("id, name, slug, description, total_questions, duration_minutes, sets(id, name, year, session, total_marks, is_active)")
        .eq("slug", input.slug)
        .single();

      if (error || !exam) throw new Error("Exam not found");
      return exam;
    }),
});
