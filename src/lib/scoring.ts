import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { calculateAttemptScore, type ScoredQuestionAnswerPair } from "./scoring-calculator";

export async function finalizeAttempt(attemptId: string) {
  const supabase = createSupabaseAdminClient();

  const { data: attempt } = await supabase
    .from("attempts")
    .select("id, set_id, score, submitted_at, completed_at, sets(exams(marks_per_question, negative_marks))")
    .eq("id", attemptId)
    .single();

  if (!attempt) throw new Error("Attempt record not found");
  if (attempt.submitted_at || attempt.completed_at) {
    return { attemptId, score: Number(attempt.score), isAlreadyFinalized: true };
  }

  const examData = (attempt.sets as any)?.exams;
  const marksPerQuestion = Number(examData?.marks_per_question ?? 2);
  const negativeMarks = Number(examData?.negative_marks ?? 0);

  const { data: questions } = await supabase.from("questions").select("id, correct_option").eq("set_id", attempt.set_id);
  const { data: answers } = await supabase.from("answers").select("question_id, selected_option_key").eq("attempt_id", attemptId);

  const answersMap = new Map((answers ?? []).map((ans) => [ans.question_id, ans.selected_option_key]));
  const scoringPairs: ScoredQuestionAnswerPair[] = (questions ?? []).map((q) => ({
    questionId: q.id,
    selectedOptionKey: answersMap.get(q.id) ?? null,
    correctOptionKey: q.correct_option,
  }));

  const scoringSummary = calculateAttemptScore(scoringPairs, {
    marksPerQuestion,
    negativeMarksPerQuestion: negativeMarks,
  });

  const nowTimestamp = new Date().toISOString();
  await supabase.from("attempts").update({
    score: scoringSummary.calculatedScore,
    status: "completed",
    completed_at: nowTimestamp,
    submitted_at: nowTimestamp,
  }).eq("id", attemptId);

  return { attemptId, score: scoringSummary.calculatedScore, isAlreadyFinalized: false, ...scoringSummary };
}
