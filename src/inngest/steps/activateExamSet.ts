import { createSupabaseAdminClient } from "@/lib/supabase/admin";

/** Marks an exam set as active (published) after successful extraction. */
export async function activateExamSet(setId: string): Promise<void> {
  const supabaseAdminClient = createSupabaseAdminClient();

  const { error: updateError } = await supabaseAdminClient
    .from("sets")
    .update({ is_active: true })
    .eq("id", setId);

  if (updateError) {
    throw new Error(
      `Failed to activate set ${setId}: ${updateError.message}`
    );
  }

  console.log(`[activate-set] Set ${setId} is now active and published.`);
}
