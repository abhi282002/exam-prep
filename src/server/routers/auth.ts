import { router, publicProcedure } from "../trpc";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";

export const authRouter = router({
  getRole: publicProcedure.query(async () => {
    try {
      const serverClient = await createSupabaseServerClient();
      const {
        data: { user: currentUser },
      } = await serverClient.auth.getUser();

      if (!currentUser) {
        return { isAuthenticated: false, role: "student", isAdmin: false };
      }

      const adminClient = createSupabaseAdminClient();
      const { data: profileRecord } = await adminClient
        .from("profiles")
        .select("role")
        .eq("id", currentUser.id)
        .maybeSingle();

      const userRole = profileRecord?.role ?? "student";
      const isUserAdmin = userRole === "admin";

      return {
        isAuthenticated: true,
        role: userRole,
        isAdmin: isUserAdmin,
      };
    } catch {
      return { isAuthenticated: false, role: "student", isAdmin: false };
    }
  }),
});
