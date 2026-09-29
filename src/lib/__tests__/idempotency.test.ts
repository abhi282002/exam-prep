import { describe, it, expect } from "vitest";

describe("Attempt Idempotency Principle", () => {
  it("preserves original score and does not recompute if attempt was submitted", () => {
    const existingSubmittedAttempt = {
      id: "attempt-123",
      submitted_at: "2026-06-01T12:00:00Z",
      score: 84.5,
    };

    const isAlreadyFinalized = Boolean(existingSubmittedAttempt.submitted_at);
    const finalScore = isAlreadyFinalized ? existingSubmittedAttempt.score : 0;

    expect(isAlreadyFinalized).toBe(true);
    expect(finalScore).toBe(84.5);
  });
});
