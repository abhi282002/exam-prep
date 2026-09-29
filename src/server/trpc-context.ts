import { createSupabaseServerClient } from "@/lib/supabase/server";

export async function createTRPCContext() {
  const supabaseServerClient = await createSupabaseServerClient();
  const { data: { user: authenticatedUser } } = await supabaseServerClient.auth.getUser();

  return {
    supabase: supabaseServerClient,
    authenticatedUser,
  };
}

export type TRPCContextType = Awaited<ReturnType<typeof createTRPCContext>>;
