import * as fs from "node:fs";
import { extractPages } from "../src/lib/pdf/extractText";
import { cleanPages } from "../src/lib/pdf/cleanPages";
import { splitQuestions, makeChunks } from "../src/lib/pdf/splitQuestions";
import { structureChunk } from "../src/lib/ai/structureChunk";

async function main() {
  const targetPdfPath = process.argv[2];
  if (!targetPdfPath || !fs.existsSync(targetPdfPath)) {
    console.error("Usage: npx tsx scripts/try-structure.ts <path-to-pdf>");
    process.exit(1);
  }

  const pdfFileBuffer = fs.readFileSync(targetPdfPath);
  const rawPages = await extractPages(pdfFileBuffer);
  const cleanedPages = cleanPages(rawPages);
  const detectedQuestions = splitQuestions(cleanedPages.join("\n\n"));
  const chunks = makeChunks(detectedQuestions, 8);

  console.log(`Extracted ${detectedQuestions.length} questions in ${chunks.length} chunks.`);
  console.log("Structuring first 2 chunks with OpenRouter...\n");

  for (let idx = 0; idx < Math.min(2, chunks.length); idx++) {
    const chunkContent = chunks[idx].map((q) => q.rawQuestionText).join("\n\n---\n\n");
    console.log(`\n=== Chunk #${idx + 1} (${chunks[idx].length} questions) ===`);
    const structuredResult = await structureChunk(chunkContent);
    console.log(JSON.stringify(structuredResult, null, 2));
  }
}

main().catch(console.error);
