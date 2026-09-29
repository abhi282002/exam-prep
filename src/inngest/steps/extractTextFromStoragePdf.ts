import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { extractPages } from "@/src/lib/pdf/extractText";
import { cleanPages } from "@/src/lib/pdf/cleanPages";

const MINIMUM_DOCUMENT_TEXT_LENGTH = 100;

/**
 * Downloads a PDF from Supabase Storage and extracts its cleaned text in-memory.
 * Avoids passing large raw binary buffers across Inngest step checkpoints.
 */
export async function extractTextFromStoragePdf(
  storagePath: string
): Promise<string> {
  const supabaseAdminClient = createSupabaseAdminClient();

  const { data: blobData, error: downloadError } = await supabaseAdminClient
    .storage
    .from("papers")
    .download(storagePath);

  if (downloadError || !blobData) {
    throw new Error(`PDF download failed from storage: ${downloadError?.message}`);
  }

  const rawArrayBuffer = await blobData.arrayBuffer();
  const rawPageTexts = await extractPages(new Uint8Array(rawArrayBuffer));
  const cleanedPageTexts = cleanPages(rawPageTexts);
  const fullDocumentText = cleanedPageTexts.join("\n\n");

  if (fullDocumentText.length < MINIMUM_DOCUMENT_TEXT_LENGTH) {
    throw new Error(
      "PDF text extraction returned too little content. " +
      "Only text-based PDFs are supported (scanned image PDFs without OCR will fail)."
    );
  }

  return fullDocumentText;
}
