import { createSupabaseServerClient } from "@/lib/supabase/server";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";

export async function createTRPCContext() {
  const supabaseServerClient = await createSupabaseServerClient();
  const { data: { user: authenticatedUser } } = await supabaseServerClient.auth.getUser();
  const adminSupabase = createSupabaseAdminClient();

  return {
    supabase: supabaseServerClient,
    adminSupabase,
    authenticatedUser,
  };
}

export type TRPCContextType = Awaited<ReturnType<typeof createTRPCContext>>;
