"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { createSupabaseBrowserClient } from "@/lib/supabase/browser";
import type { User as SupabaseUser } from "@supabase/supabase-js";

export function HeaderAuthButton() {
  const router = useRouter();
  const [authenticatedUser, setAuthenticatedUser] = React.useState<SupabaseUser | null>(null);
  const [isLoadingSession, setIsLoadingSession] = React.useState(true);

  React.useEffect(() => {
    const supabaseClient = createSupabaseBrowserClient();
    supabaseClient.auth.getUser().then(({ data: { user } }) => {
      setAuthenticatedUser(user);
      setIsLoadingSession(false);
    });

    const { data: { subscription } } = supabaseClient.auth.onAuthStateChange((_event, session) => {
      setAuthenticatedUser(session?.user ?? null);
      setIsLoadingSession(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleUserSignOut = async () => {
    const supabaseClient = createSupabaseBrowserClient();
    await supabaseClient.auth.signOut();
    setAuthenticatedUser(null);
    router.push("/login");
    router.refresh();
  };

  if (isLoadingSession) return null;

  if (authenticatedUser) {
    return (
      <Button variant="ghost" size="sm" onClick={handleUserSignOut}>
        Sign Out
      </Button>
    );
  }

  return (
    <Link href="/login">
      <Button variant="ghost" size="sm">Sign In</Button>
    </Link>
  );
}
