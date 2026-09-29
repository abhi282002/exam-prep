import { describe, it, expect } from "vitest";
import { calculateAttemptScore } from "../scoring-calculator";

describe("calculateAttemptScore", () => {
  const sampleScoringParameters = { marksPerQuestion: 2, negativeMarksPerQuestion: 0.5 };

  it("calculates perfect score when all answers are correct", () => {
    const pairs = [
      { questionId: "q1", selectedOptionKey: "A", correctOptionKey: "A" },
      { questionId: "q2", selectedOptionKey: "B", correctOptionKey: "B" },
    ];
    const result = calculateAttemptScore(pairs, sampleScoringParameters);
    expect(result.calculatedScore).toBe(4);
    expect(result.correctCount).toBe(2);
    expect(result.wrongCount).toBe(0);
    expect(result.skippedCount).toBe(0);
  });

  it("deducts negative marks for incorrect answers", () => {
    const pairs = [
      { questionId: "q1", selectedOptionKey: "A", correctOptionKey: "A" },
      { questionId: "q2", selectedOptionKey: "C", correctOptionKey: "B" },
    ];
    const result = calculateAttemptScore(pairs, sampleScoringParameters);
    expect(result.calculatedScore).toBe(1.5);
    expect(result.correctCount).toBe(1);
    expect(result.wrongCount).toBe(1);
    expect(result.skippedCount).toBe(0);
  });

  it("awards zero marks without penalty for skipped questions", () => {
    const pairs = [
      { questionId: "q1", selectedOptionKey: null, correctOptionKey: "A" },
      { questionId: "q2", selectedOptionKey: "", correctOptionKey: "B" },
    ];
    const result = calculateAttemptScore(pairs, sampleScoringParameters);
    expect(result.calculatedScore).toBe(0);
    expect(result.correctCount).toBe(0);
    expect(result.skippedCount).toBe(2);
  });
});
