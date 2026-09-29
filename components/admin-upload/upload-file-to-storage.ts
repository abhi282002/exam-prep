/** Uploads a PDF file directly to Supabase Storage via signed URL. */
export async function uploadPdfToSignedUrl(
  signedUrl: string,
  pdfFile: File
): Promise<void> {
  const response = await fetch(signedUrl, {
    method: "PUT",
    body: pdfFile,
    headers: { "Content-Type": "application/pdf" },
  });

  if (!response.ok) {
    throw new Error(`Failed to upload file: ${response.statusText}`);
  }
}
