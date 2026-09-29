export interface ScoredQuestionAnswerPair {
  questionId: string;
  selectedOptionKey: string | null;
  correctOptionKey: string;
}

export interface ExamScoringParameters {
  marksPerQuestion: number;
  negativeMarksPerQuestion: number;
}

export interface AttemptScoringSummary {
  calculatedScore: number;
  correctCount: number;
  wrongCount: number;
  skippedCount: number;
  totalQuestions: number;
}

export function calculateAttemptScore(
  answerPairs: ScoredQuestionAnswerPair[],
  parameters: ExamScoringParameters
): AttemptScoringSummary {
  let correctCount = 0;
  let wrongCount = 0;
  let skippedCount = 0;

  for (const pair of answerPairs) {
    if (!pair.selectedOptionKey) {
      skippedCount += 1;
    } else if (pair.selectedOptionKey === pair.correctOptionKey) {
      correctCount += 1;
    } else {
      wrongCount += 1;
    }
  }

  const calculatedScore = Number(
    (correctCount * parameters.marksPerQuestion - wrongCount * parameters.negativeMarksPerQuestion).toFixed(2)
  );

  return {
    calculatedScore,
    correctCount,
    wrongCount,
    skippedCount,
    totalQuestions: answerPairs.length,
  };
}
