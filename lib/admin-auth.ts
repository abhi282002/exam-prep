import { createSupabaseAdminClient } from "./supabase/admin";

export async function verifyUserIsAdmin(userId?: string, userEmail?: string | null): Promise<boolean> {
  if (!userId && !userEmail) return false;

  try {
    const supabase = createSupabaseAdminClient();
    if (userId) {
      const { data: profile } = await supabase
        .from("profiles")
        .select("role")
        .eq("id", userId)
        .maybeSingle();

      if (profile?.role) {
        return profile.role === "admin";
      }
    }
  } catch {
    // Graceful fallback to email whitelist if table is being created
  }

  if (!userEmail) return false;
  const adminEmails = (process.env.ADMIN_EMAILS ?? "")
    .split(",")
    .map((singleEmail) => singleEmail.trim().toLowerCase())
    .filter(Boolean);

  return adminEmails.includes(userEmail.toLowerCase());
}
