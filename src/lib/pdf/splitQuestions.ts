export interface ExtractedQuestionBlock {
  questionNumber: number;
  rawQuestionText: string;
}

export function splitQuestions(documentText: string): ExtractedQuestionBlock[] {
  const questionMarkerPattern = /(?:(?:^|\n)\s*(?:Q(?:uestion)?\.?|प्रश्न\.?)\s*(\d+)[:.]?|(?:^|\n)\s*\(?(\d+)\)\.?\s+)/gi;
  const matchPositions: { index: number; questionNumber: number }[] = [];
  let currentMatch: RegExpExecArray | null;

  while ((currentMatch = questionMarkerPattern.exec(documentText)) !== null) {
    const parsedNumber = parseInt(currentMatch[1] || currentMatch[2], 10);
    if (!isNaN(parsedNumber)) matchPositions.push({ index: currentMatch.index, questionNumber: parsedNumber });
  }

  const extractedBlocks: ExtractedQuestionBlock[] = [];
  for (let idx = 0; idx < matchPositions.length; idx++) {
    const current = matchPositions[idx];
    const nextIndex = idx + 1 < matchPositions.length ? matchPositions[idx + 1].index : documentText.length;
    extractedBlocks.push({
      questionNumber: current.questionNumber,
      rawQuestionText: documentText.slice(current.index, nextIndex).trim(),
    });
  }
  return extractedBlocks;
}

export function makeChunks(
  questionList: ExtractedQuestionBlock[],
  chunkBatchSize = 8
): ExtractedQuestionBlock[][] {
  const resultChunks: ExtractedQuestionBlock[][] = [];
  let activeChunk: ExtractedQuestionBlock[] = [];

  for (const singleQuestion of questionList) {
    const isPassageIntro = /Read the following passage and answer questions (\d+)\s*(?:to|-)\s*(\d+)/i.test(singleQuestion.rawQuestionText);
    if (activeChunk.length >= chunkBatchSize && !isPassageIntro) {
      resultChunks.push(activeChunk);
      activeChunk = [];
    }
    activeChunk.push(singleQuestion);
  }
  if (activeChunk.length > 0) resultChunks.push(activeChunk);
  return resultChunks;
}
