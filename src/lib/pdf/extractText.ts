import { extractText } from "unpdf";

export async function extractPages(pdfBuffer: Uint8Array | ArrayBuffer): Promise<string[]> {
  const result = await extractText(pdfBuffer, { mergePages: false });
  if (Array.isArray(result.text)) {
    return result.text;
  }
  return [result.text as unknown as string];
}

export function looksBroken(pageText: string): boolean {
  const trimmedText = pageText.trim();
  if (trimmedText.length < 50) return true;

  const replacementCharCount = (trimmedText.match(/\uFFFD/g) || []).length;
  if (replacementCharCount / trimmedText.length > 0.05) return true;

  const controlCharCount = (trimmedText.match(/[\x00-\x08\x0B\x0C\x0E-\x1F]/g) || []).length;
  if (controlCharCount / trimmedText.length > 0.02) return true;

  const recognizableWordsCount = (trimmedText.match(/[a-zA-Z0-9\u0900-\u097F]{2,}/g) || []).length;
  if (recognizableWordsCount < 5) return true;

  return false;
}
