import { z } from "zod";
import { TRPCError } from "@trpc/server";
import { protectedProcedure } from "../trpc";

export const getAttemptResultProcedure = protectedProcedure
  .input(z.object({ attemptId: z.string().uuid() }))
  .query(async ({ ctx, input }) => {
    const { data: attempt } = await ctx.supabase
      .from("attempts")
      .select("id, user_id, score, total_marks, completed_at, submitted_at, set_id, sets(name, year, session)")
      .eq("id", input.attemptId)
      .single();

    if (!attempt || attempt.user_id !== ctx.authenticatedUser.id) {
      throw new TRPCError({ code: "NOT_FOUND", message: "Attempt record not found" });
    }
    if (!attempt.completed_at && !attempt.submitted_at) {
      throw new TRPCError({ code: "FORBIDDEN", message: "Cannot view results of an unsubmitted attempt" });
    }

    const { data: questions } = await ctx.supabase
      .from("questions")
      .select("id, number, text, image_url, subject, correct_option, explanation, options(key, text)")
      .eq("set_id", attempt.set_id)
      .order("number", { ascending: true });

    const { data: answers } = await ctx.supabase
      .from("answers")
      .select("question_id, selected_option_key")
      .eq("attempt_id", input.attemptId);

    const answersMap = new Map((answers ?? []).map((ans) => [ans.question_id, ans.selected_option_key]));

    let correctCount = 0, wrongCount = 0, skippedCount = 0;
    const reviewedQuestions = (questions ?? []).map((question) => {
      const selectedKey = answersMap.get(question.id) ?? null;
      let status: "correct" | "wrong" | "skipped" = "skipped";
      if (!selectedKey) skippedCount += 1;
      else if (selectedKey === question.correct_option) { status = "correct"; correctCount += 1; }
      else { status = "wrong"; wrongCount += 1; }
      return { ...question, userSelectedOptionKey: selectedKey, status };
    });

    return {
      attemptId: attempt.id,
      setName: (attempt.sets as any)?.name ?? "Mock Exam",
      score: Number(attempt.score),
      totalMarks: Number(attempt.total_marks ?? 100),
      correctCount, wrongCount, skippedCount,
      questions: reviewedQuestions,
    };
  });
