import { z } from "zod";
import { router, adminProcedure } from "../trpc";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";

export const adminRouter = router({
  createSet: adminProcedure
    .input(z.object({
      examId: z.string().uuid(),
      name: z.string().min(2),
      year: z.number().int(),
      session: z.string(),
      totalMarks: z.number().default(100),
    }))
    .mutation(async ({ ctx, input }) => {
      const { data: newSet, error } = await ctx.supabase
        .from("sets")
        .insert({
          exam_id: input.examId,
          name: input.name,
          year: input.year,
          session: input.session,
          total_marks: input.totalMarks,
          is_active: false,
        })
        .select().single();
      if (error || !newSet) throw new Error(error?.message ?? "Failed to create set");
      return newSet;
    }),

  getUploadUrl: adminProcedure
    .input(z.object({
      examSlug: z.string(),
      setId: z.string().uuid(),
      kind: z.enum(["question", "answer_key"]),
    }))
    .mutation(async ({ ctx, input }) => {
      const adminClient = createSupabaseAdminClient();
      const storageFilePath = `${input.examSlug}/${input.setId}/${input.kind}.pdf`;
      const { data: uploadData, error } = await adminClient.storage
        .from("papers")
        .createSignedUploadUrl(storageFilePath);

      if (error || !uploadData) throw new Error(error?.message ?? "Failed to create upload URL");
      const field = input.kind === "question" ? "question_paper_path" : "answer_key_path";
      await ctx.supabase.from("sets").update({ [field]: storageFilePath }).eq("id", input.setId);

      return { signedUrl: uploadData.signedUrl, token: uploadData.token, storageFilePath };
    }),
});
