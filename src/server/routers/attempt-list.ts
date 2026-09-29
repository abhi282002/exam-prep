import { protectedProcedure } from "../trpc";

export const listUserAttemptsProcedure = protectedProcedure.query(async ({ ctx }) => {
  const currentUserId = ctx.authenticatedUser.id;

  const { data: userAttempts, error } = await ctx.supabase
    .from("attempts")
    .select(`
      id,
      score,
      total_marks,
      status,
      completed_at,
      created_at,
      sets (
        name,
        year,
        session,
        exams (name, slug)
      )
    `)
    .eq("user_id", currentUserId)
    .order("created_at", { ascending: false });

  if (error) {
    throw new Error(error.message);
  }

  return userAttempts ?? [];
});
