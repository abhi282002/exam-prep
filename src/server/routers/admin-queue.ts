import { z } from "zod";
import { adminProcedure } from "../trpc";
import { inngestClient } from "@/src/inngest/client";

const pushToQueueInput = z.object({
  setId: z.string().uuid(),
});

/** Fires the Inngest extraction event for a set that has a PDF uploaded. */
export const pushToQueueAdminProcedure = adminProcedure
  .input(pushToQueueInput)
  .mutation(async ({ ctx, input }) => {
    const { data: examSet, error: fetchError } = await ctx.adminSupabase
      .from("sets")
      .select("id, name, question_paper_path, exams(slug)")
      .eq("id", input.setId)
      .single();

    if (fetchError || !examSet) {
      throw new Error("Exam set not found.");
    }

    if (!examSet.question_paper_path) {
      throw new Error(
        "No question paper uploaded for this set. Upload a PDF first."
      );
    }

    await inngestClient.send({
      name: "paper/extract.requested",
      data: {
        setId: examSet.id,
        setName: examSet.name,
        questionPaperPath: examSet.question_paper_path,
        examSlug: (examSet.exams as any)?.slug ?? "unknown",
      },
    });

    return { queued: true, setId: examSet.id, setName: examSet.name };
  });
