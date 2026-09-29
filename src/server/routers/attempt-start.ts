import { z } from "zod";
import { protectedProcedure } from "../trpc";

export const startAttemptProcedure = protectedProcedure
  .input(z.object({ setId: z.string().uuid() }))
  .mutation(async ({ ctx, input }) => {
    const currentUserId = ctx.authenticatedUser.id;
    const nowIsoString = new Date().toISOString();

    const { data: existingActiveAttempt } = await ctx.supabase
      .from("attempts")
      .select("id, deadline, status")
      .eq("user_id", currentUserId)
      .eq("set_id", input.setId)
      .eq("status", "in_progress")
      .gt("deadline", nowIsoString)
      .maybeSingle();

    if (existingActiveAttempt) {
      return { attemptId: existingActiveAttempt.id, isResumed: true, deadline: existingActiveAttempt.deadline };
    }

    const { data: setRecord } = await ctx.supabase
      .from("sets")
      .select("exams(duration_minutes)")
      .eq("id", input.setId)
      .single();

    const durationMinutes = (setRecord?.exams as any)?.duration_minutes ?? 60;
    const targetDeadline = new Date(Date.now() + durationMinutes * 60 * 1000).toISOString();

    const { data: createdAttempt, error } = await ctx.supabase
      .from("attempts")
      .insert({
        user_id: currentUserId,
        set_id: input.setId,
        status: "in_progress",
        deadline: targetDeadline,
      })
      .select("id, deadline")
      .single();

    if (error || !createdAttempt) throw new Error(error?.message || "Failed to create attempt");
    return { attemptId: createdAttempt.id, isResumed: false, deadline: createdAttempt.deadline };
  });
