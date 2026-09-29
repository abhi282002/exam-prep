import { z } from "zod";
import { adminProcedure } from "../trpc";

export const getUploadUrlAdminProcedure = adminProcedure
  .input(z.object({
    examSlug: z.string(),
    setId: z.string().uuid(),
    kind: z.enum(["question", "answer_key"]),
  }))
  .mutation(async ({ ctx, input }) => {
    const storageFilePath = `${input.examSlug}/${input.setId}/${input.kind}.pdf`;

    // Use service-role client for storage (to create signed upload URLs) and DB updates
    const { data: uploadData, error } = await ctx.adminSupabase.storage
      .from("papers")
      .createSignedUploadUrl(storageFilePath);

    if (error || !uploadData) throw new Error(error?.message ?? "Failed to create upload URL");
    const targetField = input.kind === "question" ? "question_paper_path" : "answer_key_path";

    // Also update the sets record using admin client to bypass RLS
    await ctx.adminSupabase.from("sets").update({ [targetField]: storageFilePath }).eq("id", input.setId);

    return { signedUrl: uploadData.signedUrl, token: uploadData.token, storageFilePath };
  });

