"use client";

import { useRouter } from "next/navigation";
import { trpc } from "@/src/trpc/client";
import { createSupabaseBrowserClient } from "@/lib/supabase/browser";

export function useHeaderAuth() {
  const router = useRouter();
  const trpcUtils = trpc.useUtils();
  const authQuery = trpc.auth.getRole.useQuery(undefined, {
    staleTime: 1000 * 60,
    retry: false,
  });

  const handleSignOut = async () => {
    const supabase = createSupabaseBrowserClient();
    await supabase.auth.signOut();
    await trpcUtils.auth.getRole.invalidate();
    router.push("/login");
    router.refresh();
  };

  return {
    isLoading: authQuery.isLoading,
    isAuthenticated: authQuery.data?.isAuthenticated ?? false,
    isUserAdmin: authQuery.data?.isAdmin ?? false,
    handleSignOut,
  };
}
