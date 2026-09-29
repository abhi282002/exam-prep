import { z } from "zod";
import { TRPCError } from "@trpc/server";
import { protectedProcedure } from "../trpc";
import { finalizeAttempt } from "@/src/lib/scoring";

export const saveAnswerProcedure = protectedProcedure
  .input(z.object({
    attemptId: z.string().uuid(),
    questionId: z.string().uuid(),
    selectedOptionKey: z.string().nullable().optional(),
    isMarkedForReview: z.boolean().optional(),
  }))
  .mutation(async ({ ctx, input }) => {
    const { data: attempt } = await ctx.supabase
      .from("attempts").select("id, user_id, status, deadline").eq("id", input.attemptId).single();

    if (!attempt || attempt.user_id !== ctx.authenticatedUser.id) {
      throw new TRPCError({ code: "NOT_FOUND", message: "Attempt not found" });
    }
    if (attempt.status !== "in_progress" || Date.now() > new Date(attempt.deadline).getTime()) {
      throw new TRPCError({ code: "BAD_REQUEST", message: "Attempt is already submitted or expired" });
    }

    const { error } = await ctx.supabase.from("answers").upsert({
      attempt_id: input.attemptId,
      question_id: input.questionId,
      selected_option_key: input.selectedOptionKey ?? null,
      is_marked_for_review: input.isMarkedForReview ?? false,
      updated_at: new Date().toISOString(),
    }, { onConflict: "attempt_id,question_id" });

    if (error) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: error.message });
    return { success: true };
  });

export const submitAttemptProcedure = protectedProcedure
  .input(z.object({ attemptId: z.string().uuid() }))
  .mutation(async ({ ctx, input }) => {
    const { data: attempt } = await ctx.supabase
      .from("attempts").select("id, user_id").eq("id", input.attemptId).single();

    if (!attempt || attempt.user_id !== ctx.authenticatedUser.id) {
      throw new TRPCError({ code: "NOT_FOUND", message: "Attempt not found" });
    }
    const finalResult = await finalizeAttempt(input.attemptId);
    return { success: true, ...finalResult };
  });
