import "server-only";
import { createClient } from "@supabase/supabase-js";

export function createSupabaseAdminClient() {
  const supabaseProjectUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://placeholder.supabase.co";
  const supabaseSecretApiKey =
    process.env.SUPABASE_SECRET_KEY ||
    process.env.SUPABASE_SERVICE_ROLE_KEY ||
    "placeholder-secret-key";

  return createClient(supabaseProjectUrl, supabaseSecretApiKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });
}
