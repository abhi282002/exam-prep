import * as fs from "node:fs";
import { extractPages, looksBroken } from "../src/lib/pdf/extractText";
import { cleanPages } from "../src/lib/pdf/cleanPages";
import { splitQuestions, makeChunks } from "../src/lib/pdf/splitQuestions";

async function main() {
  const pdfTargetFilePath = process.argv[2];
  if (!pdfTargetFilePath) {
    console.error("Usage: npx tsx scripts/inspect-pdf.ts <path-to-pdf>");
    process.exit(1);
  }

  const pdfFileBuffer = fs.readFileSync(pdfTargetFilePath);
  const extractedPages = await extractPages(pdfFileBuffer);
  console.log(`\n=== PDF Inspection: ${pdfTargetFilePath} ===`);
  console.log(`Total Pages: ${extractedPages.length}`);

  const brokenPageIndices = extractedPages
    .map((pageText, pageIndex) => (looksBroken(pageText) ? pageIndex + 1 : null))
    .filter(Boolean);
  console.log(`Broken / Vision Pages: ${brokenPageIndices.length > 0 ? brokenPageIndices.join(", ") : "None"}`);

  const cleanedPageTexts = cleanPages(extractedPages);
  const combinedText = cleanedPageTexts.join("\n\n");
  const detectedQuestions = splitQuestions(combinedText);
  console.log(`Detected Question Count: ${detectedQuestions.length}`);

  const questionChunks = makeChunks(detectedQuestions, 8);
  console.log(`Total Chunks: ${questionChunks.length}`);
  console.log("\n--- Preview of First 3 Chunks ---");
  questionChunks.slice(0, 3).forEach((chunk, chunkIndex) => {
    console.log(`\nChunk #${chunkIndex + 1} (${chunk.length} questions: ${chunk.map((q) => q.questionNumber).join(", ")}):`);
    console.log(chunk[0]?.rawQuestionText.slice(0, 160) + "...");
  });
}

main().catch(console.error);
