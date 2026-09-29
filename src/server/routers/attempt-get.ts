import { z } from "zod";
import { TRPCError } from "@trpc/server";
import { protectedProcedure } from "../trpc";
import { finalizeAttempt } from "@/src/lib/scoring";

export const getAttemptProcedure = protectedProcedure
  .input(z.object({ attemptId: z.string().uuid() }))
  .query(async ({ ctx, input }) => {
    const { data: attempt } = await ctx.supabase
      .from("attempts")
      .select("id, set_id, user_id, status, deadline, completed_at, score, sets(name, total_marks)")
      .eq("id", input.attemptId)
      .single();

    if (!attempt || attempt.user_id !== ctx.authenticatedUser.id) {
      throw new TRPCError({ code: "NOT_FOUND", message: "Attempt not found" });
    }

    const isPastDeadline = Date.now() > new Date(attempt.deadline).getTime();
    if (isPastDeadline && attempt.status === "in_progress") {
      await finalizeAttempt(attempt.id);
      attempt.status = "completed";
    }

    const { data: rawQuestions } = await ctx.supabase
      .from("questions")
      .select("id, number, text, image_url, subject, options(key, text, image_url)")
      .eq("set_id", attempt.set_id)
      .order("number", { ascending: true });

    const { data: answers } = await ctx.supabase
      .from("answers")
      .select("question_id, selected_option_key, is_marked_for_review")
      .eq("attempt_id", input.attemptId);

    const remainingSeconds = Math.max(0, Math.floor((new Date(attempt.deadline).getTime() - Date.now()) / 1000));

    return {
      attemptId: attempt.id,
      setName: (attempt.sets as any)?.name ?? "Mock Exam Paper",
      deadline: attempt.deadline,
      remainingSeconds,
      isCompleted: attempt.status === "completed",
      questions: rawQuestions ?? [],
      savedAnswers: answers ?? [],
    };
  });
